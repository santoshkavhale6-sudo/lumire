'use client';

import React, { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '@/lib/settingsService';
import { Save, Loader2 } from 'lucide-react';
// Assuming AuthContext exists based on previous conversations. 
// If specific path fails, I might need to adjust import.
// User mentioned `client/src/context` exists.
import { useAuth } from '@/context/AuthContext';

export default function AdminSettings() {
    const { token, user } = useAuth(); // Assuming useAuth exposes token
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        contactInfo: {
            phone: '',
            email: '',
            address: '',
            workingHours: '',
            mapUrl: ''
        },
        socialLinks: {
            instagram: '',
            facebook: '',
            whatsapp: '',
            youtube: ''
        }
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const data = await getSettings();
            // Merge with default structure to avoid undefined errors
            setFormData({
                contactInfo: { ...formData.contactInfo, ...data.contactInfo },
                socialLinks: { ...formData.socialLinks, ...data.socialLinks }
            });
        } catch (error) {
            console.error('Error fetching settings:', error);
            alert('Failed to load settings. Ensure server is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (section, e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateSettings(formData, token);
            alert('Settings updated successfully!');
        } catch (error) {
            console.error('Error updating settings:', error);
            alert('Failed to update settings. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-blue-600" size={48} /></div>;
    }

    // Basic admin check - though server protects it too
    if (!user?.isAdmin) {
        return <div className="p-8 text-center text-red-500">Access Denied. Admins only.</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Site Settings</h1>
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    Save Changes
                </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-8">

                {/* Contact Information Section */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.contactInfo.phone}
                                onChange={(e) => handleChange('contactInfo', e)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.contactInfo.email}
                                onChange={(e) => handleChange('contactInfo', e)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
                            <input
                                type="text"
                                name="workingHours"
                                value={formData.contactInfo.workingHours}
                                onChange={(e) => handleChange('contactInfo', e)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <textarea
                                name="address"
                                value={formData.contactInfo.address}
                                onChange={(e) => handleChange('contactInfo', e)}
                                rows="2"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                            ></textarea>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Google Match Embed URL (src only)</label>
                            <input
                                type="text"
                                name="mapUrl"
                                value={formData.contactInfo.mapUrl}
                                onChange={(e) => handleChange('contactInfo', e)}
                                placeholder="https://www.google.com/maps/embed?..."
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none text-sm font-mono text-gray-600"
                            />
                        </div>
                    </div>
                </section>

                {/* Social Media Section */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Social Media Links</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                            <input
                                type="text"
                                name="instagram"
                                value={formData.socialLinks.instagram}
                                onChange={(e) => handleChange('socialLinks', e)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                            <input
                                type="text"
                                name="facebook"
                                value={formData.socialLinks.facebook}
                                onChange={(e) => handleChange('socialLinks', e)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp URL (wa.me/...)</label>
                            <input
                                type="text"
                                name="whatsapp"
                                value={formData.socialLinks.whatsapp}
                                onChange={(e) => handleChange('socialLinks', e)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
                            <input
                                type="text"
                                name="youtube"
                                value={formData.socialLinks.youtube}
                                onChange={(e) => handleChange('socialLinks', e)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                            />
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
