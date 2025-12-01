'use client'

import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import Image from 'next/image'
import { Loader2, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface Product {
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
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch only available products, limit to 6 for homepage
            const response = await fetch('/api/products?available=true&limit=6');
            const result = await response.json();

            if (result.success) {
                setProducts(result.data);
            } else {
                setError('Failed to load products');
            }
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Error loading products');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='pt-16 pb-12 relative bg-gray-200'>
            <Image
                src="/images/cb.png"
                alt='Products'
                width={800}
                height={800}
                className='absolute top-[30%] animate-bounce'
            />
            <div className="w-[80%] pt-8 pb-8 mx-auto">
                <h1 className='text-4xl md:text-5xl text-gray-900 font-bold'>
                    Choose the right product
                </h1>
                <p className='text-black/70 mt-4'>
                    Our product ensures you get the best quality, performance, and value, 
                    so you are investing in both reliability and innovation.
                </p>

                {/* Loading State */}
                {loading && (
                    <div className="md:mt-16 mt-10 flex flex-col items-center justify-center py-12">
                        <Loader2 className="w-12 h-12 animate-spin text-rose-600" />
                        <p className="mt-4 text-gray-600">Loading products...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="md:mt-16 mt-10 flex flex-col items-center justify-center py-12">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                            <div className="flex items-center gap-3 text-red-800">
                                <AlertCircle className="w-6 h-6" />
                                <p className="font-semibold">{error}</p>
                            </div>
                            <button
                                onClick={fetchProducts}
                                className="mt-4 w-full px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* Products Grid */}
                {!loading && !error && products.length > 0 && (
                    <div className="md:mt-16 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                        {products.map((product) => (
                            <div key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && products.length === 0 && (
                    <div className="md:mt-16 mt-10 text-center py-12">
                        <p className="text-gray-600 text-lg">No products available at the moment.</p>
                        <p className="text-gray-500 mt-2">Check back soon for new arrivals!</p>
                    </div>
                )}

                {/* View All Products Link */}
                {!loading && !error && products.length > 0 && (
                    <div className="mt-12 text-center">
                        <Link
                            href="/products"
                            className="inline-block px-8 py-3 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                            View All Products →
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;