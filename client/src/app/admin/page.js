"use client";

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const StatCard = ({ title, value, icon: Icon, trend }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
            <div className="p-2 bg-primary/5 rounded-full text-primary">
                <Icon className="w-5 h-5" />
            </div>
        </div>
        <div className="flex items-end justify-between">
            <div className="text-2xl font-semibold">{value}</div>
            <div className="text-xs font-medium text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {trend}
            </div>
        </div>
    </div>
);

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || user.role !== 'admin')) {
            router.push('/');
        }
    }, [user, loading, router]);

    if (loading || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Revenue" value="₹4,25,000" icon={DollarSign} trend="+12.5%" />
                <StatCard title="Total Orders" value="145" icon={ShoppingBag} trend="+8.2%" />
                <StatCard title="Total Customers" value="89" icon={Users} trend="+4.3%" />
                <StatCard title="Avg. Order Value" value="₹2,930" icon={TrendingUp} trend="+2.1%" />
            </div>

            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold">
                                    JD
                                </div>
                                <div>
                                    <p className="text-sm font-medium">John Doe placed an order</p>
                                    <p className="text-xs text-gray-500">2 minutes ago</p>
                                </div>
                            </div>
                            <span className="text-sm font-medium">₹12,400</span>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
