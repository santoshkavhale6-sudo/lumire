const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
require('dotenv').config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_YourKeyHere', // Should be in env
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'YourSecretHere',
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'No order items' });
        return;
    }

    try {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        // Create Razorpay Order
        let razorpayOrder;
        try {
            razorpayOrder = await razorpay.orders.create({
                amount: Math.round(totalPrice * 100), // Amount in paise
                currency: 'INR',
                receipt: `receipt_${Date.now()}_${req.user._id}`,
                payment_capture: 1
            });
        } catch (rzpError) {
            console.error("Razorpay Error (Switching to MOCK mode):", rzpError.message);
            // Mock response if Razorpay is not configured or fails
            razorpayOrder = {
                id: `mock_order_${Date.now()}`,
                amount: Math.round(totalPrice * 100),
                currency: 'INR'
            };
        }

        order.paymentResult = {
            id: razorpayOrder.id,
            status: 'pending'
        };

        const createdOrder = await order.save();

        // Configure Payment Methods based on selection
        let methodConfig = {};
        if (paymentMethod === 'card') {
            methodConfig = { card: true, upi: false, wallet: false, netbanking: false };
        } else if (paymentMethod === 'upi') {
            methodConfig = { card: false, upi: true, wallet: false, netbanking: false };
        } else if (paymentMethod === 'wallet') {
            methodConfig = { card: false, upi: false, wallet: true, netbanking: false };
        }

        res.status(201).json({
            _id: createdOrder._id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            razorpayOrderId: razorpayOrder.id,
            paymentConfig: methodConfig, // Send back config to restrict frontend options
            key: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_key'
        });
    } catch (error) {
        console.error("Order Creation Error:", error.message);
        res.status(500).json({
            message: error.message || "Internal Server Error"
        });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = status;
            if (status === 'Delivered') {
                order.isDelivered = true;
                order.deliveredAt = Date.now();
            }
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify Payment (Razorpay)
// @route   POST /api/orders/verify
// @access  Private
const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    try {
        let isValid = false;

        // Mock verification for development
        if (razorpay_order_id && razorpay_order_id.startsWith('mock_')) {
            console.log("Mock Payment Verified");
            isValid = true;
        } else {
            const generated_signature = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(razorpay_order_id + "|" + razorpay_payment_id)
                .digest("hex");
            isValid = generated_signature === razorpay_signature;
        }

        if (isValid) {
            const order = await Order.findById(orderId);
            if (order) {
                order.isPaid = true;
                order.paidAt = Date.now();
                order.paymentResult = {
                    id: razorpay_payment_id,
                    status: 'completed',
                    update_time: Date.now(),
                    email_address: req.user.email
                };
                // Decrement stock logic could go here

                const updatedOrder = await order.save();
                res.json(updatedOrder);
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        } else {
            res.status(400).json({ message: 'Invalid Signature' });
        }
    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name email');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get order analytics
// @route   GET /api/orders/analytics
// @access  Private/Admin
const getAnalytics = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalSales = await Order.aggregate([
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]);
        const salesData = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalSales: { $sum: "$totalPrice" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({
            totalOrders,
            totalRevenue: totalSales[0] ? totalSales[0].total : 0,
            salesData: salesData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    addOrderItems,
    getOrderById,
    updateOrderStatus,
    verifyPayment,
    getMyOrders,
    getOrders,
    getAnalytics
};
