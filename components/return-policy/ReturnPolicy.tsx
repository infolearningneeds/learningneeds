/* eslint-disable react/no-unescaped-entities */

'use client'
import React, { useState } from 'react';
import { Package, Clock, Shield, ArrowLeft, CheckCircle, XCircle, Truck, AlertCircle } from 'lucide-react';

const ReturnPolicy = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const policyItems = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "30-Day Return Window",
      description: "You have 30 days from the date of purchase to return any product for a full refund of the purchase price.",
      details: "Returns must be initiated within 30 days of the original purchase date. The refund will include the product price and applicable taxes, but not the initial shipping charges."
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Product Condition",
      description: "Items must be returned in their original condition, unused and in original packaging whenever possible.",
      details: "To ensure a smooth return process, please keep all original packaging, tags, and accessories. Products should be unused and in resalable condition."
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Return Shipping",
      description: "Customers are responsible for arranging and paying for return shipping expenses.",
      details: "We recommend using a trackable shipping service for your return. Learning Needs is not responsible for items lost or damaged during return transit."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Refund Process",
      description: "Once we receive and inspect your return, we'll process your refund within 5-7 business days.",
      details: "Refunds will be issued to the original payment method. Please allow additional time for your bank or credit card company to process the refund."
    }
  ];

  const steps = [
    { number: 1, title: "Contact Us", description: "Reach out to our Customer Service Department to initiate your return" },
    { number: 2, title: "Package Item", description: "Securely pack the product in its original packaging" },
    { number: 3, title: "Ship Back", description: "Send the item back to us using a trackable shipping method" },
    { number: 4, title: "Get Refund", description: "Receive your refund within 5-7 business days after we receive the item" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <ArrowLeft className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Back to Shop</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Return Policy</h1>
          <p className="text-xl text-blue-100">Your satisfaction is our priority. Returns made simple.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[90%] mx-auto px-4 py-12">
        
        {/* Quick Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Hassle-Free Returns</h2>
              <p className="text-gray-600 leading-relaxed">
                At Learning Needs, we want you to be completely satisfied with your purchase. If for any reason you're not happy with your order, you can return it within 30 days for a full refund of the purchase price plus applicable taxes.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {policyItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border border-gray-100"
              onClick={() => setActiveSection(activeSection === index ? null : index)}
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-3 rounded-lg text-white">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  {activeSection === index && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500">{item.details}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Return Process Steps */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 mb-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">How to Return Your Order</h2>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.number}
                </div>
                <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-amber-50 rounded-2xl p-8 mb-8 border border-amber-200">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Important Information</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Order cancellations require prior written consent from Learning Needs once the order has been accepted</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Initial shipping charges are non-refundable</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Items lost or damaged during return transit are the customer's responsibility</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Need Help with a Return?</h3>
          <p className="text-blue-100 mb-6">Our Customer Service team is here to assist you</p>
          <div className="space-y-2">
            <p className="font-semibold">Email: info@learningneeds.com</p>
            <p className="text-sm text-blue-100">123 Main Street, City, Country</p>
          </div>
          <button className="mt-6 bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg">
            Contact Customer Service
          </button>
        </div>

      </div>

     
    </div>
  );
};

export default ReturnPolicy;