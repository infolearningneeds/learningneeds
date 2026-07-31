'use client'

import React, { useState } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { FiShoppingCart } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CartIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, totalItems, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    setIsOpen(false);
    // Navigate to address page first (not directly to checkout)
    router.push('/address');
  };

  const handleViewCart = () => {
    setIsOpen(false);
    router.push('/cart');
  };

  // Calculate delivery charge
  const deliveryCharge = totalPrice > 500 ? 0 : 50;
  const finalTotal = totalPrice + deliveryCharge;

  return (
    <>
      {/* Cart Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative text-white hover:text-orange-600 transition-colors text-2xl"
      >
        <FiShoppingCart />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[2000] overflow-hidden pointer-events-none">
          {/* Backdrop - Transparent but clickable */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar - Starts from extreme right */}
          <div className="absolute right-0 top-0 h-full w-full sm:w-[450px] max-w-full bg-white shadow-2xl flex flex-col animate-slide-in pointer-events-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-indigo-800">
              <div className="flex items-center gap-3">
                <FiShoppingCart className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
                {totalItems > 0 && (
                  <span className="bg-red-600 text-white text-sm font-semibold px-2.5 py-1 rounded-full shadow-lg">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <FiShoppingCart className="w-20 h-20 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Add some products to get started!</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                          {item.title}
                        </h3>
                        <span className="inline-block px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800 rounded mb-2">
                          {item.category}
                        </span>
                        
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-lg font-bold text-indigo-800">
                            ₹{item.discountPrice}
                          </p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1 border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 hover:bg-gray-100 rounded-l-lg transition-colors"
                            >
                              <Minus className="w-4 h-4 text-gray-700" />
                            </button>
                            <span className="font-semibold text-gray-900 w-10 text-center border-x border-gray-300">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-gray-100 rounded-r-lg transition-colors"
                            >
                              <Plus className="w-4 h-4 text-gray-700" />
                            </button>
                          </div>
                        </div>

                        {/* Subtotal & Remove */}
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600">
                            Subtotal: <span className="font-semibold text-gray-900">₹{item.discountPrice * item.quantity}</span>
                          </p>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-1.5 hover:bg-red-50 rounded-lg transition-colors group"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4 text-red-600 group-hover:text-red-700" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Total & Checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4 bg-white">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-base">
                    <span className="text-gray-700 font-medium">Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{totalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-base">
                    <span className="text-gray-700 font-medium">Delivery</span>
                    <span className={`font-semibold ${deliveryCharge === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                      {deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}
                    </span>
                  </div>
                  
                  {/* Free delivery notice */}
                  {totalPrice < 500 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                      <p className="text-xs text-yellow-700">
                        Add ₹{500 - totalPrice} more for free delivery!
                      </p>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-indigo-800">₹{finalTotal}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02]"
                >
                  Proceed to Checkout
                </button>
                
                {/* View Full Cart Button */}
                <button
                  onClick={handleViewCart}
                  className="w-full py-3 border-2 border-indigo-800 text-indigo-800 rounded-lg hover:bg-indigo-50 transition-colors font-semibold"
                >
                  View Full Cart
                </button>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}