import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/mockData';
import '../styles/FeaturedSection.css';

const FeaturedSection = () => {
    return (
        <section id="featured" className="featured-section container">
            <div className="section-header text-center">
                <span className="section-subtitle">Selection</span>
                <h2 className="section-title">New Arrivals</h2>
                <p className="section-description">Handpicked favorites just for you.</p>
                <div className="section-divider"></div>
            </div>

            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className="text-center" style={{ marginTop: 'var(--spacing-xl)' }}>
                <button className="btn-secondary dark">View All Products</button>
            </div>
        </section>
    );
};

export default FeaturedSection;
