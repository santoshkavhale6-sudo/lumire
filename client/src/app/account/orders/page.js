"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Award, History, RefreshCw, Download, Zap, FileCheck, HelpCircle } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { formattedPrice } from '@/lib/data';

export default function MyTreasures() {
    const [selectedTreasure, setSelectedTreasure] = useState(null);

    // Mock data for the "Private Museum"
    const treasures = [
        {
            id: 'T1',
            name: 'Solitaire Diamond Engagement Ring',
            image: 'https://images.unsplash.com/photo-1605100804763-247f67b3f41e?q=80&w=800&auto=format&fit=crop',
            purchaseDate: 'October 12, 2023',
            purchasePrice: 450000,
            appraisalValue: 485000,
            status: 'Owned',
            certificates: [
                { type: 'GIA', number: 'GIA 2456789123', date: 'Sept 20, 2023' },
                { type: 'BIS Hallmark', number: 'BIS-MUM-9982', date: 'Oct 01, 2023' }
            ],
            history: [
                { date: 'Oct 15, 2023', event: 'Acquired at Mumbai Flagship', type: 'Purchase' },
                { date: 'Jan 10, 2024', event: 'Professional Steam Cleaning', type: 'Service' }
            ],
            warranty: 'Lifetime Heritage Warranty'
        },
        {
            id: 'T2',
            name: 'Rose Gold Eternity Band',
            image: 'https://images.unsplash.com/photo-1543160732-2d15ab462612?q=80&w=800&auto=format&fit=crop',
            purchaseDate: 'Dec 24, 2023',
            purchasePrice: 125000,
            appraisalValue: 132000,
            status: 'Owned',
            certificates: [
                { type: 'Brand Certificate', number: 'LUM-ET-0091', date: 'Dec 20, 2023' }
            ],
            history: [
                { date: 'Dec 24, 2023', event: 'Seasonal Gifting', type: 'Purchase' }
            ],
            warranty: '5-Year Coverage'
        }
    ];

    return (
        <div className="space-y-10">
            <div>
                <h2 className="text-3xl font-heading text-[#1E1E1E]">My Treasures</h2>
                <p className="text-[#8C8C8C] text-sm font-light italic">A private curation of your heritage and legacies.</p>
            </div>

            {/* Museum Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {treasures.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white rounded-[2rem] border border-[#F0EBE0] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group"
                        onClick={() => setSelectedTreasure(item)}
                    >
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF7F2]">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] uppercase tracking-widest font-bold text-[#C9A24D] border border-[#C9A24D]/20">
                                {item.status}
                            </div>
                        </div>
                        <div className="p-8 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-heading text-[#1E1E1E] group-hover:text-[#C9A24D] transition-colors">{item.name}</h3>
                                    <p className="text-xs text-[#8C8C8C] font-light">Acquired on {item.purchaseDate}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-[#8C8C8C] uppercase tracking-widest font-bold">Appraisal</p>
                                    <p className="text-lg font-heading text-[#C9A24D]">{formattedPrice(item.appraisalValue)}</p>
                                </div>
                            </div>
                            <div className="pt-4 flex gap-3 border-t border-[#FAF7F2]">
                                <Button variant="outline" className="flex-1 rounded-xl h-10 text-[10px] uppercase tracking-widest font-bold border-[#F0EBE0] text-[#595959]">View Artifact</Button>
                                <Button className="flex-1 rounded-xl h-10 text-[10px] uppercase tracking-widest font-bold bg-[#FAF7F2] text-[#C9A24D] hover:bg-[#C9A24D] hover:text-white border-none">Service History</Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Treasure Detailed Modal */}
            <AnimatePresence>
                {selectedTreasure && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                            onClick={() => setSelectedTreasure(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white w-full max-w-4xl h-[90vh] rounded-[3rem] overflow-hidden relative z-10 flex flex-col md:flex-row"
                        >
                            <button
                                onClick={() => setSelectedTreasure(null)}
                                className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                            >
                                <Zap className="w-5 h-5 rotate-45" />
                            </button>

                            <div className="md:w-1/2 relative bg-[#FAF7F2]">
                                <Image
                                    src={selectedTreasure.image}
                                    alt={selectedTreasure.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="md:w-1/2 p-10 overflow-y-auto space-y-8 bg-[#FDFCFB]">
                                <div>
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C9A24D]">Archive ID: {selectedTreasure.id}</span>
                                    <h2 className="text-3xl font-heading text-[#1E1E1E] mt-2">{selectedTreasure.name}</h2>
                                    <p className="text-sm text-[#8C8C8C] mt-2">A masterwork of handcrafted brilliance.</p>
                                </div>

                                {/* Certificates */}
                                <div className="space-y-4">
                                    <h4 className="text-xs uppercase tracking-widest font-bold text-[#1E1E1E] flex items-center gap-2">
                                        <Award className="w-4 h-4 text-[#C9A24D]" />
                                        Digital Certificates
                                    </h4>
                                    <div className="space-y-3">
                                        {selectedTreasure.certificates.map((cert, i) => (
                                            <div key={i} className="bg-white p-4 rounded-2xl border border-[#F0EBE0] flex items-center justify-between shadow-sm">
                                                <div>
                                                    <p className="text-xs font-bold text-[#1E1E1E]">{cert.type}</p>
                                                    <p className="text-[10px] text-[#8C8C8C]">{cert.number}</p>
                                                </div>
                                                <button className="p-2 bg-[#FAF7F2] rounded-lg text-[#C9A24D] hover:bg-[#C9A24D] hover:text-white transition-all">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Care & Warranty */}
                                <div className="p-6 bg-[#1E1E1E] rounded-3xl text-white space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#C9A24D]/20 flex items-center justify-center">
                                            <Shield className="w-4 h-4 text-[#C9A24D]" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest font-bold text-[#C9A24D]">{selectedTreasure.warranty}</p>
                                            <p className="text-[10px] text-gray-400">Lifetime protection for your artifact.</p>
                                        </div>
                                    </div>
                                    <Button className="w-full bg-[#C9A24D] hover:bg-[#B69143] text-white rounded-xl h-10 text-[10px] uppercase tracking-widest font-bold border-none transition-all">
                                        Request Professional Care
                                    </Button>
                                </div>

                                {/* History Timeline */}
                                <div className="space-y-4">
                                    <h4 className="text-xs uppercase tracking-widest font-bold text-[#1E1E1E] flex items-center gap-2">
                                        <History className="w-4 h-4 text-[#C9A24D]" />
                                        Artifact History
                                    </h4>
                                    <div className="space-y-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-[#F0EBE0]">
                                        {selectedTreasure.history.map((event, i) => (
                                            <div key={i} className="flex gap-4 relative">
                                                <div className="w-[22px] h-[22px] rounded-full bg-white border border-[#C9A24D] flex-shrink-0 z-10" />
                                                <div className="space-y-1">
                                                    <p className="text-[10px] text-[#8C8C8C] font-bold">{event.date}</p>
                                                    <p className="text-xs text-[#1E1E1E] font-medium">{event.event}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
