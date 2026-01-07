"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FilterSidebar from '@/components/shop/FilterSidebar';
import { getApiUrl } from '@/lib/api';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';

function ShopContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Derived state from URL
    const queryString = searchParams.toString();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Fetch directly with query string passed to backend
                const url = getApiUrl(`products?${queryString}`);
                const res = await fetch(url);
                if (!res.ok) throw new Error('Failed to fetch products');
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [queryString]); // Re-fetch whenever URL changes

    const handleSortChange = (e) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', e.target.value);
        router.push(`/shop?${params.toString()}`);
    };

    const currentSort = searchParams.get('sort') || 'newest';

    return (
        <div className="container-custom flex flex-col lg:flex-row gap-12 relative">
            {/* Sidebar */}
            <FilterSidebar mobileOpen={mobileFiltersOpen} setMobileOpen={setMobileFiltersOpen} />

            {/* Main Content */}
            <div className="flex-1 min-h-[50vh]">

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-6 border-b border-gray-100 gap-4">
                    <div className="text-sm text-[#595959]">
                        Showing <span className="font-semibold text-[#1c1c1c]">{products.length}</span> results
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        {/* Mobile Filter Toggle */}
                        <button
                            className="lg:hidden flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm font-medium hover:border-[#1c1c1c]"
                            onClick={() => setMobileFiltersOpen(true)}
                        >
                            <SlidersHorizontal className="w-4 h-4" /> Filters
                        </button>

                        {/* Sort Dropdown */}
                        <div className="relative flex-1 sm:flex-none">
                            <select
                                value={currentSort}
                                onChange={handleSortChange}
                                className="w-full sm:w-48 appearance-none bg-transparent pl-4 pr-10 py-2 border-b border-gray-300 focus:border-[#c5a059] focus:outline-none text-sm cursor-pointer"
                            >
                                <option value="newest">Newest Arrivals</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="popular">Best Sellers</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 animate-pulse">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="aspect-[3/4] bg-gray-100 rounded-sm" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="py-20 text-center text-red-500">Error: {error}</div>
                ) : products.length === 0 ? (
                    <div className="py-32 text-center">
                        <p className="text-lg text-[#1c1c1c] mb-2">No products match your criteria.</p>
                        <button
                            onClick={() => router.push('/shop')}
                            className="text-[#c5a059] hover:text-[#b08d4a] underline text-sm"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <div className="min-h-screen bg-[#FDFCF8]">
            <Header />

            <main className="pt-24 pb-16">
                {/* Page Header */}
                <div className="text-center py-12 md:py-20 bg-[#FDFCF8]">
                    <h1 className="text-4xl md:text-5xl font-heading font-medium tracking-tight mb-4 text-[#1c1c1c]">The Collection</h1>
                    <p className="text-[#595959] max-w-lg mx-auto font-light">
                        Explore our curated selection of fine jewelry, handcrafted for life's most precious moments.
                    </p>
                </div>

                <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
                    <ShopContent />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
}
