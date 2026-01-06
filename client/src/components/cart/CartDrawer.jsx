"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { formattedPrice } from '@/lib/data';

const CartDrawer = () => {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
    const router = useRouter();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-[70] flex flex-col border-l border-border/10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border/10">
                            <h2 className="text-xl font-heading font-medium flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" /> Shopping Bag
                            </h2>
                            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-accent rounded-full text-muted-foreground hover:text-foreground transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-muted-foreground">
                                    <ShoppingBag className="w-12 h-12 opacity-20" />
                                    <p>Your bag is empty.</p>
                                    <Button variant="outline" onClick={() => setIsCartOpen(false)}>Continue Shopping</Button>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item._id || item.id} className="flex gap-4">
                                        <div className="relative w-20 h-24 bg-gray-50 flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-medium text-sm leading-tight pr-4">{item.name}</h3>
                                                    <button onClick={() => removeFromCart(item._id || item.id)} className="text-muted-foreground hover:text-red-500 transition-colors">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-1 capitalize">{item.category}</p>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div className="flex items-center border border-border rounded-md">
                                                    <button onClick={() => updateQuantity(item._id || item.id, -1)} className="p-1 hover:bg-accent"><Minus className="w-3 h-3" /></button>
                                                    <span className="text-xs w-8 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item._id || item.id, 1)} className="p-1 hover:bg-accent"><Plus className="w-3 h-3" /></button>
                                                </div>
                                                <p className="text-sm font-medium">{formattedPrice(item.price * item.quantity)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-border/10 bg-accent/30 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-semibold">{formattedPrice(cartTotal)}</span>
                                </div>
                                <p className="text-xs text-muted-foreground text-center">Shipping and taxes calculated at checkout.</p>
                                <Button
                                    className="w-full py-6 text-base"
                                    onClick={() => {
                                        setIsCartOpen(false);
                                        router.push('/checkout');
                                    }}
                                >
                                    Checkout
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
