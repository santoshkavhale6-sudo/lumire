"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { products, formattedPrice } from '@/lib/data';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Share2, Heart, Box } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

import { getApiUrl } from '@/lib/api';

// ... (existing imports)

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null);
    const [activeTab, setActiveTab] = useState('details');
    const { addToCart } = useCart();
    const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

    useEffect(() => {
        if (!id) return;

        // Try to find in static data first (optional, but good for speed)
        const found = products.find(p => p.id === parseInt(id) || p._id === id);

        if (found) {
            setProduct(found);
            setSelectedImage(found.image);
            setLoading(false);
        } else {
            // Fetch from API
            fetch(getApiUrl(`products/${id}`))
                .then(res => {
                    if (!res.ok) throw new Error('Product not found');
                    return res.json();
                })
                .then(data => {
                    setProduct(data);
                    setSelectedImage(data.image);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setError(true);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <div className="min-h-screen grid place-items-center">Loading...</div>;
    if (error || !product) return <div className="min-h-screen grid place-items-center">Product not found</div>;

    const inWishlist = isInWishlist(product._id || product.id);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-24 pb-16">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                        {/* Left: Media Gallery */}
                        <div className="space-y-4">
                            <div className="relative aspect-square bg-white overflow-hidden rounded-lg border border-border/50">
                                {product.image ? (
                                    <Image
                                        src={selectedImage || product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                                )}
                            </div>

                            {/* Thumbnail Gallery */}
                            {product.images && product.images.length > 0 && (
                                <div className="flex gap-4 overflow-x-auto pb-2">
                                    {[product.image, ...product.images].map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(img)}
                                            className={`relative w-20 h-20 flex-shrink-0 border rounded-md overflow-hidden ${selectedImage === img ? 'border-primary ring-1 ring-primary' : 'border-transparent'}`}
                                        >
                                            <Image src={img} alt={`View ${idx}`} fill className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right: Product Info */}
                        <div className="flex flex-col justify-center space-y-8">
                            <div>
                                <div className="text-sm font-medium text-primary tracking-widest uppercase mb-2">{product.brand}</div>
                                <h1 className="text-4xl md:text-5xl font-heading font-medium mb-4 text-foreground">{product.name}</h1>
                                <p className="text-2xl text-muted-foreground font-light">{formattedPrice(product.price)}</p>
                            </div>

                            <p className="text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>

                            {/* Actions */}
                            <div className="flex flex-col gap-4">
                                <Button size="lg" className="w-full text-base py-6" onClick={() => addToCart(product)}>Add to Cart</Button>
                                <div className="flex gap-4">
                                    <Button
                                        variant="outline"
                                        className={`flex-1 ${inWishlist ? 'text-red-500 border-red-200 bg-red-50' : ''}`}
                                        onClick={() => inWishlist ? removeFromWishlist(product._id || product.id) : addToWishlist(product)}
                                    >
                                        <Heart className={`w-4 h-4 mr-2 ${inWishlist ? 'fill-current' : ''}`} />
                                        {inWishlist ? 'Saved' : 'Wishlist'}
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        <Share2 className="w-4 h-4 mr-2" /> Share
                                    </Button>
                                </div>
                            </div>

                            {/* Trust Indicators */}
                            <div className="grid grid-cols-3 gap-4 text-center text-xs text-muted-foreground pt-8 border-t border-border/10">
                                <div><span className="block mb-2 text-xl">🛡️</span>Secure Checkout</div>
                                <div><span className="block mb-2 text-xl">🚚</span>Free Shipping</div>
                                <div><span className="block mb-2 text-xl">💎</span>Lifetime Warranty</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
