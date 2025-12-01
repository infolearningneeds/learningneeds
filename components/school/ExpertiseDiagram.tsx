import React from 'react';
import { Lightbulb, BookOpen, Users, TrendingUp, Award, Target, FileText, PieChart, Briefcase, GraduationCap, Brain, Rocket, Globe, CheckCircle, Star } from 'lucide-react';

const ExpertiseDiagram: React.FC = () => {
  const floatingIcons = [
    { Icon: BookOpen, top: '8%', left: '5%', delay: '0s', duration: '7s', color: 'text-blue-400' },
    { Icon: Users, top: '15%', right: '8%', delay: '1s', duration: '8s', color: 'text-purple-400' },
    { Icon: TrendingUp, top: '65%', left: '4%', delay: '2s', duration: '6.5s', color: 'text-green-400' },
    { Icon: Award, top: '80%', right: '12%', delay: '0.5s', duration: '7.5s', color: 'text-yellow-400' },
    { Icon: Target, top: '50%', right: '6%', delay: '2.5s', duration: '6s', color: 'text-red-400' },
    { Icon: FileText, top: '88%', left: '10%', delay: '1s', duration: '7s', color: 'text-indigo-400' },
    { Icon: PieChart, top: '12%', left: '18%', delay: '2s', duration: '7.5s', color: 'text-pink-400' },
    { Icon: Briefcase, top: '72%', right: '18%', delay: '0.5s', duration: '6.5s', color: 'text-teal-400' },
    { Icon: GraduationCap, top: '55%', left: '12%', delay: '1.5s', duration: '8s', color: 'text-cyan-400' },
    { Icon: Brain, top: '40%', right: '10%', delay: '0.8s', duration: '7s', color: 'text-violet-400' },
    { Icon: Rocket, top: '25%', left: '15%', delay: '1.8s', duration: '6.8s', color: 'text-rose-400' },
    { Icon: Globe, top: '60%', right: '15%', delay: '1.2s', duration: '7.2s', color: 'text-emerald-400' },
    { Icon: CheckCircle, top: '20%', right: '20%', delay: '2.2s', duration: '6.3s', color: 'text-lime-400' },
    { Icon: Star, top: '75%', left: '20%', delay: '0.7s', duration: '7.7s', color: 'text-amber-400' },
  ];

  const leftItems = [
    { text: 'Expansion Plan', delay: '0s' },
    { text: 'Branding', delay: '0.1s' },
    { text: 'Teachers Training', delay: '0.2s' },
    { text: 'Admission', delay: '0.3s' },
    { text: 'Marketing Training', delay: '0.4s' },
    { text: 'Operation Plan', delay: '0.5s' },
  ];

  const rightItems = [
    { text: 'Furniture Selection', delay: '0s' },
    { text: 'Marketing Plan', delay: '0.1s' },
    { text: 'Infrastructure Designing', delay: '0.2s' },
    { text: 'Interior layout Designing', delay: '0.3s' },
    { text: 'Collateral Designing', delay: '0.4s' },
    { text: 'Review & Development', delay: '0.5s' },
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((item, index) => {
          const { Icon, top, left, right, delay, duration, color } = item;
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
              <Icon className={`w-16 h-16 ${color}`} strokeWidth={1.5} />
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-4">
            Expertise Includes
          </h2>
        </div>

        {/* Main Diagram */}
        <div className="relative flex items-center justify-center">
          {/* Left Side Items */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 space-y-6 hidden lg:block">
            {leftItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 group animate-slide-in-left"
                style={{ animationDelay: item.delay }}
              >
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-w-[200px] text-center font-semibold">
                  {item.text}
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Center Bulb */}
          <div className="flex flex-col items-center animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 w-64 h-64 rounded-full flex items-center justify-center shadow-2xl">
                <Lightbulb className="w-32 h-32 text-gray-800" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Right Side Items */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-6 hidden lg:block">
            {rightItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 group animate-slide-in-right"
                style={{ animationDelay: item.delay }}
              >
                <div className="flex items-center gap-1">
                  <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-w-[200px] text-center font-semibold">
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet View */}
          <div className="lg:hidden mt-12 space-y-8 w-full max-w-2xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-orange-600 text-center mb-6">Services</h3>
              {[...leftItems, ...rightItems].map((item, index) => (
                <div
                  key={index}
                  className={`${
                    index < leftItems.length
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600'
                  } text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center font-semibold animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative bottom elements */}
        <div className="mt-20 flex justify-center gap-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-blue-600 animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            ></div>
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

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.5);
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
            transform: translateY(-25px) translateX(15px) rotate(8deg);
          }
          50% {
            transform: translateY(-15px) translateX(-15px) rotate(-8deg);
          }
          75% {
            transform: translateY(-35px) translateX(10px) rotate(5deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.8s ease-out;
        }

        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ExpertiseDiagram;