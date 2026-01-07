const express = require('express');
const router = express.Router();
const { logShare, getShareAnalytics } = require('../controllers/shareController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/log', logShare);
router.get('/analytics', protect, admin, getShareAnalytics);

module.exports = router;
