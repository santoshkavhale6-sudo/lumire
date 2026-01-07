const express = require('express');
const router = express.Router();
const { logEvent, getLegacyScript, getTriggers } = require('../controllers/persuasionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/log', protect, logEvent);
router.get('/script/:key', getLegacyScript);
router.get('/triggers', protect, getTriggers);

module.exports = router;
