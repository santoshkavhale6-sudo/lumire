"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { TrendingUp, DollarSign, ShoppingCart, Package, Download, Calendar } from 'lucide-react';
import { formattedPrice } from '@/lib/data';
import { getApiUrl } from '@/lib/api';

export default function AdminAnalytics() {
    const [timeframe, setTimeframe] = useState('week'); // week, month, year
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        avgOrderValue: 0,
        conversionRate: 0
    });
    const [salesData, setSalesData] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        fetch(getApiUrl('orders/analytics'))
            .then(res => res.json())
            .then(data => {
                setStats({
                    ...(data.stats || {}),
                    conversionRate: 3.2 // Hardcoded for now as we don't track visits yet
                });
                setSalesData(data.dailySales || []);
                setBestSellers(data.bestSellers || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Calculate max value for chart scaling
    const maxSales = salesData?.length > 0 ? Math.max(...salesData.map(d => d.sales)) : 10000;

    if (loading) return <AdminLayout>Loading Analytics...</AdminLayout>;

    return (
        <AdminLayout>
            <div className="space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold font-heading">Analytics & Reports</h1>
                        <p className="text-gray-500 text-sm">Track performance and gain insights</p>
                    </div>
                    <div className="flex gap-3">
                        <select
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white"
                        >
                            <option value="week">Last 7 Days</option>
                            <option value="month">Last 30 Days</option>
                            <option value="year">Last 12 Months</option>
                        </select>
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                            <Download className="w-4 h-4" /> Export Report
                        </button>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white">
                        <div className="flex items-center justify-between mb-2">
                            <DollarSign className="w-8 h-8 opacity-80" />
                            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">+12.5%</span>
                        </div>
                        <p className="text-sm opacity-90 uppercase font-bold">Total Revenue</p>
                        <p className="text-3xl font-bold mt-1">{formattedPrice(stats.totalRevenue)}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <ShoppingCart className="w-8 h-8 text-green-500 opacity-70" />
                            <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                        <p className="text-sm text-gray-500 uppercase font-bold">Total Orders</p>
                        <p className="text-3xl font-bold mt-1">{stats.totalOrders}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <Package className="w-8 h-8 text-purple-500 opacity-70" />
                        </div>
                        <p className="text-sm text-gray-500 uppercase font-bold">Avg Order Value</p>
                        <p className="text-3xl font-bold mt-1">{formattedPrice(stats.avgOrderValue)}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <TrendingUp className="w-8 h-8 text-orange-500 opacity-70" />
                        </div>
                        <p className="text-sm text-gray-500 uppercase font-bold">Conversion Rate</p>
                        <p className="text-3xl font-bold mt-1">{stats.conversionRate}%</p>
                    </div>
                </div>

                {/* Sales Chart */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold">Sales Overview</h3>
                        <div className="flex gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-primary rounded-sm"></span>
                                <span className="text-gray-600">Revenue</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-green-500 rounded-sm"></span>
                                <span className="text-gray-600">Orders</span>
                            </div>
                        </div>
                    </div>

                    {/* Simple Bar Chart */}
                    <div className="space-y-3">
                        {salesData.length === 0 ? <p className="text-gray-500 text-sm">No sales data for this period.</p> : salesData.map((day, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <span className="text-xs text-gray-500 w-12">{day._id}</span>
                                <div className="flex-1 flex gap-2">
                                    <div
                                        className="bg-primary/20 border-l-4 border-primary h-8 flex items-center px-2 rounded-r transition-all hover:bg-primary/30"
                                        style={{ width: `${(day.sales / maxSales) * 100}%` }}
                                    >
                                        <span className="text-xs font-medium text-gray-700">{formattedPrice(day.sales)}</span>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500 w-16 text-right">{day.orders} orders</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Best Selling Products */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
                        <div className="space-y-4">
                            {bestSellers.length === 0 ? <p className="text-gray-500 text-sm">No sales yet.</p> : bestSellers.map((product, idx) => (
                                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                                            idx === 1 ? 'bg-gray-100 text-gray-700' :
                                                idx === 2 ? 'bg-orange-100 text-orange-700' :
                                                    'bg-blue-100 text-blue-700'
                                            }`}>
                                            #{idx + 1}
                                        </span>
                                        <div>
                                            <p className="font-medium text-gray-900">{product.name}</p>
                                            <p className="text-xs text-gray-500">{product.units} units sold</p>
                                        </div>
                                    </div>
                                    <span className="font-medium">{formattedPrice(product.sales)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity / Quick Stats */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Quick Insights</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-600">Peak Sales Day</span>
                                <span className="font-medium text-green-600">Jan 7 (₹72,000)</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-600">Total Customers</span>
                                <span className="font-medium">143</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-600">Returning Customers</span>
                                <span className="font-medium">38% (54)</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-600">Products Sold</span>
                                <span className="font-medium">53 units</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600">Avg Delivery Time</span>
                                <span className="font-medium">3.2 days</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}
