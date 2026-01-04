
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart, toggleWishlist, wishlist } = useStore();

    const isWishlisted = wishlist.some(item => item.id === product.id);

    return (
        <div className="product-card">
            <div className="product-image-wrapper">
                <Link to={`/ product / ${product.id} `}>
                    <img src={product.image} alt={product.name} className="product-image" />
                </Link>
                {product.isNew && <span className="badge-new">New</span>}

                <div className="product-actions">
                    <button
                        className={`action - btn ${isWishlisted ? 'active' : ''} `}
                        aria-label="Add to Wishlist"
                        onClick={() => toggleWishlist(product)}
                        style={{ color: isWishlisted ? 'red' : 'inherit' }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                    <button
                        className="action-btn quick-add"
                        aria-label="Add to Cart"
                        onClick={() => addToCart(product)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            <div className="product-details">
                <Link to={`/ product / ${product.id} `} className="product-link">
                    <h4 className="product-name">{product.name}</h4>
                </Link>
                <p className="product-category">{product.category}</p>
                <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
            </div>
        </div>
    );
};

export default ProductCard;

