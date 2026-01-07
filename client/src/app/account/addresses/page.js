"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plus, Edit2, Trash2, Home, Briefcase, Gift, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getApiUrl } from '@/lib/api';

export default function AddressBook() {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    const [form, setForm] = useState({
        label: 'Home',
        name: '',
        address: '',
        city: '',
        zip: '',
        state: '',
        country: 'India',
        isDefault: false
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(getApiUrl('users/profile'), {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setAddresses(data.addresses || []);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(getApiUrl('user/address'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ ...form, addressId: editingAddress?._id })
            });
            if (res.ok) {
                const updatedAddresses = await res.json();
                setAddresses(updatedAddresses);
                setIsModalOpen(false);
                setEditingAddress(null);
                setForm({ label: 'Home', name: '', address: '', city: '', zip: '', state: '', country: 'India', isDefault: false });
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>Locating your destinations...</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-heading text-[#1E1E1E]">Address Book</h2>
                    <p className="text-[#8C8C8C] text-sm font-light">Manage your personal and gift delivery destinations.</p>
                </div>
                <Button
                    onClick={() => { setEditingAddress(null); setIsModalOpen(true); }}
                    className="bg-[#C9A24D] hover:bg-[#B69143] text-white rounded-full px-6 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add New
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((addr) => (
                    <motion.div
                        key={addr._id}
                        layout
                        className="bg-white p-6 rounded-2xl border border-[#F0EBE0] shadow-sm relative group hover:border-[#C9A24D]/30 transition-colors"
                    >
                        {addr.isDefault && (
                            <div className="absolute top-4 right-4 bg-green-50 text-green-600 text-[10px] uppercase tracking-widest px-2 py-1 rounded flex items-center gap-1 font-bold">
                                <Check className="w-3 h-3" /> Default
                            </div>
                        )}

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-[#FAF7F2] rounded-xl text-[#C9A24D]">
                                {addr.label === 'Home' ? <Home className="w-5 h-5" /> : (addr.label === 'Work' ? <Briefcase className="w-5 h-5" /> : <Gift className="w-5 h-5" />)}
                            </div>
                            <div>
                                <h4 className="font-medium text-[#1E1E1E] mb-1">{addr.label}</h4>
                                <p className="text-sm text-[#595959]">{addr.name}</p>
                                <p className="text-sm text-[#8C8C8C] mt-2 whitespace-pre-line">{addr.address}</p>
                                <p className="text-sm text-[#8C8C8C]">{addr.city}, {addr.zip}</p>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-4 pt-4 border-t border-[#F0EBE0] opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => { setEditingAddress(addr); setForm(addr); setIsModalOpen(true); }}
                                className="text-xs text-[#595959] hover:text-[#C9A24D] flex items-center gap-1"
                            >
                                <Edit2 className="w-3 h-3" /> Edit
                            </button>
                            <button className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1">
                                <Trash2 className="w-3 h-3" /> Remove
                            </button>
                        </div>
                    </motion.div>
                ))}

                {addresses.length === 0 && (
                    <div className="col-span-2 py-20 bg-white border-2 border-dashed border-[#F0EBE0] rounded-3xl flex flex-col items-center justify-center text-center">
                        <MapPin className="w-12 h-12 text-[#F0EBE0] mb-4" />
                        <p className="text-[#8C8C8C] font-light">No addresses saved yet.</p>
                        <Button variant="link" className="text-[#C9A24D]" onClick={() => setIsModalOpen(true)}>Add your first address</Button>
                    </div>
                )}
            </div>

            {/* Modal for adding/editing */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/20 backdrop-blur-sm p-6">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
                        >
                            <h3 className="text-xl font-heading text-[#1E1E1E] mb-6">{editingAddress ? 'Edit Destination' : 'New Destination'}</h3>
                            <form onSubmit={handleSave} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-[#8C8C8C]">Label</label>
                                        <select
                                            value={form.label}
                                            onChange={(e) => setForm({ ...form, label: e.target.value })}
                                            className="w-full mt-1 p-3 bg-[#FAF7F2] rounded-xl border-none text-sm focus:ring-2 focus:ring-[#C9A24D]/20 outline-none"
                                        >
                                            <option value="Home">Home</option>
                                            <option value="Work">Work</option>
                                            <option value="Gift">Gift</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-[#8C8C8C]">Receiver Name</label>
                                        <input
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            className="w-full mt-1 p-3 bg-[#FAF7F2] rounded-xl border-none text-sm outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-[#8C8C8C]">Full Address</label>
                                    <textarea
                                        value={form.address}
                                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                                        className="w-full mt-1 p-3 bg-[#FAF7F2] rounded-xl border-none text-sm outline-none h-24"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        placeholder="City"
                                        value={form.city}
                                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                                        className="p-3 bg-[#FAF7F2] rounded-xl border-none text-sm outline-none"
                                        required
                                    />
                                    <input
                                        placeholder="ZIP Code"
                                        value={form.zip}
                                        onChange={(e) => setForm({ ...form, zip: e.target.value })}
                                        className="p-3 bg-[#FAF7F2] rounded-xl border-none text-sm outline-none"
                                        required
                                    />
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        type="checkbox"
                                        checked={form.isDefault}
                                        onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                                        className="w-4 h-4 accent-[#C9A24D]"
                                    />
                                    <span className="text-xs text-[#595959]">Set as default destination</span>
                                </div>
                                <div className="flex gap-4 pt-6">
                                    <Button type="button" variant="outline" className="flex-1 rounded-full" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                    <Button type="submit" className="flex-1 bg-[#C9A24D] text-white rounded-full">Save Address</Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
