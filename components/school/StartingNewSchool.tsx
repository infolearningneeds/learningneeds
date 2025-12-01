import React from 'react';
import { Ruler, Cpu, Box, Rocket } from 'lucide-react';

const StartingNewSchool = () => {
  const services = [
    {
      title: "Architectural design",
      icon: Ruler,
      gradient: "bg-gradient-to-br from-rose-400 via-pink-500 to-rose-600",
      glow: "shadow-rose-500/50",
      lightBg: "bg-rose-50"
    },
    {
      title: "Internal technical requirements",
      icon: Cpu,
      gradient: "bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600",
      glow: "shadow-amber-500/50",
      lightBg: "bg-amber-50"
    },
    {
      title: "Resource and equipment",
      icon: Box,
      gradient: "bg-gradient-to-br from-cyan-400 via-blue-500 to-cyan-600",
      glow: "shadow-cyan-500/50",
      lightBg: "bg-cyan-50"
    },
    {
      title: "Pre schools expansion to all through school",
      icon: Rocket,
      gradient: "bg-gradient-to-br from-violet-400 via-purple-500 to-violet-600",
      glow: "shadow-violet-500/50",
      lightBg: "bg-violet-50"
    }
  ];

  return (
    <div className="w-full bg-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="bg-blue-500/20 text-blue-400 px-5 py-2 rounded-full text-sm font-semibold tracking-wide border border-blue-500/30">
              START YOUR JOURNEY
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Starting a New School!
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Our team has experience of developing and managing new schools from the very outset. We can advise on:
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group relative"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Animated Background Glow */}
              <div className={`absolute inset-0 ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl`}></div>
              
              {/* Main Card */}
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-700 hover:border-gray-600 transition-all duration-500 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-2">
                
                {/* Icon Container */}
                <div className={`w-16 h-16 ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg ${service.glow} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <service.icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white leading-tight mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                  {service.title}
                </h3>

                {/* Hover indicator */}
                <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 text-lg mb-6">
            Ready to bring your vision to life?
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
            Get Started Today
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default StartingNewSchool;