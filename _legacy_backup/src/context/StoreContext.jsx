import React, { createContext, useState, useEffect, useContext } from 'react';
import { products as initialProducts, orders as initialOrders } from '../data/mockData';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    // Admin State
    const [products, setProducts] = useState(initialProducts);
    const [orders, setOrders] = useState(initialOrders);

    // Admin Actions
    const addProduct = (product) => {
        const newProduct = { ...product, id: Date.now() };
        setProducts(prev => [newProduct, ...prev]);
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
        // Also remove from cart/wishlist if necessary, but skipping for MVP speed
    };

    const login = (email, password) => {
        // Mock Login
        if (email && password) {
            const mockUser = { id: 1, name: 'Demo User', email, role: 'customer' };
            // Admin Check Mock
            if (email === 'admin@lumiere.com') mockUser.role = 'admin';

            setUser(mockUser);
            return { success: true };
        }
        return { success: false, message: 'Invalid credentials' };
    };

    const signup = (name, email, password) => {
        // Mock Signup
        const newUser = { id: Date.now(), name, email, role: 'customer' };
        setUser(newUser);
        return { success: true };
    };

    const logout = () => {
        setUser(null);
    };

    const updateOrderStatus = (id, status) => {
        setOrders(prev => prev.map(order =>
            order.id === id ? { ...order, status } : order
        ));
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const toggleWishlist = (product) => {
        setWishlist(prev => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                return prev.filter(item => item.id !== product.id);
            }
            return [...prev, product];
        });
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <StoreContext.Provider value={{
            cart,
            wishlist,
            wishlist,
            isCartOpen,
            products, // Exported for access in Shop/Admin
            orders,   // Exported for Admin
            addProduct,
            deleteProduct,
            updateOrderStatus,
            updateOrderStatus,
            user,
            login,
            signup,
            logout,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            toggleWishlist,
            cartTotal,
            cartCount
        }}>
            {children}
        </StoreContext.Provider>
    );
};
