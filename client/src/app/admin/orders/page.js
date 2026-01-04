"use client";

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Search, Filter, Eye, FileText, Truck } from 'lucide-react';
import { mockOrders } from '@/lib/mockData';
import { formattedPrice } from '@/lib/data';

const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Processing': 'bg-blue-100 text-blue-800',
    'Shipped': 'bg-purple-100 text-purple-800',
    'Delivered': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800',
    'Returned': 'bg-gray-100 text-gray-800',
};

export default function AdminOrders() {
    // using mockData for UI dev, connect to API later
    const [orders, setOrders] = useState(mockOrders);
    const [filterStatus, setFilterStatus] = useState('All');

    const filteredOrders = filterStatus === 'All'
        ? orders
        : orders.filter(o => o.orderStatus === filterStatus);

    return (
        <AdminLayout>
            <div className="flex flex-col gap-6">

                {/* Header & Actions */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold font-heading">Order Management</h1>
                        <p className="text-gray-500 text-sm">Manage and track customer orders</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Export Report
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-4 items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Order ID, Customer..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['All', 'Pending', 'Processing', 'Delivered'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filterStatus === status
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Payment</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="p-8 text-center text-gray-500">No orders found.</td>
                                </tr>
                            ) : filteredOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium font-mono text-xs">{order._id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900">{order.user.name}</span>
                                            <span className="text-xs text-gray-500">{order.user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {formattedPrice(order.totalPrice)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.orderStatus] || 'bg-gray-100'}`}>
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${order.isPaid ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700 border border-orange-100'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${order.isPaid ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                                            {order.isPaid ? 'Paid' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button title="View Details" className="p-2 text-gray-400 hover:text-primary transition-colors bg-gray-50 rounded-md hover:bg-white border border-transparent hover:border-gray-200 shadow-sm">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button title="Invoice" className="p-2 text-gray-400 hover:text-blue-600 transition-colors bg-gray-50 rounded-md hover:bg-white border border-transparent hover:border-gray-200 shadow-sm">
                                                <FileText className="w-4 h-4" />
                                            </button>
                                            {order.orderStatus !== 'Delivered' && (
                                                <button title="Ship / Track" className="p-2 text-gray-400 hover:text-purple-600 transition-colors bg-gray-50 rounded-md hover:bg-white border border-transparent hover:border-gray-200 shadow-sm">
                                                    <Truck className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
