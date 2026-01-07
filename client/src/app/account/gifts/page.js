"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Gift, Calendar, Plus, Sparkles, Bell, ArrowRight, Heart,
    User, MessageCircle, Truck, Package, Tag, Wallet, CheckCircle2,
    Search, SlidersHorizontal, Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getApiUrl } from '@/lib/api';
import { formattedPrice } from '@/lib/data';
import Image from 'next/image';

export default function GiftCenter() {
    const { user } = useAuth();
    const [lovedOnes, setLovedOnes] = useState([]);
    const [giftWallet, setGiftWallet] = useState(0);
    const [recommendations, setRecommendations] = useState([]);
    const [isAILoading, setIsAILoading] = useState(false);
    const [activeTab, setActiveTab] = useState('concierge'); // concierge | loved-ones | scheduler

    // Selection State for AI
    const [recipient, setRecipient] = useState(null);
    const [occasion, setOccasion] = useState('Anniversary');
    const [intent, setIntent] = useState('Romantic');
    const [budget, setBudget] = useState(250000);

    const emotionalIntents = ['Romantic', 'Gratitude', 'Apology', 'Celebration', 'Surprise'];
    const occasions = ['Anniversary', 'Birthday', 'Valentine', 'Diwali', 'Wedding', 'Baby Shower'];

    useEffect(() => {
        if (user) {
            setLovedOnes(user.lovedOnes || [
                { id: 1, name: 'Sasha', relationship: 'Wife', emotionalTag: 'Romantic', birthday: '1992-05-15', anniversary: '2020-10-12' },
                { id: 2, name: 'Meera', relationship: 'Mother', emotionalTag: 'Sentimental', birthday: '1965-08-20' }
            ]);
            setGiftWallet(user.wallet?.giftBalance || 50000);
        }
    }, [user]);

    const getRecommendations = async () => {
        setIsAILoading(true);
        try {
            const res = await fetch(getApiUrl('persuasion/gift-recommendations'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    recipient: recipient?.name,
                    relationship: recipient?.relationship,
                    occasion,
                    intent,
                    budget
                })
            });
            const data = await res.json();
            setRecommendations(data.recommendations || []);
        } catch (err) {
            console.error(err);
        } finally {
            setIsAILoading(false);
        }
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-heading text-[#1E1E1E]">LUMIÈRE Gift Concierge</h2>
                    <p className="text-[#8C8C8C] text-sm font-light italic">Your personal relationship manager and emotional wealth butler.</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-[#F0EBE0] shadow-sm">
                    <div className="px-4 py-2 bg-[#FAF7F2] rounded-xl flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-[#C9A24D]" />
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-[#8C8C8C] font-bold">Gift Wallet</p>
                            <p className="text-sm font-heading text-[#C9A24D]">{formattedPrice(giftWallet)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-8 border-b border-[#F0EBE0]">
                {['concierge', 'loved-ones', 'scheduler'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-xs uppercase tracking-[0.2em] font-bold transition-all relative ${activeTab === tab ? 'text-[#C9A24D]' : 'text-[#8C8C8C] hover:text-[#1E1E1E]'
                            }`}
                    >
                        {tab.replace('-', ' ')}
                        {activeTab === tab && (
                            <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A24D]" />
                        )}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'concierge' && (
                    <motion.div
                        key="concierge"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-12"
                    >
                        {/* Selector Interface */}
                        <div className="bg-[#FAF7F2] rounded-[2.5rem] p-10 border border-[#F0EBE0] grid grid-cols-1 lg:grid-cols-4 gap-8">
                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8C8C]">For Whom?</label>
                                <div className="flex flex-wrap gap-2">
                                    {lovedOnes.map((one) => (
                                        <button
                                            key={one.id}
                                            onClick={() => setRecipient(one)}
                                            className={`px-4 py-2 rounded-xl text-xs transition-all ${recipient?.id === one.id
                                                    ? 'bg-[#C9A24D] text-white shadow-lg'
                                                    : 'bg-white text-[#595959] border border-[#F0EBE0] hover:border-[#C9A24D]'
                                                }`}
                                        >
                                            {one.name} ({one.relationship})
                                        </button>
                                    ))}
                                    <button className="p-2 border border-dashed border-[#C9A24D] rounded-xl text-[#C9A24D]">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8C8C]">Emotional Intent</label>
                                <select
                                    className="w-full bg-white border border-[#F0EBE0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#C9A24D]"
                                    value={intent}
                                    onChange={(e) => setIntent(e.target.value)}
                                >
                                    {emotionalIntents.map(i => <option key={i} value={i}>{i}</option>)}
                                </select>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8C8C]">Occasion</label>
                                <select
                                    className="w-full bg-white border border-[#F0EBE0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#C9A24D]"
                                    value={occasion}
                                    onChange={(e) => setOccasion(e.target.value)}
                                >
                                    {occasions.map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                            </div>

                            <div className="flex items-end">
                                <Button
                                    onClick={getRecommendations}
                                    disabled={!recipient || isAILoading}
                                    className="w-full h-14 bg-[#1E1E1E] hover:bg-[#2D2D2D] text-white rounded-2xl flex items-center justify-center gap-3 group"
                                >
                                    {isAILoading ? (
                                        <Sparkles className="w-5 h-5 animate-spin text-[#C9A24D]" />
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5 text-[#C9A24D]" />
                                            <span className="text-xs uppercase tracking-widest font-bold">Consult Gifting Butler</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Recommendation Results */}
                        {recommendations.length > 0 && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#C9A24D]">
                                        <CheckCircle2 className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-heading text-[#1E1E1E]">Butlers Selection for {recipient?.name}</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {recommendations.map((item, idx) => (
                                        <motion.div
                                            key={item._id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="bg-white rounded-3xl border border-[#F0EBE0] overflow-hidden group hover:shadow-2xl transition-all duration-500"
                                        >
                                            <div className="relative aspect-square overflow-hidden bg-[#FAF7F2]">
                                                <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <Button className="bg-white text-black rounded-full px-6">View Detail</Button>
                                                </div>
                                            </div>
                                            <div className="p-8 space-y-6">
                                                <div className="space-y-2">
                                                    <p className="text-[#C9A24D] text-[10px] uppercase tracking-[0.2em] font-bold italic">Why this?</p>
                                                    <p className="text-xs text-[#595959] font-light leading-relaxed italic">"{item.reasoning}"</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-heading text-[#1E1E1E]">{item.name}</h4>
                                                    <p className="text-[#C9A24D] font-bold">{formattedPrice(item.price)}</p>
                                                </div>
                                                <div className="pt-4 flex flex-col gap-3">
                                                    <Button className="w-full bg-[#C9A24D] hover:bg-[#B69143] text-white rounded-xl py-3 text-[10px] uppercase tracking-widest font-bold">
                                                        Schedule Surprise
                                                    </Button>
                                                    <div className="flex items-center gap-2 justify-center text-[9px] text-[#8C8C8C] uppercase tracking-widest">
                                                        <Truck className="w-3 h-3" /> Includes White-Glove Wrapping
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {activeTab === 'loved-ones' && (
                    <motion.div
                        key="loved-ones"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {lovedOnes.map((one) => (
                            <div key={one.id} className="bg-white p-8 rounded-[2rem] border border-[#F0EBE0] shadow-sm hover:shadow-md transition-all group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] flex items-center justify-center text-[#C9A24D]">
                                        <User className="w-8 h-8" />
                                    </div>
                                    <button className="text-[#8C8C8C] hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-xl font-heading text-[#1E1E1E]">{one.name}</h4>
                                        <p className="text-xs text-[#8C8C8C]">{one.relationship}</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-[#FAF7F2] w-fit rounded-full border border-[#F0EBE0]">
                                        <Sparkles className="w-3 h-3 text-[#C9A24D]" />
                                        <span className="text-[10px] uppercase tracking-widest text-[#595959] font-bold">{one.emotionalTag}</span>
                                    </div>
                                    <div className="pt-4 space-y-3 border-t border-[#FAF7F2]">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-[#8C8C8C]">Birthday</span>
                                            <span className="text-[#1E1E1E] font-medium">{new Date(one.birthday).toLocaleDateString()}</span>
                                        </div>
                                        {one.anniversary && (
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-[#8C8C8C]">Anniversary</span>
                                                <span className="text-[#1E1E1E] font-medium">{new Date(one.anniversary).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className="h-full min-h-[250px] rounded-[2rem] border-2 border-dashed border-[#F0EBE0] flex flex-col items-center justify-center text-[#8C8C8C] hover:border-[#C9A24D] hover:text-[#C9A24D] transition-all">
                            <Plus className="w-8 h-8 mb-2" />
                            <span className="text-xs uppercase tracking-widest font-bold">Add Loved One</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
