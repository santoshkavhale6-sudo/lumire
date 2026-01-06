"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Trash2, Heart, ShoppingBag } from 'lucide-react';
import { formattedPrice } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFCF8] selection:bg-[#c5a059] selection:text-white">
            <Header />

            <main className="pt-40 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto min-h-[80vh]">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-24 space-y-5"
                >
                    <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-[#8C8C8C] font-medium">
                        My Curated Selection
                    </p>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading text-[#1c1c1c] font-medium">
                        Your Wishlist
                    </h1>
                    <p className="text-[#595959] font-light text-lg tracking-wide">
                        Pieces you love. Saved for the perfect moment.
                    </p>
                </motion.div>

                {/* Wishlist Grid */}
                {wishlist.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col items-center justify-center py-20 text-center space-y-8"
                    >
                        <div className="w-24 h-24 rounded-full bg-[#f4f1ea] flex items-center justify-center mb-4 text-[#d4b06a]">
                            <Heart className="w-10 h-10 opacity-50" />
                        </div>
                        <h2 className="text-2xl font-heading text-[#1c1c1c]">Your wishlist is waiting for something special.</h2>

                        <Link href="/shop">
                            <Button variant="outline" className="border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-white px-10 py-6 text-sm tracking-widest uppercase transition-all duration-500 rounded-none">
                                Explore Collection
                            </Button>
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
                        style={{
                            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))"
                        }}
                    >
                        <AnimatePresence>
                            {wishlist.map((product) => (
                                <motion.div
                                    key={product._id || product.id}
                                    variants={itemVariants}
                                    layout
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="group flex flex-col"
                                >
                                    {/* Card Image */}
                                    <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F0] mb-6">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                                        />

                                        {/* Overlay & Remove Button */}
                                        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />

                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                removeFromWishlist(product._id || product.id);
                                            }}
                                            className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full text-[#8C8C8C] hover:text-red-500 hover:bg-white transition-all duration-300 shadow-sm opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>

                                        {/* Quick Add (Mobile/Desktop variations could go here, sticking to design request) */}
                                    </div>

                                    {/* Card Details */}
                                    <div className="text-center space-y-3 px-2">
                                        <h3 className="text-xl font-heading text-[#1c1c1c] tracking-wide group-hover:text-[#c5a059] transition-colors duration-300">
                                            <Link href={`/product/${product._id || product.id}`}>
                                                {product.name}
                                            </Link>
                                        </h3>

                                        <p className="text-[#c5a059] font-medium tracking-wider text-sm">
                                            {formattedPrice(product.price)}
                                        </p>

                                        <div className="pt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                                            <Button
                                                onClick={() => addToCart(product)}
                                                className="w-full bg-[#c5a059] hover:bg-[#b08d4a] text-white rounded-none uppercase tracking-widest text-xs py-5 shadow-xl shadow-[#c5a059]/20"
                                            >
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </main>

            <Footer />
        </div>
    );
}
