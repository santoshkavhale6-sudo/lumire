import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import CommonJS modules using default import
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import shareRoutes from './routes/shareRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/share', shareRoutes);

// AI Agent routes (now easy to import natively if needed)
import agentRoutes from './routes/agentRoutes.mjs';
app.use('/api/agents', agentRoutes);

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

// Basic Route
app.get('/', (req, res) => {
    res.send('LUMIÈRE API (MongoDB) is running');
});

app.listen(PORT, () => console.log("Server running on " + PORT));
