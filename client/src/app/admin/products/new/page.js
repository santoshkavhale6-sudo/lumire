"use client";

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductForm from '@/components/admin/ProductForm';

export default function AddProductPage() {
    return (
        <AdminLayout>
            <ProductForm />
        </AdminLayout>
    );
}
