"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('lumiere_wishlist');
        if (saved) setWishlist(JSON.parse(saved));
    }, []);

    const addToWishlist = (product) => {
        setWishlist(prev => {
            const exists = prev.find(item => item._id === product._id);
            if (exists) return prev;
            const updated = [...prev, product];
            localStorage.setItem('lumiere_wishlist', JSON.stringify(updated));
            return updated;
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist(prev => {
            const updated = prev.filter(item => item._id !== productId);
            localStorage.setItem('lumiere_wishlist', JSON.stringify(updated));
            return updated;
        });
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item._id === productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
