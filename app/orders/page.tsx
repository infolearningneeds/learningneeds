/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { Package, Truck, CheckCircle2, XCircle, Clock, Download, Eye } from 'lucide-react';

interface Order {
  id: string;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
}

interface OrderItem {
  id: string;
  product_id: string;
  product_title: string;
  product_image: string;
  quantity: number;
  price: number;
  category: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<Record<string, OrderItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUserAndFetchOrders();
  }, []);

  const checkUserAndFetchOrders = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/signin');
      return;
    }
    setUser(user);
    await fetchOrders(user.id);
  };

  const fetchOrders = async (userId: string) => {
    try {
      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      setOrders(ordersData || []);

      // Fetch order items for each order
      const itemsMap: Record<string, OrderItem[]> = {};
      for (const order of ordersData || []) {
        const { data: itemsData, error: itemsError } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', order.id);

        if (!itemsError && itemsData) {
          itemsMap[order.id] = itemsData;
        }
      }

      setOrderItems(itemsMap);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const hasOnlyPDFs = (items: OrderItem[]): boolean => {
    return items && items.length > 0 && items.every(item => item.category === 'PDF');
  };

  const hasPDFs = (items: OrderItem[]): boolean => {
    return items && items.some(item => item.category === 'PDF');
  };

  const handleViewOrder = (orderId: string) => {
    const items = orderItems[orderId] || [];
    
    // If order contains only PDFs, go to download page
    if (hasOnlyPDFs(items)) {
      router.push(`/pdf-download?orderId=${orderId}`);
    } else {
      router.push(`/order-success?orderId=${orderId}`);
    }
  };

  const handleDownloadPDFs = (orderId: string) => {
    router.push(`/pdf-download?orderId=${orderId}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'confirmed':
        return <Package className="w-5 h-5 text-blue-400" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-400" />;
      case 'delivered':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
      case 'confirmed':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      case 'shipped':
        return 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
      case 'delivered':
        return 'bg-green-500/20 text-green-300 border border-green-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-200">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 mt-20">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            My Orders
          </h1>
          <p className="text-indigo-300">View and track your orders</p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-gradient-to-br from-slate-800/50 to-indigo-900/30 backdrop-blur-sm rounded-xl shadow-2xl p-12 text-center border border-indigo-500/20">
            <Package className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No orders yet</h3>
            <p className="text-indigo-300 mb-6">Start shopping to create your first order</p>
            <button
              onClick={() => router.push('/products')}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg shadow-indigo-500/30"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const items = orderItems[order.id] || [];
              const onlyPDFs = hasOnlyPDFs(items);
              const containsPDFs = hasPDFs(items);

              return (
                <div
                  key={order.id}
                  className={`bg-gradient-to-br backdrop-blur-sm rounded-xl shadow-2xl border-2 overflow-hidden transform transition-all duration-300 hover:scale-[1.01] ${
                    onlyPDFs 
                      ? 'from-green-900/30 to-emerald-900/20 border-green-500/30 shadow-green-500/20' 
                      : 'from-slate-800/50 to-indigo-900/30 border-indigo-500/20 shadow-indigo-500/20'
                  }`}
                >
                  {/* Order Header */}
                  <div className={`px-6 py-4 border-b backdrop-blur-sm ${
                    onlyPDFs 
                      ? 'bg-green-500/10 border-green-500/20' 
                      : 'bg-indigo-500/10 border-indigo-500/20'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {onlyPDFs ? (
                            <Download className="w-5 h-5 text-green-400" />
                          ) : (
                            getStatusIcon(order.order_status)
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm text-indigo-300">Order #{order.id.slice(0, 8)}</p>
                              {onlyPDFs && (
                                <span className="px-2 py-0.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-bold rounded shadow-lg">
                                  DIGITAL
                                </span>
                              )}
                              {!onlyPDFs && containsPDFs && (
                                <span className="px-2 py-0.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded shadow-lg">
                                  MIXED
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-indigo-400">
                              Placed on {new Date(order.created_at).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-lg text-sm font-semibold capitalize ${getStatusColor(order.order_status)}`}>
                          {order.order_status}
                        </span>
                        <span className="text-lg font-bold text-white">
                          ₹{order.total_amount}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-4 pb-4 border-b border-indigo-500/20 last:border-b-0">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-indigo-900/30 ring-2 ring-indigo-500/20">
                            <Image
                              src={item.product_image}
                              alt={item.product_title}
                              fill
                              className="object-cover"
                            />
                            {item.category === 'PDF' && (
                              <div className="absolute top-1 left-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-bold px-1.5 py-0.5 rounded shadow-lg">
                                PDF
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="font-semibold text-white mb-1">
                                  {item.product_title}
                                </h4>
                                <p className="text-sm text-indigo-300 mb-1 flex items-center gap-2">
                                  <span className="capitalize">{item.category}</span>
                                  {item.category === 'PDF' && (
                                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full border border-green-500/30">
                                      Digital Download
                                    </span>
                                  )}
                                </p>
                              </div>
                              <p className="font-semibold text-white">₹{item.price * item.quantity}</p>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-sm text-indigo-400">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer */}
                    <div className="mt-6 pt-4 border-t border-indigo-500/20 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4 text-sm text-indigo-300">
                        <span>Payment: <span className="font-semibold capitalize text-white">{order.payment_method === 'cod' ? 'Cash on Delivery' : order.payment_method}</span></span>
                        <span className="hidden sm:inline">•</span>
                        <span>Status: <span className={`font-semibold capitalize ${order.payment_status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>{order.payment_status}</span></span>
                      </div>
                      <div className="flex gap-3">
                        {onlyPDFs ? (
                          // Digital order - show download button
                          <button
                            onClick={() => handleDownloadPDFs(order.id)}
                            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold text-sm flex items-center gap-2 shadow-lg shadow-green-500/30"
                          >
                            <Download className="w-4 h-4" />
                            Download PDFs
                          </button>
                        ) : (
                          // Physical or mixed order - show view details
                          <button
                            onClick={() => handleViewOrder(order.id)}
                            className="px-4 py-2 border border-indigo-500/30 bg-indigo-500/10 text-indigo-200 rounded-lg hover:bg-indigo-500/20 transition-all duration-300 font-semibold text-sm flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                        )}
                        
                        {containsPDFs && !onlyPDFs && (
                          // Mixed order - also show download button
                          <button
                            onClick={() => handleDownloadPDFs(order.id)}
                            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold text-sm flex items-center gap-2 shadow-lg shadow-green-500/30"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        )}
                        
                        {order.order_status === 'delivered' && !onlyPDFs && (
                          <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold text-sm shadow-lg shadow-indigo-500/30">
                            Reorder
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}