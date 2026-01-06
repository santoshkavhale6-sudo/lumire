"use client";

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formattedPrice } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { getApiUrl } from '@/lib/api';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, CreditCard, Wallet, Truck, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const { user, isAuthModalOpen, setIsAuthModalOpen } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Form states (Mocking visual inputs for now as per design request)
    const [formData, setFormData] = useState({
        email: user?.email || '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        phone: ''
    });

    const handlePlaceOrder = async () => {
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }

        setLoading(true);
        try {
            const orderItems = cart.map(item => ({
                name: item.name,
                qty: item.quantity,
                image: item.image,
                price: item.price,
                product: item._id || item.id,
            }));

            const res = await fetch(getApiUrl('orders'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    orderItems,
                    paymentMethod: 'Razorpay',
                    itemsPrice: cartTotal,
                    shippingPrice: 0,
                    taxPrice: 0,
                    totalPrice: cartTotal
                })
            });

            if (res.ok) {
                const order = await res.json();
                clearCart();
                router.push(`/order/${order._id}`);
            } else {
                alert('Place order failed');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#FDFCF8] flex flex-col">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <h1 className="text-3xl font-heading mb-4 text-[#1c1c1c]">Your cart is empty</h1>
                    <p className="text-[#595959] mb-8">It seems you haven't chosen your treasure yet.</p>
                    <Link href="/shop">
                        <Button className="bg-[#c5a059] text-white px-8 py-6 uppercase tracking-widest text-xs hover:bg-[#b08d4a] rounded-full">
                            Return to Boutique
                        </Button>
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    const FloatingInput = ({ label, type = "text", value, onChange, placeholder = "" }) => (
        <div className="relative group">
            <input
                type={type}
                className="block w-full px-0 py-3 text-[#1c1c1c] bg-transparent border-b border-[#e5e5e5] focus:border-[#c5a059] appearance-none focus:outline-none focus:ring-0 peer transition-colors duration-300"
                placeholder=" "
                value={value}
                onChange={onChange}
            />
            <label className="absolute text-sm text-[#8C8C8C] duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] peer-focus:text-[#c5a059] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-0">
                {label}
            </label>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FDFCF8] selection:bg-[#c5a059] selection:text-white">
            <div className="fixed top-0 w-full z-50 bg-[#FDFCF8]/80 backdrop-blur-md border-b border-[#F0F0F0]">
                <div className="container-custom h-20 flex items-center justify-center relative">
                    <Link href="/" className="absolute left-6 lg:left-0 flex items-center gap-2 text-[#8C8C8C] hover:text-[#c5a059] transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-widest hidden sm:inline">Back</span>
                    </Link>
                    <h1 className="text-2xl font-heading font-bold tracking-[0.2em] text-[#1c1c1c]">LUMIÈRE</h1>
                    <div className="absolute right-6 lg:right-0 flex items-center gap-2 text-[#c5a059]">
                        <Lock className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-widest hidden sm:inline">Secure</span>
                    </div>
                </div>
            </div>

            <main className="pt-32 pb-24 container-custom">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 space-y-4"
                >
                    <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium flex items-center justify-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> Secure Checkout
                    </p>
                    <h2 className="text-4xl md:text-5xl font-heading text-[#1c1c1c] font-medium">Complete Your Purchase</h2>
                    <p className="text-[#8C8C8C] font-light text-lg">A few final steps to receive your handcrafted treasure.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* LEFT COLUMN - Forms */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-7 space-y-12"
                    >
                        {/* Contact Info */}
                        <section>
                            <h3 className="text-xl font-heading text-[#1c1c1c] mb-6 flex items-center justify-between">
                                <span>Contact Information</span>
                                {!user && <span className="text-xs font-sans text-[#c5a059] cursor-pointer" onClick={() => setIsAuthModalOpen(true)}>Already have an account? Login</span>}
                            </h3>
                            <div className="space-y-6">
                                <FloatingInput label="Email Address" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                <FloatingInput label="Phone Number" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                            </div>
                        </section>

                        {/* Shipping Address */}
                        <section>
                            <h3 className="text-xl font-heading text-[#1c1c1c] mb-6">Shipping Address</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <FloatingInput label="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                                <FloatingInput label="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                                <div className="col-span-2">
                                    <FloatingInput label="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                                </div>
                                <FloatingInput label="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                                <FloatingInput label="ZIP Code" value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} />
                            </div>
                        </section>

                        {/* Payment Method */}
                        <section>
                            <h3 className="text-xl font-heading text-[#1c1c1c] mb-6">Payment Method</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border border-[#c5a059] bg-[#c5a059]/5 p-4 rounded-lg flex items-center gap-4 cursor-pointer transition-all">
                                    <div className="w-5 h-5 rounded-full border-2 border-[#c5a059] flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#c5a059]" />
                                    </div>
                                    <span className="font-medium text-[#1c1c1c]">Credit/Debit Card</span>
                                    <CreditCard className="w-5 h-5 ml-auto text-[#8C8C8C]" />
                                </div>
                                <div className="border border-[#e5e5e5] p-4 rounded-lg flex items-center gap-4 cursor-pointer hover:border-[#c5a059] transition-all opacity-60">
                                    <div className="w-5 h-5 rounded-full border-2 border-[#e5e5e5]" />
                                    <span className="font-medium text-[#1c1c1c]">UPI / Wallets</span>
                                    <Wallet className="w-5 h-5 ml-auto text-[#8C8C8C]" />
                                </div>
                            </div>

                            {/* Security Badges */}
                            <div className="flex items-center gap-6 mt-8 p-4 bg-[#F5F5F0] rounded-lg">
                                <div className="flex items-center gap-2 text-xs text-[#595959]">
                                    <Lock className="w-3 h-3 text-[#c5a059]" /> SSL Secure
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#595959]">
                                    <ShieldCheck className="w-3 h-3 text-[#c5a059]" /> Buyer Protection
                                </div>
                                <div className="ml-auto text-xs text-[#8C8C8C] flex gap-2">
                                    <span>VISA</span>
                                    <span>MC</span>
                                    <span>AMEX</span>
                                </div>
                            </div>
                        </section>
                    </motion.div>

                    {/* RIGHT COLUMN - Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-5"
                    >
                        <div className="sticky top-32">
                            <div className="bg-white/50 backdrop-blur-xl border border-white/60 shadow-xl shadow-[#c5a059]/5 rounded-2xl p-8 overflow-hidden relative">
                                {/* Decor */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c5a059]/10 to-transparent rounded-bl-full pointer-events-none" />

                                <h3 className="text-xl font-heading text-[#1c1c1c] mb-8">Order Summary</h3>

                                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                                    {cart.map(item => (
                                        <div key={item._id || item.id} className="flex gap-4 group">
                                            <div className="relative w-20 h-24 bg-[#F5F5F0] overflow-hidden rounded-md flex-shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="flex-1 py-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="font-heading text-[#1c1c1c] text-sm leading-tight">{item.name}</h4>
                                                    <p className="font-medium text-[#c5a059] text-sm">{formattedPrice(item.price * item.quantity)}</p>
                                                </div>
                                                <p className="text-xs text-[#8C8C8C] mb-2">Qty: {item.quantity}</p>
                                                <p className="text-[10px] uppercase tracking-wider text-[#8C8C8C]">Made to order</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-[#e5e5e5] my-6" />

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between text-[#595959]">
                                        <span>Subtotal</span>
                                        <span>{formattedPrice(cartTotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-[#595959]">
                                        <span>Shipping</span>
                                        <span className="text-[#1c1c1c] font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between text-[#595959]">
                                        <span>Estimated Tax</span>
                                        <span>Calculated at payment</span>
                                    </div>
                                </div>

                                <div className="border-t border-[#e5e5e5] my-6" />

                                <div className="flex justify-between items-center mb-8">
                                    <span className="font-heading text-lg text-[#1c1c1c]">Total</span>
                                    <span className="font-heading text-2xl text-[#c5a059] font-medium">{formattedPrice(cartTotal)}</span>
                                </div>

                                <div className="space-y-3">
                                    <Button
                                        className="w-full bg-gradient-to-r from-[#c5a059] to-[#b08d4a] text-white py-6 rounded-full uppercase tracking-widest text-xs font-bold hover:shadow-lg hover:shadow-[#c5a059]/30 transition-all duration-300"
                                        onClick={handlePlaceOrder}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Processing...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                Place Secure Order <Lock className="w-3 h-3" />
                                            </span>
                                        )}
                                    </Button>

                                    <Link href="/shop" className="block text-center text-xs uppercase tracking-widest text-[#8C8C8C] hover:text-[#c5a059] transition-colors py-2">
                                        Return to Cart
                                    </Link>
                                </div>

                                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-[#8C8C8C] bg-[#F5F5F0]/50 p-2 rounded">
                                    <Truck className="w-3 h-3" />
                                    <span>Complimentary Insured Shipping</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
