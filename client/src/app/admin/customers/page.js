"use client";

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { getApiUrl } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Mail, Shield, Trash2, Search } from 'lucide-react';
import { formattedPrice } from '@/lib/data';

export default function AdminCustomers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        if (user && user.token) {
            fetch(getApiUrl('users'), {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setUsers(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Failed to fetch users:', err);
                    setLoading(false);
                });
        }
    }, [user]);

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <AdminLayout>Loading Customers...</AdminLayout>;

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold font-heading">Customers</h1>
                        <p className="text-gray-500 text-sm">Manage your user base</p>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search customers..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-medium text-gray-700">Customer</th>
                                <th className="px-6 py-4 font-medium text-gray-700">Email</th>
                                <th className="px-6 py-4 font-medium text-gray-700">Role</th>
                                <th className="px-6 py-4 font-medium text-gray-700">Joined</th>
                                <th className="px-6 py-4 font-medium text-gray-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No customers found.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((customer) => (
                                    <tr key={customer._id} className="hover:bg-gray-50 group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                                                    {customer.name.substring(0, 2)}
                                                </div>
                                                <span className="font-medium text-gray-900">{customer.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-3 h-3 opacity-50" />
                                                {customer.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${customer.isAdmin
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : 'bg-green-100 text-green-700'
                                                }`}>
                                                {customer.isAdmin ? <Shield className="w-3 h-3" /> : null}
                                                {customer.isAdmin ? 'Admin' : 'Customer'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(customer.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors" title="Delete User">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
