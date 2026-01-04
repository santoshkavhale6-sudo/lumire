const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));

// AI Agent routes (requires ES module import)
// AI Agent routes (requires ES module import)
// AI Agent routes (requires ES module import)
// import('./routes/agentRoutes.mjs').then((module) => {
//     app.use('/api/agents', module.default);
// }).catch((err) => {
//     console.error('Failed to load agent routes:', err);
// });

// Basic Route
app.get('/', (req, res) => {
    res.send('LUMIÈRE API (MongoDB) is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
