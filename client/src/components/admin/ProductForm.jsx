"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { API_BASE_URL } from '@/lib/api';

export default function ProductForm({ initialData = null }) {
    const router = useRouter();
    const isEdit = !!initialData;

    const [formData, setFormData] = useState(initialData || {
        name: '',
        description: '',
        brand: 'LUMIÈRE',
        category: '',
        subcategory: '',
        price: 0,
        countInStock: 0,
        sku: '',
        barcode: '',
        weight: 0,
        dimensions: { length: 0, width: 0, height: 0 },
        image: '',
        images: [],
    });

    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageAdd = () => {
        const url = prompt('Enter Image URL:');
        if (url) {
            setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEdit
                ? `${API_BASE_URL}/products/${initialData._id}`
                : `${API_BASE_URL}/products`;

            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/admin/products');
            } else {
                alert('Failed to save product');
            }
        } catch (error) {
            console.error(error);
            alert('Error saving product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-6">
                <div>
                    <h1 className="text-2xl font-bold font-heading">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
                    <p className="text-gray-500 text-sm mt-1">Fill in the details to create a new product listing.</p>
                </div>
                <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                    <Button type="submit" disabled={loading}>
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? 'Saving...' : 'Save Product'}
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
                {['General', 'Pricing', 'Inventory', 'Media'].map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === tab.toLowerCase() ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* General Tab */}
            {activeTab === 'general' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            required
                        />
                    </div>
                    <div className="space-y-4 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            required
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Select...</option>
                                <option value="rings">Rings</option>
                                <option value="necklaces">Necklaces</option>
                                <option value="earrings">Earrings</option>
                                <option value="bracelets">Bracelets</option>
                                <option value="gifts">Gifts</option>
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                            <input
                                type="text"
                                name="subcategory"
                                value={formData.subcategory}
                                onChange={handleChange}
                                placeholder="e.g. Diamond, Gold"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Pricing Tab */}
            {activeTab === 'pricing' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Base Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            required
                        />
                    </div>
                    {/* Add Tax/Discount Logic here later */}
                </div>
            )}

            {/* Inventory Tab */}
            {activeTab === 'inventory' && (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                            <input
                                type="number"
                                name="countInStock"
                                value={formData.countInStock}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">SKU</label>
                            <input
                                type="text"
                                name="sku"
                                value={formData.sku}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">Barcode / EAN</label>
                            <input
                                type="text"
                                name="barcode"
                                value={formData.barcode}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium mb-4">Shipping Dimensions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500 uppercase">Weight (g)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500 uppercase">Length (cm)</label>
                                <input
                                    type="number"
                                    name="dimensions.length"
                                    value={formData.dimensions?.length}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500 uppercase">Width (cm)</label>
                                <input
                                    type="number"
                                    name="dimensions.width"
                                    value={formData.dimensions?.width}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500 uppercase">Height (cm)</label>
                                <input
                                    type="number"
                                    name="dimensions.height"
                                    value={formData.dimensions?.height}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Media Tab */}
            {activeTab === 'media' && (
                <div className="space-y-6">
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Main Image URL</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="flex-1 p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        {formData.image && (
                            <div className="w-32 h-32 relative rounded-lg overflow-hidden border border-gray-200 mt-2">
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">Gallery Images</label>
                            <Button type="button" size="sm" variant="outline" onClick={handleImageAdd}>
                                <Plus className="w-4 h-4 mr-1" /> Add URL
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {formData.images.map((img, idx) => (
                                <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, images: p.images.filter((_, i) => i !== idx) }))}
                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            {formData.images.length === 0 && (
                                <div className="col-span-full py-8 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                                    <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p>No gallery images yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
}
