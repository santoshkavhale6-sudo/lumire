"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Phone, Mail, HelpCircle, FileText, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AccountSupport() {
    const supportOptions = [
        {
            title: 'Lounge Concierge',
            description: 'Direct assistance for your bespoke requests and inquiries.',
            icon: MessageSquare,
            action: 'Start Live Chat',
            available: true
        },
        {
            title: 'Priority Support',
            description: 'Dedicated assistance for Elite members.',
            icon: Phone,
            action: '+1 (800) LUMIERE',
            available: true
        },
        {
            title: 'Digital Inquiries',
            description: 'Send us a detailed message regarding your treasures.',
            icon: Mail,
            action: 'Email Us',
            available: true
        }
    ];

    const faqs = [
        'How do I track my bespoke shipment?',
        'What is the Lumière Lifetime Warranty?',
        'How to care for my diamond eternity band',
        'International delivery timelines'
    ];

    return (
        <div className="space-y-10">
            <div>
                <h2 className="text-2xl font-heading text-[#1E1E1E]">Client Service</h2>
                <p className="text-[#8C8C8C] text-sm font-light">At your service for every step of your journey.</p>
            </div>

            {/* Support Hero */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#F0EBE0] flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-[#C9A24D] shadow-sm flex-shrink-0">
                    <Navigation className="w-10 h-10" />
                </div>
                <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-xl font-heading text-[#1E1E1E]">Need immediate assistance?</h3>
                    <p className="text-sm text-[#595959] font-light max-w-md">
                        Our concierge team is available 24/7 to assist with order tracking, styling advice, or any technical inquiries.
                    </p>
                    <div className="pt-2">
                        <Button className="bg-[#C9A24D] hover:bg-[#B69143] text-white rounded-full px-8 h-10 text-xs font-bold uppercase tracking-widest">
                            Connect Now
                        </Button>
                    </div>
                </div>
            </div>

            {/* Support Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {supportOptions.map((option, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-[#F0EBE0] shadow-sm hover:shadow-md transition-all text-center space-y-4 flex flex-col items-center"
                    >
                        <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] flex items-center justify-center text-[#C9A24D]">
                            <option.icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-heading text-[#1E1E1E]">{option.title}</h4>
                            <p className="text-xs text-[#8C8C8C] font-light leading-relaxed">{option.description}</p>
                        </div>
                        <button className="mt-auto text-[10px] uppercase tracking-widest font-bold text-[#C9A24D] hover:underline">
                            {option.action}
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* FAQs & Documentation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-heading text-[#1E1E1E] flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-[#C9A24D]" />
                        Frequent Inquiries
                    </h3>
                    <div className="bg-white rounded-2xl border border-[#F0EBE0] divide-y divide-[#F0EBE0] overflow-hidden shadow-sm">
                        {faqs.map((faq, idx) => (
                            <button key={idx} className="w-full text-left p-4 text-xs text-[#595959] hover:bg-[#FAF7F2] transition-colors flex items-center justify-between group">
                                <span>{faq}</span>
                                <span className="text-[#C9A24D] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-heading text-[#1E1E1E] flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#C9A24D]" />
                        Legal & Heritage
                    </h3>
                    <div className="bg-white rounded-2xl border border-[#F0EBE0] divide-y divide-[#F0EBE0] overflow-hidden shadow-sm">
                        <button className="w-full text-left p-4 text-xs text-[#595959] hover:bg-[#FAF7F2] transition-colors">Shipping & Returns Policy</button>
                        <button className="w-full text-left p-4 text-xs text-[#595959] hover:bg-[#FAF7F2] transition-colors">Authenticity Guarantee</button>
                        <button className="w-full text-left p-4 text-xs text-[#595959] hover:bg-[#FAF7F2] transition-colors">Ethical Sourcing Statement</button>
                        <button className="w-full text-left p-4 text-xs text-[#595959] hover:bg-[#FAF7F2] transition-colors">Terms of Service</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
