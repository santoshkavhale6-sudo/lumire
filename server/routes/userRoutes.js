const express = require('express');
const router = express.Router();
const { authUser, registerUser, getUserProfile, getUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.get('/', protect, admin, getUsers);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
