const User = require('../models/User');
const Product = require('../models/Product');

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');
        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add item to wishlist
// @route   POST /api/wishlist
// @access  Private
const addToWishlist = async (req, res) => {
    const { productId } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const user = await User.findById(req.user._id);

        if (user.wishlist.includes(productId)) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        user.wishlist.push(productId);
        await user.save();

        res.status(201).json({ message: 'Product added to wishlist' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/:id
// @access  Private
const removeFromWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        user.wishlist = user.wishlist.filter(
            (productId) => productId.toString() !== req.params.id
        );

        await user.save();
        res.json({ message: 'Product removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
