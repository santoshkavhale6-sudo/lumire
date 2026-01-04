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

    try {
        // We need to require the model relative to this file
        const User = require('./models/User');

        // Find all users
        const users = await User.find({});
        console.log(`📊 Total users in database: ${users.length}\n`);

        users.forEach(user => {
            console.log(`User: ${user.email}`);
            console.log(`  Name: ${user.name}`);
            console.log(`  Role: ${user.role}`);
            console.log(`  isAdmin: ${user.isAdmin}`);
            console.log('---');
        });

        // Specifically check for admin
        const admin = await User.findOne({ email: 'admin@lumiere.com' });
        if (admin) {
            console.log('\n✅ Admin user EXISTS:');
            console.log(`   Email: ${admin.email}`);
            console.log(`   Password: ${admin.password}`);
            console.log(`   Expected: password123`);
            console.log(`   Match: ${admin.password === 'password123' ? '✅ YES' : '❌ NO'}`);
        } else {
            console.log('\n❌ Admin user NOT FOUND');
        }

        process.exit();
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

run();
