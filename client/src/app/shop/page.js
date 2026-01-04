"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/lib/data';
import ProductCard from '@/components/ui/ProductCard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

function ShopContent() {
    const searchParams = useSearchParams();
    const search = searchParams.get('search')?.toLowerCase() || '';
    const category = searchParams.get('category')?.toLowerCase() || '';

    const filteredProducts = products.filter(product => {
        const matchesSearch = !search || product.name.toLowerCase().includes(search);
        const matchesCategory = !category || product.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            {/* Filters Placeholder */}
            <div className="flex justify-between items-center mb-8 border-b border-border/10 pb-4">
                <span className="text-sm text-muted-foreground">{filteredProducts.length} Products {search && `for "${search}"`}</span>
                <button className="text-sm font-medium hover:text-primary">Filter & Sort</button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-muted-foreground">
                        <p>No products found.</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default function ShopPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-24 pb-16">
                <div className="container-custom">
                    {/* Page Header */}
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        <h1 className="text-4xl md:text-5xl font-heading font-medium">The Collection</h1>
                        <p className="text-muted-foreground">
                            Hand-picked pieces that define elegance and sophistication.
                        </p>
                    </div>

                    <Suspense fallback={<div className="text-center py-20">Loading collection...</div>}>
                        <ShopContent />
                    </Suspense>
                </div>
            </main>

            <Footer />
        </div>
    );
}
