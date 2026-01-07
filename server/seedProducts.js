const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
    {
        name: 'The Royal Sapphire Necklace',
        image: 'https://images.pexels.com/photos/266621/pexels-photo-266621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        description: 'A masterpiece of deep blue sapphires and marquise-cut diamonds, set in 18k white gold.',
        brand: 'Lumière Privé',
        category: 'necklaces',
        metal: 'White Gold',
        stone: 'Sapphire',
        occasion: 'Wedding',
        gender: 'Women',
        price: 1250000,
        countInStock: 3,
        soldCount: 15,
        rating: 4.9,
    },
    {
        name: 'Eternal Gold Cuff',
        image: 'https://images.pexels.com/photos/10983785/pexels-photo-10983785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        description: 'A bold statement piece individually hammered by Italian artisans in 22k yellow gold.',
        brand: 'Lumière',
        category: 'bracelets',
        metal: 'Gold',
        stone: 'None',
        occasion: 'Daily Wear',
        gender: 'Women',
        price: 450000,
        countInStock: 5,
        soldCount: 42,
        rating: 4.8,
    },
    {
        name: 'Midnight Diamond Drops',
        image: 'https://images.pexels.com/photos/1454185/pexels-photo-1454185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        description: 'Cascading black and white diamonds that capture the essence of a moonlit evening.',
        brand: 'Lumière',
        category: 'earrings',
        metal: 'Platinum',
        stone: 'Diamond',
        occasion: 'Anniversary',
        gender: 'Women',
        price: 380000,
        countInStock: 8,
        soldCount: 28,
        rating: 4.7,
    },
    {
        name: 'Solitaire Promise Ring',
        image: 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        description: 'A timeless 2-carat solitaire diamond ring, the ultimate symbol of devotion.',
        brand: 'Lumière Bridal',
        category: 'rings',
        metal: 'Rose Gold',
        stone: 'Diamond',
        occasion: 'Wedding',
        gender: 'Women',
        price: 890000,
        countInStock: 10,
        soldCount: 65,
        rating: 5.0,
    },
    {
        name: 'Emerald Heritage Pendant',
        image: 'https://images.pexels.com/photos/1191557/pexels-photo-1191557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        description: 'Vintage-inspired design featuring a Colombian emerald surrounded by a halo of diamonds.',
        brand: 'Lumière Heritage',
        category: 'necklaces',
        metal: 'Gold',
        stone: 'Emerald',
        occasion: 'Gifting',
        gender: 'Women',
        price: 650000,
        countInStock: 4,
        soldCount: 10,
        rating: 4.6,
    },
    {
        name: 'Pearl Essence Choker',
        image: 'https://images.pexels.com/photos/230290/pexels-photo-230290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        description: 'Lustrous south sea pearls strung on silk, finished with a diamond clasp.',
        brand: 'Lumière',
        category: 'necklaces',
        metal: 'Silver',
        stone: 'Pearl',
        occasion: 'Birthday',
        gender: 'Women',
        price: 320000,
        countInStock: 6,
        soldCount: 25,
        rating: 4.8,
    },
    {
        name: 'Celestial Diamond Bangle',
        image: 'https://images.pexels.com/photos/1239223/pexels-photo-1239223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        description: 'A galaxy of stars for your wrist. Embedded with flush-set diamonds in brushed rose gold.',
        brand: 'Lumière',
        category: 'bracelets',
        metal: 'Rose Gold',
        stone: 'Diamond',
        occasion: 'Gifting',
        gender: 'Women',
        price: 550000,
        countInStock: 7,
        soldCount: 18,
        rating: 4.7,
    },
    {
        name: 'Art Deco Ruby Ring',
        image: 'https://images.pexels.com/photos/3641056/pexels-photo-3641056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        description: 'Geometric perfection inspired by the 1920s. Features a pigeon-blood ruby flanked by baguette diamonds.',
        brand: 'Lumière Heritage',
        category: 'rings',
        metal: 'Platinum',
        stone: 'Ruby',
        occasion: 'Anniversary',
        gender: 'Women',
        price: 720000,
        countInStock: 3,
        soldCount: 12,
        rating: 4.9,
    },
    {
        name: 'Obsidian Signet Ring',
        image: 'https://images.pexels.com/photos/13286955/pexels-photo-13286955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        description: 'A powerful masculine piece. Black obsidian set in heavyweight sterling silver with gold accents.',
        brand: 'Lumière Homme',
        category: 'rings',
        metal: 'Silver',
        stone: 'None',
        occasion: 'Gifting',
        gender: 'Men',
        price: 180000,
        countInStock: 15,
        soldCount: 55,
        rating: 4.5,
    },
    {
        name: 'Golden Hour Watch',
        image: 'https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        threeDImage: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        description: 'Swiss precision meets Italian style. A minimalist gold dress watch with a champagne dial.',
        brand: 'Lumière Time',
        category: 'watches',
        metal: 'Gold',
        stone: 'None',
        occasion: 'Gifting',
        gender: 'Men',
        price: 450000,
        countInStock: 5,
        soldCount: 30,
        rating: 4.8,
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding');

        const adminUser = await User.findOne({ isAdmin: true });

        // Uncomment to clear existing products if you want a fresh start with data that has proper fields
        // await Product.deleteMany(); 

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser ? adminUser._id : null };
        });

        // We use insertMany. If you cleared, great. If you append, you'll have more items.
        // For Filter testing, it helps to have data with fields.
        await Product.deleteMany({}); // Let's CLEAR to ensure we only have data with valid filter fields.
        await Product.insertMany(sampleProducts);

        console.log('Products Re-seeded with Filter Attributes!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
