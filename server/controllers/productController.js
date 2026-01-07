const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const { keyword, category, metal, stone, occasion, gender, minPrice, maxPrice, sort } = req.query;

        // Build Query
        let query = {};

        if (keyword) {
            query.name = {
                $regex: keyword,
                $options: 'i',
            };
        }

        if (category) query.category = { $regex: category, $options: 'i' };
        if (metal) query.metal = metal;
        if (stone) query.stone = stone;
        if (occasion) query.occasion = occasion;
        if (gender) query.gender = gender;

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Build Sort Option
        let sortOption = {};
        if (sort === 'price_asc') {
            sortOption.price = 1;
        } else if (sort === 'price_desc') {
            sortOption.price = -1;
        } else if (sort === 'newest') {
            sortOption.createdAt = -1;
        } else if (sort === 'popular') {
            sortOption.soldCount = -1;
        } else {
            sortOption.createdAt = -1; // Default
        }

        const products = await Product.find(query).sort(sortOption);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Seed mock data
// @route   POST /api/products/seed
// @access  Private (Dev only)
const seedProducts = async (req, res) => {
    const mockProducts = [
        // RINGS
        {
            name: "Eternity Diamond Ring",
            category: "rings",
            price: 105000,
            image: "https://images.unsplash.com/photo-1605100804763-ebea2406a95f?w=800&q=80",
            images: [
                "https://images.unsplash.com/photo-1605100804763-ebea2406a95f?w=800&q=80",
                "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80",
                "https://images.unsplash.com/photo-1598560977828-56dfc3327d61?w=800&q=80"
            ],
            description: "A timeless symbol of never-ending love. This Eternity Diamond Ring features a continuous circle of brilliantly cut diamonds set in 18k White Gold.",
            countInStock: 10,
            specs: { material: "18k White Gold", gemstone: "Diamond", weight: "4.5g" }
        },
        {
            name: "Diamond Tennis Bracelet",
            category: "bracelets",
            price: 185000,
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
            images: [
                "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
                "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"
            ],
            description: "The ultimate luxury staple. This Diamond Tennis Bracelet features a seamless line of sparkling diamonds.",
            countInStock: 12,
            specs: { material: "18k White Gold", gemstone: "Diamond", carat: "3.0ct" }
        },
        {
            name: "Emerald Cut Solitaire",
            category: "rings",
            price: 210000,
            image: "https://images.unsplash.com/photo-1605100804763-ebea2406a95f?w=800&q=80",
            images: [
                "https://images.unsplash.com/photo-1605100804763-ebea2406a95f?w=800&q=80",
                "https://images.unsplash.com/photo-1598560977507-16d7a421b0dc?w=800&q=80"
            ],
            description: "A striking Emerald Cut diamond that showcases clarity and sophistication.",
            countInStock: 4,
            specs: { material: "Platinum", gemstone: "Diamond", carat: "2.5ct" }
        },
        {
            name: "Golden Hour Watch",
            category: "gifts",
            price: 450000,
            image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
            description: "Swiss-made automatic movement housed in a solid 18k gold case.",
            countInStock: 3,
            specs: { material: "18k Gold", gemstone: "Sapphire Crystal", type: "Automatic" }
        },
        {
            name: "Pearl Drop Earrings",
            category: "earrings",
            price: 65000,
            image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
            description: "Classic South Sea pearls suspended from diamond-encrusted hoops.",
            countInStock: 10,
            specs: { material: "14k White Gold", gemstone: "Pearl", type: "Drop" }
        },
        {
            name: "Gold Pearl Necklace",
            category: "necklaces",
            price: 72000,
            image: "https://images.unsplash.com/photo-1599643477877-531454c1530e?w=800&q=80",
            description: "Elegant and sophisticated, this Gold Pearl Necklace adds a touch of grace to any ensemble. Features premium freshwater pearls.",
            countInStock: 15,
            specs: { material: "18k Yellow Gold", gemstone: "Pearl", length: "18 inches" }
        }
    ];

    try {
        await Product.deleteMany();
        await User.deleteMany();

        const createdProducts = await Product.insertMany(mockProducts);

        // CREATE ADMIN USER
        const adminUser = await User.create({
            name: "Lumière Admin",
            email: "admin@lumiere.com",
            password: "password123", // Keep simple for now
            isAdmin: true,
            role: "admin"
        });

        res.status(201).json({
            message: "Database restored & seeded",
            users: [adminUser],
            products: createdProducts.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        // Sanitize SKU: Convert empty string to undefined to avoid duplicate key error
        if (req.body.sku === "") {
            req.body.sku = undefined;
        }

        const product = new Product(req.body);
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Create Product Error:', error);
        res.status(400).json({ message: error.message, stack: error.stack });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            // Sanitize SKU
            if (req.body.sku === "") {
                req.body.sku = undefined;
            }

            Object.assign(product, req.body);
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProducts, getProductById, seedProducts, createProduct, updateProduct, deleteProduct };
