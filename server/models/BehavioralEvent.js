const mongoose = require('mongoose');

const behavioralEventSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventType: {
        type: String,
        enum: ['PRODUCT_VIEW', 'HOVER', 'SCROLL_DEPTH', 'WISH_LINGER', 'CART_ABANDON', 'CONTENT_ENGAGEMENT'],
        required: true
    },
    metadata: {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        timeSpent: { type: Number }, // milliseconds
        depthPercentage: { type: Number }, // for scroll
        path: { type: String },
        intent: { type: String } // e.g. "Romantic", "Prestige"
    },
    clientInfo: {
        device: { type: String },
        os: { type: String },
        browser: { type: String }
    }
}, {
    timestamps: true,
});

const BehavioralEvent = mongoose.model('BehavioralEvent', behavioralEventSchema);
module.exports = BehavioralEvent;
