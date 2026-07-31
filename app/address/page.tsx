/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { MapPin, User, Phone, Mail, Home } from 'lucide-react';

interface AddressFormData {
  full_name: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export default function AddressForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<AddressFormData>({
    full_name: '',
    email: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/signin');
      return;
    }
    setUser(user);
    
    // Pre-fill email from user
    setFormData(prev => ({
      ...prev,
      email: user.email || '',
      full_name: user.user_metadata?.full_name || '',
    }));

    // Fetch saved addresses
    fetchSavedAddresses(user.id);
  };

  const fetchSavedAddresses = async (userId: string) => {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSavedAddresses(data);
    }
  };

  const handleSelectAddress = (address: any) => {
    setSelectedAddressId(address.id);
    setFormData({
      full_name: address.full_name,
      email: address.email,
      phone: address.phone,
      address_line1: address.address_line1,
      address_line2: address.address_line2 || '',
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { full_name, email, phone, address_line1, city, state, pincode } = formData;
    
    if (!full_name || !email || !phone || !address_line1 || !city || !state || !pincode) {
      alert('Please fill in all required fields');
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert('Please enter a valid 10-digit phone number');
      return false;
    }

    if (!/^\d{6}$/.test(pincode)) {
      alert('Please enter a valid 6-digit pincode');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Save address to Supabase if it's a new address
      if (!selectedAddressId) {
        const { data, error } = await supabase
          .from('addresses')
          .insert([
            {
              user_id: user.id,
              ...formData,
              is_default: savedAddresses.length === 0, // First address is default
            }
          ])
          .select()
          .single();

        if (error) throw error;
        
        // Store the newly created address ID in localStorage for checkout
        localStorage.setItem('selected_address_id', data.id);
      } else {
        // Use existing address
        localStorage.setItem('selected_address_id', selectedAddressId);
      }

      // Navigate to checkout
      router.push('/checkout');
    } catch (error: any) {
      console.error('Error saving address:', error);
      alert('Failed to save address. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Delivery Address
          </h1>
          <p className="text-gray-600">Please provide your delivery information</p>
        </div>

        {/* Saved Addresses */}
        {savedAddresses.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Addresses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedAddresses.map((address) => (
                <div
                  key={address.id}
                  onClick={() => handleSelectAddress(address)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedAddressId === address.id
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{address.full_name}</h3>
                    {address.is_default && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{address.address_line1}</p>
                  {address.address_line2 && (
                    <p className="text-sm text-gray-600">{address.address_line2}</p>
                  )}
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Phone: {address.phone}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button
                onClick={() => {
                  setSelectedAddressId(null);
                  setFormData({
                    full_name: user?.user_metadata?.full_name || '',
                    email: user?.email || '',
                    phone: '',
                    address_line1: '',
                    address_line2: '',
                    city: '',
                    state: '',
                    pincode: '',
                    country: 'India',
                  });
                }}
                className="text-gray-900 font-semibold hover:underline"
              >
                + Add New Address
              </button>
            </div>
          </div>
        )}

        {/* Address Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {selectedAddressId ? 'Selected Address' : 'New Address'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="9876543210"
                />
              </div>
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pincode *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{6}"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="700001"
                />
              </div>
            </div>

            {/* Address Line 1 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address Line 1 *
              </label>
              <div className="relative">
                <Home className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="address_line1"
                  value={formData.address_line1}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="House No., Building Name, Street"
                />
              </div>
            </div>

            {/* Address Line 2 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address Line 2 (Optional)
              </label>
              <input
                type="text"
                name="address_line2"
                value={formData.address_line2}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                placeholder="Landmark, Area"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                placeholder="Kolkata"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                placeholder="West Bengal"
              />
            </div>

            {/* Country */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Country *
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
              >
                <option value="India">India</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gray-900 hover:bg-gray-800 text-white'
              }`}
            >
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}