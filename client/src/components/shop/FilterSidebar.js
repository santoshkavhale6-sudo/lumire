"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp, Check, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Filter Options
const CATEGORIES = ["Rings", "Earrings", "Necklaces", "Bracelets", "Pendants", "Gifts", "Watches"];
const METALS = ["Gold", "Silver", "Rose Gold", "Platinum", "White Gold"];
const STONES = ["Diamond", "Pearl", "Ruby", "Sapphire", "Emerald", "None"];
const OCCASIONS = ["Wedding", "Anniversary", "Birthday", "Daily Wear", "Gifting"];
const GENDERS = ["Women", "Men", "Unisex"];
const PRICE_RANGES = [
    { label: "Under ₹2,000", min: 0, max: 2000 },
    { label: "₹2,000 - ₹5,000", min: 2000, max: 5000 },
    { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
    { label: "₹10,000+", min: 10000, max: 10000000 }
];

const FilterSection = ({ title, isOpen, toggle, children }) => (
    <div className="border-b border-gray-100 py-4">
        <button className="flex items-center justify-between w-full text-left mb-2" onClick={toggle}>
            <span className="font-medium text-sm text-gray-900 tracking-wide uppercase">{title}</span>
            {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <div className="pt-2 pb-1 space-y-2">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export default function FilterSidebar({ mobileOpen, setMobileOpen }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State for sections toggle
    const [sections, setSections] = useState({
        category: true,
        price: true,
        metal: false,
        stone: false,
        occasion: false,
        gender: false
    });

    const toggleSection = (section) => setSections(prev => ({ ...prev, [section]: !prev[section] }));

    const updateQuery = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === null || value === "") {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        // Reset price if we change ranges logic or special handling needed
        if (key === 'priceRange') {
            const range = PRICE_RANGES.find(r => r.label === value);
            if (range) {
                params.set('minPrice', range.min);
                params.set('maxPrice', range.max);
            } else {
                params.delete('minPrice');
                params.delete('maxPrice');
            }
            // Don't keep the label in URL, just pure values usually, but for UI sync we track label sometimes.
            // Here we just fire params.
        }

        router.push(`/shop?${params.toString()}`, { scroll: false });
    };

    const currentFilters = {
        category: searchParams.get('category'),
        metal: searchParams.get('metal'),
        stone: searchParams.get('stone'),
        occasion: searchParams.get('occasion'),
        gender: searchParams.get('gender'),
        minPrice: searchParams.get('minPrice'),
        sort: searchParams.get('sort')
    };

    // Determine active price label
    const activePriceLabel = PRICE_RANGES.find(r =>
        r.min === Number(currentFilters.minPrice) && r.max === Number(searchParams.get('maxPrice'))
    )?.label;

    const clearAll = () => router.push('/shop');

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden ${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMobileOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`fixed top-0 right-0 bottom-0 w-80 bg-white z-50 transform transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:w-64 lg:block overflow-y-auto border-l lg:border-l-0 lg:border-r border-gray-100 shadow-2xl lg:shadow-none p-6 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className="flex justify-between items-center mb-6 lg:hidden">
                    <h2 className="text-lg font-heading">Filters</h2>
                    <button onClick={() => setMobileOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#1c1c1c]">Filter By</h3>
                    <button onClick={clearAll} className="text-xs text-[#c5a059] hover:underline underline-offset-4">Clear All</button>
                </div>

                {/* Categories */}
                <FilterSection title="Category" isOpen={sections.category} toggle={() => toggleSection('category')}>
                    {CATEGORIES.map(cat => (
                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-4 h-4 border border-gray-300 rounded flex items-center justify-center transition-colors ${currentFilters.category === cat ? 'bg-[#1c1c1c] border-[#1c1c1c]' : 'group-hover:border-[#c5a059]'}`}>
                                {currentFilters.category === cat && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={currentFilters.category === cat}
                                onChange={() => updateQuery('category', currentFilters.category === cat ? null : cat)}
                            />
                            <span className={`text-sm ${currentFilters.category === cat ? 'text-[#1c1c1c] font-medium' : 'text-[#595959]'}`}>{cat}</span>
                        </label>
                    ))}
                </FilterSection>

                {/* Price */}
                <FilterSection title="Price" isOpen={sections.price} toggle={() => toggleSection('price')}>
                    {PRICE_RANGES.map(range => (
                        <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-4 h-4 border rounded-full flex items-center justify-center transition-colors ${activePriceLabel === range.label ? 'border-[#c5a059]' : 'border-gray-300 group-hover:border-[#c5a059]'}`}>
                                {activePriceLabel === range.label && <div className="w-2 h-2 rounded-full bg-[#c5a059]" />}
                            </div>
                            <input
                                type="radio"
                                name="price"
                                className="hidden"
                                checked={activePriceLabel === range.label}
                                onChange={() => updateQuery('priceRange', range.label)}
                            />
                            <span className={`text-sm ${activePriceLabel === range.label ? 'text-[#1c1c1c] font-medium' : 'text-[#595959]'}`}>{range.label}</span>
                        </label>
                    ))}
                </FilterSection>

                {/* Metal */}
                <FilterSection title="Metal" isOpen={sections.metal} toggle={() => toggleSection('metal')}>
                    {METALS.map(metal => (
                        <label key={metal} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-4 h-4 border border-gray-300 rounded flex items-center justify-center transition-colors ${currentFilters.metal === metal ? 'bg-[#1c1c1c] border-[#1c1c1c]' : 'group-hover:border-[#c5a059]'}`}>
                                {currentFilters.metal === metal && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <input type="checkbox" className="hidden" onChange={() => updateQuery('metal', currentFilters.metal === metal ? null : metal)} />
                            <span className="text-sm text-[#595959]">{metal}</span>
                        </label>
                    ))}
                </FilterSection>

                {/* Stone */}
                <FilterSection title="Gemstone" isOpen={sections.stone} toggle={() => toggleSection('stone')}>
                    {STONES.map(stone => (
                        <label key={stone} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-4 h-4 border border-gray-300 rounded flex items-center justify-center transition-colors ${currentFilters.stone === stone ? 'bg-[#1c1c1c] border-[#1c1c1c]' : 'group-hover:border-[#c5a059]'}`}>
                                {currentFilters.stone === stone && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <input type="checkbox" className="hidden" onChange={() => updateQuery('stone', currentFilters.stone === stone ? null : stone)} />
                            <span className="text-sm text-[#595959]">{stone}</span>
                        </label>
                    ))}
                </FilterSection>

                {/* Gender */}
                <FilterSection title="Gender" isOpen={sections.gender} toggle={() => toggleSection('gender')}>
                    {GENDERS.map(gender => (
                        <label key={gender} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-4 h-4 border border-gray-300 rounded flex items-center justify-center transition-colors ${currentFilters.gender === gender ? 'bg-[#1c1c1c] border-[#1c1c1c]' : 'group-hover:border-[#c5a059]'}`}>
                                {currentFilters.gender === gender && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <input type="checkbox" className="hidden" onChange={() => updateQuery('gender', currentFilters.gender === gender ? null : gender)} />
                            <span className="text-sm text-[#595959]">{gender}</span>
                        </label>
                    ))}
                </FilterSection>

            </aside>
        </>
    );
}
