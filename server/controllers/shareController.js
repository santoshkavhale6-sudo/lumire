const Share = require('../models/Share');
const Product = require('../models/Product');

// @desc    Log a product share action
// @route   POST /api/share/log
// @access  Public
const logShare = async (req, res) => {
    const { productId, platform } = req.body;
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    try {
        // Optional: Rate limit or fake click prevention
        // Check if same IP shared same product on same platform in last 1 minute
        const oneMinuteAgo = new Date(Date.now() - 60000);
        const existingShare = await Share.findOne({
            product: productId,
            platform,
            ip,
            createdAt: { $gt: oneMinuteAgo }
        });

        if (existingShare) {
            // Silently ignore spam clicks to avoid DB bloat, but return success
            return res.status(200).json({ message: 'Share tracked (debounced)' });
        }

        const share = await Share.create({
            product: productId,
            platform,
            ip,
            userAgent
        });

        // Update product share count (if we add this field to Product later)
        // await Product.findByIdAndUpdate(productId, { $inc: { shareCount: 1 } });

        res.status(201).json(share);
    } catch (error) {
        console.error("Share Log Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get share analytics (Admin)
// @route   GET /api/share/analytics
// @access  Private/Admin
const getShareAnalytics = async (req, res) => {
    try {
        const topShared = await Share.aggregate([
            {
                $group: {
                    _id: '$product',
                    count: { $sum: 1 },
                    platforms: { $push: '$platform' }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            { $unwind: '$productDetails' },
            {
                $project: {
                    name: '$productDetails.name',
                    image: '$productDetails.image',
                    count: 1,
                    platforms: 1
                }
            }
        ]);

        const platformStats = await Share.aggregate([
            {
                $group: {
                    _id: '$platform',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        res.json({ topShared, platformStats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { logShare, getShareAnalytics };
