/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearCart } from '@/store/slices/cartSlice';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { CreditCard, Wallet, Building2, CheckCircle2, MapPin } from 'lucide-react';

type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'cod';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  
  const [user, setUser] = useState<any>(null);
  const [address, setAddress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  
  // Payment details
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  // Order summary
  const deliveryCharge = totalPrice > 500 ? 0 : 50;
  const finalTotal = totalPrice + deliveryCharge;

  useEffect(() => {
    checkUserAndAddress();
  }, []);

  const checkUserAndAddress = async () => {
    // Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/signin');
      return;
    }
    setUser(user);

    // Get selected address from localStorage
    const addressId = localStorage.getItem('selected_address_id');
    if (!addressId) {
      router.push('/address');
      return;
    }

    // Fetch address details
    const { data: addressData, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('id', addressId)
      .single();

    if (error || !addressData) {
      alert('Address not found. Please select an address.');
      router.push('/address');
      return;
    }

    setAddress(addressData);
    setLoading(false);
  };

  const validatePaymentDetails = () => {
    if (paymentMethod === 'card') {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        alert('Please fill in all card details');
        return false;
      }
      if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        alert('Please enter a valid 16-digit card number');
        return false;
      }
      if (!/^\d{3,4}$/.test(cvv)) {
        alert('Please enter a valid CVV');
        return false;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId) {
        alert('Please enter your UPI ID');
        return false;
      }
      if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) {
        alert('Please enter a valid UPI ID');
        return false;
      }
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validatePaymentDetails()) return;

    setProcessing(true);

    try {
      // Create order in database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            address_id: address.id,
            total_amount: finalTotal,
            payment_method: paymentMethod,
            payment_status: paymentMethod === 'cod' ? 'pending' : 'completed',
            order_status: 'processing',
          }
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        product_title: item.title,
        product_image: item.image,
        quantity: item.quantity,
        price: item.discountPrice,
        category: item.category,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Save payment details (for non-COD payments)
      if (paymentMethod !== 'cod') {
        const paymentDetails: any = {
          order_id: orderData.id,
          payment_method: paymentMethod,
          amount: finalTotal,
          status: 'completed',
        };

        if (paymentMethod === 'card') {
          paymentDetails.card_last4 = cardNumber.slice(-4);
          paymentDetails.card_holder_name = cardName;
        } else if (paymentMethod === 'upi') {
          paymentDetails.upi_id = upiId;
        }

        const { error: paymentError } = await supabase
          .from('payments')
          .insert([paymentDetails]);

        if (paymentError) throw paymentError;
      }

      // Clear cart
      dispatch(clearCart());
      localStorage.removeItem('selected_address_id');

      // Redirect to success page
      router.push(`/order-success?orderId=${orderData.id}`);
    } catch (error: any) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <button
            onClick={() => router.push('/products')}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Checkout
          </h1>
          <p className="text-gray-600">Review your order and complete payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Payment & Address */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Delivery Address
                </h2>
                <button
                  onClick={() => router.push('/address')}
                  className="text-sm text-gray-900 font-semibold hover:underline"
                >
                  Change
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-1">{address.full_name}</p>
                <p className="text-gray-600 text-sm">{address.address_line1}</p>
                {address.address_line2 && (
                  <p className="text-gray-600 text-sm">{address.address_line2}</p>
                )}
                <p className="text-gray-600 text-sm">
                  {address.city}, {address.state} - {address.pincode}
                </p>
                <p className="text-gray-600 text-sm mt-2">Phone: {address.phone}</p>
                <p className="text-gray-600 text-sm">Email: {address.email}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>

              {/* Payment Options */}
              <div className="space-y-4 mb-6">
                {/* Card Payment */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-gray-700" />
                    <span className="font-semibold text-gray-900">Credit/Debit Card</span>
                  </div>
                </div>

                {/* UPI */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-gray-700" />
                    <span className="font-semibold text-gray-900">UPI</span>
                  </div>
                </div>

                {/* Net Banking */}
                <div
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-gray-700" />
                    <span className="font-semibold text-gray-900">Net Banking</span>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">💵</span>
                    <span className="font-semibold text-gray-900">Cash on Delivery</span>
                  </div>
                </div>
              </div>

              {/* Payment Details Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                      maxLength={19}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        maxLength={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                    placeholder="yourname@upi"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ₹{item.discountPrice * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span className="font-semibold">
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={processing}
                className={`w-full mt-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  processing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Place Order
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}