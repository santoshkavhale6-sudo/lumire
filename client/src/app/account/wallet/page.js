"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Wallet, Star, TrendingUp, History, Landmark, CreditCard, ChevronRight } from 'lucide-react';
import { formattedPrice } from '@/lib/data';
import { getApiUrl } from '@/lib/api';

export default function LumiereVault() {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(getApiUrl('users/profile'), {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    return (
        <div className="space-y-10">
            <div>
                <h2 className="text-2xl font-heading text-[#1E1E1E]">Lumière Vault</h2>
                <p className="text-[#8C8C8C] text-sm font-light">Your exclusive rewards and financial standing.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Balance Card */}
                <div className="bg-[#1E1E1E] rounded-3xl p-8 text-white relative overflow-hidden h-64 flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Landmark className="w-40 h-40 text-[#C9A24D]" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C9A24D] mb-2">Vault Balance</p>
                        <h3 className="text-5xl font-heading">{formattedPrice(profile?.wallet?.balance || 0)}</h3>
                    </div>
                    <div className="relative z-10 flex gap-4">
                        <button className="text-xs uppercase tracking-widest font-bold text-[#C9A24D] hover:underline">Add Credits</button>
                        <button className="text-xs uppercase tracking-widest font-bold text-[#C9A24D] hover:underline">Terms of Use</button>
                    </div>
                </div>

                {/* Points Card */}
                <div className="bg-white rounded-3xl p-8 border border-[#F0EBE0] shadow-sm relative overflow-hidden h-64 flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Star className="w-40 h-40 text-[#C9A24D]" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C9A24D] mb-2">Luxe Loyalty Points</p>
                        <h3 className="text-5xl font-heading text-[#1E1E1E]">{profile?.wallet?.points || 1250}</h3>
                        <p className="text-sm text-[#8C8C8C] mt-2 italic font-light">Next Tier: Artisan (Requires 2500 pts)</p>
                    </div>
                    <div className="relative z-10">
                        <div className="w-full h-1.5 bg-[#FAF7F2] rounded-full overflow-hidden">
                            <div className="w-1/2 h-full bg-[#C9A24D]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Saved Payments', icon: CreditCard },
                    { label: 'Point History', icon: History },
                    { label: 'Refer a Peer', icon: TrendingUp },
                ].map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-[#F0EBE0] shadow-sm flex items-center justify-between group cursor-pointer hover:border-[#C9A24D]/30 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#FAF7F2] rounded-xl text-[#C9A24D]">
                                <item.icon className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-[#1E1E1E]">{item.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#8C8C8C] group-hover:translate-x-1 transition-transform" />
                    </div>
                ))}
            </div>

            {/* Transaction History (Placeholder) */}
            <div className="bg-white rounded-2xl p-8 border border-[#F0EBE0] shadow-sm">
                <h3 className="text-lg font-heading mb-6">Recent Transactions</h3>
                <div className="space-y-6">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                                <TrendingUp className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="font-medium">Elite Membership Credit</p>
                                <p className="text-xs text-[#8C8C8C]">Jan 15, 2024</p>
                            </div>
                        </div>
                        <span className="font-semibold text-green-600">+₹5,000</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
