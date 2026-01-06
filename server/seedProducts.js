const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
    {
        name: 'The Royal Sapphire Necklace',
        image: 'https://images.pexels.com/photos/266621/pexels-photo-266621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', // Placeholder 3D model
        description: 'A masterpiece of deep blue sapphires and marquise-cut diamonds, set in 18k white gold. This piece evokes the grandeur of royal courts.',
        brand: 'Lumière Privé',
        category: 'necklaces',
        price: 1250000,
        countInStock: 3,
        rating: 4.9,
        numReviews: 12,
        images: [
            'https://images.pexels.com/photos/266621/pexels-photo-266621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        ]
    },
    {
        name: 'Eternal Gold Cuff',
        image: 'https://images.pexels.com/photos/10983785/pexels-photo-10983785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        description: 'A bold statement piece individually hammered by Italian artisans in 22k yellow gold. Perfectly contours to the wrist.',
        brand: 'Lumière',
        category: 'bracelets',
        price: 450000,
        countInStock: 5,
        rating: 4.8,
        numReviews: 8,
        images: [
            'https://images.pexels.com/photos/10983785/pexels-photo-10983785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        ]
    },
    {
        name: 'Midnight Diamond Drops',
        image: 'https://images.pexels.com/photos/1454185/pexels-photo-1454185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        description: 'Cascading black and white diamonds that capture the essence of a moonlit evening. secured with a platinum clasp.',
        brand: 'Lumière',
        category: 'earrings',
        price: 380000,
        countInStock: 8,
        rating: 4.7,
        numReviews: 15,
        images: [
            'https://images.pexels.com/photos/1454185/pexels-photo-1454185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        ]
    },
    {
        name: 'Solitaire Promise Ring',
        image: 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        description: 'A timeless 2-carat solitaire diamond ring, the ultimate symbol of devotion. GIA certified D-color diamond.',
        brand: 'Lumière Bridal',
        category: 'rings',
        price: 890000,
        countInStock: 10,
        rating: 5.0,
        numReviews: 22,
        images: [
            'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        ]
    },
    {
        name: 'Emerald Heritage Pendant',
        image: 'https://images.pexels.com/photos/1191557/pexels-photo-1191557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        description: 'Vintage-inspired design featuring a Colombian emerald surrounded by a halo of diamonds. Heirloom quality.',
        brand: 'Lumière Heritage',
        category: 'necklaces',
        price: 650000,
        countInStock: 4,
        rating: 4.6,
        numReviews: 5,
        images: [
            'https://images.pexels.com/photos/1191557/pexels-photo-1191557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        ]
    },
    {
        name: 'Pearl Essence Choker',
        image: 'https://images.pexels.com/photos/230290/pexels-photo-230290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        description: 'Lustrous south sea pearls strung on silk, finished with a diamond clasp. A modern take on a classic staple.',
        brand: 'Lumière',
        category: 'necklaces',
        price: 320000,
        countInStock: 6,
        rating: 4.8,
        numReviews: 9,
        images: [
            'https://images.pexels.com/photos/230290/pexels-photo-230290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        ]
    },
    {
        name: 'Celestial Diamond Bangle',
        image: 'https://images.pexels.com/photos/1239223/pexels-photo-1239223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        description: 'A galaxy of stars for your wrist. Embedded with flush-set diamonds in brushed rose gold.',
        brand: 'Lumière',
        category: 'bracelets',
        price: 550000,
        countInStock: 7,
        rating: 4.7,
        numReviews: 11,
        images: [
            'https://images.pexels.com/photos/1239223/pexels-photo-1239223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        ]
    },
    {
        name: 'Art Deco Ruby Ring',
        image: 'https://images.pexels.com/photos/3641056/pexels-photo-3641056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        description: 'Geometric perfection inspired by the 1920s. Features a pigeon-blood ruby flanked by baguette diamonds.',
        brand: 'Lumière Heritage',
        category: 'rings',
        price: 720000,
        countInStock: 3,
        rating: 4.9,
        numReviews: 6,
        images: [
            'https://images.pexels.com/photos/3641056/pexels-photo-3641056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        ]
    },
    {
        name: 'Obsidian Signet Ring',
        image: 'https://images.pexels.com/photos/13286955/pexels-photo-13286955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        description: 'A powerful masculine piece. Black obsidian set in heavyweight sterling silver with gold accents.',
        brand: 'Lumière Homme',
        category: 'rings',
        price: 180000,
        countInStock: 15,
        rating: 4.5,
        numReviews: 8,
        images: [
            'https://images.pexels.com/photos/13286955/pexels-photo-13286955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        ]
    },
    {
        name: 'Golden Hour Watch',
        image: 'https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        description: 'Swiss precision meets Italian style. A minimalist gold dress watch with a champagne dial.',
        brand: 'Lumière Time',
        category: 'watches',
        price: 450000,
        countInStock: 5,
        rating: 4.8,
        numReviews: 14,
        images: [
            'https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        ]
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding');

        const adminUser = await User.findOne({ isAdmin: true });

        if (!adminUser) {
            console.log('Warning: No admin user found. Products will be created without a specific user reference.');
        }

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser ? adminUser._id : null };
        });

        // Insert new products (optionally clear old ones if needed, but here we append)
        // await Product.deleteMany(); // Uncomment to clear existing
        await Product.insertMany(sampleProducts);

        console.log('10 New Luxury Products Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
