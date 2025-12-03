/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState } from 'react';
import { FileText, ShoppingCart, CreditCard, Truck, RotateCcw, Scale, BookOpen, AlertTriangle, Mail, Phone, Calendar, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

const TermsAndConditions = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const sections = [
    {
      id: 'terminology',
      icon: <FileText className="w-6 h-6" />,
      title: 'Terminology',
      color: 'from-blue-500 to-cyan-500',
      content: (
        <>
          <p className="text-gray-700 mb-4">The following terminology applies to these Terms and Conditions, Privacy Statement, Disclaimer Notice, and all Agreements:</p>
          <div className="space-y-3">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="font-semibold text-gray-800 mb-1">"Client", "You", and "Your"</p>
              <p className="text-gray-600 text-sm">Refers to you, the person accessing this website and compliant with the Company's terms and conditions.</p>
            </div>
            <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
              <p className="font-semibold text-gray-800 mb-1">"The Company", "Ourselves", "We", "Our", and "Us"</p>
              <p className="text-gray-600 text-sm">Refers to our Company, Learning Needs.</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
              <p className="font-semibold text-gray-800 mb-1">"Party", "Parties", or "Us"</p>
              <p className="text-gray-600 text-sm">Refers to both the Client and ourselves.</p>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'website',
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Use of the Website',
      color: 'from-purple-500 to-pink-500',
      content: (
        <>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-700 mb-2">By accessing our website, you warrant and represent that you are at least 18 years of age or are accessing the website under the supervision of a parent or guardian.</p>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="font-semibold text-gray-800 mb-2">Your License</p>
              <p className="text-gray-700 text-sm">We grant you a limited, revocable, and non-exclusive license to access and use the website for personal use only.</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="font-semibold text-gray-800 mb-2">Prohibited Activities</p>
              <p className="text-gray-700 text-sm">You agree not to use the website for any commercial purpose or any illegal or unauthorized activity.</p>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'products',
      icon: <ShoppingCart className="w-6 h-6" />,
      title: 'Products and Services',
      color: 'from-green-500 to-emerald-500',
      content: (
        <>
          <p className="text-gray-700 mb-4">Learning Needs offers a variety of educational products designed to spark creativity and encourage exploration in children:</p>
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            {['Books', 'Story Books', 'Activity Books', 'Work Books', 'PDF Worksheets', 'Busy Books'].map((product, index) => (
              <div key={index} className="flex items-center gap-2 bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-gray-700 font-medium">{product}</span>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Note:</span> All products are subject to availability, and we reserve the right to limit the quantity of any products or services that we offer.
            </p>
          </div>
        </>
      )
    },
    {
      id: 'pricing',
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Pricing and Payment',
      color: 'from-orange-500 to-red-500',
      content: (
        <>
          <div className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <p className="font-semibold text-gray-800 mb-2">💰 Currency</p>
              <p className="text-gray-700 text-sm">All prices listed on Learning Needs are in Rupees (₹) and are subject to change without notice.</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="font-semibold text-gray-800 mb-2">⚠️ Pricing Errors</p>
              <p className="text-gray-700 text-sm">We make every effort to ensure pricing accuracy, but errors may occur. In the event of a pricing error, we reserve the right to cancel any orders placed at the incorrect price.</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="font-semibold text-gray-800 mb-2">💳 Payment Terms</p>
              <p className="text-gray-700 text-sm">Payment must be made at the time of purchase. We accept various payment methods as indicated on our website.</p>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'shipping',
      icon: <Truck className="w-6 h-6" />,
      title: 'Shipping and Delivery',
      color: 'from-indigo-500 to-blue-500',
      content: (
        <>
          <div className="space-y-4">
            <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-indigo-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">📦</div>
                <div>
                  <p className="font-semibold text-gray-800">Physical Products</p>
                  <p className="text-sm text-gray-600">Dispatched within 3-5 business days</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">Delivery times may vary depending on your location and the shipping method selected. All shipping and handling charges are the customer's responsibility and will be calculated at checkout.</p>
            </div>
            <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">📧</div>
                <div>
                  <p className="font-semibold text-gray-800">Digital Products</p>
                  <p className="text-sm text-gray-600">Delivered within 30 minutes</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">Digital products will be delivered via email or downloaded automatically within 30 minutes of ordering.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-700 text-sm">
                <span className="font-semibold">Important:</span> Learning Needs is not responsible for any delays caused by the shipping carrier.
              </p>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'returns',
      icon: <RotateCcw className="w-6 h-6" />,
      title: 'Returns and Refunds',
      color: 'from-pink-500 to-rose-500',
      content: (
        <>
          <p className="text-gray-700 mb-4">We want you to be satisfied with your purchase. Here's our return policy:</p>
          <div className="space-y-4">
            <div className="bg-red-50 p-5 rounded-lg border-2 border-red-300">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-gray-800 mb-2">Digital Products - No Refunds</p>
                  <p className="text-gray-700 text-sm">We do not offer refunds or returns on digital products like PDF downloads under any circumstances.</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-5 rounded-lg border border-green-300">
              <p className="font-bold text-gray-800 mb-3">Physical Products - Defective/Incorrect Items</p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm">Contact us within <span className="font-semibold">24 hours</span> of receipt</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm">Provide product pictures and explanation in writing</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm">Items must be in original condition, unused, with original packaging</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'intellectual',
      icon: <Scale className="w-6 h-6" />,
      title: 'Intellectual Property',
      color: 'from-teal-500 to-cyan-500',
      content: (
        <>
          <div className="bg-teal-50 p-5 rounded-lg border border-teal-200">
            <p className="text-gray-700 mb-4">All content on this website, including but not limited to:</p>
            <div className="grid md:grid-cols-2 gap-2 mb-4">
              {['Text', 'Graphics', 'Logos', 'Images', 'Software', 'Design'].map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-white p-2 rounded">
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-700 text-sm">
              ...is the property of Learning Needs or its content suppliers and is protected by intellectual property laws.
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 mt-4">
            <p className="font-semibold text-gray-800 mb-2">⚠️ Restrictions</p>
            <p className="text-gray-700 text-sm">You may not use, reproduce, distribute, or create derivative works of such content without our prior written consent.</p>
          </div>
        </>
      )
    },
    {
      id: 'liability',
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Limitation of Liability',
      color: 'from-red-500 to-pink-500',
      content: (
        <>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-300">
            <p className="text-gray-700 leading-relaxed">
              Learning Needs shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-700 text-sm">The use or inability to use our products or services</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-700 text-sm">Any errors or omissions in the content of our website</span>
              </li>
            </ul>
          </div>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-green-600 text-gray-800 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
              <Scale className="w-16 h-16" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">Terms & Conditions</h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-6">
            Please read these terms and conditions carefully before using Learning Needs's website and services.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Effective Date: January 1, 2024</span>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="max-w-5xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <AlertTriangle className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Welcome to Learning Needs</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing this website at <span className="font-semibold text-blue-600">www.learningneeds.in</span>, you accept and agree to be bound by these terms and conditions.
              </p>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Important:</span> Do not continue to use Learning Needs if you do not agree to all the terms and conditions stated on this page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`bg-gradient-to-br ${section.color} p-3 rounded-lg text-white`}>
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
                </div>
                {expandedSection === section.id ? (
                  <ChevronUp className="w-6 h-6 text-gray-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-600" />
                )}
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedSection === section.id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 border-t border-gray-200 pt-6">
                  {section.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Important Sections */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Changes to Terms
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              We reserve the right to make changes to these terms and conditions at any time. Any changes will be posted on this page, and it is your responsibility to review these terms regularly.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Scale className="w-5 h-5 text-purple-600" />
              Governing Law
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of West Bengal, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-green-600 rounded-2xl p-8 text-gray-800 mt-12">
          <h3 className="text-3xl font-bold mb-4 text-center">Questions About Our Terms?</h3>
          <p className="text-center text-gray-700 mb-8">We're here to help clarify any concerns you may have.</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all">
              <Mail className="w-8 h-8 mx-auto mb-3" />
              <p className="font-semibold mb-1">Email Us</p>
              <p className="text-sm text-gray-700">infolearningneeds@gmail.com</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all">
              <Phone className="w-8 h-8 mx-auto mb-3" />
              <p className="font-semibold mb-1">Call Us</p>
              <p className="text-sm text-gray-700">8240554890</p>
            </div>
          </div>
        </div>

        {/* Agreement Notice */}
        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-300 mt-8">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-gray-800 mb-2">By Using Our Website</p>
              <p className="text-gray-700 text-sm">
                You acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. These terms constitute the entire agreement between you and Learning Needs.
              </p>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default TermsAndConditions;