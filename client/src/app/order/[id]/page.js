"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Check, ShieldCheck, MapPin, Package, Truck, RefreshCw, Star } from 'lucide-react';
import { formattedPrice } from '@/lib/data';
import { getApiUrl } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function OrderSuccessPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchOrder = async () => {
            if (!user || !id) return;
            try {
                const res = await fetch(getApiUrl(`orders/${id}`), {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setOrder(data);
                }
            } catch (err) {
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id, user]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const checkmarkVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.5
            }
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#C9A24D] border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FAF7F2] selection:bg-[#C9A24D] selection:text-white">
            <Header />

            <main className="pt-32 pb-24 px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-3xl mx-auto text-center"
                >
                    {/* Animated Gold Checkmark */}
                    <motion.div
                        variants={checkmarkVariants}
                        className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-10 shadow-[0_10px_30px_rgba(201,162,77,0.1)] border border-[#C9A24D]/20"
                    >
                        <Check className="w-10 h-10 text-[#C9A24D]" />
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-6xl font-heading text-[#1E1E1E] mb-6 leading-tight"
                    >
                        Your Treasure Is Now <br className="hidden md:block" /> in Our Hands ✨
                    </motion.h1>

                    {/* Sub-headline */}
                    <motion.p
                        variants={itemVariants}
                        className="text-[#595959] text-lg font-light mb-12 max-w-xl mx-auto leading-relaxed"
                    >
                        Thank you for choosing LUMIÈRE. Your handcrafted piece is now entering our atelier for careful creation.
                    </motion.p>

                    {/* Confirmation Details Block */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-2xl p-8 md:p-10 mb-12 border border-[#F0EBE0] shadow-sm text-left relative overflow-hidden"
                    >
                        {/* Subtle background texture or element */}
                        <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                            <Star className="w-24 h-24 fill-[#C9A24D]" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A24D] font-bold mb-1">Order Identifier</p>
                                    <p className="text-xl font-medium text-[#1E1E1E] font-sans">#{id.slice(-8).toUpperCase()}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A24D] font-bold mb-1">Confirmation Path</p>
                                    <p className="text-sm text-[#595959]">A detailed confirmation has been sent to your registered email.</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A24D] font-bold mb-1">Estimated Journey</p>
                                    <p className="text-xl font-medium text-[#1E1E1E] font-sans">7–12 Business Days</p>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#8C8C8C] italic">
                                    <MapPin className="w-3 h-3" /> Shipments are fully insured until they reach your doorstep.
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Emotional Reassurance Copy */}
                    <motion.p
                        variants={itemVariants}
                        className="text-[#595959] text-base font-light italic mb-12 max-w-2xl mx-auto"
                    >
                        "Each LUMIÈRE creation is handcrafted, quality-checked, and packed with utmost care — ensuring your treasure arrives perfect."
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-5 justify-center mb-20"
                    >
                        <Link href="/account/orders">
                            <Button className="w-full sm:w-auto bg-[#C9A24D] hover:bg-[#B69143] text-white px-12 py-7 rounded-full uppercase tracking-widest text-[11px] font-bold shadow-lg shadow-[#C9A24D]/20 transition-all duration-500 hover:scale-105">
                                Track My Order
                            </Button>
                        </Link>
                        <Link href="/shop">
                            <Button className="w-full sm:w-auto bg-transparent border border-[#C9A24D]/30 text-[#C9A24D] hover:bg-[#FAF7F2] hover:border-[#C9A24D] px-12 py-7 rounded-full uppercase tracking-widest text-[11px] font-bold transition-all duration-500">
                                Continue Exploring
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-[#F0EBE0] pt-12 mb-12"
                    >
                        {[
                            { icon: ShieldCheck, label: "Secure Payment" },
                            { icon: Package, label: "Handcrafted" },
                            { icon: Truck, label: "Insured Shipping" },
                            { icon: RefreshCw, label: "Easy Returns" }
                        ].map((badge, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-2">
                                <badge.icon className="w-5 h-5 text-[#C9A24D]/60" />
                                <span className="text-[10px] uppercase tracking-widest text-[#8C8C8C] font-medium">{badge.label} ✓</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Closing Line */}
                    <motion.p
                        variants={itemVariants}
                        className="text-[#C9A24D] font-heading text-xl md:text-2xl"
                    >
                        We can’t wait for you to experience your LUMIÈRE treasure.
                    </motion.p>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
