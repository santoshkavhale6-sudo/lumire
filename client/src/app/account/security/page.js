"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Smartphone, Monitor, ShieldCheck, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AccountSecurity() {
    const [mfaEnabled, setMfaEnabled] = useState(false);

    const activeSessions = [
        {
            device: 'Desktop (Chrome, Windows)',
            location: 'Mumbai, India',
            status: 'Current Session',
            icon: Monitor,
            isActive: true
        },
        {
            device: 'iPhone 15 Pro (Safari)',
            location: 'Mumbai, India',
            status: 'Active 2 hours ago',
            icon: Smartphone,
            isActive: false
        }
    ];

    return (
        <div className="space-y-10">
            <div>
                <h2 className="text-2xl font-heading text-[#1E1E1E]">Vault Security</h2>
                <p className="text-[#8C8C8C] text-sm font-light">Protect your account and your digital treasures.</p>
            </div>

            {/* Authentication Section */}
            <div className="bg-white rounded-2xl border border-[#F0EBE0] overflow-hidden shadow-sm">
                <div className="p-6 border-b border-[#F0EBE0] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#C9A24D]">
                            <Key className="w-5 h-4" />
                        </div>
                        <div>
                            <h4 className="font-heading text-[#1E1E1E]">Account Password</h4>
                            <p className="text-xs text-[#8C8C8C]">Last updated 4 months ago</p>
                        </div>
                    </div>
                    <Button variant="outline" className="border-[#F0EBE0] text-xs uppercase tracking-widest font-bold h-9">
                        Update
                    </Button>
                </div>

                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#C9A24D]">
                            <Fingerprint className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-heading text-[#1E1E1E]">Two-Factor Authentication</h4>
                            <p className="text-xs text-[#8C8C8C]">Enhance security with a unique login code</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setMfaEnabled(!mfaEnabled)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${mfaEnabled ? 'bg-[#C9A24D]' : 'bg-[#E5E5E5]'}`}
                    >
                        <motion.div
                            animate={{ x: mfaEnabled ? 26 : 2 }}
                            className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                    </button>
                </div>
            </div>

            {/* Active Sessions */}
            <div className="space-y-4">
                <h3 className="text-lg font-heading text-[#1E1E1E]">Active Sessions</h3>
                <div className="space-y-3">
                    {activeSessions.map((session, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-2xl border border-[#F0EBE0] flex items-center justify-between group shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] flex items-center justify-center text-gray-400">
                                    <session.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h5 className="text-sm font-medium text-[#1E1E1E]">{session.device}</h5>
                                    <p className="text-xs text-[#8C8C8C]">{session.location} • <span className={session.isActive ? 'text-[#C9A24D]' : ''}>{session.status}</span></p>
                                </div>
                            </div>
                            {!session.isActive && (
                                <button className="text-[10px] uppercase tracking-widest font-bold text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Revoke
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Privacy Shield */}
            <div className="p-8 bg-gradient-to-br from-[#1E1E1E] to-[#2D2D2D] rounded-3xl text-white flex items-center gap-8 relative overflow-hidden">
                <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                    <ShieldCheck className="w-48 h-48" />
                </div>
                <div className="relative z-10 space-y-4 max-w-lg">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/5 backdrop-blur-sm">
                        <ShieldCheck className="w-3 h-3 text-[#C9A24D]" />
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold">Privacy Guard Active</span>
                    </div>
                    <h3 className="text-2xl font-heading leading-tight">Your data is encrypted with boutique-level security.</h3>
                    <p className="text-sm text-gray-400 font-light leading-relaxed">
                        At LUMIÈRE, we handle your personal information with the same care as our most precious stones. No data is ever shared with third parties without your explicit consent.
                    </p>
                    <button className="text-xs font-bold uppercase tracking-widest text-[#C9A24D] hover:text-[#D4B06A] transition-colors">
                        Review Privacy Policy →
                    </button>
                </div>
            </div>
        </div>
    );
}
