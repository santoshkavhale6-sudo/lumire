"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Package, ChevronRight, Search, Filter } from 'lucide-react';
import { formattedPrice } from '@/lib/data';
import { getApiUrl } from '@/lib/api';
import Link from 'next/link';

export default function MyTreasures() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(getApiUrl('orders/myorders'), {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user]);

    if (loading) return <div>Recalling your acquisitions...</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-heading text-[#1E1E1E]">My Treasures</h2>
                    <p className="text-[#8C8C8C] text-sm font-light">History of your handcrafted acquisitions.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <input className="pl-10 pr-4 py-3 bg-white border border-[#F0EBE0] rounded-xl text-xs w-full outline-none focus:border-[#C9A24D]" placeholder="Search IDs..." />
                        <Search className="w-4 h-4 absolute left-3 top-3.5 text-[#8C8C8C]" />
                    </div>
                    <Button variant="outline" className="rounded-xl px-4"><Filter className="w-4 h-4" /></Button>
                </div>
            </div>

            <div className="space-y-4">
                {orders.map((order) => (
                    <Link key={order._id} href={`/order/${order._id}`}>
                        <div className="bg-white p-6 rounded-2xl border border-[#F0EBE0] shadow-sm hover:shadow-md hover:border-[#C9A24D]/20 transition-all group">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-[#FAF7F2] rounded-xl flex items-center justify-center text-[#C9A24D]">
                                        <Package className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-[#1E1E1E]">Order #{order._id.slice(-8).toUpperCase()}</p>
                                        <p className="text-xs text-[#8C8C8C] font-light mt-1">Acquired on {new Date(order.createdAt).toLocaleDateString()} • {order.orderItems.length} Item(s)</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between md:justify-end gap-12">
                                    <div className="text-left md:text-right">
                                        <p className="text-sm font-bold text-[#1E1E1E]">{formattedPrice(order.totalPrice)}</p>
                                        <span className={`text-[10px] uppercase tracking-widest font-bold ${order.isPaid ? 'text-green-600' : 'text-blue-500'}`}>
                                            {order.isPaid ? 'Payment Confirmed' : 'Payment Processing'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[#C9A24D] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                        View Details <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                {orders.length === 0 && (
                    <div className="py-20 bg-white border-2 border-dashed border-[#F0EBE0] rounded-3xl flex flex-col items-center justify-center text-center">
                        <Package className="w-12 h-12 text-[#F0EBE0] mb-4" />
                        <p className="text-[#8C8C8C] font-light">No treasures acquired yet.</p>
                        <Link href="/shop">
                            <Button variant="link" className="text-[#C9A24D]">Begin your collection</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
