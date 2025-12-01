/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { BookOpen, Users, TrendingUp, Award, Lightbulb, Target, FileText, PieChart, Briefcase, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';

const SchoolServices = () => {
  const services = [
    {
      icon: Target,
      title: 'Strategic Planning',
      description: 'Organizational structure, project planning and development tailored to your institution\'s vision.',
      gradient: 'from-emerald-400 to-teal-500',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      icon: Users,
      title: 'Governance & Growth',
      description: 'Expert guidance on management, staffing, financial structures, and sustainable growth projections.',
      gradient: 'from-orange-400 to-pink-500',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      icon: PieChart,
      title: 'Financial Excellence',
      description: 'Management structure optimization, leadership development, and comprehensive financial control systems.',
      gradient: 'from-red-400 to-rose-500',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      icon: Briefcase,
      title: 'Strategic Development',
      description: 'Business plan creation and school/departmental review guidance for continuous improvement.',
      gradient: 'from-purple-400 to-indigo-500',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  const stats = [
    { icon: Award, value: '500+', label: 'Schools Supported' },
    { icon: GraduationCap, value: '15+', label: 'Years Experience' },
    { icon: Sparkles, value: '98%', label: 'Success Rate' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-gray-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-blue-100 mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">For Existing Schools</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-6 leading-tight">
            Elevate Your Institution
          </h1>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Comprehensive support for inspections, observations, and affiliation preparations. 
            <span className="font-semibold text-blue-900"> We help schools reach new heights.</span>
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`${service.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Decorative Line */}
                <div className="flex items-center gap-2 mt-6">
                  <CheckCircle2 className={`w-5 h-5 ${service.iconColor}`} />
                  <div className={`h-1 flex-1 bg-gradient-to-r ${service.gradient} rounded-full opacity-50`}></div>
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10 bg-size-[20px_20px]"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your School?
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can help elevate your institution to the next level
              </p>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default SchoolServices;