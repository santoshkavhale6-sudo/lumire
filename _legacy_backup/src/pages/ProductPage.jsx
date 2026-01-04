import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { products } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import '../styles/ProductPage.css';

const ProductPage = () => {
    const { id } = useParams();
    const { addToCart, toggleWishlist, wishlist } = useStore();
    const [product, setProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('description');
    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        // Mock fetching product
        const found = products.find(p => p.id === parseInt(id));
        if (found) {
            setProduct(found);
            setMainImage(found.image);
        }
    }, [id]);

    if (!product) return <div className="loading container">Loading...</div>;

    const isWishlisted = wishlist.some(item => item.id === product.id);
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <div className="product-page container">
            <div className="product-layout">
                <div className="product-gallery">
                    <div className="main-image-wrapper">
                        <img src={mainImage} alt={product.name} className="main-image" />
                    </div>
                    <div className="thumbnail-list">
                        {[product.image, product.image, product.image].map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt="thumbnail"
                                className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-info-section">
                    <span className="product-category-label">{product.category}</span>
                    <h1 className="pdp-title">{product.name}</h1>
                    <p className="pdp-price">₹{product.price.toLocaleString('en-IN')}</p>

                    <div className="pdp-description-short">
                        <p>Experience the luxury of {product.name}. Crafted with the finest materials and attention to detail, this piece is a perfect addition to your collection.</p>
                    </div>

                    <div className="pdp-actions">
                        <div className="quantity-selector">
                            <button>-</button>
                            <span>1</span>
                            <button>+</button>
                        </div>
                        <button className="btn btn-primary add-cart-btn" onClick={() => addToCart(product)}>
                            Add to Cart
                        </button>
                        <button
                            className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                            onClick={() => toggleWishlist(product)}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>
                    </div>

                    <div className="pdp-meta">
                        <p><strong>SKU:</strong> LUM-{product.id}</p>
                        <p><strong>Shipping:</strong> Free standard shipping</p>
                        <p><strong>Returns:</strong> 30-day returns</p>
                    </div>
                </div>
            </div>

            <div className="product-tabs">
                <div className="tab-headers">
                    <button
                        className={activeTab === 'description' ? 'active' : ''}
                        onClick={() => setActiveTab('description')}
                    >
                        Description
                    </button>
                    <button
                        className={activeTab === 'specs' ? 'active' : ''}
                        onClick={() => setActiveTab('specs')}
                    >
                        Specifications
                    </button>
                    <button
                        className={activeTab === 'reviews' ? 'active' : ''}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Reviews
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'description' && (
                        <div className="text-content">
                            <h3>Product Story</h3>
                            <p>Embrace the elegance that transcends time. The {product.name} is a testament to superior craftsmanship and design. Whether for a special occasion or daily wear, it radiates sophistication.</p>
                        </div>
                    )}
                    {activeTab === 'specs' && (
                        <div className="specs-table">
                            <div className="spec-row"><span>Material</span><span>18k Gold / Platinum</span></div>
                            <div className="spec-row"><span>Gemstone</span><span>Certified VS1 Diamond</span></div>
                            <div className="spec-row"><span>Weight</span><span>4.5g</span></div>
                        </div>
                    )}
                    {activeTab === 'reviews' && (
                        <div className="reviews-list">
                            <p>No reviews yet. Be the first to review this product.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="related-products">
                <h3 className="section-title text-center">You May Also Like</h3>
                <div className="product-grid">
                    {relatedProducts.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
