"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Gift, Calendar, Plus, Sparkles, Bell, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getApiUrl } from '@/lib/api';

export default function GiftCenter() {
    const { user } = useAuth();
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(getApiUrl('users/profile'), {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setReminders(data.giftReminders || []);
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
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-heading text-[#1E1E1E]">Gift Center</h2>
                    <p className="text-[#8C8C8C] text-sm font-light">Never miss a moment of celebration.</p>
                </div>
                <Button className="bg-[#C9A24D] hover:bg-[#B69143] text-white rounded-full px-6 flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Special Date
                </Button>
            </div>

            {/* AI Insights / Recommendation */}
            <div className="bg-gradient-to-br from-[#1E1E1E] to-[#2D2D2D] rounded-3xl p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Sparkles className="w-32 h-32 text-[#C9A24D]" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 text-[#C9A24D] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
                            <Sparkles className="w-4 h-4" /> AI Gift Concierge
                        </div>
                        <h3 className="text-2xl md:text-3xl font-heading mb-4 leading-tight">Your 5th Anniversary <br /> is in 14 days.</h3>
                        <p className="text-gray-400 font-light mb-6">Our master artisans have selected three eternity bands that symbolize half a decade of shared brilliance.</p>
                        <Button className="bg-[#C9A24D] hover:bg-[#B69143] text-white rounded-full px-8 group">
                            Explore Curated Selection <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-all" />
                        </Button>
                    </div>
                    <div className="w-full md:w-64 aspect-[4/5] bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="text-center">
                            <Gift className="w-12 h-12 text-[#C9A24D]/40 mx-auto mb-4" />
                            <p className="text-xs text-gray-500 italic">"Gifts made by hand, given with heart."</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reminders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reminders.map((rem, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-[#F0EBE0] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#FAF7F2] rounded-bl-[40px] flex items-center justify-center translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">
                            <Bell className="w-4 h-4 text-[#C9A24D]" />
                        </div>
                        <div className="flex items-center gap-3 mb-4 text-[#C9A24D]">
                            <Calendar className="w-4 h-4" />
                            <span className="text-[10px] uppercase tracking-widest font-bold font-sans">
                                {new Date(rem.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                        </div>
                        <h4 className="text-lg font-heading text-[#1E1E1E] mb-1">{rem.event}</h4>
                        <p className="text-sm text-[#595959] mb-4">For {rem.recipient}</p>
                        <div className="flex justify-between items-center pt-4 border-t border-[#FAF7F2]">
                            <span className="text-[10px] text-[#8C8C8C] uppercase tracking-widest">Auto-Reminder On</span>
                            <button className="text-[#C9A24D] text-xs font-bold hover:underline">Edit</button>
                        </div>
                    </div>
                ))}

                {reminders.length === 0 && (
                    <div className="col-span-full py-20 bg-white border-2 border-dashed border-[#F0EBE0] rounded-3xl flex flex-col items-center justify-center text-center">
                        <Heart className="w-12 h-12 text-[#F0EBE0] mb-4" />
                        <p className="text-[#8C8C8C] font-light">Your celebration calendar is empty.</p>
                        <Button variant="link" className="text-[#C9A24D]">Add your first special date</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
