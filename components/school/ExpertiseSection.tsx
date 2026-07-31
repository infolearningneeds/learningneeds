import React from 'react';
import Image from 'next/image';
import { BookOpen, Users, TrendingUp, Award, Lightbulb, Target, FileText, PieChart, Briefcase, GraduationCap, Brain, Rocket, Globe, CheckCircle, Star } from 'lucide-react';

const ExpertiseSection: React.FC = () => {
  const floatingIcons = [
    { Icon: BookOpen, top: '8%', left: '5%', delay: '0s', duration: '7s', color: 'text-blue-400' },
    { Icon: Users, top: '15%', right: '8%', delay: '1s', duration: '8s', color: 'text-purple-400' },
    { Icon: TrendingUp, top: '65%', left: '4%', delay: '2s', duration: '6.5s', color: 'text-green-400' },
    { Icon: Award, top: '80%', right: '12%', delay: '0.5s', duration: '7.5s', color: 'text-yellow-400' },
    { Icon: Lightbulb, top: '30%', left: '8%', delay: '1.5s', duration: '8s', color: 'text-orange-400' },
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

  const expertiseItems = [
    'Strategic Educational Planning',
    'Curriculum Development',
    'Teacher Training & Development',
    'Quality Assurance Systems',
    'Inspection Preparation',
    'Governance & Leadership',
    'Financial Management',
    'Organizational Development',
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
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 relative inline-block">
            Expertise Includes
            
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative group animate-slide-in-left">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl h-[500px]">
              <Image
                src="/images/school/expert.png"
                alt="Education Excellence"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Decorative corner accents */}
              <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Expertise List Section */}
          <div className="animate-slide-in-right">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="space-y-4">
                {expertiseItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 group/item cursor-pointer transform transition-all duration-300 hover:translate-x-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                        <CheckCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-800 group-hover/item:text-blue-600 transition-colors duration-300">
                        {item}
                      </p>
                      <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 w-0 group-hover/item:w-full transition-all duration-500 mt-1"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Learn More About Our Services
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom elements */}
        <div className="mt-20 flex justify-center gap-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse"
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
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ExpertiseSection;