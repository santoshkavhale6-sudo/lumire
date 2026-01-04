import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import '../styles/CartPage.css';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="container empty-cart-page">
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-page container">
            <h1 className="page-title">Shopping Cart</h1>

            <div className="cart-layout">
                <div className="cart-list">
                    <div className="cart-header-row">
                        <span>Product</span>
                        <span>Quantity</span>
                        <span>Total</span>
                        <span></span>
                    </div>

                    {cart.map(item => (
                        <div key={item.id} className="cart-row">
                            <div className="cart-product-col">
                                <img src={item.image} alt={item.name} />
                                <div className="cart-product-info">
                                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                                    <span className="cart-price">₹{item.price.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <div className="cart-qty-col">
                                <div className="qty-controls">
                                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                </div>
                            </div>

                            <div className="cart-total-col">
                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </div>

                            <div className="cart-remove-col">
                                <button onClick={() => removeFromCart(item.id)}>&times;</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>

                    <button className="btn btn-primary checkout-btn" onClick={() => navigate('/checkout')}>
                        Proceed to Checkout
                    </button>

                    <div className="secure-checkout">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        <span>Secure Checkout</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
