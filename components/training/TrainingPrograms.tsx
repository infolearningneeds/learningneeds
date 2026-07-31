/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState } from 'react';
import { BookOpen, Users, TrendingUp, MessageSquare, Lightbulb, Target, Phone, Mic, Brain, Shield, Presentation, Ear, Calendar, Zap, Award, Briefcase, Star, Sparkles, ArrowRight } from 'lucide-react';

const TrainingPrograms = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const programs = [
    { title: "Effective Communication", icon: MessageSquare, color: "from-blue-500 to-cyan-500", accent: "bg-blue-500" },
    { title: "Peak Performance", icon: TrendingUp, color: "from-purple-500 to-pink-500", accent: "bg-purple-500" },
    { title: "Leadership Innovation", icon: Lightbulb, color: "from-orange-500 to-red-500", accent: "bg-orange-500" },
    { title: "Power of Influence", icon: Target, color: "from-green-500 to-emerald-500", accent: "bg-green-500" },
    { title: "Success with Change", icon: Zap, color: "from-yellow-500 to-orange-500", accent: "bg-yellow-500" },
    { title: "Complaint Handling", icon: Phone, color: "from-red-500 to-pink-500", accent: "bg-red-500" },
    { title: "Questioning Skills", icon: Brain, color: "from-indigo-500 to-purple-500", accent: "bg-indigo-500" },
    { title: "Public Speaking", icon: Mic, color: "from-cyan-500 to-blue-500", accent: "bg-cyan-500" },
    { title: "Anger Management", icon: Shield, color: "from-rose-500 to-red-500", accent: "bg-rose-500" },
    { title: "Dealing Difficult Situations", icon: Target, color: "from-violet-500 to-purple-500", accent: "bg-violet-500" },
    { title: "Presentation Skills", icon: Presentation, color: "from-teal-500 to-cyan-500", accent: "bg-teal-500" },
    { title: "Assertiveness in Action", icon: Zap, color: "from-amber-500 to-orange-500", accent: "bg-amber-500" },
    { title: "Listening Skills", icon: Ear, color: "from-blue-500 to-indigo-500", accent: "bg-blue-500" },
    { title: "Effective Meetings", icon: Calendar, color: "from-green-500 to-teal-500", accent: "bg-green-500" },
    { title: "Think Your Way to Success", icon: Brain, color: "from-pink-500 to-rose-500", accent: "bg-pink-500" },
    { title: "Team Building", icon: Users, color: "from-purple-500 to-indigo-500", accent: "bg-purple-500" }
  ];

  const floatingIcons = [
    { Icon: Lightbulb, delay: 0, duration: 20, x: '10%', y: '10%' },
    { Icon: Star, delay: 2, duration: 25, x: '80%', y: '15%' },
    { Icon: Award, delay: 4, duration: 22, x: '15%', y: '70%' },
    { Icon: Briefcase, delay: 1, duration: 24, x: '85%', y: '60%' },
    { Icon: Sparkles, delay: 3, duration: 23, x: '50%', y: '5%' },
    { Icon: Users, delay: 5, duration: 21, x: '90%', y: '85%' },
    { Icon: TrendingUp, delay: 2.5, duration: 26, x: '5%', y: '40%' },
    { Icon: Target, delay: 4.5, duration: 19, x: '70%', y: '90%' },
  ];

  return (
    <div className="min-h-screen bg-gray-200 relative overflow-hidden">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((item, index) => {
          const IconComponent = item.Icon;
          return (
            <div
              key={index}
              className="absolute opacity-10"
              style={{
                left: item.x,
                top: item.y,
                animation: `float ${item.duration}s ease-in-out infinite`,
                animationDelay: `${item.delay}s`
              }}
            >
              <IconComponent className="w-16 h-16 text-purple-600" />
            </div>
          );
        })}
      </div>

      {/* Animated Blob Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-200/30 rounded-full blur-3xl top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-orange-200/30 rounded-full blur-3xl bottom-20 -right-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(5deg);
          }
          50% {
            transform: translateY(-40px) rotate(0deg);
          }
          75% {
            transform: translateY(-20px) rotate(-5deg);
          }
        }
      `}</style>

      <div className="relative z-10 w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6 w-full mx-auto">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-200 shadow-lg">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <span className="text-purple-700 font-semibold">Professional Development</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Soft Skills' <span className="bg-linear-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">Behavioural Shift</span>
            <br />Training Programs
          </h1>
          
          <p className="text-xl text-gray-700 mx-auto leading-relaxed font-medium" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
            Soft skills' Behavioural Shift training is essential because we do not have it in our academic curricula. 
            However it can be developed through continuous training.
          </p>
          
          <p className="text-lg text-gray-600 mx-auto" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
            Our skill based training programs are designed to encourage <span className="text-purple-600 font-bold">'awareness'</span> in one's behavioural patterns. 
            Learning Needs international quality Training & Development Programs are designed to help today's aspiring 
            professionals to succeed in an ever increasing competitive and diverse business environment.
          </p>
        </div>

        {/* Programs Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">List of Programs</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            There are many different programs offered by Learning Needs that will enhance your career in a positive way.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {programs.map((program, index) => {
              const Icon = program.icon;
              const isHovered = hoveredCard === index;
              
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative"
                >
                  {/* Animated Border */}
                  <div className={`
                    absolute -inset-[2px] bg-gradient-to-br ${program.color} rounded-3xl
                    transition-all duration-500
                    ${isHovered ? 'opacity-100' : 'opacity-0'}
                  `}></div>
                  
                  <div className={`
                    relative bg-white rounded-3xl p-6 
                    transition-all duration-500 overflow-hidden
                    ${isHovered ? 'shadow-2xl' : 'shadow-lg'}
                  `}>
                    {/* Decorative Corner Element */}
                    <div className={`
                      absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${program.color} 
                      opacity-10 rounded-bl-[100%] transition-all duration-500
                      ${isHovered ? 'scale-150' : 'scale-100'}
                    `}></div>

                    {/* Side Accent Bar */}
                    <div className={`
                      absolute left-0 top-0 w-1 bg-gradient-to-b ${program.color}
                      transition-all duration-500
                      ${isHovered ? 'h-full' : 'h-0'}
                    `}></div>
                    
                    {/* Icon Container with Hexagon Effect */}
                    <div className="relative mb-4">
                      <div className={`
                        w-16 h-16 rounded-2xl bg-gradient-to-br ${program.color} 
                        flex items-center justify-center transform transition-all duration-500
                        ${isHovered ? 'scale-110 rotate-6 shadow-lg' : 'scale-100 rotate-0'}
                      `}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Orbiting Dot */}
                      <div className={`
                        absolute -top-1 -right-1 w-3 h-3 ${program.accent} rounded-full
                        transition-all duration-500
                        ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                      `}></div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-800 transition-colors duration-300">
                      {program.title}
                    </h3>

                    {/* Description & Button - overlay on hover */}
                    <div className={`
                      absolute inset-0 bg-white rounded-3xl p-6 flex flex-col justify-end
                      transition-all duration-500
                      ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                    `}>
                      <p className="text-sm text-gray-600 mb-3">
                        Develop essential skills for professional growth
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                          Learn More
                        </span>
                        <ArrowRight className="w-4 h-4 text-purple-600" />
                      </div>
                    </div>

                    {/* Bottom Decorative Line */}
                    <div className={`
                      absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${program.color}
                      transition-all duration-500 origin-left
                      ${isHovered ? 'scale-x-100' : 'scale-x-0'}
                    `}></div>

                    {/* Floating Particles Effect */}
                    <div className={`
                      absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-32 h-32 bg-gradient-to-br ${program.color} rounded-full blur-3xl
                      transition-all duration-700
                      ${isHovered ? 'opacity-10 scale-100' : 'opacity-0 scale-50'}
                    `}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-orange-500 p-[3px] rounded-2xl shadow-xl">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl px-8 py-6">
              <p className="text-gray-700 mb-4 font-medium">Ready to transform your career?</p>
              <button className="bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-purple-400/50 transition-all duration-300 hover:scale-105">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingPrograms;