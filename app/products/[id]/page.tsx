/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw, ChevronRight, Loader2, AlertCircle, Download } from 'lucide-react';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import toast from 'react-hot-toast';
import IndustryHero from '@/components/helper/IndustryHero';

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

export default function ProductDetailsPage() {
    const params = useParams();
    const dispatch = useAppDispatch();
    const productId = params.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviewName, setReviewName] = useState('');
    const [submittedReviews, setSubmittedReviews] = useState<Array<{
        id: number;
        name: string;
        rating: number;
        comment: string;
        date: string;
    }>>([]);

    useEffect(() => {
        if (productId) {
            fetchProduct(productId);
        }
    }, [productId]);

    const fetchProduct = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/products?productId=${id}`);
            const result = await response.json();

            if (result.success && result.data.length > 0) {
                const fetchedProduct = result.data[0];
                setProduct(fetchedProduct);
                
                // Fetch related products from same category
                if (fetchedProduct.category) {
                    fetchRelatedProducts(fetchedProduct.category, id);
                }
            } else {
                setError('Product not found');
            }
        } catch (err) {
            console.error('Error fetching product:', err);
            setError('Error loading product');
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedProducts = async (category: string, excludeId: string) => {
        try {
            const response = await fetch(`/api/products?category=${category}&available=true&limit=4`);
            const result = await response.json();

            if (result.success) {
                const filtered = result.data.filter((p: Product) => p.id !== excludeId);
                setRelatedProducts(filtered.slice(0, 4));
            }
        } catch (err) {
            console.error('Error fetching related products:', err);
        }
    };

    const handleSubmitReview = () => {
        if (userRating > 0 && reviewText.trim() && reviewName.trim()) {
            const newReview = {
                id: Date.now(),
                name: reviewName,
                rating: userRating,
                comment: reviewText,
                date: new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })
            };
            setSubmittedReviews([newReview, ...submittedReviews]);
            setUserRating(0);
            setReviewText('');
            setReviewName('');
            setShowReviewForm(false);
        }
    };

    const handleAddToCart = () => {
        if (product && product.available) {
            const displayPrice = product.discount_price || product.original_price;
            const mainImage = product.product_images?.[0]?.image_url || '/placeholder-product.jpg';
            
            dispatch(addToCart({
                id: parseInt(product.id) || 0,
                title: product.title,
                image: mainImage,
                discountPrice: displayPrice,
                originalPrice: product.original_price,
                quantity: quantity,
                category: product.category
            }));
            
            toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart!`);
            setQuantity(1);
        }
    };

    const getCategoryBadgeStyle = (category: string) => {
        const styles: Record<string, string> = {
            'Book': 'bg-blue-600 text-white',
            'PDF': 'bg-green-600 text-white',
            'Learning Aid': 'bg-purple-600 text-white',
        };
        return styles[category] || 'bg-indigo-600 text-white';
    };

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto text-indigo-500" />
                    <p className="mt-4 text-gray-300 text-lg">Loading product...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
                <div className="text-center">
                    <div className="bg-red-900/20 border border-red-800 rounded-2xl p-6 max-w-md mx-auto">
                        <div className="flex items-center gap-3 text-red-400 justify-center">
                            <AlertCircle className="w-6 h-6 flex-shrink-0" />
                            <p className="font-semibold">{error || 'Product not found'}</p>
                        </div>
                        <button
                            onClick={() => window.location.href = '/products'}
                            className="mt-4 w-full px-4 py-2 bg-indigo-800 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                            Back to Products
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const displayPrice = product.discount_price || product.original_price;
    const hasDiscount = product.discount_price && product.discount_price < product.original_price;
    const discountPercent = hasDiscount && product.discount_price
        ? Math.round(((product.original_price - product.discount_price) / product.original_price) * 100)
        : 0;

    const sortedImages = product.product_images?.sort((a, b) => a.display_order - b.display_order) || [];
    const productImages = sortedImages.length > 0 
        ? sortedImages.map(img => img.image_url)
        : ['/placeholder-product.jpg'];

    const isPDF = product.category === 'PDF';
    const canAddToCart = product.available && (isPDF || (product.stock_quantity && product.stock_quantity > 0));

    return (
        <div className="min-h-screen bg-gray-900 overflow-x-hidden">
            {/* Breadcrumb */}
            <div className="bg-indigo-800 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300 overflow-x-auto">
                        <span onClick={() => window.location.href = '/'} className="hover:text-white cursor-pointer transition-colors whitespace-nowrap">Home</span>
                        <ChevronRight className="w-4 h-4 shrink-0" />
                        <span onClick={() => window.location.href = '/products'} className="hover:text-white cursor-pointer transition-colors whitespace-nowrap">Products</span>
                        <ChevronRight className="w-4 h-4 shrink-0" />
                        <span className="text-white font-medium truncate">{product.title}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-16">
                    {/* Image Gallery & Description */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-800 shadow-xl group">
                                <Image
                                    src={productImages[selectedImage]}
                                    alt={product.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                                <button 
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 ${
                                        isWishlisted ? 'bg-indigo-800' : 'bg-gray-800/90 hover:bg-gray-700/90'
                                    }`}
                                >
                                    <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? 'text-white fill-white' : 'text-gray-200'}`} />
                                </button>
                                {isPDF && (
                                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-green-600 text-white rounded-full font-semibold text-xs tracking-wide">
                                        DIGITAL
                                    </div>
                                )}
                                {hasDiscount && (
                                    <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-red-600 text-white rounded-full font-bold text-xs tracking-wide">
                                        {discountPercent}% OFF
                                    </div>
                                )}
                            </div>
                            {productImages.length > 1 && (
                                <div className="grid grid-cols-4 gap-3">
                                    {productImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 relative ${
                                                selectedImage === idx 
                                                    ? 'border-indigo-800 shadow-md scale-95' 
                                                    : 'border-gray-700 hover:border-indigo-600'
                                            }`}
                                        >
                                            <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Description */}
                        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4">Product Description</h3>
                            <p className="text-gray-300 leading-relaxed break-words whitespace-pre-wrap">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Category Badge */}
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide ${getCategoryBadgeStyle(product.category)}`}>
                            {product.category}
                        </span>

                        {/* Title & Rating */}
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight break-words">
                                {product.title}
                            </h1>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="font-semibold text-white">5.0</span>
                                <span className="text-gray-500 text-sm">·</span>
                                <span className="text-gray-400 text-sm">No reviews yet</span>
                            </div>
                        </div>

                        {/* Price Section */}
                        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                            <div className="flex items-baseline gap-3 flex-wrap">
                                <span className="text-4xl lg:text-5xl font-bold text-white">
                                    ₹{displayPrice.toLocaleString()}
                                </span>
                                {hasDiscount && (
                                    <>
                                        <span className="text-xl text-gray-500 line-through">₹{product.original_price.toLocaleString()}</span>
                                        <span className="px-2.5 py-1 bg-red-600 text-white rounded-full text-xs font-bold tracking-wide">
                                            SAVE {discountPercent}%
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-3 flex-wrap">
                            {isPDF ? (
                                <span className="px-4 py-2.5 bg-green-900/30 text-green-400 rounded-xl font-semibold text-sm flex items-center gap-2 border border-green-800">
                                    <Download className="w-4 h-4" />
                                    Instant Digital Download
                                </span>
                            ) : (
                                <span className={`px-4 py-2.5 rounded-xl font-semibold text-sm ${
                                    product.available && product.stock_quantity && product.stock_quantity > 0
                                        ? 'bg-green-900/30 text-green-400 border border-green-800' 
                                        : 'bg-red-900/30 text-red-400 border border-red-800'
                                }`}>
                                    {product.available && product.stock_quantity && product.stock_quantity > 0
                                        ? `✓ In Stock (${product.stock_quantity} available)` 
                                        : '✗ Out of Stock'}
                                </span>
                            )}
                        </div>

                        {/* Quantity & Actions */}
                        <div className="space-y-4 pt-2">
                            {!isPDF && canAddToCart && (
                                <div className="flex items-center gap-4 flex-wrap">
                                    <span className="text-white font-semibold text-sm">Quantity:</span>
                                    <div className="flex items-center border-2 border-gray-700 rounded-xl overflow-hidden bg-gray-800">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-4 py-2.5 hover:bg-gray-700 transition-colors font-semibold text-gray-300"
                                        >
                                            −
                                        </button>
                                        <span className="px-6 py-2.5 border-x-2 border-gray-700 font-bold text-white min-w-[60px] text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock_quantity || 1, quantity + 1))}
                                            className="px-4 py-2.5 hover:bg-gray-700 transition-colors font-semibold text-gray-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button 
                                    onClick={handleAddToCart}
                                    disabled={!canAddToCart}
                                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all text-base ${
                                        canAddToCart
                                            ? 'bg-indigo-800 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl active:scale-95' 
                                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    {isPDF ? (
                                        <>
                                            <Download className="w-5 h-5" />
                                            Buy & Download
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="w-5 h-5" />
                                            {canAddToCart ? 'Add to Cart' : 'Out of Stock'}
                                        </>
                                    )}
                                </button>
                                <button className="px-5 py-4 border-2 border-gray-700 rounded-xl hover:border-indigo-600 hover:bg-gray-800 transition-all active:scale-95">
                                    <Share2 className="w-5 h-5 text-gray-300" />
                                </button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 gap-3 pt-4">
                            {!isPDF && (
                                <div className="flex items-center gap-3 p-4 bg-blue-900/20 rounded-xl border border-blue-800">
                                    <div className="p-2.5 bg-blue-900/30 rounded-lg flex-shrink-0">
                                        <Truck className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white text-sm">Free Delivery</p>
                                        <p className="text-xs text-gray-400">On orders over ₹500</p>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-3 p-4 bg-green-900/20 rounded-xl border border-green-800">
                                <div className="p-2.5 bg-green-900/30 rounded-lg flex-shrink-0">
                                    <Shield className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-sm">Secure Payment</p>
                                    <p className="text-xs text-gray-400">100% secure checkout</p>
                                </div>
                            </div>
                            {!isPDF && (
                                <div className="flex items-center gap-3 p-4 bg-purple-900/20 rounded-xl border border-purple-800">
                                    <div className="p-2.5 bg-purple-900/30 rounded-lg flex-shrink-0">
                                        <RefreshCw className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white text-sm">Easy Returns</p>
                                        <p className="text-xs text-gray-400">30-day return policy</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mb-16">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">Customer Reviews</h2>
                        <button
                            onClick={() => setShowReviewForm(!showReviewForm)}
                            className="px-6 py-3 bg-indigo-800 text-white rounded-xl hover:bg-indigo-700 transition-all font-semibold shadow-lg hover:shadow-xl active:scale-95 w-full sm:w-auto"
                        >
                            {showReviewForm ? 'Cancel' : 'Write a Review'}
                        </button>
                    </div>

                    {/* Review Form */}
                    {showReviewForm && (
                        <div className="bg-gray-800 rounded-2xl p-6 sm:p-8 mb-8 border border-gray-700">
                            <h3 className="font-bold text-white text-xl mb-6">Share Your Experience</h3>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        value={reviewName}
                                        onChange={(e) => setReviewName(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-700 bg-gray-900 text-white rounded-xl focus:outline-none focus:border-indigo-800 transition-colors"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">Your Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => setUserRating(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className="focus:outline-none transition-transform hover:scale-110"
                                            >
                                                <FaStar
                                                    className={`w-8 h-8 transition-colors ${
                                                        star <= (hoverRating || userRating) ? 'text-yellow-400' : 'text-gray-600'
                                                    }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">Your Review</label>
                                    <textarea
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-gray-700 bg-gray-900 text-white rounded-xl focus:outline-none focus:border-indigo-800 resize-none transition-colors"
                                        placeholder="Share your thoughts about this product..."
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={handleSubmitReview}
                                        className="px-6 py-3 bg-indigo-800 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
                                    >
                                        Submit Review
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowReviewForm(false);
                                            setUserRating(0);
                                            setReviewText('');
                                            setReviewName('');
                                        }}
                                        className="px-6 py-3 border-2 border-gray-700 rounded-xl hover:bg-gray-800 transition-colors font-semibold text-gray-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Reviews List */}
                    {submittedReviews.length > 0 ? (
                        <div className="space-y-6">
                            {submittedReviews.map((review) => (
                                <div key={review.id} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
                                    <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-indigo-800 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                                                {review.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white">{review.name}</h4>
                                                <p className="text-sm text-gray-400">{review.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed break-words">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-800 rounded-2xl border border-gray-700">
                            <p className="text-gray-400">No reviews yet. Be the first to review this product!</p>
                        </div>
                    )}
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Related Products</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {relatedProducts.map((item) => {
                                const itemPrice = item.discount_price || item.original_price;
                                const itemImage = item.product_images?.[0]?.image_url || '/placeholder-product.jpg';
                                
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => window.location.href = `/products/${item.id}`}
                                        className="group bg-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-700"
                                    >
                                        <div className="aspect-square bg-gray-900 relative overflow-hidden">
                                            <Image src={itemImage} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-white mb-2 line-clamp-2 text-sm sm:text-base">{item.title}</h3>
                                            <div className="flex items-center gap-1 mb-3">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className="w-3 h-3 text-yellow-400" />
                                                ))}
                                                <span className="text-xs text-gray-400 ml-1 font-medium">(5.0)</span>
                                            </div>
                                            <p className="text-lg font-bold text-white">₹{itemPrice.toLocaleString()}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}