const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }, // Main thumbnail
    images: [{ type: String }], // Gallery images
    threeDImage: { type: String }, // URL for 3D model or 360 view
    description: { type: String, required: true },
    brand: { type: String, required: true, default: 'LUMIÈRE' },
    category: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String },

    // Filter Fields
    metal: { type: String }, // Gold, Silver, Rose Gold
    stone: { type: String }, // Diamond, Pearl, Ruby, Sapphire, None
    occasion: { type: String }, // Wedding, Anniversary, Birthday, Daily Wear, Gifting
    gender: { type: String }, // Men, Women, Unisex
    soldCount: { type: Number, default: 0 },

    // Inventory & Variants
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    sku: { type: String, unique: true, sparse: true },
    barcode: { type: String },
    weight: { type: Number }, // in grams
    lowStockThreshold: { type: Number, default: 5 }, // Alert level
    dimensions: {
        length: { type: Number },
        width: { type: Number },
        height: { type: Number }
    },
    specs: { type: Object }, // Flexible specs (Material, Gemstone, etc.)
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
