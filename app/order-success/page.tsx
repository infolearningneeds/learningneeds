/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { CheckCircle2, Package, Truck, MapPin, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import confetti from 'canvas-confetti';

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const [order, setOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [address, setAddress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      router.push('/');
      return;
    }

    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      // Fetch order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (orderError) throw orderError;
      setOrder(orderData);

      // Fetch order items
      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId);

      if (itemsError) throw itemsError;
      setOrderItems(itemsData);

      // Fetch address
      const { data: addressData, error: addressError } = await supabase
        .from('addresses')
        .select('*')
        .eq('id', orderData.address_id)
        .single();

      if (addressError) throw addressError;
      setAddress(addressData);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching order details:', error);
      alert('Failed to load order details');
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8 mt-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full mb-4 ring-4 ring-emerald-500/30 backdrop-blur-sm">
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-400 text-lg">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
        </div>

        {/* Order Info Card */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 border border-gray-700/50 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 pb-6 border-b border-gray-700/50">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
              <p className="text-sm text-gray-400 mb-1">Order Number</p>
              <p className="font-semibold text-white">#{order.id.slice(0, 8)}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
              <p className="text-sm text-gray-400 mb-1">Order Date</p>
              <p className="font-semibold text-white">
                {new Date(order.created_at).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
              <p className="text-sm text-gray-400 mb-1">Total Amount</p>
              <p className="font-semibold text-emerald-400 text-lg">₹{order.total_amount}</p>
            </div>
          </div>

          {/* Order Status */}
          <div className="mb-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full"></div>
              Order Status
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-lg p-4 border border-emerald-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-white">Processing</span>
                    </div>
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-semibold border border-emerald-500/30">
                      Current
                    </span>
                  </div>
                  <div className="ml-13 pl-3 border-l-2 border-emerald-500/30 py-2">
                    <p className="text-sm text-gray-400">
                      Your order is being prepared for shipment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          {address && (
            <div className="mb-6">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                <MapPin className="w-5 h-5 text-blue-400" />
                Delivery Address
              </h3>
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-800/40 rounded-lg p-5 border border-gray-700/50">
                <p className="font-semibold text-white mb-2 text-lg">{address.full_name}</p>
                <div className="space-y-1 text-gray-300">
                  <p className="text-sm">{address.address_line1}</p>
                  {address.address_line2 && (
                    <p className="text-sm">{address.address_line2}</p>
                  )}
                  <p className="text-sm">
                    {address.city}, {address.state} - <span className="font-semibold">{address.pincode}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-700/50">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <p className="text-sm text-gray-300">{address.phone}</p>
                </div>
              </div>
            </div>
          )}

          {/* Payment Method */}
          <div className="mb-6">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              Payment Method
            </h3>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-800/40 rounded-lg p-5 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <p className="text-white font-medium capitalize">
                  {order.payment_method === 'cod' ? 'Cash on Delivery' : order.payment_method.toUpperCase()}
                </p>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  order.payment_status === 'completed' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {order.payment_status}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
              Order Items
            </h3>
            <div className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-700/50 last:border-b-0 group">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-800/50 ring-2 ring-gray-700/50 group-hover:ring-indigo-500/50 transition-all duration-300">
                    <Image
                      src={item.product_image}
                      alt={item.product_title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                      {item.product_title}
                    </h4>
                    <p className="text-sm text-gray-400 mb-2">
                      Category: <span className="capitalize text-gray-300">{item.category}</span>
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Quantity: <span className="font-semibold text-gray-300">{item.quantity}</span></p>
                      <p className="font-semibold text-emerald-400">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={() => router.push('/orders')}
            className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
          >
            <Truck className="w-5 h-5" />
            Track Order
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex-1 py-3 border border-gray-700 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 font-semibold"
          >
            Continue Shopping
          </button>
        </div>

        {/* Additional Info */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-6 backdrop-blur-sm">
          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-400" />
            What's Next?
          </h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-0.5 text-lg">•</span>
              <span>You'll receive an order confirmation email with your order details</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-0.5 text-lg">•</span>
              <span>We'll send you shipping updates as your order is processed</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-0.5 text-lg">•</span>
              <span>You can track your order status in the "My Orders" section</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}