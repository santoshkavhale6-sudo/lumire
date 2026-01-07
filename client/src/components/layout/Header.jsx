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
            <div className="container-custom flex items-center justify-between relative px-4 sm:px-6">
                {/* Navigation - Desktop (Hidden on Mobile) */}
                <div className="flex-1 lg:flex-none lg:w-32 flex items-center justify-start">
                    <button className="lg:hidden p-2 -ml-2 text-[#1c1c1c]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <Menu className="w-6 h-6" />
                    </button>

                    <nav className="hidden lg:flex items-center gap-8">
                        {['Rings', 'Necklaces', 'Earrings', 'Men', 'Women', 'Gifts'].map((item) => (
                            <Link
                                key={item}
                                href={item === 'Men' || item === 'Women' ? `/shop?gender=${item}` : `/shop?category=${item.toLowerCase()}`}
                                className="text-sm font-medium uppercase tracking-widest text-[#595959] hover:text-[#c5a059] transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Logo - Centered absolutely on large, centered flex on small */}
                <div className="flex-none lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
                    <Link href="/">
                        <h1 className="text-xl md:text-2xl font-heading font-bold tracking-[0.15em] md:tracking-[0.2em] text-[#1c1c1c]">LUMIÈRE</h1>
                    </Link>
                </div>

                {/* Actions - Right Aligned */}
                <div className="flex-1 lg:flex-none lg:w-32 flex items-center justify-end gap-2 sm:gap-4">
                    {/* Search */}
                    <div className="relative">
                        {isSearchOpen ? (
                            <form onSubmit={handleSearch} className="absolute right-0 top-1/2 -translate-y-1/2 w-48 sm:w-64 z-20">
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="Search..."
                                    className="w-full bg-white border border-[#c5a059] rounded-full px-4 py-1 text-sm focus:outline-none shadow-lg text-[#1c1c1c]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onBlur={() => !searchQuery && setIsSearchOpen(false)}
                                />
                            </form>
                        ) : (
                            <button className="p-2 hover:text-[#c5a059] transition-colors text-[#1c1c1c]" onClick={() => setIsSearchOpen(true)}>
                                <Search className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Admin Direct (Hidden on mobile) */}
                    {!user && (
                        <button
                            className="p-2 hover:text-[#c5a059] transition-colors hidden sm:block text-[#1c1c1c]"
                            onClick={() => setIsAuthModalOpen(true)}
                            title="Admin Access"
                        >
                            <ShieldCheck className="w-5 h-5" />
                        </button>
                    )}

                    {/* User Auth */}
                    {user ? (
                        <div className="relative group">
                            <Link href="/account">
                                <button className="p-2 hover:text-[#c5a059] transition-colors font-medium border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center bg-[#FDFCF8] text-xs text-[#1c1c1c]">
                                    {user.name.charAt(0)}
                                </button>
                            </Link>
                            {/* Dropdown */}
                            <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="bg-white border border-gray-100 shadow-xl rounded-md p-2 w-40 flex flex-col gap-1 z-50">
                                    <div className="px-3 py-2 text-xs font-bold border-b border-gray-100 truncate text-[#1c1c1c]">{user.name}</div>
                                    <Link href="/account" className="px-3 py-2 text-sm hover:bg-[#FAF7F2] hover:text-[#c5a059] rounded-sm text-left text-[#595959] flex items-center gap-2">
                                        <User className="w-3 h-3" /> Client Lounge
                                    </Link>
                                    {user.role === 'admin' && (
                                        <Link href="/admin" className="px-3 py-2 text-sm hover:bg-gray-50 rounded-sm text-left text-[#595959] flex items-center gap-2">
                                            <ShieldCheck className="w-3 h-3" /> Admin Panel
                                        </Link>
                                    )}
                                    <button onClick={logout} className="px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-sm text-left flex items-center gap-2">
                                        <LogOut className="w-3 h-3" /> Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            className="p-2 hover:text-[#c5a059] transition-colors hidden sm:block text-[#1c1c1c]"
                            onClick={() => setIsAuthModalOpen(true)}
                        >
                            <User className="w-5 h-5" />
                        </button>
                    )}

                    {/* Wishlist */}
                    <Link href="/wishlist">
                        <button className="p-2 hover:text-[#c5a059] transition-colors text-[#1c1c1c]">
                            <Heart className="w-5 h-5" />
                        </button>
                    </Link>

                    {/* Cart */}
                    <button
                        className="p-2 hover:text-[#c5a059] transition-colors relative text-[#1c1c1c]"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <ShoppingBag className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[#c5a059] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
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
