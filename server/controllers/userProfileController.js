const User = require('../models/User');

// @desc    Get user profile details
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            user.birthdate = req.body.birthdate || user.birthdate;
            user.anniversary = req.body.anniversary || user.anniversary;

            if (req.body.preferences) {
                user.preferences = { ...user.preferences, ...req.body.preferences };
            }

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                preferences: updatedUser.preferences,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add/Update Address
// @route   POST /api/user/address
// @access  Private
const manageAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { addressId, label, name, address, city, zip, state, country, isDefault } = req.body;

        if (user) {
            if (addressId) {
                // Update existing
                const addr = user.addresses.id(addressId);
                if (addr) {
                    Object.assign(addr, { label, name, address, city, zip, state, country, isDefault });
                }
            } else {
                // Add new
                user.addresses.push({ label, name, address, city, zip, state, country, isDefault });
            }

            if (isDefault) {
                // Set others to false
                const lastAdded = user.addresses[user.addresses.length - 1];
                user.addresses.forEach(a => {
                    if (a._id.toString() !== (addressId || lastAdded._id.toString())) {
                        a.isDefault = false;
                    }
                });
            }

            await user.save();
            res.json(user.addresses);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add/Update Gift Reminder
// @route   POST /api/user/gifts
// @access  Private
const manageGifts = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { giftId, date, event, recipient, note } = req.body;

        if (user) {
            if (giftId) {
                const gift = user.giftReminders.id(giftId);
                if (gift) Object.assign(gift, { date, event, recipient, note });
            } else {
                user.giftReminders.push({ date, event, recipient, note });
            }

            await user.save();
            res.json(user.giftReminders);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    manageAddress,
    manageGifts
};
