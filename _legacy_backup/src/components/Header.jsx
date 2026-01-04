import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import UserMenu from './UserMenu';
import '../styles/Header.css';

const Header = ({ onAuthClick }) => {
    const { cartCount, setIsCartOpen } = useStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container header-content">
                <nav className="nav-left">
                    <Link to="/shop" className="nav-link">Jewelry</Link>
                    <Link to="/shop" className="nav-link">Gifts</Link>
                    <Link to="/shop" className="nav-link">Collections</Link>
                </nav>

                <div className="brand-logo">
                    <Link to="/">LUMIÈRE</Link>
                </div>

                <div className="nav-right">
                    <a href="#about" className="nav-link desktop-only">About</a>

                    <div className={`search-wrapper ${isSearchOpen ? 'active' : ''}`}>
                        {isSearchOpen ? (
                            <form onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    autoFocus
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onBlur={() => !searchQuery && setIsSearchOpen(false)}
                                />
                            </form>
                        ) : (
                            <button className="icon-btn" aria-label="Search" onClick={() => setIsSearchOpen(true)}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </button>
                        )}
                    </div>

                    {/* User Menu for Auth */}
                    {useStore().user ? (
                        <UserMenu />
                    ) : (
                        <button className="icon-btn" aria-label="Account" onClick={onAuthClick}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </button>
                    )}

                    <button className="icon-btn" aria-label="Wishlist">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                    <button className="icon-btn cart-btn" aria-label="Cart" onClick={() => setIsCartOpen(true)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        <span className="cart-count">{cartCount}</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
