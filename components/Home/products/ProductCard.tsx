'use client'

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import Tilt from 'react-parallax-tilt';

interface ProductProps {
    product: {
        id: string;
        title: string;
        description: string;
        category: string;
        original_price: number;
        discount_price: number | null;
        available: boolean;
        stock_quantity: number | null;
        product_images?: Array<{
            id: string;
            image_url: string;
            display_order: number;
        }>;
        pdf_url?: string | null;
    };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
    // Get the first image or a placeholder
    const displayImage = product.product_images?.[0]?.image_url || '/placeholder-product.jpg';
    
    // Calculate display price
    const displayPrice = product.discount_price || product.original_price;
    const hasDiscount = product.discount_price && product.discount_price < product.original_price;

    const getCategoryBadgeStyle = (category: string) => {
        const styles: Record<string, string> = {
            'Book': 'bg-blue-100 text-blue-700 border-blue-300',
            'Learning Aid': 'bg-purple-100 text-purple-700 border-purple-300',
            'PDF': 'bg-green-100 text-green-700 border-green-300',
        };
        return styles[category] || 'bg-gray-100 text-gray-700 border-gray-300';
    };

    // Determine stock status
    const getStockStatus = () => {
        if (product.category === 'PDF') {
            return { text: 'Digital', color: 'text-blue-600' };
        }
        if (!product.available) {
            return { text: 'Out of Stock', color: 'text-red-600' };
        }
        if (product.stock_quantity === null || product.stock_quantity === 0) {
            return { text: 'Out of Stock', color: 'text-red-600' };
        }
        if (product.stock_quantity < 5) {
            return { text: `Only ${product.stock_quantity} left`, color: 'text-orange-600' };
        }
        return { text: 'In Stock', color: 'text-green-600' };
    };

    const stockStatus = getStockStatus();

    return (
        <Tilt>
            <Link href={`/products/${product.id}`}>
                <div className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">

                    {/* IMAGE */}
                    <div className="relative h-64">
                        <Image
                            src={displayImage}
                            alt={product.title}
                            fill
                            className="object-cover"
                        />
                        {/* PDF Badge */}
                        {product.category === 'PDF' && (
                            <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                DIGITAL
                            </div>
                        )}
                        {/* Discount Badge */}
                        {hasDiscount && (
                            <div className="absolute top-3 right-3 bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                SAVE {Math.round(((product.original_price - product.discount_price!) / product.original_price) * 100)}%
                            </div>
                        )}
                    </div>

                    <div className="p-4 flex flex-col flex-1">

                        {/* PRICE BADGE */}
                        <h1 className='ml-auto relative z-[10] h-20 w-20 flex items-center 
                        justify-center flex-col mt-[-4rem] rounded-full 
                        bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 
                        text-white font-bold text-lg shadow-md'>
                            ₹{displayPrice}
                        </h1>

                        {/* CATEGORY & STOCK */}
                        <div className="flex items-center mt-1 space-x-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getCategoryBadgeStyle(product.category)}`}>
                                {product.category}
                            </span>

                            <span className={`text-sm font-semibold ${stockStatus.color}`}>
                                {stockStatus.text}
                            </span>
                        </div>

                        {/* TITLE */}
                        <h1 className="text-xl text-black font-bold mt-1 hover:text-rose-600 transition-colors line-clamp-1">
                            {product.title}
                        </h1>

                        {/* REVIEWS - Placeholder for now */}
                        <div className="flex mt-1 items-center space-x-2">
                            <div className="flex items-center">
                                {Array(5).fill(0).map((_, i) => (
                                    <FaStar key={i} className="w-4 h-4 text-yellow-600" />
                                ))}
                            </div>
                            <span className="text-base text-orange-800 font-semibold">
                                (5.0 reviews)
                            </span>
                        </div>

                        {/* DESCRIPTION */}
                        <p className="text-gray-600 mt-2 line-clamp-2 min-h-[45px]">
                            {product.description}
                        </p>

                        <div className="mt-3 mb-3 w-full h-[2px] bg-gray-500 opacity-15"></div>

                        {/* PRICES */}
                        <div className="mt-auto">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-lg font-bold text-rose-600">
                                    ₹{displayPrice}
                                </p>
                                {hasDiscount && (
                                    <p className="text-base line-through text-gray-500">
                                        ₹{product.original_price}
                                    </p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </Link>
        </Tilt>
    );
};

export default ProductCard;