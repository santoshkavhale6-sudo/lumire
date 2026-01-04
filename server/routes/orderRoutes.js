const express = require('express');
const router = express.Router();
const { addOrderItems, verifyPayment, getOrderById, updateOrderStatus, getOrders, getAnalytics } = require('../controllers/orderController');

// Middleware to simulate auth (since we don't have full JWT validation middleware yet)
const mockProtect = (req, res, next) => {
    // In a real app, verify JWT here. For now, we trust the frontend 'user' if passed or default to a guest/admin
    // This is a TEMPORARY convenience for the demo to work without headers setup
    if (req.headers.authorization) {
        // decode token logic would go here
    }
    next();
};

router.post('/', mockProtect, addOrderItems);
router.post('/verify', mockProtect, verifyPayment);
router.get('/', mockProtect, getOrders);
router.get('/analytics', mockProtect, getAnalytics);
router.get('/:id', mockProtect, getOrderById);
router.put('/:id/status', mockProtect, updateOrderStatus);

module.exports = router;
