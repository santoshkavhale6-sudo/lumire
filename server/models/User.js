const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    role: { type: String, required: true, default: 'customer' },
    isElite: { type: Boolean, default: false },
    loyaltyTier: { type: String, enum: ['Member', 'Silver', 'Gold', 'Platinum', 'Elite'], default: 'Member' },

    // Premium Profile Fields
    phone: { type: String },
    avatar: { type: String },
    birthdate: { type: Date },
    anniversary: { type: Date },

    // Preferences
    preferences: {
        ringSize: { type: String },
        preferredJewelry: [{ type: String }],
        preferredMetals: [{ type: String }],
        newsletter: { type: Boolean, default: true },
        whatsapp: { type: Boolean, default: true },
        giftingFingerprint: {
            preferredPriceRange: { min: Number, max: Number },
            favoriteEmotionalIntents: [String],
            lastInteractionDate: Date
        },
        emotionalArchetype: {
            type: String,
            enum: ['Romantic', 'Legacy Builder', 'Prestige Seeker', 'Practical Gifter', 'Silent Loyalist'],
            default: 'Romantic'
        },
        behavioralDNA: {
            totalSpent: { type: Number, default: 0 },
            purchaseFrequency: { type: Number, default: 0 },
            averageSessionDuration: { type: Number, default: 0 },
            topCategories: [String],
            lastActiveDate: Date
        },
        persuasionMetrics: {
            reactionSpeed: { type: Number }, // seconds to open notification
            preferredCommunication: { type: String, enum: ['WhatsApp', 'Email', 'Push'], default: 'WhatsApp' },
            legacyScore: { type: Number, default: 0 } // Framing score
        }
    },

    // Loved Ones for Gift Concierge
    lovedOnes: [{
        name: { type: String },
        relationship: { type: String },
        birthday: { type: Date },
        anniversary: { type: Date },
        preferences: {
            metal: String,
            jewelryType: String,
            style: String
        },
        emotionalTag: String // e.g. "Romantic", "Sentimental"
    }],

    // Address Book
    addresses: [{
        label: { type: String, default: 'Home' },
        name: { type: String },
        address: { type: String },
        city: { type: String },
        zip: { type: String },
        state: { type: String },
        country: { type: String, default: 'India' },
        isDefault: { type: Boolean, default: false }
    }],

    // Gift Center
    giftReminders: [{
        date: { type: Date },
        event: { type: String },
        recipient: { type: String },
        note: { type: String }
    }],

    // Financials & Rewards
    wallet: {
        balance: { type: Number, default: 0 },
        points: { type: Number, default: 0 },
        giftBalance: { type: Number, default: 0 }
    },

    // Private Vault
    vault: {
        pin: { type: String }, // Hashed
        isSetup: { type: Boolean, default: false },
        nominee: {
            name: { type: String },
            email: { type: String },
            relationship: { type: String }
        },
        documents: [{
            title: { type: String },
            type: { type: String }, // 'Certificate', 'Invoice', 'Insurance', 'Appraisal'
            url: { type: String },
            uploadedAt: { type: Date, default: Date.now }
        }]
    },

    // Security & Compliance
    kyc: {
        status: { type: String, enum: ['Pending', 'Verified', 'Rejected', 'None'], default: 'None' },
        documentType: { type: String },
        verifiedAt: { type: Date }
    },

    isAccountFrozen: { type: Boolean, default: false },

    // Security History
    loginHistory: [{
        device: { type: String },
        ip: { type: String },
        date: { type: Date, default: Date.now }
    }],

    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
