"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Tag, Package, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AccountNotifications() {
    const notifications = [
        {
            id: 1,
            type: 'promo',
            title: 'Early Access: Solstice Collection',
            message: 'As an Elite Member, you have 24-hour early access to our handcrafted winter arrivals.',
            time: '2 hours ago',
            icon: Star,
            color: 'text-amber-500',
            bg: 'bg-amber-50'
        },
        {
            id: 2,
            type: 'order',
            title: 'Acquisition Confirmed',
            message: 'Your Diamond Eternity Band is now in the master atelier for polishing.',
            time: '1 day ago',
            icon: Package,
            color: 'text-blue-500',
            bg: 'bg-blue-50'
        },
        {
            id: 3,
            type: 'price',
            title: 'Price Adjustment: Golden Infinity',
            message: 'A treasure in your wishlist has been refined to a new value for a limited time.',
            time: '3 days ago',
            icon: Tag,
            color: 'text-green-500',
            bg: 'bg-green-50'
        }
    ];

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-heading text-[#1E1E1E]">Lounge Alerts</h2>
                    <p className="text-[#8C8C8C] text-sm font-light">Stay informed about your treasures and exclusive events.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C9A24D] animate-pulse"></span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#C9A24D]">3 Unread</span>
                </div>
            </div>

            <div className="space-y-4">
                {notifications.map((note, idx) => (
                    <motion.div
                        key={note.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-[#F0EBE0] shadow-sm hover:shadow-md transition-all group cursor-pointer"
                    >
                        <div className="flex gap-4">
                            <div className={`w-12 h-12 rounded-xl ${note.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                <note.icon className={`w-5 h-5 ${note.color}`} />
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-heading text-[#1E1E1E]">{note.title}</h4>
                                    <span className="text-[10px] text-[#8C8C8C] font-sans font-medium">{note.time}</span>
                                </div>
                                <p className="text-sm text-[#595959] font-light leading-relaxed">{note.message}</p>
                                <div className="pt-2 flex gap-3">
                                    <button className="text-[10px] uppercase tracking-widest font-bold text-[#C9A24D] hover:underline">View Details</button>
                                    <button className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-gray-600">Dismiss</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {notifications.length === 0 && (
                    <div className="py-20 bg-white border-2 border-dashed border-[#F0EBE0] rounded-3xl flex flex-col items-center justify-center text-center">
                        <Bell className="w-12 h-12 text-[#F0EBE0] mb-4" />
                        <p className="text-[#8C8C8C] font-light italic">"A quiet lounge is a peaceful one."</p>
                    </div>
                )}
            </div>

            <div className="pt-6 border-t border-[#F0EBE0] flex justify-center">
                <Button variant="link" className="text-[#8C8C8C] hover:text-[#C9A24D] text-xs uppercase tracking-[0.2em]">
                    Manage Notification Preferences
                </Button>
            </div>
        </div>
    );
}
