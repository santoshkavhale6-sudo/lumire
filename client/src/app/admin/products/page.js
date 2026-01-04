"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { formattedPrice } from '@/lib/data';
import { getApiUrl } from '@/lib/api';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        // Logic to delete would go here (requires backend delete endpoint)
        alert('Delete feature coming in next step!');
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products</h1>
                <Link href="/admin/products/new">
                    <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add Product
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Stock</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan="5" className="p-8 text-center">Loading products...</td></tr>
                        ) : products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{product.name}</p>
                                            <p className="text-xs text-gray-500 truncate max-w-[200px]">{product.description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 capitalize text-gray-600">{product.category}</td>
                                <td className="px-6 py-4 font-medium">{formattedPrice(product.price)}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.countInStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {product.countInStock > 0 ? `${product.countInStock} in Stock` : 'Out of Stock'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
