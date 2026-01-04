import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-muted text-muted-foreground pt-16 pb-8">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-heading font-bold text-foreground tracking-widest">LUMIÈRE</h2>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Crafting moments of brilliance with ethically sourced diamonds and timeless designs.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-heading font-semibold text-foreground mb-4">Shop</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/shop" className="hover:text-primary transition-colors">All Jewelry</Link></li>
                            <li><Link href="/shop" className="hover:text-primary transition-colors">New Arrivals</Link></li>
                            <li><Link href="/shop" className="hover:text-primary transition-colors">Best Sellers</Link></li>
                            <li><Link href="/shop" className="hover:text-primary transition-colors">Collections</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-heading font-semibold text-foreground mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-heading font-semibold text-foreground mb-4">Newsletter</h3>
                        <p className="text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                            />
                            <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-border/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs">&copy; 2026 Lumière Jewelry. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Instagram className="w-5 h-5 hover:text-primary transition-colors cursor-pointer" />
                        <Facebook className="w-5 h-5 hover:text-primary transition-colors cursor-pointer" />
                        <Twitter className="w-5 h-5 hover:text-primary transition-colors cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
