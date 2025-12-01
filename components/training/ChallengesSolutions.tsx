'use client'

import React from 'react';
import { Shield, Lightbulb, Zap, Target, TrendingUp, Award, CheckCircle, AlertCircle } from 'lucide-react';

const ChallengesSolutions = () => {
  const challenges = [
    "Motivated employees need more than just an education or hard skills.",
    "Business people need the competitive edge that a refined leadership aptitude provides.",
    "Our courses are meticulously designed to improve performance in terms of personal mission.",
    "Recognizing one's own strengths and weaknesses can be difficult. Many people struggle to see how their behaviors impact others."
  ];

  const solutions = [
    "Soft skills / complementary skills are awareness of their presence or lack of their presence in one's behavioural pattern.",
    "Understanding or awareness of soft skills makes any individual 'indispensible' part of the organization.",
    "Corporations spend time and money in developing their work force to suit the organizations need.",
    "Individuals need to invest in developing soft skills to excel pragmatically in all areas of their choice."
  ];

  const floatingIcons = [
    { Icon: Zap, delay: 0, duration: 20, x: '5%', y: '15%' },
    { Icon: Target, delay: 2, duration: 25, x: '90%', y: '20%' },
    { Icon: TrendingUp, delay: 4, duration: 22, x: '10%', y: '80%' },
    { Icon: Award, delay: 1, duration: 24, x: '85%', y: '75%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden py-20 px-4">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((item, index) => {
          const IconComponent = item.Icon;
          return (
            <div
              key={index}
              className="absolute opacity-5"
              style={{
                left: item.x,
                top: item.y,
                animation: `float ${item.duration}s ease-in-out infinite`,
                animationDelay: `${item.delay}s`
              }}
            >
              <IconComponent className="w-20 h-20 text-cyan-400" />
            </div>
          );
        })}
      </div>

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl top-10 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl bottom-10 -right-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-80 h-80 bg-pink-500/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            From <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Challenges</span> to{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Solutions</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover how our training programs transform workplace obstacles into opportunities for growth
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Challenges Card */}
          <div className="relative group h-full">
            {/* Animated glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 rounded-3xl opacity-30 group-hover:opacity-60 blur-2xl transition-all duration-700"></div>

            <div className="relative h-full bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 group-hover:border-orange-500/50 transition-all duration-500 shadow-2xl flex flex-col">
              {/* Animated corner accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-bl-full transition-all duration-500 group-hover:scale-110"></div>

              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Header with Icon */}
              <div className="relative flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300">Challenges</h3>
                  <p className="text-gray-400 text-sm">What we&lsquo;re addressing</p>
                </div>
              </div>

              {/* Decorative line */}
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-8 group-hover:w-full transition-all duration-700"></div>

              {/* Challenge Points */}
              <div className="space-y-6 flex-grow">
                {challenges.map((challenge, idx) => (
                  <div key={idx} className="group/item flex gap-4 items-start">
                    <div className="flex-shrink-0 mt-1.5">
                      <div className="w-3 h-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-full group-hover/item:scale-150 group-hover/item:shadow-lg group-hover/item:shadow-red-500/50 transition-all duration-300"></div>
                    </div>
                    <p className="text-gray-300 leading-relaxed group-hover/item:text-white transition-colors duration-300 text-[15px]" style={{
                      textAlign: 'justify',
                      textJustify: 'inter-word',
                      hyphens: 'auto',
                      wordSpacing: 'normal'
                    }}>
                      {challenge}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 rounded-b-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            </div>
          </div>

          {/* Solutions Card */}
          <div className="relative group h-full">
            {/* Animated glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl opacity-30 group-hover:opacity-60 blur-2xl transition-all duration-700"></div>

            <div className="relative h-full bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 group-hover:border-emerald-500/50 transition-all duration-500 shadow-2xl flex flex-col">
              {/* Animated corner accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-bl-full transition-all duration-500 group-hover:scale-110"></div>

              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Header with Icon */}
              <div className="relative flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">Solutions</h3>
                  <p className="text-gray-400 text-sm">How we solve them</p>
                </div>
              </div>

              {/* Decorative line */}
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-8 group-hover:w-full transition-all duration-700"></div>

              {/* Solution Points */}
              <div className="space-y-6 flex-grow">
                {solutions.map((solution, idx) => (
                  <div key={idx} className="group/item flex gap-4 items-start">
                    <div className="flex-shrink-0 mt-1.5">
                      <div className="w-3 h-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full group-hover/item:scale-150 group-hover/item:shadow-lg group-hover/item:shadow-green-500/50 transition-all duration-300"></div>
                    </div>
                    <p className="text-gray-300 leading-relaxed group-hover/item:text-white transition-colors duration-300 text-[15px]" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
                      {solution}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-b-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ChallengesSolutions;