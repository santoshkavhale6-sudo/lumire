"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Shield, Key, Smartphone, Fingerprint, Eye,
    History, Monitor, Globe, ShieldAlert, CheckCircle2,
    Lock, RefreshCw, AlertTriangle, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function BankingGradeSecurity() {
    const [is2FAEnabled, setIs2FAEnabled] = useState(true);
    const [kycStatus, setKycStatus] = useState('Verified'); // Pending | Verified | Unverified

    const activeSessions = [
        { device: 'iPhone 15 Pro', location: 'Mumbai, India', date: 'Active Now', icon: Smartphone },
        { device: 'MacBook Pro 16"', location: 'London, UK', date: 'Oct 12, 2023', icon: Monitor },
        { device: 'iPad Pro', location: 'Dubai, UAE', date: 'Sept 30, 2023', icon: Smartphone }
    ];

    return (
        <div className="space-y-12">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-heading text-[#1E1E1E]">Security Hub</h2>
                <p className="text-[#8C8C8C] text-sm font-light italic">Banking-grade protection for your digital heritage.</p>
            </div>

            {/* KYC & Identity Status */}
            <div className="bg-[#FAF7F2] rounded-[2.5rem] p-10 border border-[#F0EBE0] flex flex-col md:flex-row items-center gap-10">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-[#C9A24D] shadow-sm relative">
                    <ShieldCheck className="w-12 h-12" />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full border-4 border-white">
                        <CheckCircle2 className="w-4 h-4" />
                    </div>
                </div>
                <div className="flex-1 space-y-2 text-center md:text-left">
                    <div className="flex items-center gap-3 justify-center md:justify-start">
                        <h3 className="text-2xl font-heading text-[#1E1E1E]">Identity Status: {kycStatus}</h3>
                        <span className="px-3 py-1 bg-green-500/10 text-green-600 text-[10px] uppercase tracking-widest font-bold rounded-full border border-green-500/20">Legacy Verified</span>
                    </div>
                    <p className="text-sm text-[#595959] font-light max-w-lg">
                        Your identity has been verified to the highest luxury standards, enabling unlimited vault access and priority heritage transfers.
                    </p>
                </div>
                <Button variant="outline" className="border-[#F0EBE0] text-[#8C8C8C] rounded-full px-8 h-12 uppercase tracking-widest font-bold text-[10px]">
                    Manage Documents
                </Button>
            </div>

            {/* Security Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 2FA Card */}
                <div className="bg-white p-8 rounded-3xl border border-[#F0EBE0] shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] flex items-center justify-center text-[#C9A24D]">
                                <Smartphone className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-heading text-[#1E1E1E]">Two-Factor Auth</h4>
                        </div>
                        <button
                            onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${is2FAEnabled ? 'bg-[#C9A24D]' : 'bg-gray-200'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${is2FAEnabled ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>
                    <p className="text-xs text-[#8C8C8C] leading-relaxed">Secure your logins with a secondary code sent to your trusted mobile device.</p>
                    <div className="pt-4 flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-[#C9A24D]">
                        <span>Status: {is2FAEnabled ? 'Active' : 'Inactive'}</span>
                        <span className="cursor-pointer hover:underline">Change Settings</span>
                    </div>
                </div>

                {/* Vault PIN Card */}
                <div className="bg-white p-8 rounded-3xl border border-[#F0EBE0] shadow-sm space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] flex items-center justify-center text-[#C9A24D]">
                            <Key className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-heading text-[#1E1E1E]">Vault Secure PIN</h4>
                    </div>
                    <p className="text-xs text-[#8C8C8C] leading-relaxed">A secondary pin required to unlock digital certificates and heritage documents.</p>
                    <div className="pt-4">
                        <Button className="w-full bg-[#FAF7F2] text-[#C9A24D] border border-[#C9A24D]/10 hover:bg-[#C9A24D] hover:text-white rounded-xl h-10 text-[10px] uppercase tracking-widest font-bold">
                            Update Vault PIN
                        </Button>
                    </div>
                </div>
            </div>

            {/* Session Management */}
            <div className="bg-white rounded-[2.5rem] border border-[#F0EBE0] shadow-sm overflow-hidden">
                <div className="p-8 border-b border-[#F0EBE0] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <History className="w-6 h-6 text-[#C9A24D]" />
                        <h3 className="text-xl font-heading">Active Heritage Sessions</h3>
                    </div>
                    <button className="text-[10px] uppercase tracking-widest font-bold text-red-500 hover:underline">Terminate All</button>
                </div>
                <div className="divide-y divide-[#FAF7F2]">
                    {activeSessions.map((session, i) => (
                        <div key={i} className="p-6 flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-[#FAF7F2] rounded-xl text-[#8C8C8C] group-hover:text-[#C9A24D] transition-all">
                                    <session.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h5 className="text-sm font-medium text-[#1E1E1E]">{session.device}</h5>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Globe className="w-3 h-3 text-[#C9A24D]" />
                                        <span className="text-[10px] text-[#8C8C8C]">{session.location} • Login: {session.date}</span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="outline" className="h-8 text-[9px] uppercase tracking-widest font-bold border-[#F0EBE0] hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                Log Out
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Emergency Protocols */}
            <div className="bg-red-50/50 rounded-3xl p-10 border border-red-100 space-y-6">
                <div className="flex items-center gap-3 text-red-600">
                    <ShieldAlert className="w-6 h-6" />
                    <h3 className="text-xl font-heading">Emergency Protocols</h3>
                </div>
                <div className="flex flex-col md:flex-row gap-10 items-center justify-between">
                    <p className="text-sm text-red-800/80 font-light flex-1 leading-relaxed">
                        In the event of suspected compromise, you may instantly freeze your lounge account. This will lock your vault, pause all pending orders, and notify your dedicated relationship manager immediately.
                    </p>
                    <Button className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-10 h-14 uppercase tracking-widest font-bold text-xs shadow-lg shadow-red-600/20">
                        Freeze Account
                    </Button>
                </div>
            </div>

            {/* Security Audit */}
            <div className="flex justify-center pt-8">
                <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8C8C]">
                    <div className="flex items-center gap-2"><Lock className="w-3 h-3" /> Encrypted RSA-4096</div>
                    <div className="flex items-center gap-2"><RefreshCw className="w-3 h-3" /> Real-time Monitoring</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> PCI Compliant</div>
                </div>
            </div>
        </div>
    );
}
