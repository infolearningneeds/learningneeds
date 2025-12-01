// app/order-success/OrderSuccessClient.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { CheckCircle2, Package, Truck, MapPin, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import confetti from 'canvas-confetti';

export default function OrderSuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const [order, setOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [address, setAddress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!orderId) {
      router.replace('/');
      return;
    }

    // Confetti celebration!
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#34d399', '#10b981', '#059669', '#6ee7b7'],
    });

    const fetchOrderDetails = async () => {
      try {
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (orderError || !orderData) throw new Error('Order not found');

        const { data: itemsData, error: itemsError } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', orderId);

        if (itemsError) throw itemsError;

        const { data: addressData, error: addressError } = await supabase
          .from('addresses')
          .select('*')
          .eq('id', orderData.address_id)
          .single();

        if (addressError) throw addressError;

        setOrder(orderData);
        setOrderItems(itemsData || []);
        setAddress(addressData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load order:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg">Loading your order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Order Not Found</h2>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            Go Home
          </button>
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
            Thank you for your order #{order.id.slice(0, 8)}. A confirmation email has been sent.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 border border-gray-700/50 mb-6">
          {/* Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-700/50">
            <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700/30">
              <p className="text-sm text-gray-400">Order ID</p>
              <p className="font-bold text-white text-lg">#{order.id.slice(0, 8)}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700/30">
              <p className="text-sm text-gray-400">Order Date</p>
              <p className="font-semibold text-white">
                {new Date(order.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700/30">
              <p className="text-sm text-gray-400">Total Paid</p>
              <p className="font-bold text-emerald-400 text-xl">₹{order.total_amount}</p>
            </div>
          </div>

          {/* Rest of your beautiful UI stays exactly the same */}
          {/* Order Status */}
          <div className="mb-8">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full"></div>
              Order Status
            </h3>
            <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-lg p-5 border border-emerald-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-white">Processing</span>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-semibold border border-emerald-500/30">
                  Current
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-3 ml-13 pl-3 border-l-2 border-emerald-500/30">
                Your order is being prepared for shipment
              </p>
            </div>
          </div>

          {/* Delivery Address */}
          {address && (
            <div className="mb-8">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                <MapPin className="w-5 h-5 text-blue-400" />
                Delivery Address
              </h3>
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-800/40 rounded-lg p-6 border border-gray-700/50">
                <p className="font-bold text-white text-lg mb-2">{address.full_name}</p>
                <div className="text-gray-300 space-y-1">
                  <p>{address.address_line1}</p>
                  {address.address_line2 && <p>{address.address_line2}</p>}
                  <p>{address.city}, {address.state} - {address.pincode}</p>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-700/50">
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span>{address.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Method */}
          <div className="mb-8">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              Payment Method
            </h3>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-800/40 rounded-lg p-6 border border-gray-700/50 flex justify-between items-center">
              <p className="text-white font-medium">
                {order.payment_method === 'cod' ? 'Cash on Delivery' : order.payment_method.toUpperCase()}
              </p>
              <span className={`px-4 py-1 rounded-full text-xs font-bold ${
                order.payment_status === 'completed'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              }`}>
                {order.payment_status.toUpperCase()}
              </span>
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
                <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-700/50 last:border-b-0">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-800/50 ring-2 ring-gray-700/50">
                    <Image
                      src={item.product_image}
                      alt={item.product_title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{item.product_title}</h4>
                    <p className="text-sm text-gray-400 mt-1">Qty: {item.quantity}</p>
                    <p className="text-emerald-400 font-bold mt-2">₹{item.price * item.quantity}</p>
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
            className="flex-1 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all font-bold text-lg shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
          >
            <Truck className="w-5 h-5" />
            Track Order
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex-1 py-4 border border-gray-600 bg-gray-800/50 text-white rounded-lg hover:bg-gray-800 transition-all font-semibold"
          >
            Continue Shopping
          </button>
        </div>

        {/* Final Note */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-6 backdrop-blur-sm text-center">
          <h4 className="font-bold text-white mb-3 flex items-center justify-center gap-2">
            <Mail className="w-5 h-5 text-blue-400" />
            What's Next?
          </h4>
          <p className="text-gray-300">
            You’ll receive email updates as your order moves through processing, packaging, and delivery.
          </p>
        </div>
      </div>
    </div>
  );
}