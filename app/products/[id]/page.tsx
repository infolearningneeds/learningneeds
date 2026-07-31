/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw, ChevronRight, Loader2, AlertCircle, Download } from 'lucide-react';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';

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
            
            alert(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart!`);
            setQuantity(1);
        }
    };

    const getCategoryBadgeStyle = (category: string) => {
        const styles: Record<string, string> = {
            'Book': 'bg-blue-600 text-white',
            'PDF': 'bg-green-600 text-white',
            'Learning Aid': 'bg-purple-600 text-white',
        };
        return styles[category] || 'bg-gray-600 text-white';
    };

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto text-gray-900" />
                    <p className="mt-4 text-gray-600 text-lg">Loading product...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                        <div className="flex items-center gap-3 text-red-800 justify-center">
                            <AlertCircle className="w-6 h-6" />
                            <p className="font-semibold">{error || 'Product not found'}</p>
                        </div>
                        <button
                            onClick={() => window.location.href = '/products'}
                            className="mt-4 w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Banner */}
            <div className="relative w-full bg-gray-900 py-16 sm:py-20 md:py-24">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center mt-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                        {product.title}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                        {product.description}
                    </p>
                    {isPDF && (
                        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold">
                            <Download className="w-5 h-5" />
                            Digital Product - Instant Download
                        </div>
                    )}
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span onClick={() => window.location.href = '/'} className="hover:text-gray-900 cursor-pointer transition-colors">Home</span>
                        <ChevronRight className="w-4 h-4" />
                        <span onClick={() => window.location.href = '/products'} className="hover:text-gray-900 cursor-pointer transition-colors">Products</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-gray-900 font-medium">{product.title}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
                {/* Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-lg group">
                            <Image
                                src={productImages[selectedImage]}
                                alt={product.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <button 
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={`absolute top-4 right-4 p-3 rounded-lg shadow-lg transition-all duration-300 ${
                                    isWishlisted ? 'bg-gray-900' : 'bg-white hover:bg-gray-50'
                                }`}
                            >
                                <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? 'text-white fill-white' : 'text-gray-700'}`} />
                            </button>
                            {isPDF && (
                                <div className="absolute top-4 left-4 px-4 py-2 bg-green-600 text-white rounded-lg font-bold text-sm">
                                    DIGITAL
                                </div>
                            )}
                        </div>
                        {productImages.length > 1 && (
                            <div className="grid grid-cols-4 gap-3">
                                {productImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 relative ${
                                            selectedImage === idx 
                                                ? 'border-gray-900 shadow-md' 
                                                : 'border-gray-200 hover:border-gray-400'
                                        }`}
                                    >
                                        <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-semibold mb-4 ${getCategoryBadgeStyle(product.category)}`}>
                                {product.category}
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {product.title}
                            </h1>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className="w-4 h-4 text-yellow-500" />
                                        ))}
                                    </div>
                                    <span className="font-semibold text-gray-900">5.0</span>
                                    <span className="text-gray-500 text-sm">(Reviews coming soon)</span>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Price */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <div className="flex items-baseline gap-4 flex-wrap">
                                <span className="text-4xl font-bold text-gray-900">
                                    ₹{displayPrice}
                                </span>
                                {hasDiscount && (
                                    <>
                                        <span className="text-xl text-gray-400 line-through">₹{product.original_price}</span>
                                        <span className="px-3 py-1 bg-gray-900 text-white rounded-lg text-sm font-semibold">
                                            {discountPercent}% OFF
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-3">
                            {isPDF ? (
                                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold text-sm flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Instant Digital Download
                                </span>
                            ) : (
                                <>
                                    <span className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                                        product.available && product.stock_quantity && product.stock_quantity > 0
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                        {product.available && product.stock_quantity && product.stock_quantity > 0
                                            ? `✓ In Stock (${product.stock_quantity} available)` 
                                            : '✗ Out of Stock'}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Quantity & Actions */}
                        <div className="space-y-5">
                            {!isPDF && canAddToCart && (
                                <div className="flex items-center gap-4 flex-wrap">
                                    <span className="text-gray-900 font-semibold">Quantity:</span>
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-4 py-2 hover:bg-gray-100 transition-colors font-semibold"
                                        >
                                            -
                                        </button>
                                        <span className="px-6 py-2 border-x border-gray-300 font-semibold">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock_quantity || 1, quantity + 1))}
                                            className="px-4 py-2 hover:bg-gray-100 transition-colors font-semibold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button 
                                    onClick={handleAddToCart}
                                    disabled={!canAddToCart}
                                    className={`flex-1 flex items-center justify-center gap-3 py-3 rounded-lg font-semibold transition-colors ${
                                        canAddToCart
                                            ? 'bg-gray-900 text-white hover:bg-gray-800' 
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
                                <button className="px-5 py-3 border border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all">
                                    <Share2 className="w-5 h-5 text-gray-700" />
                                </button>
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {!isPDF && (
                                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Truck className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">Free Delivery</p>
                                        <p className="text-xs text-gray-600">Orders over ₹500</p>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Shield className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">Secure Payment</p>
                                    <p className="text-xs text-gray-600">100% secure</p>
                                </div>
                            </div>
                            {!isPDF && (
                                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <RefreshCw className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">Easy Returns</p>
                                        <p className="text-xs text-gray-600">30 day return</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mb-16">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
                        <button
                            onClick={() => setShowReviewForm(!showReviewForm)}
                            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                        >
                            {showReviewForm ? 'Cancel' : 'Write a Review'}
                        </button>
                    </div>

                    {/* Review Form */}
                    {showReviewForm && (
                        <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
                            <h3 className="font-semibold text-gray-900 text-xl mb-6">Share Your Experience</h3>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        value={reviewName}
                                        onChange={(e) => setReviewName(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Rating</label>
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
                                                        star <= (hoverRating || userRating) ? 'text-yellow-500' : 'text-gray-300'
                                                    }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Review</label>
                                    <textarea
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 resize-none transition-colors"
                                        placeholder="Share your thoughts about this product..."
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleSubmitReview}
                                        className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
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
                                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
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
                                <div key={review.id} className="bg-white rounded-lg p-6 border border-gray-200">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
                                                {review.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                                <p className="text-sm text-gray-500">{review.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                        </div>
                    )}
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((item) => {
                                const itemPrice = item.discount_price || item.original_price;
                                const itemImage = item.product_images?.[0]?.image_url || '/placeholder-product.jpg';
                                
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => window.location.href = `/products/${item.id}`}
                                        className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200"
                                    >
                                        <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                            <Image src={itemImage} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
                                            <div className="flex items-center gap-1 mb-3">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className="w-3 h-3 text-yellow-500" />
                                                ))}
                                                <span className="text-xs text-gray-600 ml-1 font-medium">(5.0)</span>
                                            </div>
                                            <p className="text-lg font-bold text-gray-900">₹{itemPrice}</p>
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