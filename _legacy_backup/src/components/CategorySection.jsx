import React from 'react';
import CategoryCard from './CategoryCard';
import { categories } from '../data/mockData';
import '../styles/CategorySection.css';

const CategorySection = () => {
    return (
        <section id="shop" className="category-section container">
            <div className="section-header text-center">
                <span className="section-subtitle">Discover</span>
                <h2 className="section-title">Shop by Category</h2>
                <div className="section-divider"></div>
            </div>

            <div className="category-grid">
                {categories.map(category => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
