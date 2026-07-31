'use client'

import React from 'react';
import { School, Award, Users, Building2, Lightbulb, DollarSign, Calendar, Sparkles, Bird, Monitor, TrendingUp, CheckCircle2, BookOpen, GraduationCap, Target } from 'lucide-react';

const SchoolManagement = () => {
  const benefits = [
    { icon: DollarSign, label: "No Franchisee" },
    { icon: DollarSign, label: "No Royalty" },
    { icon: Calendar, label: "No Lock Period" },
    { icon: School, label: "Your School" },
    { icon: Sparkles, label: "Your Brand" },
    { icon: Bird, label: "Freedom" },
    { icon: Monitor, label: "End to End Support" },
    { icon: TrendingUp, label: "Low Setup Cost" }
  ];

  const floatingIcons = [
    { Icon: BookOpen, top: "10%", left: "5%", delay: "0s", duration: "20s" },
    { Icon: GraduationCap, top: "20%", right: "8%", delay: "2s", duration: "25s" },
    { Icon: Target, bottom: "15%", left: "10%", delay: "4s", duration: "22s" },
    { Icon: Award, top: "60%", right: "5%", delay: "1s", duration: "28s" },
    { Icon: Lightbulb, top: "40%", left: "3%", delay: "3s", duration: "24s" },
    { Icon: Building2, bottom: "30%", right: "12%", delay: "5s", duration: "26s" },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-20 px-4 relative overflow-hidden">
      
      {/* Floating Background Icons */}
      {floatingIcons.map((item, idx) => (
        <div
          key={idx}
          className="hidden lg:block absolute text-gray-300 opacity-30 pointer-events-none"
          style={{
            top: item.top,
            bottom: item.bottom,
            left: item.left,
            right: item.right,
            animation: `floatGentle ${item.duration} ease-in-out infinite`,
            animationDelay: item.delay
          }}
        >
          <item.Icon className="w-16 h-16" strokeWidth={1.5} />
        </div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-2 bg-blue-50 px-5 py-2 rounded-full border border-blue-200">
              <School className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-medium text-sm">COMPREHENSIVE SOLUTIONS</span>
            </div>
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-3">
            School Management Service
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert guidance from conceptualization to world-class execution
          </p>
        </div>

        {/* Main Content Cards - 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          
          {/* Expert Support */}
          <div className="group bg-gradient-to-br from-blue-50 via-white to-blue-50/50 rounded-2xl p-8 border border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">Expert Support</h3>
            <p className="text-gray-600 leading-relaxed" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
              The Learning Needs team has extensive expertise on school management issues and can provide all necessary support in various ways. Our team member can advise you on any issues which your school may have. This could be staff performance issues, appointing a new governance structure, or even a new school build.
            </p>
          </div>

          {/* Complete Solutions */}
          <div className="group bg-gradient-to-br from-purple-50 via-white to-purple-50/50 rounded-2xl p-8 border border-gray-200 hover:border-purple-400 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">Complete Solutions</h3>
            <p className="text-gray-600 leading-relaxed" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
              Learning Needs subject matter experts will help you to provide all the support from conceptualization to setting your own world class school. We develop a finance model to suit our clients need, advice on building design & architecture, affiliation, curriculum, activity books and lesson plans, develop activities for students, staff recruitment and training workshop.
            </p>
          </div>

          {/* Long-term Partnership */}
          <div className="group bg-gradient-to-br from-green-50 via-white to-green-50/50 rounded-2xl p-8 border border-gray-200 hover:border-green-400 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">Long-term Partnership</h3>
            <p className="text-gray-600 leading-relaxed" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
              We offer a full range of services, spanning organizational structure, project planning and development. At Learning Needs we value the relationships that we foster with our educational leaders of the schools we collaborate, sometimes over several years.
            </p>
          </div>

          {/* Fresh Perspective */}
          <div className="group bg-gradient-to-br from-orange-50 via-white to-orange-50/50 rounded-2xl p-8 border border-gray-200 hover:border-orange-400 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">Fresh Perspective</h3>
            <p className="text-gray-600 leading-relaxed" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
              While the knowledge of a school, its context and its strengths and challenges are built up by a single improvement advisor over time, sometimes a fresh pair of eyes or another expert with a particular set of skills or experience can supplement the support.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-900 rounded-3xl p-10 sm:p-16 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 text-center">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Start Your Own School
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Build your dream educational institution with complete freedom and comprehensive support
            </p>
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              Get Started
              <CheckCircle2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-3">Why Choose Us?</h3>
          <p className="text-gray-600 text-lg">Complete independence with full support</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3 mx-auto group-hover:bg-blue-50 transition-colors">
                <benefit.icon className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
              </div>
              <h4 className="text-gray-900 font-semibold text-sm text-center">
                {benefit.label}
              </h4>
            </div>
          ))}
        </div>

      </div>

      {/* Floating Animation */}
      <style jsx>{`
        @keyframes floatGentle {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-30px) translateX(20px) rotate(5deg);
          }
          66% {
            transform: translateY(-15px) translateX(-15px) rotate(-3deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SchoolManagement;