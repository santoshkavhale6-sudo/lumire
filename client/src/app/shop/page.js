import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ShopContainer from '@/components/shop/ShopContainer';
import { getApiUrl } from '@/lib/api';

async function getProducts(searchParams) {
    const query = new URLSearchParams(searchParams).toString();
    const url = getApiUrl(`products?${query}`);

    try {
        const res = await fetch(url, { cache: 'no-store' }); // Ensure fresh data on every request
        if (!res.ok) return [];
        return res.json();
    } catch (err) {
        console.error("SSR Fetch Error:", err);
        return [];
    }
}

export default async function ShopPage({ searchParams }) {
    const initialProducts = await getProducts(searchParams);

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

                <Suspense fallback={
                    <div className="container-custom grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 animate-pulse px-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="aspect-[3/4] bg-gray-100 rounded-sm" />
                        ))}
                    </div>
                }>
                    <ShopContainer initialProducts={initialProducts} />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
}
