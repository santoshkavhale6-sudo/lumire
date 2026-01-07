"use client";

import React, { useState } from 'react';
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

const FloatingInput = ({ label, type = "text", value, onChange, placeholder = "" }) => (
    <div className="relative group">
        <input
            type={type}
            className="block w-full px-0 py-3 text-[#1c1c1c] bg-transparent border-b border-[#e5e5e5] focus:border-[#c5a059] appearance-none focus:outline-none focus:ring-0 peer transition-colors duration-300"
            placeholder=" "
            value={value}
            onChange={onChange}
        />
        <label className="absolute text-sm text-[#8C8C8C] duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] peer-focus:text-[#c5a059] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-0 pointer-events-none">
            {label}
        </label>
    </div>
);

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
        country: 'India',
        phone: ''
    });

    const [selectedMethod, setSelectedMethod] = useState(null);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePlaceOrder = async () => {
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }

        if (!selectedMethod) {
            alert('Please select a payment method');
            return;
        }

        // Basic validation for shipping address
        const requiredFields = ['address', 'city', 'zip', 'country', 'firstName', 'lastName'];
        const missingFields = requiredFields.filter(field => !formData[field]);
        if (missingFields.length > 0) {
            alert(`Please fill in all shipping details: ${missingFields.join(', ')}`);
            return;
        }

        setLoading(true);
        try {
            const isLoaded = await loadRazorpay();
            if (!isLoaded) {
                alert('Razorpay SDK failed to load');
                return;
            }

            const orderItems = cart.map(item => ({
                name: item.name,
                qty: item.quantity,
                image: item.image,
                price: item.price,
                product: item._id || item.id,
            }));

            // 1. Create Order on Backend
            const res = await fetch(getApiUrl('orders'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    orderItems,
                    shippingAddress: {
                        address: formData.address,
                        city: formData.city,
                        postalCode: formData.zip,
                        country: formData.country || 'India' // Defaulting to India as per design context
                    },
                    paymentMethod: selectedMethod,
                    itemsPrice: cartTotal,
                    shippingPrice: 0,
                    taxPrice: 0,
                    totalPrice: cartTotal
                })
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Place order failed');
            }

            // 2. Handle Mock Payment Verification (Bypass Razorpay UI for mock IDs)
            if (data.razorpayOrderId && data.razorpayOrderId.startsWith('mock_')) {
                console.log("Mock Order detected. Verifying automatically...");
                try {
                    const verifyRes = await fetch(getApiUrl('orders/verify'), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify({
                            orderId: data._id,
                            razorpay_order_id: data.razorpayOrderId,
                            razorpay_payment_id: `pay_mock_${Date.now()}`,
                            razorpay_signature: 'mock_signature'
                        })
                    });

                    if (verifyRes.ok) {
                        clearCart();
                        router.push(`/order/${data._id}`);
                        return; // Exit early
                    } else {
                        const verifyData = await verifyRes.json();
                        throw new Error(verifyData.message || 'Mock verification failed');
                    }
                } catch (err) {
                    console.error('Mock verification error:', err);
                    throw new Error('Failed to process mock payment');
                }
            }

            // 3. Open Razorpay Checkout (Only for real orders)
            const options = {
                key: data.key,
                amount: data.amount,
                currency: data.currency,
                name: "LUMIÈRE",
                description: "Luxury Handcrafted Jewelry",
                image: "https://example.com/logo.png", // Replace with real logo
                order_id: data.razorpayOrderId,
                handler: async function (response) {
                    // 3. Verify Payment
                    try {
                        const verifyRes = await fetch(getApiUrl('orders/verify'), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${user.token}`
                            },
                            body: JSON.stringify({
                                orderId: data._id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });

                        const verifyData = await verifyRes.json();
                        if (verifyRes.ok) {
                            clearCart();
                            router.push(`/order/${data._id}`);
                        } else {
                            alert(verifyData.message || 'Payment verification failed');
                        }
                    } catch (error) {
                        console.error('Verify error:', error);
                        alert('Payment verification failed');
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: formData.phone
                },
                theme: {
                    color: "#c5a059"
                },
                // Attempt to restrict method based on config - Razorpay standard checkout usually requires 'preferences' or 'method' filtering
                // For this demo, we can just highlight the user's choice is respected by the backend config logic
                config: {
                    display: {
                        blocks: {
                            banks: {
                                name: 'Pay using ' + selectedMethod.toUpperCase(),
                                instruments: [
                                    {
                                        method: selectedMethod === 'card' ? 'card' : (selectedMethod === 'upi' ? 'upi' : 'wallet')
                                    }
                                ],
                            },
                        },
                        sequence: ['block.banks'],
                        preferences: {
                            show_default_blocks: false, // Hide other blocks
                        },
                    },
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                alert(response.error.description);
            });
            rzp1.open();

        } catch (error) {
            console.error(error);
            alert(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#FDFCF8] flex flex-col">
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



    return (
        <div className="min-h-screen bg-[#FDFCF8] selection:bg-[#c5a059] selection:text-white">
            <div className="fixed top-0 w-full z-50 bg-[#FAF7F2] border-b border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="container-custom h-20 flex items-center justify-center relative">
                    <Link href="/" className="absolute left-6 lg:left-0 flex items-center gap-2 text-[#1E1E1E] hover:text-[#c5a059] transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-widest hidden sm:inline">Back</span>
                    </Link>
                    <div className="absolute right-6 lg:right-0 flex items-center gap-2 text-[#1E1E1E]">
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
                                <div className="col-span-2">
                                    <FloatingInput label="Country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
                                </div>
                            </div>
                        </section>

                        {/* Payment Method */}
                        <section>
                            <h3 className="text-xl font-heading text-[#1c1c1c] mb-6">Payment Method</h3>

                            <div className="space-y-4">
                                {/* Credit/Debit Card */}
                                <div
                                    onClick={() => setSelectedMethod('card')}
                                    className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center gap-4 ${selectedMethod === 'card'
                                        ? 'border-[#c5a059] bg-[#c5a059]/5 shadow-[0_0_20px_rgba(197,160,89,0.2)]'
                                        : 'border-gray-100 hover:border-[#c5a059]/50 bg-white'
                                        }`}
                                >
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedMethod === 'card' ? 'border-[#c5a059]' : 'border-gray-300'
                                        }`}>
                                        {selectedMethod === 'card' && <div className="w-3 h-3 rounded-full bg-[#c5a059]" />}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-[#1c1c1c]">Credit / Debit Card</h4>
                                        <p className="text-xs text-[#8C8C8C] mt-1">Visa, Mastercard, Amex</p>
                                    </div>
                                    <CreditCard className={`w-6 h-6 ${selectedMethod === 'card' ? 'text-[#c5a059]' : 'text-gray-400'}`} />
                                    {selectedMethod === 'card' && (
                                        <motion.div layoutId="glow" className="absolute inset-0 rounded-xl bg-[#c5a059]/5 z-0" />
                                    )}
                                </div>

                                {/* UPI */}
                                <div
                                    onClick={() => setSelectedMethod('upi')}
                                    className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center gap-4 ${selectedMethod === 'upi'
                                        ? 'border-[#c5a059] bg-[#c5a059]/5 shadow-[0_0_20px_rgba(197,160,89,0.2)]'
                                        : 'border-gray-100 hover:border-[#c5a059]/50 bg-white'
                                        }`}
                                >
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedMethod === 'upi' ? 'border-[#c5a059]' : 'border-gray-300'
                                        }`}>
                                        {selectedMethod === 'upi' && <div className="w-3 h-3 rounded-full bg-[#c5a059]" />}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-[#1c1c1c]">UPI</h4>
                                        <p className="text-xs text-[#8C8C8C] mt-1">Google Pay, PhonePe, Paytm</p>
                                    </div>
                                    <div className="flex gap-2 opacity-60">
                                        {/* Simple icons representation */}
                                        <div className="w-6 h-6 bg-gray-200 rounded-sm" title="GPay"></div>
                                        <div className="w-6 h-6 bg-gray-200 rounded-sm" title="PhonePe"></div>
                                    </div>
                                </div>

                                {/* Wallet */}
                                <div
                                    onClick={() => setSelectedMethod('wallet')}
                                    className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center gap-4 ${selectedMethod === 'wallet'
                                        ? 'border-[#c5a059] bg-[#c5a059]/5 shadow-[0_0_20px_rgba(197,160,89,0.2)]'
                                        : 'border-gray-100 hover:border-[#c5a059]/50 bg-white'
                                        }`}
                                >
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedMethod === 'wallet' ? 'border-[#c5a059]' : 'border-gray-300'
                                        }`}>
                                        {selectedMethod === 'wallet' && <div className="w-3 h-3 rounded-full bg-[#c5a059]" />}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-[#1c1c1c]">Wallets</h4>
                                        <p className="text-xs text-[#8C8C8C] mt-1">Amazon Pay, Mobikwik, Paytm</p>
                                    </div>
                                    <Wallet className={`w-6 h-6 ${selectedMethod === 'wallet' ? 'text-[#c5a059]' : 'text-gray-400'}`} />
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
