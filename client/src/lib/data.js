import { getApiUrl } from './api';

// Helper to fetch data from API or fall back to mock if server is down
const API_URL = getApiUrl('products');

// Mock data for fallback (so app doesn't break if backend isn't running)
const mockProducts = [
    {
        id: 101,
        name: "Eternity Diamond Ring",
        category: "rings",
        price: 105000,
        image: "https://images.unsplash.com/photo-1605100804763-ebea2406a95f?w=800&q=80",
        description: "A timeless symbol of never-ending love. This Eternity Diamond Ring features a continuous circle of brilliantly cut diamonds set in 18k White Gold.",
        specs: {
            material: "18k White Gold",
            gemstone: "Diamond",
            weight: "4.5g"
        }
    },
    {
        id: 102,
        name: "Gold Pearl Necklace",
        category: "necklaces",
        price: 72000,
        image: "https://images.unsplash.com/photo-1599643477877-531454c1530e?w=800&q=80",
        description: "Elegant and sophisticated, this Gold Pearl Necklace adds a touch of grace to any ensemble. Features premium freshwater pearls.",
        specs: {
            material: "18k Yellow Gold",
            gemstone: "Pearl",
            length: "18 inches"
        }
    },
    {
        id: 103,
        name: "Sapphire Drop Earrings",
        category: "earrings",
        price: 38000,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
        description: "Stunning Sapphire Drop Earrings that catch the light with every movement. Deep blue sapphires surrounded by a halo of diamonds.",
        specs: {
            material: "Platinum",
            gemstone: "Sapphire",
            weight: "3.2g"
        }
    },
    {
        id: 104,
        name: "Rose Gold Bangle",
        category: "bracelets",
        price: 55000,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
        description: "A modern classic. This Rose Gold Bangle features a sleek, minimalist design perfect for stacking or wearing alone.",
        specs: {
            material: "18k Rose Gold",
            gemstone: "None",
            size: "Medium"
        }
    }
];

export async function getProducts() {
    try {
        const res = await fetch(API_URL, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();

        // Normalize IDs to match frontend expectations (MongoDB _id to string)
        return data.map(p => ({
            ...p,
            id: p._id.toString()
        }));
    } catch (error) {
        console.warn("Using mock data due to API error:", error);
        return mockProducts;
    }
}

export async function getProductById(id) {
    // If ID is numeric (mock), search mock. If string (mongo), fetch from API.
    if (!isNaN(id)) {
        return mockProducts.find(p => p.id === parseInt(id));
    }

    try {
        const res = await fetch(`${API_URL}/${id}`, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error('Failed to fetch product');
        return await res.json();
    } catch (error) {
        return null; // Handle in UI
    }
}

export const formattedPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);
};

// Export mock products for static pages if needed
export const products = mockProducts;
