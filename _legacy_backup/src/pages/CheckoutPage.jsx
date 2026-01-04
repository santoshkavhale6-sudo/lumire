import React, { useState } from 'react';
import '../styles/CheckoutPage.css';

const CheckoutPage = () => {
    const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success

    const handleInfoSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        // Simulate processing
        setTimeout(() => {
            setStep(3);
        }, 1500);
    };

    if (step === 3) {
        return (
            <div className="checkout-success container text-center">
                <div className="success-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <h2>Order Confirmed!</h2>
                <p>Thank you for your purchase. Your order number is #LUM-{Math.floor(Math.random() * 10000)}.</p>
                <p>A confirmation email has been sent to your inbox.</p>
                <a href="/" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>Continue Shopping</a>
            </div>
        );
    }

    return (
        <div className="checkout-page container">
            <div className="checkout-steps">
                <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Information</div>
                <div className="step-line"></div>
                <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Payment</div>
                <div className="step-line"></div>
                <div className={`step ${step === 3 ? 'active' : ''}`}>3. Confirmation</div>
            </div>

            <div className="checkout-content">
                {step === 1 && (
                    <form className="checkout-form" onSubmit={handleInfoSubmit}>
                        <h3>Shipping Information</h3>
                        <div className="form-row">
                            <div className="form-group half">
                                <label>First Name</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group half">
                                <label>Last Name</label>
                                <input type="text" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" required />
                        </div>
                        <div className="form-row">
                            <div className="form-group half">
                                <label>City</label>
                                <input type="text" required />
                            </div>
                            <div className="form-group half">
                                <label>Postal Code</label>
                                <input type="text" required />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary full-width">Continue to Payment</button>
                    </form>
                )}

                {step === 2 && (
                    <form className="checkout-form" onSubmit={handlePaymentSubmit}>
                        <h3>Payment Details</h3>
                        <div className="payment-options">
                            <label className="payment-option">
                                <input type="radio" name="payment" defaultChecked />
                                <span>Credit Card</span>
                            </label>
                            <label className="payment-option">
                                <input type="radio" name="payment" />
                                <span>PayPal</span>
                            </label>
                        </div>

                        <div className="form-group">
                            <label>Card Number</label>
                            <input type="text" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="form-row">
                            <div className="form-group half">
                                <label>Expiry Date</label>
                                <input type="text" placeholder="MM/YY" />
                            </div>
                            <div className="form-group half">
                                <label>CVC</label>
                                <input type="text" placeholder="123" />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary full-width">Pay Now</button>
                        <button type="button" className="btn btn-secondary full-width" onClick={() => setStep(1)} style={{ marginTop: '10px', color: '#333', borderColor: '#ddd' }}>Back</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;
