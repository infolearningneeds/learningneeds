/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useState } from 'react';
import { Award, Target, Heart, Users, Handshake, Lightbulb, Sprout, Flag, CheckCircle, Star, TrendingUp, Briefcase } from 'lucide-react';

const LearningNeedsTree = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const learningItems = [
    { letter: 'L', word: 'Leadership', icon: Award, color: 'bg-purple-600', description: 'Guide and inspire others to achieve collective goals' },
    { letter: 'E', word: 'Effectiveness', icon: Target, color: 'bg-blue-600', description: 'Achieve optimal results with maximum efficiency' },
    { letter: 'A', word: 'Attitude', icon: Heart, color: 'bg-red-600', description: 'Maintain positive mindset in all circumstances' },
    { letter: 'R', word: 'Relation', icon: Users, color: 'bg-green-600', description: 'Build strong connections and meaningful relationships' },
    { letter: 'N', word: 'Negotiation', icon: Handshake, color: 'bg-yellow-600', description: 'Find mutual agreements through dialogue' },
    { letter: 'I', word: 'Innovation', icon: Lightbulb, color: 'bg-indigo-600', description: 'Create and implement groundbreaking ideas' },
    { letter: 'N', word: 'Nurture', icon: Sprout, color: 'bg-teal-600', description: 'Develop and cultivate continuous growth' },
    { letter: 'G', word: 'Goal', icon: Flag, color: 'bg-pink-600', description: 'Set and achieve strategic objectives' },
    { letter: 'N', word: 'Needful', icon: CheckCircle, color: 'bg-cyan-600', description: 'Focus on essentials and priorities' },
    { letter: 'E', word: 'Essential', icon: Star, color: 'bg-orange-600', description: 'Master core fundamentals' },
    { letter: 'E', word: 'Expectational', icon: TrendingUp, color: 'bg-violet-600', description: 'Meet and exceed all standards' },
    { letter: 'D', word: 'Development', icon: TrendingUp, color: 'bg-emerald-600', description: 'Continuous improvement and evolution' },
    { letter: 'S', word: 'Service', icon: Briefcase, color: 'bg-amber-600', description: 'Deliver exceptional value to others' },
  ];

  // Organize into rows: 5, 5, 3
  const rows = [
    learningItems.slice(0, 5),   // First 5
    learningItems.slice(5, 10),  // Next 5
    learningItems.slice(10, 13)  // Last 3
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NCAwLTE4IDguMDYtMTggMThzOC4wNiAxOCAxOCAxOCAxOC04LjA2IDE4LTE4LTguMDYtMTgtMTgtMTh6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIuMDIiLz48L2c+PC9zdmc+')] opacity-40"></div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto text-center mb-16">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 text-purple-700 text-sm font-medium">
              Professional Development Framework
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-purple-600 bg-clip-text text-transparent">
              Learning Needs Traits
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive framework for professional excellence, encompassing essential traits from foundational skills to transformative leadership
          </p>
        </div>

        {/* Cards Layout */}
        <div className="max-w-7xl mx-auto space-y-6">
          {/* First Row - 5 boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {rows[0].map((item, index) => {
              const Icon = item.icon;
              const isActive = activeCard === index;

              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                  className={`
                    group relative cursor-pointer
                    transform transition-all duration-500 ease-out
                    ${isActive ? 'scale-105 z-20' : 'scale-100 hover:scale-102'}
                  `}
                >
                  {/* Card glow effect */}
                  <div className={`
                    absolute inset-0 rounded-2xl transition-opacity duration-500
                    ${isActive ? 'opacity-100' : 'opacity-0'}
                  `}>
                    <div className={`absolute inset-0 ${item.color} rounded-2xl blur-xl opacity-30`}></div>
                  </div>

                  {/* Main card */}
                  <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-6 h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M0 0h20v20H0V0zm10 10h10v10H10V10z'/%3E%3C/g%3E%3C/svg%3E")`,
                      }} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon and Letter */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`
                          ${item.color} w-14 h-14 rounded-xl flex items-center justify-center
                          transform transition-transform duration-500
                          ${isActive ? 'rotate-12 scale-110' : 'rotate-0 scale-100'}
                          shadow-lg
                        `}>
                          <span className="text-white font-bold text-2xl">{item.letter}</span>
                        </div>
                        <Icon className={`
                          w-8 h-8 text-gray-400
                          transform transition-all duration-500
                          ${isActive ? 'text-gray-700 rotate-12' : 'group-hover:text-gray-600'}
                        `} />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-800 mb-2 tracking-tight">
                        {item.word}
                      </h3>

                      {/* Description */}
                      <p className={`
                        text-gray-600 text-sm leading-relaxed
                        transform transition-all duration-500
                        ${isActive ? 'text-gray-700' : ''}
                      `}>
                        {item.description}
                      </p>

                      {/* Decorative line */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className={`
                          h-1 rounded-full transition-all duration-500
                          ${isActive ? `${item.color} w-full` : 'bg-gray-300 w-12'}
                        `}></div>
                      </div>
                    </div>

                    {/* Hover gradient overlay */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl
                    `}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Second Row - 5 boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {rows[1].map((item, index) => {
              const Icon = item.icon;
              const globalIndex = index + 5;
              const isActive = activeCard === globalIndex;

              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveCard(globalIndex)}
                  onMouseLeave={() => setActiveCard(null)}
                  className={`
                    group relative cursor-pointer
                    transform transition-all duration-500 ease-out
                    ${isActive ? 'scale-105 z-20' : 'scale-100 hover:scale-102'}
                  `}
                >
                  {/* Card glow effect */}
                  <div className={`
                    absolute inset-0 rounded-2xl transition-opacity duration-500
                    ${isActive ? 'opacity-100' : 'opacity-0'}
                  `}>
                    <div className={`absolute inset-0 ${item.color} rounded-2xl blur-xl opacity-30`}></div>
                  </div>

                  {/* Main card */}
                  <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-6 h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M0 0h20v20H0V0zm10 10h10v10H10V10z'/%3E%3C/g%3E%3C/svg%3E")`,
                      }} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon and Letter */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`
                          ${item.color} w-14 h-14 rounded-xl flex items-center justify-center
                          transform transition-transform duration-500
                          ${isActive ? 'rotate-12 scale-110' : 'rotate-0 scale-100'}
                          shadow-lg
                        `}>
                          <span className="text-white font-bold text-2xl">{item.letter}</span>
                        </div>
                        <Icon className={`
                          w-8 h-8 text-gray-400
                          transform transition-all duration-500
                          ${isActive ? 'text-gray-700 rotate-12' : 'group-hover:text-gray-600'}
                        `} />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-800 mb-2 tracking-tight">
                        {item.word}
                      </h3>

                      {/* Description */}
                      <p className={`
                        text-gray-600 text-sm leading-relaxed
                        transform transition-all duration-500
                        ${isActive ? 'text-gray-700' : ''}
                      `}>
                        {item.description}
                      </p>

                      {/* Decorative line */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className={`
                          h-1 rounded-full transition-all duration-500
                          ${isActive ? `${item.color} w-full` : 'bg-gray-300 w-12'}
                        `}></div>
                      </div>
                    </div>

                    {/* Hover gradient overlay */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl
                    `}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Third Row - 3 boxes (full width on mobile, centered on larger screens) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:max-w-4xl lg:mx-auto">
            {rows[2].map((item, index) => {
              const Icon = item.icon;
              const globalIndex = index + 10;
              const isActive = activeCard === globalIndex;

              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveCard(globalIndex)}
                  onMouseLeave={() => setActiveCard(null)}
                  className={`
                    group relative cursor-pointer
                    transform transition-all duration-500 ease-out
                    ${isActive ? 'scale-105 z-20' : 'scale-100 hover:scale-102'}
                  `}
                >
                  {/* Card glow effect */}
                  <div className={`
                    absolute inset-0 rounded-2xl transition-opacity duration-500
                    ${isActive ? 'opacity-100' : 'opacity-0'}
                  `}>
                    <div className={`absolute inset-0 ${item.color} rounded-2xl blur-xl opacity-30`}></div>
                  </div>

                  {/* Main card */}
                  <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-6 h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M0 0h20v20H0V0zm10 10h10v10H10V10z'/%3E%3C/g%3E%3C/svg%3E")`,
                      }} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon and Letter */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`
                          ${item.color} w-14 h-14 rounded-xl flex items-center justify-center
                          transform transition-transform duration-500
                          ${isActive ? 'rotate-12 scale-110' : 'rotate-0 scale-100'}
                          shadow-lg
                        `}>
                          <span className="text-white font-bold text-2xl">{item.letter}</span>
                        </div>
                        <Icon className={`
                          w-8 h-8 text-gray-400
                          transform transition-all duration-500
                          ${isActive ? 'text-gray-700 rotate-12' : 'group-hover:text-gray-600'}
                        `} />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-800 mb-2 tracking-tight">
                        {item.word}
                      </h3>

                      {/* Description */}
                      <p className={`
                        text-gray-600 text-sm leading-relaxed
                        transform transition-all duration-500
                        ${isActive ? 'text-gray-700' : ''}
                      `}>
                        {item.description}
                      </p>

                      {/* Decorative line */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className={`
                          h-1 rounded-full transition-all duration-500
                          ${isActive ? `${item.color} w-full` : 'bg-gray-300 w-12'}
                        `}></div>
                      </div>
                    </div>

                    {/* Hover gradient overlay */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl
                    `}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 border-2 border-purple-200 rounded-3xl p-8 sm:p-12 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Ready to Transform Your Skills?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Master these 13 essential traits and unlock your full potential
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-300/50 transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
              <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningNeedsTree;