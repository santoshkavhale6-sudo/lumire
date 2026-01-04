"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, Menu, User, LogOut, ShieldCheck, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const { setIsCartOpen, cartCount } = useCart();
    const { user, setIsAuthModalOpen, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
        }
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
                isScrolled ? "bg-background/95 backdrop-blur-md py-3 border-border/10 shadow-sm" : "bg-transparent py-6"
            )}
        >
            <div className="container-custom flex items-center justify-between">
                {/* Mobile Menu Toggle */}
                <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <Menu className="w-6 h-6" />
                </button>

                {/* Navigation - Desktop */}
                <nav className="hidden lg:flex items-center gap-8">
                    {['Rings', 'Necklaces', 'Earrings', 'Gifts'].map((item) => (
                        <Link
                            key={item}
                            href={`/shop?category=${item.toLowerCase()}`}
                            className="text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* Logo */}
                <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h1 className="text-2xl font-heading font-bold tracking-[0.2em]">LUMIÈRE</h1>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative">
                        {isSearchOpen ? (
                            <form onSubmit={handleSearch} className="absolute right-0 top-1/2 -translate-y-1/2 w-64">
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="Search..."
                                    className="w-full bg-background/90 border border-border rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-lg"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onBlur={() => !searchQuery && setIsSearchOpen(false)}
                                />
                            </form>
                        ) : (
                            <button className="p-2 hover:text-primary transition-colors" onClick={() => setIsSearchOpen(true)}>
                                <Search className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Admin Direct Login (Separate Icon as requested) */}
                    {!user && (
                        <button
                            className="p-2 hover:text-primary transition-colors hidden sm:block"
                            onClick={() => setIsAuthModalOpen(true)} // In real app, could set a special 'admin' flag
                            title="Admin Access"
                        >
                            <ShieldCheck className="w-5 h-5" />
                        </button>
                    )}

                    {/* User Auth */}
                    {user ? (
                        <div className="relative group">
                            <button className="p-2 hover:text-primary transition-colors font-medium border border-border/20 rounded-full w-8 h-8 flex items-center justify-center bg-accent text-xs">
                                {user.name.charAt(0)}
                            </button>
                            {/* Dropdown */}
                            <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="bg-background border border-border/10 shadow-xl rounded-md p-2 w-32 flex flex-col gap-1">
                                    <div className="px-3 py-2 text-xs font-bold border-b border-border/10 truncate">{user.name}</div>
                                    {user.role === 'admin' && (
                                        <Link href="/admin" className="px-3 py-2 text-sm hover:bg-accent rounded-sm text-left">Admin Panel</Link>
                                    )}
                                    <button onClick={logout} className="px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-sm text-left flex items-center gap-2">
                                        <LogOut className="w-3 h-3" /> Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            className="p-2 hover:text-primary transition-colors hidden sm:block"
                            onClick={() => setIsAuthModalOpen(true)}
                        >
                            <User className="w-5 h-5" />
                        </button>
                    )}

                    {/* Wishlist */}
                    <Link href="/wishlist">
                        <button className="p-2 hover:text-primary transition-colors">
                            <Heart className="w-5 h-5" />
                        </button>
                    </Link>

                    {/* Cart */}
                    <button
                        className="p-2 hover:text-primary transition-colors relative"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <ShoppingBag className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
