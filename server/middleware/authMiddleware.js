const User = require('../models/User');

const protect = async (req, res, next) => {
    // Check for custom header used in tests/dev
    if (req.headers['x-user-id']) {
        try {
            const user = await User.findById(req.headers['x-user-id']);
            if (user) {
                req.user = user;
                next();
                return;
            }
        } catch (error) {
            console.error('Auth Middleware Error:', error);
        }
    }

    // Default unauthorized if no user found
    res.status(401).json({ message: 'Not authorized' });
};

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };
