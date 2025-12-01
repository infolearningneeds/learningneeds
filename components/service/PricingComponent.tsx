'use client'

import React, { useState } from 'react';
import { Check, X, Phone, Mail, BookOpen, Users, School, Sparkles, Award, Target, Zap } from 'lucide-react';

const PricingComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pricingPlans = [
    {
      title: 'Soft Skills Program',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      features: [
        'LN Complete Soft',
        'LN Essential Edge',
        'LN Versa Skill Pro',
        'LN Customer Connect',
        'LN Lead Smart',
        'LN Heart and Skill',
        'LN Teach Well',
        'LN Sales Excellence',
      ],
    },
    {
      title: 'School Service Model',
      icon: School,
      color: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      featured: true,
      features: [
        'Urban Edge',
        'Suburban Edge',
        'Rural Vista',
        'LN Start',
        'LN School Craft',
        'LN Vanguard',
        'LN Wave',
      ],
    },
    {
      title: 'Book Box',
      icon: BookOpen,
      color: 'from-pink-500 to-pink-600',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600',
      features: [
        'Beginner Reader',
        'Right Start',
        'Reader Collection',
        'Enthusiastic Reader',
      ],
    },
  ];

  const floatingIcons = [
    { Icon: Sparkles, top: '10%', left: '5%', delay: '0s', duration: '7s' },
    { Icon: Award, top: '20%', right: '8%', delay: '1s', duration: '8s' },
    { Icon: Target, top: '70%', left: '6%', delay: '2s', duration: '6.5s' },
    { Icon: Zap, top: '80%', right: '10%', delay: '0.5s', duration: '7.5s' },
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((item, index) => {
          const { Icon, top, left, right, delay, duration } = item;
          return (
            <div
              key={index}
              className="absolute animate-float opacity-10"
              style={{
                top,
                left,
                right,
                animationDelay: delay,
                animationDuration: duration,
              }}
            >
              <Icon className="w-24 h-24 text-purple-400" strokeWidth={1.5} />
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl uppercase tracking-wide">
              Premium Solutions
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Learning Needs Core Serve Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect solution tailored to your institution&apos;s needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="relative animate-scale-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {plan.featured && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 px-6 py-2 rounded-full text-xs font-bold shadow-xl uppercase tracking-wide flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`relative h-full bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl border-2 ${plan.featured ? 'border-purple-400' : 'border-gray-200'} transform transition-all duration-500 hover:scale-105 hover:shadow-3xl flex flex-col`}>
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`${plan.iconBg} p-4 rounded-2xl shadow-lg`}>
                    <plan.icon className={`w-12 h-12 ${plan.iconColor}`} strokeWidth={2} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
                  {plan.title}
                </h3>

                {/* Features List */}
                <div className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-gray-700 hover:text-gray-900 transition-colors duration-300"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-sm`}>
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button - Fixed at Bottom */}
                <div className="mt-auto pt-6">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className={`w-full bg-gradient-to-r ${plan.color} text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center animate-fade-in mb-24" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border-2 border-blue-200 shadow-xl">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Let&apos;s discuss how we can tailor our services to meet your specific requirements
            </p>
          </div>
        </div>
      </div>

     
      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                <Mail className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-gray-600">We&apos;re here to help you succeed</p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              {/* Phone */}
              <a
                href="tel:8240554890"
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 p-3 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Phone</div>
                  <div className="text-lg font-bold text-gray-900">8240554890</div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@learningneeds.in"
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 p-3 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Email</div>
                  <div className="text-lg font-bold text-gray-900 break-all">info@learningneeds.in</div>
                </div>
              </a>
            </div>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Our team typically responds within 24 hours
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(5deg);
          }
          50% {
            transform: translateY(-10px) translateX(-10px) rotate(-5deg);
          }
          75% {
            transform: translateY(-30px) translateX(5px) rotate(3deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PricingComponent;