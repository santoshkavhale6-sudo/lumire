import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import '../styles/CartDrawer.css';

const CartDrawer = () => {
    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        cartTotal
    } = useStore();

    const navigate = useNavigate();

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/cart'); // Navigate to Cart Page first, or directly to /checkout
    };

    if (!isCartOpen) return null;

    return (
        <>
            <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>
            <div className="cart-drawer">
                <div className="cart-header">
                    <h3>Shopping Cart</h3>
                    <button className="close-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <p className="empty-cart">Your cart is empty.</p>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-img" />
                                <div className="cart-item-details">
                                    <h4>{item.name}</h4>
                                    <p>₹{item.price.toLocaleString('en-IN')}</p>
                                    <div className="qty-controls">
                                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                    </div>
                                </div>
                                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>&times;</button>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Total:</span>
                            <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                        </div>
                        <button className="btn-primary checkout-btn" onClick={handleCheckout}>View Cart & Checkout</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
