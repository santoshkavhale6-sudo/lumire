const express = require('express');
const router = express.Router();
const { addOrderItems, verifyPayment, getOrderById, updateOrderStatus, getOrders, getAnalytics, getMyOrders } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, addOrderItems);
router.post('/verify', protect, verifyPayment);
router.get('/myorders', protect, getMyOrders);
router.get('/analytics', protect, admin, getAnalytics);
router.get('/:id', protect, getOrderById);
router.get('/', protect, admin, getOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
