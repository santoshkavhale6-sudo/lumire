"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Trash2, Heart, ShoppingBag } from 'lucide-react';
import { formattedPrice } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';

export default function AccountWishlist() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    return (
        <div className="space-y-10">
            <div>
                <h2 className="text-2xl font-heading text-[#1E1E1E]">My Wishlist</h2>
                <p className="text-[#8C8C8C] text-sm font-light">Treasures you've set aside for later.</p>
            </div>

            {wishlist.length === 0 ? (
                <div className="py-20 bg-white border-2 border-dashed border-[#F0EBE0] rounded-3xl flex flex-col items-center justify-center text-center">
                    <Heart className="w-12 h-12 text-[#F0EBE0] mb-4" />
                    <p className="text-[#8C8C8C] font-light italic mb-6">"A heart full of wishes, but none saved yet."</p>
                    <Link href="/shop">
                        <Button className="bg-[#C9A24D] hover:bg-[#B69143] text-white rounded-full px-8">
                            Explore Collection
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {wishlist.map((item) => (
                            <motion.div
                                key={item._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-2xl border border-[#F0EBE0] overflow-hidden group shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="relative aspect-square overflow-hidden bg-[#FAF7F2]">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <button
                                        onClick={() => removeFromWishlist(item._id)}
                                        className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-5 space-y-3">
                                    <h3 className="font-heading text-[#1E1E1E] group-hover:text-[#C9A24D] transition-colors">
                                        <Link href={`/product/${item._id}`}>
                                            {item.name}
                                        </Link>
                                    </h3>
                                    <p className="text-[#C9A24D] font-bold text-sm">{formattedPrice(item.price)}</p>
                                    <Button
                                        onClick={() => addToCart(item)}
                                        className="w-full bg-[#FAF7F2] hover:bg-[#C9A24D] text-[#C9A24D] hover:text-white border border-[#C9A24D]/20 transition-all rounded-xl py-2 flex items-center justify-center gap-2 group/btn"
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Add to Bag</span>
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
