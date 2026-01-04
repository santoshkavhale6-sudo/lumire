"use client";

import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminPlaceholder({ title }) {
    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-6">{title}</h1>
            <div className="bg-white p-12 rounded-lg border border-gray-100 text-center">
                <p className="text-muted-foreground">This module is under development.</p>
            </div>
        </AdminLayout>
    );
}
