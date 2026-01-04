const Settings = require('../models/Settings');

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne({ isDefault: true });

        if (!settings) {
            settings = await Settings.create({
                contactInfo: {},
                socialLinks: {}
            });
        }

        res.json(settings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = async (req, res) => {
    try {
        const { contactInfo, socialLinks } = req.body;

        const settings = await Settings.findOneAndUpdate(
            { isDefault: true },
            {
                contactInfo,
                socialLinks
            },
            { new: true, upsert: true }
        );

        res.json(settings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getSettings, updateSettings };
