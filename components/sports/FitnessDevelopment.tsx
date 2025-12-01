'use client'

import React from 'react';
import { Dumbbell, Heart, Zap, Target, Wind, Brain, Trophy, Star, Activity, Award } from 'lucide-react';

const FitnessDevelopment: React.FC = () => {
  const trainingCategories = [
    {
      icon: Dumbbell,
      title: 'Strength Training',
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
    {
      icon: Heart,
      title: 'Endurance Training',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: Zap,
      title: 'Speed and Agility Training',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
    },
    {
      icon: Target,
      title: 'Skill Development',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      icon: Wind,
      title: 'Flexibility Training',
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      icon: Brain,
      title: 'Mental Training',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
    },
    {
      icon: Trophy,
      title: 'Tactical & Strategic Training',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
    },
  ];

  const floatingIcons = [
    { Icon: Activity, top: '10%', left: '8%', delay: '0s', duration: '8s' },
    { Icon: Award, top: '15%', right: '10%', delay: '1s', duration: '7s' },
    { Icon: Star, top: '70%', left: '5%', delay: '2s', duration: '9s' },
    { Icon: Trophy, top: '75%', right: '8%', delay: '0.5s', duration: '7.5s' },
    { Icon: Heart, top: '45%', left: '10%', delay: '1.5s', duration: '8.5s' },
    { Icon: Zap, top: '55%', right: '12%', delay: '2.5s', duration: '8s' },
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Blob Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-pink-200 to-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-gradient-to-br from-green-200 to-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-32 right-1/4 w-96 h-96 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-6000"></div>
      </div>

      {/* Floating Icons */}
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
              <Icon className="w-20 h-20 text-gray-400" strokeWidth={1.5} />
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl mb-6">
            <Star className="w-5 h-5" />
            <span className="uppercase tracking-wide">Excellence in Sports</span>
            <Star className="w-5 h-5" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Fitness Development Programs
          </h1>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 mb-16 border border-gray-200 animate-slide-up">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-6" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
              Our <span className="font-bold text-blue-600">Sports training for children</span> is essential for promoting physical health, building teamwork, and developing essential motor skills. It focuses on age-appropriate exercises that improve strength, coordination, flexibility, and endurance, all while minimizing the risk of injury.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
              At this stage, the emphasis should be on <span className="font-bold text-purple-600">fun, learning basic techniques</span>, and fostering a love for physical activity rather than intense competition. Sports training also teaches important life skills such as discipline, perseverance, and how to handle both success and failure.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
              By engaging children in sports, they develop not only <span className="font-bold text-green-600">physical abilities</span> but also <span className="font-bold text-pink-600">social skills and emotional resilience</span>, which are crucial for their overall growth and development.
            </p>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Sports Training Categories
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"></div>
        </div>

        {/* Training Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {trainingCategories.map((category, index) => (
            <div
              key={index}
              className="group relative animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Star Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Star className={`w-6 h-6 ${category.iconColor} fill-current`} />
                </div>

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className={`${category.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <category.icon className={`w-8 h-8 ${category.iconColor}`} strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {category.title}
                  </h3>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${category.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative">
              <Trophy className="w-16 h-16 text-white mx-auto mb-6" strokeWidth={1.5} />
              <h3 className="text-4xl font-bold text-white mb-4">
                Ready to Start Your Fitness Journey?
              </h3>
              <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
                Join our comprehensive fitness development programs and unlock your child&apos;s full potential
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                  <Star className="w-5 h-5" />
                  Enroll Now
                </button>
                <button className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-2">
                  <Activity className="w-5 h-5" />
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative stars */}
        <div className="mt-12 flex justify-center gap-4">
          {[...Array(7)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 text-yellow-500 fill-current animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>

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

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
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

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(40px, -60px) scale(1.15);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.95);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 9s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </div>
  );
};

export default FitnessDevelopment;