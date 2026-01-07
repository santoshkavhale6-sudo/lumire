"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Lock, Shield, FileText, Download, QrCode, UserPlus,
    History, Landmark, Star, Eye, EyeOff, CheckCircle2,
    ShieldAlert, Fingerprint, Key, ArrowRight
} from 'lucide-react';
import { formattedPrice } from '@/lib/data';
import { getApiUrl } from '@/lib/api';
import { Button } from '@/components/ui/Button';

export default function LumiereVault() {
    const { user, loading } = useAuth();
    const [isLocked, setIsLocked] = useState(true);
    const [pin, setPin] = useState('');
    const [showPin, setShowPin] = useState(false);
    const [vaultData, setVaultData] = useState(null);

    const documents = [
        { title: 'GIA Certificate - Diamond Ring', type: 'Certificate', date: 'Oct 12, 2023', size: '2.4 MB' },
        { title: 'LUMIÈRE Authenticity Guarantee', type: 'Certificate', date: 'Dec 24, 2023', size: '1.2 MB' },
        { title: 'Professional Appraisal (Heritage)', type: 'Appraisal', date: 'Jan 05, 2024', size: '3.8 MB' },
        { title: 'Invoice #LUM-88219', type: 'Invoice', date: 'Oct 12, 2023', size: '0.8 MB' }
    ];

    const unlockVault = () => {
        if (pin === '1234') { // Mock PIN
            setIsLocked(false);
        } else {
            alert("Invalid Vault PIN. Access Denied.");
            setPin('');
        }
    };

    if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-[#8C8C8C] italic">Securing session...</div>;

    if (isLocked) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 bg-white border border-[#F0EBE0] rounded-[3rem] p-12 shadow-sm">
                <div className="w-20 h-20 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#C9A24D] border border-[#F0EBE0]">
                    <Lock className="w-10 h-10" />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-heading text-[#1E1E1E]">Private Vault Access</h2>
                    <p className="text-[#8C8C8C] text-sm font-light">Verify your identity to unlock your digital certificates and heritage documents.</p>
                </div>
                <div className="w-full max-w-xs space-y-6">
                    <div className="relative">
                        <input
                            type={showPin ? 'text' : 'password'}
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="Enter 4-digit PIN"
                            className="w-full bg-[#FAF7F2] border border-[#F0EBE0] rounded-2xl px-6 py-4 text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-1 focus:ring-[#C9A24D]"
                            maxLength={4}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPin(!showPin)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C8C8C]"
                        >
                            {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    <Button
                        onClick={unlockVault}
                        className="w-full h-14 bg-[#1E1E1E] hover:bg-[#2D2D2D] text-white rounded-2xl flex items-center justify-center gap-3 group"
                    >
                        <Fingerprint className="w-5 h-5 text-[#C9A24D]" />
                        <span className="text-xs uppercase tracking-widest font-bold">Biometric Unlock</span>
                    </Button>
                    <p className="text-center text-[10px] text-[#8C8C8C] uppercase tracking-widest cursor-pointer hover:text-[#C9A24D]">Forgotten your PIN?</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-10"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-heading text-[#1E1E1E]">Digital Heritage Vault</h2>
                    <p className="text-[#8C8C8C] text-sm font-light">Bank-grade encryption for your most precious artifacts.</p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => setIsLocked(true)}
                    className="border-[#F0EBE0] text-[#8C8C8C] rounded-full px-6 flex items-center gap-2 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
                >
                    <Lock className="w-4 h-4" /> Secure Vault
                </Button>
            </div>

            {/* Financial Overview Overlay */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1E1E1E] rounded-3xl p-8 text-white relative h-48 flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-6 opacity-10"><Landmark className="w-20 h-20 text-[#C9A24D]" /></div>
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-[#C9A24D] font-bold">Lounge Balance</p>
                        <h3 className="text-3xl font-heading">{formattedPrice(user?.wallet?.balance || 50000)}</h3>
                    </div>
                    <Button variant="link" className="text-[#C9A24D] p-0 h-auto justify-start text-[10px] uppercase tracking-widest font-bold">Add Credits →</Button>
                </div>
                <div className="bg-white rounded-3xl p-8 border border-[#F0EBE0] shadow-sm h-48 flex flex-col justify-between">
                    <p className="text-[10px] uppercase tracking-widest text-[#C9A24D] font-bold">Loyalty Level</p>
                    <div>
                        <h3 className="text-3xl font-heading text-[#1E1E1E]">Platinum Elite</h3>
                        <p className="text-xs text-[#8C8C8C] italic">Member since 2023</p>
                    </div>
                </div>
                <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#F0EBE0] h-48 flex flex-col justify-between cursor-pointer group hover:bg-[#C9A24D] hover:text-white transition-all">
                    <p className="text-[10px] uppercase tracking-widest text-[#C9A24D] group-hover:text-white/80 font-bold">Digital Identity</p>
                    <div className="flex items-center gap-4">
                        <QrCode className="w-12 h-12" />
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest">Verify Ownership</p>
                            <p className="text-[10px] opacity-60">Scan to verify jewels in public.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Document Locker */}
            <div className="bg-white rounded-[2.5rem] border border-[#F0EBE0] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-[#F0EBE0] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-[#C9A24D]" />
                        <h3 className="text-xl font-heading">Secure Artifact Documents</h3>
                    </div>
                    <Button className="bg-[#FAF7F2] text-[#C9A24D] hover:bg-[#C9A24D] hover:text-white rounded-xl px-6 flex items-center gap-2 border border-[#C9A24D]/10">
                        Upload Document
                    </Button>
                </div>
                <div className="divide-y divide-[#FAF7F2]">
                    {documents.map((doc, idx) => (
                        <div key={idx} className="p-6 flex items-center justify-between hover:bg-[#FAF7F2] transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl border border-[#F0EBE0] text-[#8C8C8C] group-hover:text-[#C9A24D] group-hover:border-[#C9A24D]/30 transition-all">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div className="space-y-1">
                                    <h5 className="text-sm font-medium text-[#1E1E1E]">{doc.title}</h5>
                                    <p className="text-[10px] text-[#8C8C8C] uppercase tracking-widest font-bold">
                                        {doc.type} • {doc.date} • {doc.size}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 bg-white rounded-lg border border-[#F0EBE0] text-[#8C8C8C] hover:text-[#C9A24D] hover:border-[#C9A24D]/30"><Eye className="w-4 h-4" /></button>
                                <button className="p-2 bg-white rounded-lg border border-[#F0EBE0] text-[#8C8C8C] hover:text-[#C9A24D] hover:border-[#C9A24D]/30"><Download className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Legacy & Nominees */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-[#1E1E1E] to-[#2D2D2D] rounded-3xl p-10 text-white space-y-6 relative overflow-hidden">
                    <div className="absolute right-[-20px] bottom-[-20px] opacity-10"><UserPlus className="w-40 h-40" /></div>
                    <div className="relative z-10 space-y-4">
                        <div className="px-3 py-1 bg-white/10 rounded-full border border-white/5 backdrop-blur-sm w-fit">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C9A24D]">Nominee System</span>
                        </div>
                        <h3 className="text-2xl font-heading leading-tight">Secure your heritage for the next generation.</h3>
                        <p className="text-sm text-gray-400 font-light leading-relaxed">
                            Assign a legacy nominee who can gain access to your vault documents and ownership records in an emergency or as part of your estate.
                        </p>
                        <Button className="bg-[#C9A24D] hover:bg-[#B69143] text-white rounded-xl px-8 group font-bold">
                            Add Legacy Nominee <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-all" />
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-10 border border-[#F0EBE0] shadow-sm space-y-6">
                    <h3 className="text-xl font-heading text-[#1E1E1E]">Vault Audit Log</h3>
                    <div className="space-y-4">
                        {[
                            { action: 'Vault Unlocked', time: '2 mins ago', icon: Eye },
                            { action: 'GIA Certificate Downloaded', time: '1 day ago', icon: Download },
                            { action: 'PIN Changed Successfully', time: '3 days ago', icon: Key }
                        ].map((log, i) => (
                            <div key={i} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-3">
                                    <log.icon className="w-4 h-4 text-[#C9A24D]" />
                                    <span className="text-[#595959] font-medium">{log.action}</span>
                                </div>
                                <span className="text-[#8C8C8C]">{log.time}</span>
                            </div>
                        ))}
                    </div>
                    <div className="pt-6 border-t border-[#FAF7F2]">
                        <p className="text-[10px] text-[#8C8C8C] uppercase tracking-[0.2em] font-bold">
                            Encryption Status: AES-256 + RSA-4096 Active
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
