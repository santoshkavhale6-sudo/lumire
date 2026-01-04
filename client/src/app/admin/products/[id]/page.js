"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductForm from '@/components/admin/ProductForm';
import { getApiUrl } from '@/lib/api';

export default function EditProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(getApiUrl(`products/${id}`))
                .then(res => res.json())
                .then(data => {
                    setProduct(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch product", err);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex h-[50vh] items-center justify-center">
                    <p className="text-gray-500">Loading product details...</p>
                </div>
            </AdminLayout>
        );
    }

    if (!product) {
        return (
            <AdminLayout>
                <div className="flex h-[50vh] items-center justify-center">
                    <p className="text-red-500">Product not found</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <ProductForm initialData={product} />
        </AdminLayout>
    );
}
