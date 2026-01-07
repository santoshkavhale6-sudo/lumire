const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    role: { type: String, required: true, default: 'customer' },

    // Premium Profile Fields
    phone: { type: String },
    avatar: { type: String },
    birthdate: { type: Date },
    anniversary: { type: Date },

    // Preferences
    preferences: {
        ringSize: { type: String },
        preferredJewelry: [{ type: String }],
        newsletter: { type: Boolean, default: true },
        whatsapp: { type: Boolean, default: true }
    },

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
        points: { type: Number, default: 0 }
    },

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
