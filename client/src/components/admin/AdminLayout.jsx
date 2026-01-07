"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Users, ShoppingCart, Settings, LogOut, BarChart3, Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const { logout } = useAuth();

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Products', href: '/admin/products', icon: Package },
        { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
        { name: 'Customers', href: '/admin/customers', icon: Users },
        { name: 'Relationship Mgr', href: '/admin/persuasion', icon: Heart },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
        { name: 'Settings', href: '/admin/settings', icon: Settings }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10 hidden md:block">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <span className="text-xl font-heading font-bold tracking-widest">LUMIÈRE</span>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
                                    isActive
                                        ? "bg-primary/5 text-primary"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-4 left-4 right-4 border-t border-gray-100 pt-4">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 w-full transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 md:ml-64">
                <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-20 px-8 flex items-center justify-between">
                    <h2 className="text-lg font-medium capitalize">{pathname?.split('/').pop() || 'Dashboard'}</h2>
                    <div className="text-sm text-gray-500">Admin Mode</div>
                </header>

                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
