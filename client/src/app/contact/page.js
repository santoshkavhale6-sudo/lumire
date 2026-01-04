'use client';

import React, { useState, useEffect } from 'react';
import {
    Phone,
    MessageCircle,
    Mail,
    Clock,
    MapPin,
    Instagram,
    Facebook,
    Youtube,
    ChevronDown,
    ChevronUp,
    CheckCircle,
    RefreshCcw,
    ShieldCheck,
    Upload
} from 'lucide-react';
import { getSettings } from '@/lib/settingsService';

export default function ContactPage() {
    const [openFaq, setOpenFaq] = useState(null);
    const [settings, setSettings] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        orderId: '',
        subject: 'Order',
        message: '',
        image: null
    });

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const data = await getSettings();
                setSettings(data);
            } catch (error) {
                console.error("Failed to load contact settings", error);
                // Fallback or keep loading state null to show defaults/loading
            }
        };
        loadSettings();
    }, []);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, image: file }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        alert('Thank you for contacting us! We will get back to you shortly.');
    };

    // Helper to get link or #
    const getLink = (url) => url || '#';

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">

            {/* 1️⃣ TRUST HEADER */}
            <section className="bg-white text-center py-12 px-4 shadow-sm">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">We’re Always Here For You 🤍</h1>
                <p className="text-gray-600 mb-8 text-lg">“Have a question? Our support team replies within 24 hours.”</p>

                <div className="flex flex-wrap justify-center gap-4">
                    <a href={`tel:${settings?.contactInfo?.phone || ''}`} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition shadow-md font-medium">
                        <Phone size={20} /> Call Now
                    </a>
                    <a href={getLink(settings?.socialLinks?.whatsapp)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition shadow-md font-medium">
                        <MessageCircle size={20} /> WhatsApp Chat
                    </a>
                    <a href={`mailto:${settings?.contactInfo?.email || ''}`} className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-900 transition shadow-md font-medium">
                        <Mail size={20} /> Email Support
                    </a>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left Column: Quick Contact, Promise, Info, Social */}
                <div className="space-y-8">

                    {/* 2️⃣ QUICK CONTACT OPTIONS */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">Quick Contact</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition">
                                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Phone</h3>
                                    <p className="text-gray-600">{settings?.contactInfo?.phone || 'Loading...'}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition">
                                <div className="bg-green-100 p-3 rounded-full text-green-600">
                                    <MessageCircle size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                                    <a href={getLink(settings?.socialLinks?.whatsapp)} target="_blank" rel="noopener noreferrer" className="text-green-600 font-medium hover:underline text-sm">Click-to-Chat</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition">
                                <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Email</h3>
                                    <p className="text-gray-600">{settings?.contactInfo?.email || 'Loading...'}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition">
                                <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Working Hours</h3>
                                    <p className="text-gray-600">{settings?.contactInfo?.workingHours || 'Loading...'}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 4️⃣ CUSTOMER SUPPORT PROMISE */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
                            <CheckCircle className="text-blue-500 mb-2" size={32} />
                            <h3 className="font-bold text-sm text-gray-900">24-Hour Response</h3>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
                            <RefreshCcw className="text-green-500 mb-2" size={32} />
                            <h3 className="font-bold text-sm text-gray-900">Easy Returns</h3>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
                            <ShieldCheck className="text-purple-500 mb-2" size={32} />
                            <h3 className="font-bold text-sm text-gray-900">Secure Payments</h3>
                        </div>
                    </section>

                    {/* 5️⃣ COMPANY INFORMATION */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">Company Information</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-600">
                                <tbody>
                                    <tr className="border-b border-gray-50">
                                        <td className="py-3 font-medium text-gray-900">Brand Name</td>
                                        <td className="py-3">LUMIÈRE</td>
                                    </tr>
                                    <tr className="border-b border-gray-50">
                                        <td className="py-3 font-medium text-gray-900">Address</td>
                                        <td className="py-3 whitespace-pre-wrap">{settings?.contactInfo?.address || 'Loading...'}</td>
                                    </tr>
                                    {/* ... other static info or extended dynamic info ... */}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                {/* Right Column: Contact Form & Map */}
                <div className="space-y-8">

                    {/* 3️⃣ SMART CONTACT FORM */}
                    <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                                        placeholder="+91-XXXXXXXXXX"
                                    />
                                </div>
                            </div>

                            {/* ... (Rest of form same as before) ... */}
                            {/* Simplified for brevity in replace, but for write_to_file I must include ALL content or it truncates */}
                            {/* Skipping re-typing entire form parts that didn't change logic, but tool requires full content for 'write_to_file' if not using replace. I will use the original structure. */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Order ID <span className="text-gray-400 font-normal">(Optional)</span></label>
                                    <input
                                        type="text"
                                        name="orderId"
                                        value={formData.orderId}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                                        placeholder="#12345"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <div className="relative">
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition appearance-none bg-white"
                                        >
                                            <option value="Order">Order Issue</option>
                                            <option value="Return">Return Request</option>
                                            <option value="Payment">Payment Issue</option>
                                            <option value="Custom Order">Custom Order</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition resize-none"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image (Optional)</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition text-center cursor-pointer relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                        <Upload size={32} className="mb-2 text-gray-400" />
                                        <span className="text-sm">{formData.image ? formData.image.name : "Click to upload damaged product image"}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-black text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition shadow-lg transform active:scale-[0.98]"
                            >
                                Send Message
                            </button>

                        </form>
                    </section>

                    {/* 6️⃣ MAP LOCATION */}
                    <section className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 h-64 overflow-hidden">
                        {settings?.contactInfo?.mapUrl ? (
                            <iframe
                                src={settings.contactInfo.mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Office Location"
                                className="rounded-xl"
                            ></iframe>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                <MapPin className="mr-2" /> Map URL not configured
                            </div>
                        )}

                    </section>

                </div>
            </div>

            {/* 7️⃣ SOCIAL CONNECT */}
            <section className="bg-gray-100 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Follow Us</h2>
                    <div className="flex justify-center gap-6">
                        <a href={getLink(settings?.socialLinks?.instagram)} target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full text-pink-600 shadow-sm hover:shadow-md hover:scale-110 transition"><Instagram size={28} /></a>
                        <a href={getLink(settings?.socialLinks?.facebook)} target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full text-blue-600 shadow-sm hover:shadow-md hover:scale-110 transition"><Facebook size={28} /></a>
                        <a href={getLink(settings?.socialLinks?.whatsapp)} target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full text-green-500 shadow-sm hover:shadow-md hover:scale-110 transition"><MessageCircle size={28} /></a>
                        <a href={getLink(settings?.socialLinks?.youtube)} target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full text-red-600 shadow-sm hover:shadow-md hover:scale-110 transition"><Youtube size={28} /></a>
                    </div>
                </div>
            </section>

            {/* 8️⃣ FAQ QUICK LINKS */}
            <section className="container mx-auto px-4 py-16 max-w-3xl">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {[
                        { q: "Where is my order?", a: "You can track your order status in the 'My Orders' section of your account or use the Order ID in the chat." },
                        { q: "What is your return policy?", a: "We offer a 7-day easy return policy for all unused items with original tags." },
                        { q: "What is the estimated shipping time?", a: "Most orders are delivered within 3-5 business days across India." },
                        { q: "How do refund rules work?", a: "Refunds are processed to the original payment method within 5-7 business days after the return is approved." },
                        { q: "Can I place a custom jewelry order?", a: "Yes! Select 'Custom Order' in the contact form above and share your requirements with us." }
                    ].map((item, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-800 focus:outline-none hover:bg-gray-50 transition"
                            >
                                <span>{item.q}</span>
                                {openFaq === index ? <ChevronUp size={20} className="text-blue-500" /> : <ChevronDown size={20} className="text-gray-400" />}
                            </button>
                            {openFaq === index && (
                                <div className="p-5 border-t border-gray-50 text-gray-600 bg-gray-50/50">
                                    {item.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
