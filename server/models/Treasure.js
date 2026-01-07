const mongoose = require('mongoose');

const serviceHistorySchema = mongoose.Schema({
    serviceType: { type: String, enum: ['Repair', 'Resize', 'Polish', 'Inspection'], required: true },
    date: { type: Date, default: Date.now },
    description: { type: String },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Completed' },
    cost: { type: Number, default: 0 }
}, { timestamps: true });

const treasureSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: { type: String, required: true },
    image: { type: String, required: true },
    purchaseDate: { type: Date, default: Date.now },
    purchasePrice: { type: Number, required: true },
    currentAppraisalValue: { type: Number },

    // Digital Authenticity
    certificates: [{
        type: { type: String, enum: ['GIA', 'BIS Hallmark', 'IGI', 'Brand Certificate'] },
        certificateNumber: { type: String },
        fileUrl: { type: String },
        issuedAt: { type: Date }
    }],

    // Heritage & Care
    warrantyExpiry: { type: Date },
    serviceHistory: [serviceHistorySchema],

    // Status
    status: { type: String, enum: ['Owned', 'Exchanged', 'Resold', 'Inherited'], default: 'Owned' },

    // Privacy
    isPubliclyVerifiable: { type: Boolean, default: false },
    qrVerificationCode: { type: String, unique: true }
}, {
    timestamps: true,
});

const Treasure = mongoose.model('Treasure', treasureSchema);
module.exports = Treasure;
