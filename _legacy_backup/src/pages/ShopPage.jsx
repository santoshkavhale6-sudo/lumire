import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/mockData';
import { useStore } from '../context/StoreContext';
import '../styles/ShopPage.css';

const ShopPage = () => {
    const { products } = useStore();
    const [activeCategory, setActiveCategory] = useState('All');
    const [priceRange, setPriceRange] = useState(200000);

    // Search params for optional search
    const [searchParams] = useSearchParams();
    const initialSearch = searchParams.get('search') || '';

    // Filter logic
    const filteredProducts = products.filter(product => {
        const categoryMatch = activeCategory === 'All' || product.category === activeCategory;
        const priceMatch = product.price <= priceRange;
        // Add search match if query param exists
        const searchMatch = !initialSearch || product.name.toLowerCase().includes(initialSearch.toLowerCase());
        return categoryMatch && priceMatch && searchMatch;
    });

    return (
        <div className="shop-page container">
            <div className="shop-header text-center">
                <h1>Shop All</h1>
                <p>Explore our exquisite collection of fine jewelry and luxury gifts.</p>
            </div>

            <div className="shop-layout">
                <aside className="shop-sidebar">
                    <div className="filter-group">
                        <h3>Categories</h3>
                        <ul>
                            <li
                                className={activeCategory === 'All' ? 'active' : ''}
                                onClick={() => setActiveCategory('All')}
                            >
                                All
                            </li>
                            {categories.map(cat => (
                                <li
                                    key={cat.id}
                                    className={activeCategory === cat.name ? 'active' : ''}
                                    onClick={() => setActiveCategory(cat.name)}
                                >
                                    {cat.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="filter-group">
                        <h3>Max Price: ₹{priceRange.toLocaleString('en-IN')}</h3>
                        <input
                            type="range"
                            min="100"
                            max="5000"
                            step="100"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                        />
                    </div>
                </aside>

                <main className="shop-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <div key={product.id}>
                                {/* Wrapping ProductCard with Link would be ideal, but ProductCard has internal buttons.
                                    Better to make ProductCard title/image clickable or pass onClick.
                                    For now, let's wrap the card but handle propagation in card buttons if needed, or better yet, pass id to card.
                                */}
                                <ProductCard product={product} />
                            </div>
                        ))
                    ) : (
                        <p className="no-results">No products found matching your criteria.</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ShopPage;
