const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    contactInfo: {
        phone: { type: String, default: '+91-XXXXXXXXXX' },
        email: { type: String, default: 'support@yourbrand.com' },
        address: { type: String, default: 'Mumbai, India' },
        workingHours: { type: String, default: 'Mon–Sat (10am–7pm)' },
        mapUrl: { type: String, default: '' } // Embed URL
    },
    socialLinks: {
        instagram: { type: String, default: '#' },
        facebook: { type: String, default: '#' },
        whatsapp: { type: String, default: '#' },
        youtube: { type: String, default: '#' }
    },
    isDefault: { type: Boolean, default: true, unique: true } // Singleton enforcer (soft)
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);
module.exports = Settings;
