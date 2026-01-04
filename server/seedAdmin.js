const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lumiere_db');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const run = async () => {
    await connectDB();

    // Require User model - relative to this file in server/
    try {
        const User = require('./models/User');

        console.log("Checking Admin User...");

        // Force delete
        await User.deleteOne({ email: 'admin@lumiere.com' });
        console.log('Removed old admin.');

        // Force Create
        const admin = await User.create({
            name: 'Lumière Admin',
            email: 'admin@lumiere.com',
            password: 'password123',
            isAdmin: true,
            role: 'admin',
            wishlist: []
        });

        console.log(`SUCCESS: Admin created.`);
        console.log(`Email: ${admin.email}`);
        console.log(`Password: ${admin.password}`);

        process.exit();
    } catch (error) {
        console.error('Seed Error:', error);
        process.exit(1);
    }
};

run();
