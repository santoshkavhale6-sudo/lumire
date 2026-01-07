const express = require('express');
const router = express.Router();
const {
    authUser,
    registerUser,
    getUserProfile,
    getUsers
} = require('../controllers/userController');
const {
    updateUserProfile,
    manageAddress,
    manageGifts
} = require('../controllers/userProfileController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.get('/', protect, admin, getUsers);
router.post('/login', authUser);

// Profile & Client Lounge Routes
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.post('/address', protect, manageAddress);
router.post('/gifts', protect, manageGifts);

module.exports = router;
