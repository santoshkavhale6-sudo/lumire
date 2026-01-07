const mongoose = require('mongoose');

const shareSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    platform: {
        type: String,
        required: true,
        enum: ['whatsapp', 'instagram', 'facebook', 'telegram', 'email', 'copylink']
    },
    ip: {
        type: String
    },
    userAgent: {
        type: String
    }
}, {
    timestamps: true
});

const Share = mongoose.model('Share', shareSchema);
module.exports = Share;
