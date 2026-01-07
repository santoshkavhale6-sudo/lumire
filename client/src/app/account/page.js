"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import {
    Star,
    TrendingUp,
    Gift,
    ShieldCheck,
    ArrowRight,
    Camera
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { getApiUrl } from '@/lib/api';

const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-[#F0EBE0] shadow-sm group hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
                <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
            </div>
            <TrendingUp className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-2xl font-semibold text-[#1E1E1E] mb-1">{value}</p>
        <p className="text-xs text-[#8C8C8C] uppercase tracking-widest">{label}</p>
    </div>
);

export default function AccountOverview() {
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
        if (user) fetchProfile();
    }, [user]);

    if (loading) return <div>Entering the lounge...</div>;

    return (
        <div className="space-y-10">
            {/* Identity Hero */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#F0EBE0] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                    <ShieldCheck className="w-48 h-48 fill-[#C9A24D]" />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-[#FAF7F2] border-2 border-[#C9A24D]/20 flex items-center justify-center overflow-hidden">
                            {profile?.avatar ? (
                                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-3xl font-heading text-[#C9A24D]">{profile?.name?.charAt(0)}</span>
                            )}
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-[#C9A24D] text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="w-3 h-3" />
                        </button>
                    </div>

                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-heading text-[#1E1E1E] mb-2">Welcome back, {profile?.name}</h1>
                        <p className="text-[#8C8C8C] font-light flex items-center gap-2 justify-center md:justify-start">
                            Client since {new Date(profile?.createdAt).getFullYear()} •
                            <span className="flex items-center gap-1 text-[#C9A24D] font-medium">
                                <Star className="w-3 h-3 fill-current" /> Elite Member
                            </span>
                        </p>
                    </div>

                    <div className="md:ml-auto">
                        <Link href="/account/security">
                            <Button variant="outline" className="rounded-full px-6">Edit Identity</Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    label="Lumière Points"
                    value={profile?.wallet?.points || 1250}
                    icon={TrendingUp}
                    color="bg-purple-500"
                />
                <StatCard
                    label="Active Treasures"
                    value="2"
                    icon={TrendingUp}
                    color="bg-blue-500"
                />
                <StatCard
                    label="Gift Reminders"
                    value={profile?.giftReminders?.length || 3}
                    icon={Gift}
                    color="bg-[#C9A24D]"
                />
            </div>

            {/* Promotional / Gift Banner */}
            <div className="bg-[#1E1E1E] rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#C9A24D]/20 to-transparent" />
                <div className="relative z-10">
                    <h3 className="text-2xl font-heading mb-2">The Gift Concierge</h3>
                    <p className="text-gray-400 font-light max-w-md">Your anniversary is approaching. Let our AI suggest the perfect handcrafted piece for your special day.</p>
                </div>
                <Button className="bg-[#C9A24D] hover:bg-[#B69143] text-white rounded-full px-8 relative z-10 group">
                    View Suggestions <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

            {/* Recent Orders Snippet (Placeholder) */}
            <div className="bg-white rounded-2xl p-8 border border-[#F0EBE0] shadow-sm">
                <h3 className="text-lg font-heading mb-6 flex items-center justify-between">
                    Recent Treasures
                    <Link href="/account/orders" className="text-xs text-[#C9A24D] uppercase tracking-widest hover:underline">View All</Link>
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 hover:bg-[#FAF7F2] rounded-xl transition-colors cursor-pointer border border-transparent hover:border-[#F0EBE0]">
                        <div className="w-12 h-12 rounded-lg bg-gray-100" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">Diamond Eternity Band</p>
                            <p className="text-xs text-[#8C8C8C]">Order #LX9982 • Shipped</p>
                        </div>
                        <p className="text-sm font-semibold text-[#1E1E1E]">₹1,25,000</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
