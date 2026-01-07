const User = require('../models/User');
const BehavioralEvent = require('../models/BehavioralEvent');

// @desc    Log a behavioral event
// @route   POST /api/persuasion/log
// @access  Private
const logEvent = async (req, res) => {
    try {
        const { eventType, metadata, clientInfo } = req.body;

        const event = await BehavioralEvent.create({
            user: req.user._id,
            eventType,
            metadata,
            clientInfo
        });

        // Trigger real-time DNA refinement for specific events
        if (eventType === 'WISH_LINGER' || eventType === 'CONTENT_ENGAGEMENT') {
            await refineEmotionalDNA(req.user._id);
        }

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Refine Emotional DNA & Classify Archetype
// Internal Utility
const refineEmotionalDNA = async (userId) => {
    const user = await User.findById(userId);
    const events = await BehavioralEvent.find({ user: userId }).limit(100);

    // AI Logic: Detect Archetype
    const productViews = events.filter(e => e.eventType === 'PRODUCT_VIEW');
    const vintageViews = productViews.filter(v => v.metadata?.intent === 'Legacy');

    if (vintageViews.length > 5) user.preferences.emotionalArchetype = 'Legacy Builder';
    else if (user.wallet.totalSpent > 1000000) user.preferences.emotionalArchetype = 'Prestige Seeker';

    await user.save();
};

// @desc    Generate Legacy-Framed Scripts
// @route   GET /api/persuasion/script/:key
// @access  Public
const getLegacyScript = (req, res) => {
    const scripts = {
        'ADD_TO_CART': 'Secure This Memory',
        'ABANDON_CART': 'Some stories are too precious to be left unfinished.',
        'CHECKOUT': 'Initiate Your Legacy',
        'WELCOME': 'Welcome to the inner circle of LUMIÈRE.',
        'WISHLIST': 'A heart full of wishes, waiting to be realized.'
    };

    const value = scripts[req.params.key] || req.params.key;
    res.json({ script: value });
};

// @desc    Check for "Open Wallet" Trigger Moments
// @route   GET /api/persuasion/triggers
// @access  Private
const getTriggers = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const triggers = [];

        // Check for upcoming personal events
        const now = new Date();
        user.lovedOnes.forEach(one => {
            const daysUntil = Math.ceil((new Date(one.birthday) - now) / (1000 * 60 * 60 * 24));
            if (daysUntil > 0 && daysUntil <= 7) {
                triggers.push({
                    type: 'UPCOMING_EVENT',
                    recipient: one.name,
                    daysRemaining: daysUntil,
                    framing: user.preferences.emotionalArchetype === 'Romantic' ? 'A romantic gesture awaits.' : 'Continue the family legacy.'
                });
            }
        });

        res.json(triggers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    logEvent,
    getLegacyScript,
    getTriggers
};
