"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Share2, Mail, Send } from 'lucide-react';
import { getApiUrl } from '@/lib/api';

const ShareModal = ({ isOpen, onClose, product }) => {
    const [copied, setCopied] = useState(false);

    if (!isOpen || !product) return null;

    const productLink = typeof window !== 'undefined' ? `${window.location.origin}/product/${product._id}` : '';
    const shareText = `Look at this beautiful jewellery piece I found on LUMIÈRE ✨\n${product.name}\n${productLink}`;

    const trackShare = async (platform) => {
        try {
            await fetch(getApiUrl('share/log'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product._id, platform })
            });
        } catch (err) {
            console.error("Tracking Error:", err);
        }
    };

    const handleShare = async (platform) => {
        trackShare(platform);

        switch (platform) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productLink)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
                break;
            case 'email':
                window.open(`mailto:?subject=${encodeURIComponent(`Check out this ${product.name}`)}&body=${encodeURIComponent(shareText)}`);
                break;
            case 'telegram':
                window.open(`https://t.me/share/url?url=${encodeURIComponent(productLink)}&text=${encodeURIComponent(`Look at this beautiful jewellery piece I found on LUMIÈRE ✨\n${product.name}`)}`, '_blank');
                break;
            case 'copylink':
                navigator.clipboard.writeText(productLink);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                break;
            case 'webshare':
                if (navigator.share) {
                    navigator.share({
                        title: 'LUMIÈRE',
                        text: `Look at this beautiful jewellery piece I found on LUMIÈRE ✨\n${product.name}`,
                        url: productLink,
                    }).catch((error) => console.log('Error sharing', error));
                }
                break;
            default:
                break;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-xl shadow-2xl z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-[#FDFCF8]">
                            <h3 className="text-lg font-heading font-semibold text-[#1c1c1c]">Share this piece</h3>
                            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Product Mini Preview */}
                        <div className="p-4 flex gap-4 bg-gray-50/50">
                            <div className="w-16 h-16 bg-white rounded-md overflow-hidden border border-gray-200 flex-shrink-0 relative">
                                <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm text-[#1c1c1c] line-clamp-1">{product.name}</h4>
                                <p className="text-xs text-[#c5a059] font-semibold">LUMIÈRE Collection</p>
                            </div>
                        </div>

                        {/* Options Grid */}
                        <div className="p-6 grid grid-cols-4 gap-4">
                            <ShareButton
                                icon={<div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]"><Send className="w-5 h-5" /></div>}
                                label="WhatsApp"
                                onClick={() => handleShare('whatsapp')}
                            />
                            <ShareButton
                                icon={<div className="w-10 h-10 rounded-full bg-[#E1306C]/10 flex items-center justify-center text-[#E1306C]"><div className="w-5 h-5 border-2 border-current rounded-md" /></div>}
                                label="Instagram"
                                onClick={() => handleShare('instagram')} // Instagram API doesn't allow direct sharing via link easily, usually stories. We'll simulate or just link profile. For now, using generic share action or just keep it for UI completeness/mock. Actually standard share intents don't support IG well. Let's redirect to IG? Or just omit logic? Let's use a generic generic share for mobile if possible.
                            />
                            <ShareButton
                                icon={<div className="w-10 h-10 rounded-full bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2]"><Share2 className="w-5 h-5" /></div>}
                                label="Facebook"
                                onClick={() => handleShare('facebook')}
                            />
                            <ShareButton
                                icon={<div className="w-10 h-10 rounded-full bg-[#0088cc]/10 flex items-center justify-center text-[#0088cc]"><Send className="w-5 h-5 -rotate-45" /></div>}
                                label="Telegram"
                                onClick={() => handleShare('telegram')}
                            />
                            <ShareButton
                                icon={<div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"><Mail className="w-5 h-5" /></div>}
                                label="Email"
                                onClick={() => handleShare('email')}
                            />

                            {/* Copy Link */}
                            <div className="col-span-1 flex flex-col items-center gap-2 cursor-pointer group" onClick={() => handleShare('copylink')}>
                                <div className="w-10 h-10 rounded-full bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-white transition-all">
                                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </div>
                                <span className="text-xs text-gray-600 font-medium">{copied ? 'Copied' : 'Copy Link'}</span>
                            </div>
                        </div>

                        {/* Native Share fallback Button */}
                        {typeof navigator !== 'undefined' && navigator.share && (
                            <div className="px-6 pb-6">
                                <button
                                    onClick={() => handleShare('webshare')}
                                    className="w-full py-3 bg-[#1c1c1c] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center justify-center gap-2"
                                >
                                    <Share2 className="w-4 h-4" /> More Options (Native)
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const ShareButton = ({ icon, label, onClick }) => (
    <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={onClick}>
        <div className="transition-transform group-hover:scale-105">
            {icon}
        </div>
        <span className="text-xs text-gray-600 font-medium">{label}</span>
    </div>
);

export default ShareModal;
