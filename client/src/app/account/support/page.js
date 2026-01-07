"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageCircle, Phone, Mail, HelpCircle, FileText,
    Navigation, MapPin, Calendar, Clock, PenTool,
    Search, ArrowRight, ShieldCheck, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function WhiteGloveConcierge() {
    const [bookingService, setBookingService] = useState(null); // 'repair' | 'showroom'

    const conciergeOptions = [
        {
            title: 'Immediate Consultation',
            description: 'Speak with a high-jewelry specialist regarding bespoke creations.',
            icon: MessageCircle,
            type: 'Live Chat',
            color: 'text-amber-600'
        },
        {
            title: 'Showroom Private Access',
            description: 'Schedule an exclusive appointment at our flagship ateliers.',
            icon: MapPin,
            type: 'Booking',
            color: 'text-blue-600'
        },
        {
            title: 'Artifact Restoration',
            description: 'Professional cleaning, resizing, or master-level repairs.',
            icon: PenTool,
            type: 'Service',
            color: 'text-purple-600'
        }
    ];

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-heading text-[#1E1E1E]">White-Glove Concierge</h2>
                    <p className="text-[#8C8C8C] text-sm font-light italic">Exceptional service, beyond boundaries.</p>
                </div>
            </div>

            {/* Concierge Hero */}
            <div className="bg-[#1E1E1E] rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                    <Navigation className="w-40 h-40 text-[#C9A24D]" />
                </div>
                <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-center">
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-2 text-[#C9A24D] text-[10px] uppercase tracking-[0.3em] font-bold">
                            <ShieldCheck className="w-4 h-4" /> Priority Elite Access
                        </div>
                        <h3 className="text-3xl md:text-4xl font-heading leading-tight italic">How may we enhance your <br /> experience today?</h3>
                        <p className="text-gray-400 font-light leading-relaxed max-w-lg">
                            Whether you seek a bespoke creation, require restoration of a family heirloom, or wish to visit our private gallery, our specialists are at your disposal.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button className="bg-[#C9A24D] hover:bg-[#B69143] text-white rounded-full px-8 h-12 uppercase tracking-widest font-bold text-[10px]">
                                Connect to Butler
                            </Button>
                            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-12 uppercase tracking-widest font-bold text-[10px]">
                                View Showrooms
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Services */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {conciergeOptions.map((opt, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[2rem] border border-[#F0EBE0] shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer"
                        onClick={() => setBookingService(opt.type === 'Booking' ? 'showroom' : 'repair')}
                    >
                        <div className={`w-14 h-14 rounded-2xl bg-[#FAF7F2] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${opt.color}`}>
                            <opt.icon className="w-7 h-7" />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xl font-heading text-[#1E1E1E] group-hover:text-[#C9A24D] transition-colors">{opt.title}</h4>
                                <p className="text-xs text-[#8C8C8C] leading-relaxed mt-2">{opt.description}</p>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#C9A24D] animate-pulse">
                                <Zap className="w-3 h-3" /> Agent Available
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Service Scheduling Placeholder */}
            {bookingService && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-[#FAF7F2] rounded-[2.5rem] border border-[#F0EBE0] p-10 space-y-8"
                >
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-heading text-[#1E1E1E]">Schedule {bookingService === 'showroom' ? 'Gallery Visit' : 'Heirloom Care'}</h3>
                        <button onClick={() => setBookingService(null)} className="text-[#8C8C8C] text-xs hover:text-[#1E1E1E] uppercase tracking-widest font-bold">Cancel</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-[#8C8C8C]">Preferred Location</label>
                            <div className="bg-white border border-[#F0EBE0] rounded-xl p-4 flex items-center justify-between cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-4 h-4 text-[#C9A24D]" />
                                    <span className="text-sm">Mumbai Flagship</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#8C8C8C]" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-[#8C8C8C]">Select Date</label>
                            <input type="date" className="w-full bg-white border border-[#F0EBE0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#C9A24D]" />
                        </div>
                        <div className="flex items-end">
                            <Button className="w-full h-12 bg-[#1E1E1E] hover:bg-[#2D2D2D] text-white rounded-xl uppercase tracking-widest font-bold text-[10px]">
                                Confirm Appointment
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* FAQs & Documentation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h4 className="text-xl font-heading text-[#1E1E1E]">Knowledge Base</h4>
                    <div className="space-y-4">
                        {['Bespoke Process Guide', 'Lifetime Warranty Terms', 'Ethical Sourcing Registry', 'Heritage Insurance Partners'].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-white border border-[#F0EBE0] rounded-2xl hover:bg-[#FAF7F2] transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <FileText className="w-5 h-5 text-[#8C8C8C] group-hover:text-[#C9A24D]" />
                                    <span className="text-sm font-medium text-[#1E1E1E]">{item}</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#8C8C8C] group-hover:translate-x-1 transition-transform" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#F0EBE0] space-y-6 self-start">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#C9A24D]">
                        <HelpCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-xl font-heading text-[#1E1E1E]">Direct Callback</h4>
                        <p className="text-sm text-[#8C8C8C] mt-2 font-light">Prefer a personal call? Input your number and our Relationship Manager will reach out within 15 minutes.</p>
                    </div>
                    <div className="flex gap-4">
                        <input placeholder="+91 00000 00000" className="flex-1 bg-white border border-[#F0EBE0] rounded-xl px-4 text-sm" />
                        <Button className="bg-[#C9A24D] hover:bg-[#B69143] text-white rounded-xl px-6 h-12">Call Me</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
