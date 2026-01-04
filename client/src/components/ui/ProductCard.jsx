"use client";

import Link from 'next/link';
import Image from 'next/image';
import { formattedPrice } from '@/lib/data';
import { Button } from './Button';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative"
        >
            <Link href={`/product/${product._id}`} className="block overflow-hidden bg-gray-50 aspect-[4/5] relative">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Quick Add Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0 flex justify-center">
                    <Button className="w-full bg-white/90 text-black hover:bg-white backdrop-blur-sm shadow-lg">
                        Quick View
                    </Button>
                </div>
            </Link>

            <div className="mt-4 space-y-1">
                <h3 className="text-lg font-medium text-foreground">
                    <Link href={`/product/${product._id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                    </Link>
                </h3>
                <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                <p className="text-sm font-medium text-primary">{formattedPrice(product.price)}</p>
            </div>
        </motion.div>
    );
};

export default ProductCard;
