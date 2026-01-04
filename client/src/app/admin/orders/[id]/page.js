"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Box, Truck, CheckCircle, FileText, XCircle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { formattedPrice } from '@/lib/data';
import { Button } from '@/components/ui/Button';

export default function OrderDetailPage({ params }) {
    const router = useRouter();
    const { id } = params;
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [statusLoading, setStatusLoading] = useState(false);

    // Mock initial fetch for UI scaffolding
    useEffect(() => {
        // In real app: fetch(`/api/orders/${id}`)
        setTimeout(() => {
            setOrder({
                _id: id,
                user: { name: 'John Doe', email: 'john@example.com' },
                orderItems: [
                    { name: 'Diamond Ring', qty: 1, price: 120000, image: 'https://images.unsplash.com/photo-1605100804763-ebea2406a95f?w=800&q=80' }
                ],
                shippingAddress: {
                    address: '123 Luxury Lane',
                    city: 'Mumbai',
                    postalCode: '400001',
                    country: 'India'
                },
                paymentResult: { status: 'COMPLETED', update_time: '2023-10-15' },
                orderStatus: 'Processing',
                totalPrice: 120000,
                isPaid: true
            });
            setLoading(false);
        }, 500);
    }, [id]);

    const updateStatus = async (newStatus) => {
        setStatusLoading(true);
        // Simulate API call
        setTimeout(() => {
            setOrder(prev => ({ ...prev, orderStatus: newStatus }));
            setStatusLoading(false);
            alert(`Order updated to ${newStatus}`);
        }, 500);
    };

    if (loading) return <AdminLayout>Loading...</AdminLayout>;
    if (!order) return <AdminLayout>Order not found</AdminLayout>;

    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-3">
                            Order #{order._id}
                            <span className={`text-sm px-3 py-1 rounded-full ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                }`}>{order.orderStatus}</span>
                        </h1>
                        <p className="text-gray-500 text-sm">Placed on {new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Order Items */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="font-medium mb-4 flex items-center gap-2"><Box className="w-4 h-4" /> Items</h3>
                            <div className="divide-y divide-gray-100">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="py-4 flex gap-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md border border-gray-100" />
                                        <div className="flex-1">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                        </div>
                                        <p className="font-medium">{formattedPrice(item.price * item.qty)}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center font-bold text-lg">
                                <span>Total</span>
                                <span>{formattedPrice(order.totalPrice)}</span>
                            </div>
                        </div>

                        {/* Tracking Logic Placeholder */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="font-medium mb-4 flex items-center gap-2"><Truck className="w-4 h-4" /> Logistics</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 uppercase font-bold">Courier</label>
                                    <input type="text" placeholder="e.g. BlueDart" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 uppercase font-bold">AWB Number</label>
                                    <input type="text" placeholder="Tracking ID" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
                                </div>
                            </div>
                            <Button className="mt-4 w-full" variant="outline">Update Tracking</Button>
                        </div>
                    </div>

                    {/* Sidebar Actions */}
                    <div className="space-y-6">

                        {/* Status Controls */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-3">
                            <h3 className="font-medium mb-2">Update Status</h3>
                            <Button
                                onClick={() => updateStatus('Processing')}
                                className="w-full justify-start"
                                variant={order.orderStatus === 'Processing' ? 'default' : 'outline'}
                            >
                                <Box className="w-4 h-4 mr-2" /> Mark as Processing
                            </Button>
                            <Button
                                onClick={() => updateStatus('Shipped')}
                                className="w-full justify-start"
                                variant={order.orderStatus === 'Shipped' ? 'default' : 'outline'}
                            >
                                <Truck className="w-4 h-4 mr-2" /> Mark as Shipped
                            </Button>
                            <Button
                                onClick={() => updateStatus('Delivered')}
                                className="w-full justify-start text-green-600 border-green-200 hover:bg-green-50"
                                variant="outline"
                            >
                                <CheckCircle className="w-4 h-4 mr-2" /> Mark as Delivered
                            </Button>
                            <Button
                                onClick={() => updateStatus('Cancelled')}
                                className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                                variant="outline"
                            >
                                <XCircle className="w-4 h-4 mr-2" /> Cancel Order
                            </Button>
                        </div>

                        {/* Customer Info */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-sm">
                            <h3 className="font-medium mb-4">Customer Details</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-gray-500">Name</p>
                                    <p className="font-medium">{order.user.name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Email</p>
                                    <p className="font-medium">{order.user.email}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Shipping Address</p>
                                    <p>{order.shippingAddress.address}</p>
                                    <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                    <p>{order.shippingAddress.country}</p>
                                </div>
                            </div>
                        </div>

                        {/* Invoice */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <Button className="w-full" variant="secondary">
                                <FileText className="w-4 h-4 mr-2" /> Download Invoice
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
