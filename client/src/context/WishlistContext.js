"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getApiUrl } from '@/lib/api';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const { user, logout } = useAuth();

    // Load wishlist from local storage on mount (for guest) or when switching users
    useEffect(() => {
        if (!user) {
            const saved = localStorage.getItem('lumiere_wishlist');
            if (saved) setWishlist(JSON.parse(saved));
        } else {
            // Fetch from API if logged in
            fetchWishlist();
        }
    }, [user]);

    const fetchWishlist = async () => {
        if (!user || !user.token) return;
        try {
            const res = await fetch(getApiUrl('wishlist'), {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (res.status === 401) {
                logout();
                return;
            }
            if (res.ok) {
                const data = await res.json();
                setWishlist(data);
            }
        } catch (error) {
            console.error("Failed to fetch wishlist", error);
        }
    };

    const addToWishlist = async (product) => {
        const productId = product._id || product.id;

        // Optimistic UI update
        const prevWishlist = [...wishlist];
        setWishlist(prev => {
            const exists = prev.find(item => (item._id || item.id) === productId);
            if (exists) return prev;
            return [...prev, product];
        });

        if (user) {
            try {
                const res = await fetch(getApiUrl('wishlist'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({ productId }),
                });

                if (res.status === 401) {
                    logout();
                    // Revert optimistic update since auth failed
                    setWishlist(prevWishlist);
                    return;
                }

                if (!res.ok) {
                    // Start reading body to check error message
                    const data = await res.json().catch(() => ({}));
                    if (res.status === 400 && data.message === 'Product already in wishlist') {
                        // This is fine, keep the optimistic update
                        return;
                    }
                    throw new Error(data.message || 'Failed to sync');
                }
            } catch (error) {
                console.error("Add to wishlist failed", error);
                // Revert on failure
                setWishlist(prevWishlist);
            }
        } else {
            // Local Storage fallback
            const updated = [...prevWishlist, product];
            // Check existence again to avoid duplicates in storage if strict mode runs twice
            const exists = prevWishlist.find(item => (item._id || item.id) === productId);
            if (!exists) {
                localStorage.setItem('lumiere_wishlist', JSON.stringify(updated));
            }
        }
    };

    const removeFromWishlist = async (productId) => {
        const prevWishlist = [...wishlist];
        setWishlist(prev => prev.filter(item => (item._id || item.id) !== productId));

        if (user) {
            try {
                const res = await fetch(getApiUrl(`wishlist/${productId}`), {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (res.status === 401) {
                    logout();
                    setWishlist(prevWishlist);
                    return;
                }

                if (!res.ok) throw new Error('Failed to sync');
            } catch (error) {
                console.error("Remove from wishlist failed", error);
                setWishlist(prevWishlist);
            }
        } else {
            const updated = prevWishlist.filter(item => (item._id || item.id) !== productId);
            localStorage.setItem('lumiere_wishlist', JSON.stringify(updated));
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => (item._id || item.id) === productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
