const User = require('../models/User');
const Product = require('../models/Product');

// @desc    Get AI Gift Recommendations
// @route   POST /api/lounge/gift-recommendations
// @access  Private
const getGiftRecommendations = async (req, res) => {
    try {
        const { recipient, relationship, occasion, intent, budget, metal, city } = req.body;
        const user = await User.findById(req.user._id);

        // Simple "AI" logic for demonstration - can be expanded with real ML/LLM
        let query = {
            price: { $lte: budget || 1000000 }
        };

        if (metal) query.metal = metal;

        // Relationship/Intent bias
        if (relationship === 'Wife' || relationship === 'Girlfriend') {
            if (intent === 'Romantic') {
                query.category = { $in: ['Rings', 'Necklaces'] };
                query.stone = 'Diamond';
            }
        } else if (relationship === 'Mother') {
            query.category = { $in: ['Earrings', 'Necklaces'] };
        }

        const recommendations = await Product.find(query).limit(3);

        // Personalized "Reasoning" for each recommendation
        const enrichedRecs = recommendations.map(product => {
            let reasoning = "";
            if (intent === 'Romantic') reasoning = `Dazzling ${product.stone || 'Gold'} to celebrate your eternal bond.`;
            else if (intent === 'Gratitude') reasoning = `A timeless piece to express your deepest thanks.`;
            else reasoning = `A handcrafted treasure perfect for a ${occasion}.`;

            return {
                ...product._doc,
                reasoning,
                suggestedEngraving: intent === 'Romantic' ? "Always & Forever" : occasion === 'Anniversary' ? `Est. ${new Date().getFullYear()}` : "Lumière Heritage",
                luxuryWrap: 'Midnight Velvet with Gold Silk Ribbon'
            };
        });

        // Update Gifting Fingerprint
        if (user) {
            user.preferences.giftingFingerprint.favoriteEmotionalIntents.push(intent);
            user.preferences.giftingFingerprint.preferredPriceRange = {
                min: Math.min(user.preferences.giftingFingerprint.preferredPriceRange.min || budget, budget),
                max: Math.max(user.preferences.giftingFingerprint.preferredPriceRange.max || budget, budget)
            };
            user.preferences.giftingFingerprint.lastInteractionDate = Date.now();
            await user.save();
        }

        res.json({
            fingerprintUpdated: true,
            recommendations: enrichedRecs
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Schedule a Surprise Delivery
// @route   POST /api/lounge/schedule-surprise
// @access  Private
const scheduleSurprise = async (req, res) => {
    try {
        const { productId, deliveryDate, recipientDetails, wrapStyle, messageCard } = req.body;
        const user = await User.findById(req.user._id);

        // Log the event in user's gift reminders
        user.giftReminders.push({
            date: deliveryDate,
            event: 'Surprise Delivery',
            recipient: recipientDetails.name,
            note: `Surprise for ${recipientDetails.name}: ${messageCard}`
        });

        await user.save();

        res.status(201).json({
            message: 'Surprise delivery scheduled and butler notified.',
            transactionId: `SRPR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getGiftRecommendations,
    scheduleSurprise
};
