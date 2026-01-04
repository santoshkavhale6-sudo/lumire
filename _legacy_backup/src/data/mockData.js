export const categories = [
    {
        id: 1,
        name: "Rings",
        image: "https://images.unsplash.com/photo-1605100804763-ebea2406a95f?w=400&q=80",
        link: "#rings"
    },
    {
        id: 2,
        name: "Necklaces",
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400&q=80",
        link: "#necklaces"
    },
    {
        id: 3,
        name: "Earrings",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
        link: "#earrings"
    },
    {
        id: 4,
        name: "Bracelets",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
        link: "#bracelets"
    }
];

export const products = [
    {
        id: 101,
        name: "Eternity Diamond Ring",
        price: 105000,
        category: "Rings",
        image: "https://images.unsplash.com/photo-1605100804763-ebea2406a95f?w=400&q=80",
        isNew: true
    },
    {
        id: 102,
        name: "Gold Pearl Necklace",
        price: 72000,
        category: "Necklaces",
        image: "https://images.unsplash.com/photo-1599643477877-531454c1530e?w=400&q=80",
        isNew: false
    },
    {
        id: 103,
        name: "Sapphire Drop Earrings",
        price: 38000,
        category: "Earrings",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
        isNew: true
    },
    {
        id: 104,
        name: "Rose Gold Bangle",
        price: 55000,
        category: "Bracelets",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
        isNew: false
    }
];

export const orders = [
    { id: '#LUM-1023', customer: 'John Doe', date: 'Oct 24, 2026', total: 105000, status: 'Pending', items: 3 },
    { id: '#LUM-1022', customer: 'Jane Smith', date: 'Oct 23, 2026', total: 38000, status: 'Shipped', items: 1 },
    { id: '#LUM-1021', customer: 'Alice Johnson', date: 'Oct 22, 2026', total: 72000, status: 'Delivered', items: 2 },
    { id: '#LUM-1020', customer: 'Robert Brown', date: 'Oct 21, 2026', total: 178000, status: 'Processing', items: 4 },
    { id: '#LUM-1019', customer: 'Emily Davis', date: 'Oct 20, 2026', total: 12000, status: 'Cancelled', items: 1 },
];
