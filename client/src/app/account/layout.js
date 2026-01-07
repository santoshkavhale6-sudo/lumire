"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
    User,
    Package,
    Heart,
    MapPin,
    Wallet,
    Gift,
    Bell,
    Shield,
    LifeBuoy,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const NavLink = ({ href, icon: Icon, label, active }) => (
    <Link href={href}>
        <div className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 group
            ${active ? 'bg-[#C9A24D] text-white shadow-lg shadow-[#C9A24D]/20' : 'hover:bg-[#FAF7F2] text-[#595959]'}`}>
            <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${active ? 'text-white' : 'group-hover:text-[#C9A24D] transition-colors'}`} />
                <span className="text-sm font-medium">{label}</span>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform ${active ? 'scale-100' : 'scale-0 group-hover:scale-100'}`} />
        </div>
    </Link>
);

export default function AccountLayout({ children }) {
    const pathname = usePathname();
    const { logout } = useAuth();

    const menuItems = [
        { href: '/account', icon: User, label: 'Lounge Overview' },
        { href: '/account/orders', icon: Package, label: 'My Treasures' },
        { href: '/account/wishlist', icon: Heart, label: 'Wishlist' },
        { href: '/account/gifts', icon: Gift, label: 'Gift Center' },
        { href: '/account/wallet', icon: Wallet, label: 'Lumière Vault' },
        { href: '/account/addresses', icon: MapPin, label: 'Address Book' },
        { href: '/account/notifications', icon: Bell, label: 'Alerts' },
        { href: '/account/security', icon: Shield, label: 'Security' },
        { href: '/account/support', icon: LifeBuoy, label: 'Client Service' },
    ];

    return (
        <div className="min-h-screen bg-[#FAF7F2]">
            <Header />

            <main className="pt-32 pb-24 container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sidebar */}
                    <aside className="lg:col-span-3">
                        <div className="bg-white rounded-2xl p-6 border border-[#F0EBE0] shadow-sm sticky top-32">
                            <div className="space-y-1">
                                {menuItems.map((item) => (
                                    <NavLink
                                        key={item.href}
                                        href={item.href}
                                        icon={item.icon}
                                        label={item.label}
                                        active={pathname === item.href}
                                    />
                                ))}

                                <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-3 p-4 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-300 mt-4"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span className="text-sm font-medium">Exit Lounge</span>
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="lg:col-span-9">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {children}
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
