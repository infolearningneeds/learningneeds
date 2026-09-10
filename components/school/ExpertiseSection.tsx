import React from 'react';
import Image from 'next/image';
import {
  BookOpen, Users, TrendingUp, Award, Lightbulb, Target, FileText, PieChart,
  Briefcase, GraduationCap, Brain, Rocket, Globe, CheckCircle, Star, ArrowRight
} from 'lucide-react';

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
    { title: 'Strategic Educational Planning', icon: Target },
    { title: 'Curriculum Development', icon: BookOpen },
    { title: 'Teacher Training & Development', icon: GraduationCap },
    { title: 'Quality Assurance Systems', icon: CheckCircle },
    { title: 'Inspection Preparation', icon: FileText },
    { title: 'Governance & Leadership', icon: Users },
    { title: 'Financial Management', icon: PieChart },
    { title: 'Organizational Development', icon: TrendingUp },
  ];

  return (
    <div className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((item, index) => {
          const { Icon, top, left, right, delay, duration, color } = item;
          return (
            <div
              key={index}
              className="absolute animate-float opacity-10"
              style={{ top, left, right, animationDelay: delay, animationDuration: duration }}
            >
              <Icon className={`w-16 h-16 ${color}`} strokeWidth={1.5} />
            </div>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header — real text, never dependent on the image loading */}
        <div className="text-center mb-14">
          <p className="text-blue-600 font-semibold tracking-wide mb-3 text-sm sm:text-base uppercase">
            Where we add the most value
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 max-w-3xl mx-auto leading-tight">
            Expertise Includes
          </h2>
        </div>

        <div className="flex flex-col gap-12">
          {/* Row 1: Image — full width, natural aspect ratio so the whole image is visible, nothing cropped */}
          <div className="relative group max-w-4xl mx-auto w-full">
            <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative w-full rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
              <Image
                src="/images/school/expert.png"
                alt="Education Excellence"
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
              <div className="absolute top-4 left-4 w-14 h-14 border-t-4 border-l-4 border-white/70 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 right-4 w-14 h-14 border-b-4 border-r-4 border-white/70 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Row 2: Expertise List Section */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expertiseItems.map((item, index) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 group/item cursor-pointer transform transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md group-hover/item:scale-110 transition-transform duration-300">
                        <ItemIcon className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-800 group-hover/item:text-blue-600 transition-colors duration-300">
                        {item.title}
                      </p>
                      <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 w-0 group-hover/item:w-full transition-all duration-500 mt-1" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 max-w-md mx-auto">
              <button className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group">
                Learn More About Our Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Decorative bottom elements */}
        <div className="mt-16 flex justify-center gap-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-25px) translateX(15px) rotate(8deg); }
          50% { transform: translateY(-15px) translateX(-15px) rotate(-8deg); }
          75% { transform: translateY(-35px) translateX(10px) rotate(5deg); }
        }
        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ExpertiseSection;