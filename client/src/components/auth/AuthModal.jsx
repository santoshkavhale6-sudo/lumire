"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthModal = () => {
    const { isAuthModalOpen, setIsAuthModalOpen, login, signup } = useAuth();
    const [isLoginView, setIsLoginView] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate network delay
        await new Promise(r => setTimeout(r, 1000));

        let result;
        if (isLoginView) {
            result = await login(formData.email, formData.password);
        } else {
            result = await signup(formData.name, formData.email, formData.password);
        }

        setLoading(false);

        if (result && result.success) {
            setIsAuthModalOpen(false);
            setFormData({ name: '', email: '', password: '' });
        } else {
            setError(result?.error || result?.message || 'Authentication failed');
        }
    };

    return (
        <AnimatePresence>
            {isAuthModalOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsAuthModalOpen(false)}
                        className="fixed inset-0 bg-black/60 z-[80] backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-background p-8 rounded-lg shadow-2xl z-[90]"
                    >
                        <button
                            onClick={() => setIsAuthModalOpen(false)}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-heading font-bold mb-2">
                                {isLoginView ? 'Welcome Back' : 'Join Lumière'}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {isLoginView ? 'Sign in to access your saved items.' : 'Create an account for exclusive access.'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</p>}

                            {!isLoginView && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>

                            <Button type="submit" className="w-full py-6" disabled={loading}>
                                {loading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Create Account')}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <button
                                onClick={() => setIsLoginView(!isLoginView)}
                                className="text-sm text-muted-foreground hover:text-primary underline"
                            >
                                {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
