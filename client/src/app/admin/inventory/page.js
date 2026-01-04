"use client";

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Package, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { formattedPrice } from '@/lib/data';
import { getApiUrl } from '@/lib/api';

export default function AdminInventory() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, low, out

    useEffect(() => {
        fetch(getApiUrl('products'))
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const lowStockProducts = products.filter(p => p.countInStock > 0 && p.countInStock <= (p.lowStockThreshold || 5));
    const outOfStockProducts = products.filter(p => p.countInStock === 0);
    const healthyStockProducts = products.filter(p => p.countInStock > (p.lowStockThreshold || 5));

    const filteredProducts = filter === 'low'
        ? lowStockProducts
        : filter === 'out'
            ? outOfStockProducts
            : products;

    return (
        <AdminLayout>
            <div className="space-y-6">

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold font-heading">Inventory Management</h1>
                    <p className="text-gray-500 text-sm">Monitor stock levels and receive low-stock alerts</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 uppercase font-bold">Total Products</p>
                                <p className="text-3xl font-bold mt-2">{products.length}</p>
                            </div>
                            <Package className="w-10 h-10 text-blue-500 opacity-20" />
                        </div>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-700 uppercase font-bold">Healthy Stock</p>
                                <p className="text-3xl font-bold mt-2 text-green-600">{healthyStockProducts.length}</p>
                            </div>
                            <TrendingUp className="w-10 h-10 text-green-500 opacity-30" />
                        </div>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-yellow-700 uppercase font-bold">Low Stock</p>
                                <p className="text-3xl font-bold mt-2 text-yellow-600">{lowStockProducts.length}</p>
                            </div>
                            <AlertTriangle className="w-10 h-10 text-yellow-500 opacity-30" />
                        </div>
                    </div>
                    <div className="bg-red-50 p-6 rounded-lg border border-red-200 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-red-700 uppercase font-bold">Out of Stock</p>
                                <p className="text-3xl font-bold mt-2 text-red-600">{outOfStockProducts.length}</p>
                            </div>
                            <TrendingDown className="w-10 h-10 text-red-500 opacity-30" />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    {[
                        { label: 'All Products', value: 'all' },
                        { label: 'Low Stock', value: 'low', badge: lowStockProducts.length },
                        { label: 'Out of Stock', value: 'out', badge: outOfStockProducts.length }
                    ].map(item => (
                        <button
                            key={item.value}
                            onClick={() => setFilter(item.value)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${filter === item.value
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {item.label}
                            {item.badge !== undefined && (
                                <span className={`px-2 py-0.5 rounded-full text-xs ${filter === item.value ? 'bg-white/20' : 'bg-gray-200'
                                    }`}>
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Inventory Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">SKU</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4">Alert Level</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan="7" className="p-8 text-center">Loading inventory...</td></tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr><td colSpan="7" className="p-8 text-center text-gray-500">No products found.</td></tr>
                            ) : filteredProducts.map((product) => {
                                const isLowStock = product.countInStock > 0 && product.countInStock <= (product.lowStockThreshold || 5);
                                const isOutOfStock = product.countInStock === 0;

                                return (
                                    <tr key={product._id} className={`hover:bg-gray-50/50 ${isOutOfStock ? 'bg-red-50/30' : isLowStock ? 'bg-yellow-50/30' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-md border border-gray-100" />
                                                <span className="font-medium text-gray-900">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-gray-600">{product.sku || 'N/A'}</td>
                                        <td className="px-6 py-4 capitalize text-gray-600">{product.category}</td>
                                        <td className="px-6 py-4 font-medium">{formattedPrice(product.price)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`font-bold ${isOutOfStock ? 'text-red-600' : isLowStock ? 'text-yellow-600' : 'text-gray-900'}`}>
                                                {product.countInStock}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{product.lowStockThreshold || 5}</td>
                                        <td className="px-6 py-4">
                                            {isOutOfStock ? (
                                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                                    Out of Stock
                                                </span>
                                            ) : isLowStock ? (
                                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                                                    <AlertTriangle className="w-3 h-3" />
                                                    Low Stock
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                    Healthy
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
