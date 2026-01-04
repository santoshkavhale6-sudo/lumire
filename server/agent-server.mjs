import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
import cors from 'cors';
import agentRoutes from './routes/agentRoutes.mjs';

console.error("DEBUG: Server Process Env - GOOGLE_API_KEY Length:", process.env.GOOGLE_API_KEY ? process.env.GOOGLE_API_KEY.length : "undefined");
const app = express();
const PORT = process.env.AGENT_PORT || 5004;

app.use(cors());
app.use(express.json());

// Agent Routes
app.use('/api/agents', agentRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('LUMIÈRE Agent Server is running');
});

app.listen(PORT, () => {
    console.log(`Agent Server running on port ${PORT}`);
});
