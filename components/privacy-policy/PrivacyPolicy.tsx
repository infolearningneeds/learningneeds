/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState } from 'react';
import { Shield, Lock, Eye, Users, FileText, Globe, AlertCircle, Mail, Phone, Calendar, CheckCircle2, XCircle } from 'lucide-react';

const PrivacyPolicy = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: <Eye className="w-4 h-4" /> },
    { id: 'collection', label: 'Data Collection', icon: <FileText className="w-4 h-4" /> },
    { id: 'usage', label: 'How We Use Data', icon: <Users className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Lock className="w-4 h-4" /> },
    { id: 'rights', label: 'Your Rights', icon: <Shield className="w-4 h-4" /> }
  ];

  const personalInfo = [
    { item: 'Name', icon: <CheckCircle2 className="w-5 h-5 text-green-600" /> },
    { item: 'Email address', icon: <CheckCircle2 className="w-5 h-5 text-green-600" /> },
    { item: 'Shipping and billing address', icon: <CheckCircle2 className="w-5 h-5 text-green-600" /> },
    { item: 'Phone number', icon: <CheckCircle2 className="w-5 h-5 text-green-600" /> },
    { item: 'Payment information (securely processed)', icon: <CheckCircle2 className="w-5 h-5 text-green-600" /> }
  ];

  const nonPersonalInfo = [
    'IP address',
    'Browser type and version',
    'Pages visited on our website',
    'Time and date of visit',
    'Referring URL'
  ];

  const usageReasons = [
    { title: 'Order Processing', description: 'Process and fulfill your orders efficiently', icon: '📦' },
    { title: 'Communication', description: 'Keep you updated about order status and provide customer support', icon: '💬' },
    { title: 'Marketing', description: 'Send updates and promotional materials (with your consent)', icon: '📧' },
    { title: 'Improvement', description: 'Enhance our website, products, and services', icon: '🚀' }
  ];

  const securityMeasures = [
    { title: 'SSL Encryption', description: 'Secure Socket Layer technology encrypts sensitive information during transmission' },
    { title: 'Security Audits', description: 'Regular security audits and vulnerability assessments to identify and fix potential issues' },
    { title: 'Access Control', description: 'Restricted access to personal information - only authorized personnel can view your data' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <Shield className="w-16 h-16" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">Privacy Policy</h1>
          <p className="text-xl text-center text-indigo-100 max-w-2xl mx-auto">
            Your privacy matters to us. Learn how we collect, use, and protect your personal information.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Effective Date: January 1, 2024</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === section.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {section.icon}
                <span className="font-medium text-sm">{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[90%] mx-auto px-4 py-12">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Commitment to Your Privacy</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                At Learning Needs, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website, www.learningneeds.in, and purchase our products.
              </p>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Transparency First</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      We believe in being transparent about our data practices. This policy explains everything you need to know about how your information is handled when you interact with Learning Needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-shadow">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">What We Collect</h3>
                <p className="text-gray-600 text-sm">Information needed to provide you with excellent service</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-shadow">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">How We Use It</h3>
                <p className="text-gray-600 text-sm">To improve your experience and serve you better</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-shadow">
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">How We Protect It</h3>
                <p className="text-gray-600 text-sm">Industry-leading security measures keep your data safe</p>
              </div>
            </div>
          </div>
        )}

        {/* Data Collection Tab */}
        {activeTab === 'collection' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Information We Collect</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">P</div>
                  Personal Information
                </h3>
                <p className="text-gray-600 mb-4">When you make a purchase or register an account, we collect:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {personalInfo.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                      {item.icon}
                      <span className="text-gray-700 font-medium">{item.item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">N</div>
                  Non-Personal Information
                </h3>
                <p className="text-gray-600 mb-4">We also collect non-personal information to improve your experience:</p>
                <div className="space-y-2">
                  {nonPersonalInfo.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Usage Tab */}
        {activeTab === 'usage' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">How We Use Your Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {usageReasons.map((reason, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-3">{reason.icon}</div>
                    <h3 className="font-bold text-gray-800 mb-2">{reason.title}</h3>
                    <p className="text-gray-600 text-sm">{reason.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-amber-600" />
                  Sharing Your Information
                </h3>
                <p className="text-gray-700 mb-4">We do not sell, trade, or transfer your personal information except:</p>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 mb-1">Service Providers</p>
                    <p className="text-gray-600 text-sm">Third-party providers who help operate our website are contractually obligated to protect your information.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 mb-1">Legal Requirements</p>
                    <p className="text-gray-600 text-sm">We may disclose information when required by law or in response to valid requests by public authorities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Data Security</h2>
              <p className="text-gray-600 mb-8">We implement multiple layers of security to protect your personal information:</p>
              
              <div className="space-y-6">
                {securityMeasures.map((measure, index) => (
                  <div key={index} className="flex gap-6 items-start bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">{measure.title}</h3>
                      <p className="text-gray-600 text-sm">{measure.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-red-50 rounded-xl p-6 border border-red-200 mt-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Important Security Notice</h3>
                    <p className="text-gray-700 text-sm">
                      Despite our best efforts, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we continuously work to maintain the highest standards of protection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rights Tab */}
        {activeTab === 'rights' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Rights & Additional Information</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    🍪 Cookies
                  </h3>
                  <p className="text-gray-700 text-sm mb-3">
                    We use cookies to enhance your experience on our website. Cookies help us recognize your browser and remember certain information.
                  </p>
                  <p className="text-gray-600 text-xs">
                    You can disable cookies through your browser settings, but this may affect website functionality.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    🔗 Third-Party Links
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Our website may contain links to third-party websites with their own privacy policies. We encourage you to review their policies as we are not responsible for their content or activities.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    👶 Children's Privacy
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Learning Needs does not knowingly collect personal information from children under 13. If we discover we have inadvertently collected such information, we will delete it immediately.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    📝 Policy Updates
                  </h3>
                  <p className="text-gray-700 text-sm">
                    We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white mt-12">
          <h3 className="text-3xl font-bold mb-4 text-center">Questions About Your Privacy?</h3>
          <p className="text-center text-indigo-100 mb-8">We're here to help. Contact us anytime.</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all">
              <Mail className="w-8 h-8 mx-auto mb-3" />
              <p className="font-semibold mb-1">Email Us</p>
              <p className="text-sm text-indigo-100">infolearningneeds@gmail.com</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all">
              <Phone className="w-8 h-8 mx-auto mb-3" />
              <p className="font-semibold mb-1">Call Us</p>
              <p className="text-sm text-indigo-100">+8240554890</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm mb-2">© 2024 Learning Needs. All rights reserved.</p>
          <p className="text-xs">Effective Date: January 1, 2024</p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;