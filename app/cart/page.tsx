'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Download, Info } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, totalPrice } = useAppSelector((state) => state.cart);

  // Separate PDF and physical products
  const pdfItems = items.filter(item => item.category === 'PDF');
  const physicalItems = items.filter(item => item.category !== 'PDF');
  const hasPDFOnly = pdfItems.length > 0 && physicalItems.length === 0;
  const hasMixedCart = pdfItems.length > 0 && physicalItems.length > 0;

  // Delivery charge only applies to physical products
  const physicalItemsTotal = physicalItems.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0);
  const deliveryCharge = physicalItems.length > 0 && physicalItemsTotal < 500 ? 50 : 0;
  const finalTotal = totalPrice + deliveryCharge;

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemove = (id: number) => {
    if (confirm('Are you sure you want to remove this item from cart?')) {
      dispatch(removeFromCart(id));
    }
  };

  const handleProceedToCheckout = () => {
    router.push('/address');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12">
        <div className="text-center px-4">
          <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <button
            onClick={() => router.push('/products')}
            className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            {hasPDFOnly && <span className="ml-2 text-blue-600 font-semibold">(Digital Products)</span>}
            {hasMixedCart && <span className="ml-2 text-purple-600 font-semibold">(Mixed: Physical & Digital)</span>}
          </p>
        </div>

        {/* PDF Info Banner */}
        {pdfItems.length > 0 && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Digital Products in Cart</p>
              <p>
                {hasPDFOnly 
                  ? 'Your order contains only digital products. Downloads will be available immediately after payment.'
                  : 'Your order contains both physical and digital products. Digital items will be available for download immediately, while physical items will be shipped.'}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* PDF Products Section */}
            {pdfItems.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Download className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900">Digital Products</h2>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Instant Download
                  </span>
                </div>
                <div className="space-y-4">
                  {pdfItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-2 border-green-200 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                            PDF
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 pr-4">
                              <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">
                                {item.title}
                              </h3>
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <Download className="w-3 h-3" />
                                Digital Download
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                              title="Remove from cart"
                            >
                              <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                            </button>
                          </div>

                          {/* Price - PDFs are single purchase, no quantity */}
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-sm text-gray-600 bg-green-50 px-3 py-1 rounded-full">
                              Single License
                            </span>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-gray-900">
                                ₹{item.discountPrice}
                              </p>
                              {item.originalPrice > item.discountPrice && (
                                <p className="text-sm text-gray-400 line-through">
                                  ₹{item.originalPrice}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Physical Products Section */}
            {physicalItems.length > 0 && (
              <div>
                {pdfItems.length > 0 && (
                  <div className="flex items-center gap-2 mb-4 mt-8">
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-900">Physical Products</h2>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      Will be Shipped
                    </span>
                  </div>
                )}
                <div className="space-y-4">
                  {physicalItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 pr-4">
                              <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">
                                {item.title}
                              </h3>
                              <p className="text-sm text-gray-600 capitalize">
                                {item.category}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                              title="Remove from cart"
                            >
                              <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                            </button>
                          </div>

                          {/* Price and Quantity */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="px-3 py-2 hover:bg-gray-100 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 border-x border-gray-300 font-semibold min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="px-3 py-2 hover:bg-gray-100 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="text-2xl font-bold text-gray-900">
                                ₹{item.discountPrice * item.quantity}
                              </p>
                              {item.originalPrice > item.discountPrice && (
                                <p className="text-sm text-gray-400 line-through">
                                  ₹{item.originalPrice * item.quantity}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                  <span className="font-semibold">₹{totalPrice}</span>
                </div>

                {pdfItems.length > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-700 text-sm mb-1">
                      <Download className="w-4 h-4" />
                      <span className="font-semibold">Digital Products ({pdfItems.length})</span>
                    </div>
                    <p className="text-xs text-green-600">
                      Instant download after payment
                    </p>
                  </div>
                )}

                {physicalItems.length > 0 && (
                  <>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Charges</span>
                      <span className="font-semibold">
                        {deliveryCharge === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `₹${deliveryCharge}`
                        )}
                      </span>
                    </div>

                    {physicalItemsTotal < 500 && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-xs text-yellow-700">
                          Add ₹{500 - physicalItemsTotal} more to get free delivery on physical items!
                        </p>
                      </div>
                    )}
                  </>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold flex items-center justify-center gap-2 mb-4"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => router.push('/products')}
                className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Continue Shopping
              </button>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Secure Payment</span>
                </div>
                {physicalItems.length > 0 && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Easy Returns & Refunds</span>
                  </div>
                )}
                {pdfItems.length > 0 && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Lifetime Access to Digital Products</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>24/7 Customer Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}