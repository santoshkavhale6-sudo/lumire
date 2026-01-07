"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
    Heart, Sparkles, Zap, TrendingUp, Users,
    MessageCircle, AlertCircle, ShoppingBag, Eye,
    MousePointer2, Clock, MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formattedPrice } from '@/lib/data';

export default function PersuasionDashboard() {
    const [stats, setStats] = useState({
        totalElite: 142,
        activePersuasions: 28,
        conversionLift: '+18.4%',
        emotionalEngagement: 'High'
    });

    const archetypes = [
        { name: 'Romantic', count: 45, color: 'bg-rose-500' },
        { name: 'Legacy Builder', count: 32, color: 'bg-amber-600' },
        { name: 'Prestige Seeker', count: 28, color: 'bg-purple-600' },
        { name: 'Silent Loyalist', count: 37, color: 'bg-slate-700' }
    ];

    const liveTriggers = [
        {
            user: 'Siddharth M.',
            archetype: 'Legacy Builder',
            trigger: 'WISH_LINGER',
            product: 'Heritage Solitaire',
            probability: 'High',
            time: 'Just now'
        },
        {
            user: 'Ananya R.',
            archetype: 'Romantic',
            trigger: 'ANNIVERSARY_APPROX',
            product: 'Eternal Band',
            probability: 'Very High',
            time: '4 mins ago'
        },
        {
            user: 'Vikram K.',
            archetype: 'Prestige Seeker',
            trigger: 'CART_ABANDON',
            product: 'Royal Studs',
            probability: 'Medium',
            time: '12 mins ago'
        }
    ];

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Insights Bar */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {Object.entries(stats).map(([label, value], i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">{label.replace(/([A-Z])/g, ' $1')}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Archetype Breakdown */}
                    <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-amber-600" />
                            <h3 className="text-lg font-bold text-gray-900">Emotional Archetypes</h3>
                        </div>
                        <div className="space-y-6">
                            {archetypes.map((arch, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-700">{arch.name}</span>
                                        <span className="text-gray-400">{arch.count} users</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(arch.count / 150) * 100}%` }}
                                            className={`h-full ${arch.color}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Live Trigger Feed */}
                    <div className="lg:col-span-2 bg-[#1E1E1E] p-8 rounded-3xl text-white space-y-6 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Zap className="w-40 h-40 text-amber-500" />
                        </div>
                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-3">
                                <Zap className="w-5 h-5 text-amber-500" />
                                <h3 className="text-lg font-bold">"Open Wallet" Real-time Signals</h3>
                            </div>
                            <span className="text-[10px] text-amber-500 uppercase tracking-widest font-bold animate-pulse">Live Monitoring Active</span>
                        </div>

                        <div className="space-y-4 relative z-10">
                            {liveTriggers.map((trig, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                                            <Sparkles className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h5 className="font-bold">{trig.user}</h5>
                                                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-gray-400 capitalize">{trig.archetype}</span>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-0.5">Detected <span className="text-amber-500 font-bold">{trig.trigger}</span> on {trig.product}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-xs font-bold ${trig.probability === 'Very High' ? 'text-green-500' :
                                                trig.probability === 'High' ? 'text-blue-500' : 'text-gray-400'
                                            }`}>
                                            {trig.probability} Prob.
                                        </div>
                                        <button className="text-[10px] text-amber-500 uppercase tracking-widest font-bold mt-2 hover:underline">
                                            Send Concierge WhatsApp
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Behavioral Intelligence Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                                <h3 className="text-lg font-bold text-gray-900">Legacy Framing Performance</h3>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                                <p className="text-xs text-green-600 font-bold uppercase tracking-widest mb-2">Heritage CTR</p>
                                <h4 className="text-3xl font-bold text-green-700">62.8%</h4>
                                <p className="text-[10px] text-green-600 mt-1">vs 21% standard</p>
                            </div>
                            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                                <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mb-2">Emotional RoAS</p>
                                <h4 className="text-3xl font-bold text-blue-700">14.2x</h4>
                                <p className="text-[10px] text-blue-600 mt-1">Direct attribution</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <MousePointer2 className="w-5 h-5 text-purple-600" />
                            <h3 className="text-lg font-bold text-gray-900">High-Fidelity Engagement</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { metric: 'Avg Wish-Linger Time', value: '42.5s', icon: Clock },
                                { metric: 'Deep Scroll Depth', value: '88%', icon: MousePointer2 },
                                { metric: 'Certificate Interaction', value: '74%', icon: ShoppingBag }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <item.icon className="w-4 h-4 text-purple-600" />
                                        <span className="text-sm font-medium text-gray-700">{item.metric}</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
