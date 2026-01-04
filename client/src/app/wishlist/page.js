"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Header from '@/components/layout/Header'; // Assuming standard import path
import Footer from '@/components/layout/Footer'; // Assuming standard import path (if exists, or remove)
import { Button } from '@/components/ui/Button';
import { Trash2, ShoppingBag } from 'lucide-react';
import { formattedPrice } from '@/lib/data';

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-16 container-custom">
                <h1 className="text-4xl font-heading font-medium mb-8">Your Wishlist</h1>

                {wishlist.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-border rounded-lg">
                        <h2 className="text-xl font-medium mb-4">Your wishlist is empty</h2>
                        <p className="text-muted-foreground mb-8">Save items you love to revisit later.</p>
                        <Link href="/shop">
                            <Button>Explore Collection</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {wishlist.map((product) => (
                            <div key={product._id} className="group">
                                <div className="relative aspect-[4/5] bg-secondary mb-4 overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <button
                                        onClick={() => removeFromWishlist(product._id)}
                                        className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-white transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <h3 className="text-lg font-heading mb-1">{product.name}</h3>
                                <p className="text-muted-foreground mb-3">{formattedPrice(product.price)}</p>

                                <Button
                                    className="w-full"
                                    onClick={() => addToCart(product)}
                                >
                                    <ShoppingBag className="w-4 h-4 mr-2" /> Add to Cart
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            {/* Footer would go here */}
        </div>
    );
}
