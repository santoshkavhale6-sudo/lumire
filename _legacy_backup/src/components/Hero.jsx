import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Hero.css';

const Hero = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <section className="hero">
            {/* Background Image - Using a placehold.co image for now, replace with real asset later */}
            <div className="hero-background" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop)' }}></div>
            <div className="hero-overlay"></div>

            <div className={`hero-content container ${loaded ? 'visible' : ''}`}>
                <span className="hero-subtitle">New Collection 2026</span>
                <h1 className="hero-title">Timeless <br /> Jewelry & Gifts</h1>
                <p className="hero-description">Crafted with precision, designed for eternity. <br />Discover the perfect gift for your loved ones.</p>

                <div className="hero-buttons">
                    <Link to="/shop" className="btn btn-primary">Shop Collection</Link>
                    <Link to="/shop" className="btn btn-secondary">Explore Gifts</Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
