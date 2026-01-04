"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import { getApiUrl } from '@/lib/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getApiUrl('products'))
      .then(res => res.json())
      .then(data => {
        // Sort by newest first
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProducts(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Simple Hero for V2 Alpha */}
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-neutral-900 text-white">
          {/* Background Image Placeholder - using a color for now, ideally an image or video */}
          <div
            className="absolute inset-0 z-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1531995811006-35cb42e1a022?q=80&w=2670')] bg-cover bg-center"
          />
          <div className="absolute inset-0 bg-black/40 z-0" />

          <div className="relative z-10 container-custom text-center space-y-6">
            <span className="inline-block text-sm uppercase tracking-[0.3em] opacity-0 animate-[fade-in_1s_ease-out_forwards]">
              New Collection
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight opacity-0 animate-[slide-up_1s_ease-out_0.3s_forwards]">
              Elegance <br /> Redefined
            </h1>
            <p className="max-w-md mx-auto text-lg text-gray-200 opacity-0 animate-[slide-up_1s_ease-out_0.6s_forwards]">
              Discover the new standard of luxury with our handcrafted pieces designed to brilliantly shine.
            </p>
            <div className="pt-4 opacity-0 animate-[slide-up_1s_ease-out_0.8s_forwards]">
              <Button size="lg" className="rounded-full px-8 text-base">
                Shop Now
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Collections / Latest Arrivals */}
        <section className="py-24 bg-background">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-heading font-bold mb-4">Latest Arrivals</h2>
              <p className="text-muted-foreground">Fresh from our atelier to your collection.</p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {loading ? (
                <p className="col-span-full text-center text-gray-400">Loading treasures...</p>
              ) : products.length === 0 ? (
                <p className="col-span-full text-center text-gray-400">No products found.</p>
              ) : (
                products.slice(0, 4).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              )}
            </div>

            <div className="text-center mt-12">
              <Link href="/shop">
                <Button variant="outline" className="rounded-full px-8">
                  View All Collection
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
