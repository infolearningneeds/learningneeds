/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import {
    Package,
    Search,
    Filter,
    Download,
    Eye,
    RefreshCw,
    CheckCircle2,
    XCircle,
    Clock,
    Truck,
    MapPin,
    CreditCard,
    User,
    Phone,
    Mail,
    FileText
} from 'lucide-react';
import toast from 'react-hot-toast';
import InvoiceGenerator from '@/components/helper/InvoiceGenerator';

interface Order {
    id: string;
    user_id: string;
    address_id: string;
    total_amount: number;
    payment_method: string;
    payment_status: string;
    order_status: string;
    created_at: string;
    updated_at: string;
}

interface OrderWithDetails extends Order {
    customer: any;
    address: any;
    items: any[];
    payment: any;
}

type OrderStatus = 'all' | 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
type PaymentStatus = 'all' | 'pending' | 'completed' | 'failed';

export default function AdminOrdersPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<OrderWithDetails[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<OrderWithDetails[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderWithDetails | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [orderStatusFilter, setOrderStatusFilter] = useState<OrderStatus>('all');
    const [paymentStatusFilter, setPaymentStatusFilter] = useState<PaymentStatus>('all');
    const [isAdmin, setIsAdmin] = useState(false);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [invoiceOrder, setInvoiceOrder] = useState<OrderWithDetails | null>(null);
    useEffect(() => {
        checkAdminAndFetchOrders();
    }, []);

    useEffect(() => {
        filterOrders();
    }, [searchTerm, orderStatusFilter, paymentStatusFilter, orders]);

    const checkAdminAndFetchOrders = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.push('/signin');
            return;
        }

        // Check admin access
        const adminEmails = ['infolearningneeds@gmail.com']; // Replace with your admin emails
        const userIsAdmin = adminEmails.includes(user.email || '') ||
            user.user_metadata?.role === 'admin';

        if (!userIsAdmin) {
            toast.error('Access denied. Admin privileges required.');
            router.push('/');
            return;
        }

        setIsAdmin(true);
        await fetchAllOrders();
    };

    const fetchAllOrders = async () => {
        setLoading(true);
        try {
            // Fetch all orders
            const { data: ordersData, error: ordersError } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (ordersError) {
                console.error('Orders fetch error:', ordersError);
                throw ordersError;
            }

            console.log('Orders fetched:', ordersData); // Debug log

            // Fetch additional details for each order
            const ordersWithDetails = await Promise.all(
                (ordersData || []).map(async (order) => {
                    try {
                        // Fetch user profile instead of admin API
                        const { data: profileData } = await supabase
                            .from('profiles') // Assuming you have a profiles table
                            .select('*')
                            .eq('id', order.user_id)
                            .single();

                        // Fetch address
                        const { data: addressData } = await supabase
                            .from('addresses')
                            .select('*')
                            .eq('id', order.address_id)
                            .single();

                        // Fetch order items
                        const { data: itemsData } = await supabase
                            .from('order_items')
                            .select('*')
                            .eq('order_id', order.id);

                        // Fetch payment details
                        const { data: paymentData } = await supabase
                            .from('payments')
                            .select('*')
                            .eq('order_id', order.id)
                            .single();

                        console.log(`Order ${order.id} details:`, { // Debug log
                            address: addressData,
                            items: itemsData,
                            payment: paymentData
                        });

                        return {
                            ...order,
                            customer: profileData || { email: 'Unknown' },
                            address: addressData,
                            items: itemsData || [],
                            payment: paymentData,
                        };
                    } catch (error) {
                        console.error(`Error fetching details for order ${order.id}:`, error);
                        return {
                            ...order,
                            customer: { email: 'Error loading' },
                            address: null,
                            items: [],
                            payment: null,
                        };
                    }
                })
            );

            console.log('Orders with details:', ordersWithDetails); // Debug log
            setOrders(ordersWithDetails);
            setFilteredOrders(ordersWithDetails);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Failed to load orders: ' + (error instanceof Error ? error.message : 'Unknown error'));
            setLoading(false);
        }
    };

    const filterOrders = () => {
        let filtered = [...orders];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(order =>
                order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.address?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Order status filter
        if (orderStatusFilter !== 'all') {
            filtered = filtered.filter(order => order.order_status === orderStatusFilter);
        }

        // Payment status filter
        if (paymentStatusFilter !== 'all') {
            filtered = filtered.filter(order => order.payment_status === paymentStatusFilter);
        }

        setFilteredOrders(filtered);
    };

    const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({
                    order_status: newStatus,
                    updated_at: new Date().toISOString()
                })
                .eq('id', orderId);

            if (error) throw error;

            toast.success('Order status updated successfully!');
            await fetchAllOrders();
            if (selectedOrder?.id === orderId) {
                setShowDetailsModal(false);
            }
        } catch (error) {
            console.error('Error updating order:', error);
            toast.error('Failed to update order status');
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'processing':
                return <Clock className="w-5 h-5 text-yellow-600" />;
            case 'confirmed':
                return <Package className="w-5 h-5 text-blue-600" />;
            case 'shipped':
                return <Truck className="w-5 h-5 text-purple-600" />;
            case 'delivered':
                return <CheckCircle2 className="w-5 h-5 text-green-600" />;
            case 'cancelled':
                return <XCircle className="w-5 h-5 text-red-600" />;
            default:
                return <Clock className="w-5 h-5 text-gray-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'processing':
                return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'confirmed':
                return 'bg-blue-100 text-blue-700 border-blue-300';
            case 'shipped':
                return 'bg-purple-100 text-purple-700 border-purple-300';
            case 'delivered':
                return 'bg-green-100 text-green-700 border-green-300';
            case 'cancelled':
                return 'bg-red-100 text-red-700 border-red-300';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'failed':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const exportToCSV = () => {
        const csvContent = [
            ['Order ID', 'Customer', 'Email', 'Total Amount', 'Payment Method', 'Order Status', 'Payment Status', 'Date'],
            ...filteredOrders.map(order => [
                order.id.slice(0, 8),
                order.address?.full_name || 'N/A',
                order.customer?.email || 'N/A',
                order.total_amount,
                order.payment_method,
                order.order_status,
                order.payment_status,
                new Date(order.created_at).toLocaleDateString()
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading orders...</p>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mt-10">
            {/* Header */}
            <div className="bg-gray-900 text-white py-4 sm:py-6 md:py-8">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">Orders Management</h1>
                            <p className="text-sm sm:text-base text-gray-300">View and manage all customer orders</p>
                        </div>
                        <button
                            onClick={() => router.push('/admin/dashboard')}
                            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-sm sm:text-base"
                        >
                            ← Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                {/* Filters and Actions */}
                <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 border border-gray-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-4">
                        {/* Search */}
                        <div className="sm:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by Order ID, Customer..."
                                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                                />
                            </div>
                        </div>

                        {/* Order Status Filter */}
                        <div>
                            <select
                                value={orderStatusFilter}
                                onChange={(e) => setOrderStatusFilter(e.target.value as OrderStatus)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                            >
                                <option value="all">All Order Status</option>
                                <option value="processing">Processing</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        {/* Payment Status Filter */}
                        <div>
                            <select
                                value={paymentStatusFilter}
                                onChange={(e) => setPaymentStatusFilter(e.target.value as PaymentStatus)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                            >
                                <option value="all">All Payment Status</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <button
                            onClick={fetchAllOrders}
                            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold text-sm sm:text-base"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                        </button>
                        <button
                            onClick={exportToCSV}
                            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm sm:text-base"
                        >
                            <Download className="w-4 h-4" />
                            Export CSV
                        </button>
                        <div className="sm:ml-auto text-xs sm:text-sm text-gray-600 flex items-center justify-center sm:justify-start">
                            <span className="font-semibold">{filteredOrders.length}</span>&nbsp;orders found
                        </div>
                    </div>
                </div>

                {/* Orders Table - Desktop View */}
                <div className="hidden md:block bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Order ID
                                    </th>
                                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Payment
                                    </th>
                                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                            No orders found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 lg:px-6 py-3 lg:py-4">
                                                <span className="font-mono text-xs sm:text-sm font-semibold text-gray-900">
                                                    #{order.id.slice(0, 8)}
                                                </span>
                                            </td>
                                            <td className="px-4 lg:px-6 py-3 lg:py-4">
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">{order.address?.full_name || 'N/A'}</p>
                                                    <p className="text-xs text-gray-600">{order.customer?.email || 'N/A'}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 lg:px-6 py-3 lg:py-4">
                                                <span className="font-bold text-gray-900 text-sm">₹{order.total_amount}</span>
                                            </td>
                                            <td className="px-4 lg:px-6 py-3 lg:py-4">
                                                <div className="space-y-1">
                                                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold capitalize ${getPaymentStatusColor(order.payment_status)}`}>
                                                        {order.payment_status}
                                                    </span>
                                                    <p className="text-xs text-gray-600 capitalize">{order.payment_method}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 lg:px-6 py-3 lg:py-4">
                                                <span className={`inline-flex items-center gap-1 px-2 lg:px-3 py-1 rounded-lg text-xs font-semibold capitalize border ${getStatusColor(order.order_status)}`}>
                                                    {getStatusIcon(order.order_status)}
                                                    {order.order_status}
                                                </span>
                                            </td>
                                            <td className="px-4 lg:px-6 py-3 lg:py-4">
                                                <span className="text-xs text-gray-600">
                                                    {new Date(order.created_at).toLocaleDateString('en-IN', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </td>
                                            <td className="px-4 lg:px-6 py-3 lg:py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedOrder(order);
                                                            setShowDetailsModal(true);
                                                        }}
                                                        className="flex items-center gap-1 px-2 lg:px-3 py-1.5 lg:py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-xs font-semibold"
                                                    >
                                                        <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                                                        View
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setInvoiceOrder(order);
                                                            setShowInvoiceModal(true);
                                                        }}
                                                        className="flex items-center gap-1 px-2 lg:px-3 py-1.5 lg:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-semibold"
                                                    >
                                                        <FileText className="w-3 h-3 lg:w-4 lg:h-4" />
                                                        Invoice
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Orders Cards - Mobile View */}
                <div className="md:hidden space-y-3">
                    {filteredOrders.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-500 border border-gray-200">
                            No orders found
                        </div>
                    ) : (
                        filteredOrders.map((order) => (
                            <div key={order.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
                                {/* Order Header */}
                                <div className="flex items-start justify-between mb-3 pb-3 border-b border-gray-200">
                                    <div>
                                        <span className="font-mono text-xs font-bold text-gray-900">
                                            #{order.id.slice(0, 8)}
                                        </span>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(order.created_at).toLocaleDateString('en-IN', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold capitalize border ${getStatusColor(order.order_status)}`}>
                                        {getStatusIcon(order.order_status)}
                                        {order.order_status}
                                    </span>
                                </div>

                                {/* Customer Info */}
                                <div className="mb-3">
                                    <p className="font-semibold text-gray-900 text-sm">{order.address?.full_name || 'N/A'}</p>
                                    <p className="text-xs text-gray-600">{order.customer?.email || 'N/A'}</p>
                                </div>

                                {/* Payment & Amount */}
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <p className="text-xs text-gray-600 mb-1">Payment</p>
                                        <div className="space-y-1">
                                            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold capitalize ${getPaymentStatusColor(order.payment_status)}`}>
                                                {order.payment_status}
                                            </span>
                                            <p className="text-xs text-gray-600 capitalize">{order.payment_method}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-600 mb-1">Total Amount</p>
                                        <p className="font-bold text-gray-900 text-lg">₹{order.total_amount}</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-3 border-t border-gray-200">
                                    <button
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setShowDetailsModal(true);
                                        }}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View
                                    </button>
                                    <button
                                        onClick={() => {
                                            setInvoiceOrder(order);
                                            setShowInvoiceModal(true);
                                        }}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                                    >
                                        <FileText className="w-4 h-4" />
                                        Invoice
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Order Details Modal */}
            {showDetailsModal && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto my-auto">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-gray-900 text-white p-3 sm:p-4 md:p-6 rounded-t-xl">
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">Order Details</h2>
                                    <p className="text-xs sm:text-sm text-gray-300 truncate">Order #{selectedOrder.id.slice(0, 8)}</p>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    {/* Invoice Button */}
                                    <button
                                        onClick={() => {
                                            setShowDetailsModal(false);
                                            setInvoiceOrder(selectedOrder);
                                            setShowInvoiceModal(true);
                                        }}
                                        className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs md:text-sm font-semibold"
                                    >
                                        <FileText className="w-3 h-3 md:w-4 md:h-4" />
                                        <span className="hidden md:inline">Generate</span> Invoice
                                    </button>

                                    {/* Close Button */}
                                    <button
                                        onClick={() => setShowDetailsModal(false)}
                                        className="p-1.5 sm:p-2 hover:bg-gray-800 rounded-lg transition-colors"
                                    >
                                        <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Invoice Button */}
                            <button
                                onClick={() => {
                                    setShowDetailsModal(false);
                                    setInvoiceOrder(selectedOrder);
                                    setShowInvoiceModal(true);
                                }}
                                className="sm:hidden w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                            >
                                <FileText className="w-4 h-4" />
                                Generate Invoice
                            </button>
                        </div>

                        <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
                            {/* Order Status Update */}
                            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Update Order Status</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                                    {['processing', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => handleUpdateOrderStatus(selectedOrder.id, status)}
                                            className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold capitalize transition-colors ${selectedOrder.order_status === status
                                                ? 'bg-gray-900 text-white'
                                                : 'bg-white border border-gray-300 hover:bg-gray-100'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Customer & Address Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                                {/* Customer Info */}
                                <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-200">
                                    <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                        Customer Information
                                    </h3>
                                    <div className="space-y-2 text-xs sm:text-sm">
                                        <p className="flex items-center gap-2">
                                            <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" />
                                            <span className="font-semibold truncate">{selectedOrder.address?.full_name}</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" />
                                            <span className="text-gray-700 truncate">{selectedOrder.address?.email}</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" />
                                            <span className="text-gray-700">{selectedOrder.address?.phone}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Delivery Address */}
                                <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200">
                                    <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                                        Delivery Address
                                    </h3>
                                    <div className="text-xs sm:text-sm text-gray-700 space-y-1">
                                        <p>{selectedOrder.address?.address_line1}</p>
                                        {selectedOrder.address?.address_line2 && <p>{selectedOrder.address.address_line2}</p>}
                                        <p>{selectedOrder.address?.city}, {selectedOrder.address?.state}</p>
                                        <p>{selectedOrder.address?.pincode}, {selectedOrder.address?.country}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="bg-purple-50 rounded-lg p-3 sm:p-4 border border-purple-200">
                                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                                    Payment Information
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
                                    <div>
                                        <p className="text-gray-600 mb-1">Method</p>
                                        <p className="font-semibold capitalize truncate">{selectedOrder.payment_method}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1">Status</p>
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold capitalize ${getPaymentStatusColor(selectedOrder.payment_status)}`}>
                                            {selectedOrder.payment_status}
                                        </span>
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <p className="text-gray-600 mb-1">Transaction ID</p>
                                        <p className="font-semibold font-mono text-xs truncate">{selectedOrder.payment?.transaction_id || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1">Amount</p>
                                        <p className="font-bold text-base sm:text-lg">₹{selectedOrder.total_amount}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Order Items</h3>
                                <div className="space-y-2 sm:space-y-3">
                                    {selectedOrder.items.map((item) => (
                                        <div key={item.id} className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                <Image
                                                    src={item.product_image}
                                                    alt={item.product_title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base truncate">{item.product_title}</h4>
                                                <p className="text-xs sm:text-sm text-gray-600 capitalize mb-1">Category: {item.category}</p>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs sm:text-sm text-gray-600">Qty: <span className="font-semibold">{item.quantity}</span></p>
                                                    <p className="font-semibold text-gray-900 text-sm sm:text-base">₹{item.price * item.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Timeline */}
                            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Order Timeline</h3>
                                <div className="space-y-2 text-xs sm:text-sm">
                                    <p className="flex items-center justify-between gap-2">
                                        <span className="text-gray-600">Order Placed:</span>
                                        <span className="font-semibold text-right">{new Date(selectedOrder.created_at).toLocaleString('en-IN')}</span>
                                    </p>
                                    <p className="flex items-center justify-between gap-2">
                                        <span className="text-gray-600">Last Updated:</span>
                                        <span className="font-semibold text-right">{new Date(selectedOrder.updated_at).toLocaleString('en-IN')}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Invoice Modal */}
            {showInvoiceModal && invoiceOrder && (
                <InvoiceGenerator
                    order={invoiceOrder}
                    onClose={() => {
                        setShowInvoiceModal(false);
                        setInvoiceOrder(null);
                    }}
                />
            )}
        </div>
    );
}