import React from 'react';
import '../styles/CategoryCard.css';

const CategoryCard = ({ category }) => {
    return (
        <a href={category.link} className="category-card">
            <div className="category-image-wrapper">
                <img src={category.image} alt={category.name} className="category-image" />
                <div className="category-overlay"></div>
            </div>
            <div className="category-info">
                <h3 className="category-name">{category.name}</h3>
                <span className="category-explore">Explore</span>
            </div>
        </a>
    );
};

export default CategoryCard;
