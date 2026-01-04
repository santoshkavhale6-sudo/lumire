import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer" id="about">
            <div className="container footer-content">
                <div className="footer-brand">
                    <h2 className="footer-logo">LUMIÈRE</h2>
                    <p className="footer-story">
                        Crafting timeless elegance since 2026. <br />
                        Our collections are inspired by the beauty of nature and the strength of the human spirit.
                    </p>
                    <div className="social-icons">
                        <a href="#" aria-label="Instagram">IG</a>
                        <a href="#" aria-label="Facebook">FB</a>
                        <a href="#" aria-label="Pinterest">PT</a>
                    </div>
                </div>

                <div className="footer-links">
                    <div className="link-group">
                        <h3>Shop</h3>
                        <a href="#shop">Jewelry</a>
                        <a href="#gifts">Gifts</a>
                        <a href="#collections">Collections</a>
                        <a href="#">Sale</a>
                    </div>

                    <div className="link-group">
                        <h3>Support</h3>
                        <a href="#">Contact Us</a>
                        <a href="#">Shipping & Returns</a>
                        <a href="#">Size Guide</a>
                        <a href="#">FAQ</a>
                    </div>

                    <div className="link-group">
                        <h3>Legal</h3>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>

                <div className="footer-newsletter">
                    <h3>Newsletter</h3>
                    <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
                    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Enter your email address" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom container">
                <p>&copy; 2026 LUMIÈRE Jewelry. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
