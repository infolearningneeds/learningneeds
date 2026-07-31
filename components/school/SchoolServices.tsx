import React from 'react';
import { BookOpen, Users, TrendingUp, Award, Lightbulb, Target, FileText, PieChart, Briefcase, GraduationCap } from 'lucide-react';

const SchoolServices: React.FC = () => {
  const floatingIcons = [
    { Icon: BookOpen, top: '10%', left: '5%', delay: '0s', duration: '6s' },
    { Icon: Users, top: '20%', right: '8%', delay: '1s', duration: '7s' },
    { Icon: TrendingUp, top: '60%', left: '3%', delay: '2s', duration: '8s' },
    { Icon: Award, top: '75%', right: '10%', delay: '0.5s', duration: '6.5s' },
    { Icon: Lightbulb, top: '35%', left: '7%', delay: '1.5s', duration: '7.5s' },
    { Icon: Target, top: '45%', right: '5%', delay: '2.5s', duration: '6s' },
    { Icon: FileText, top: '85%', left: '12%', delay: '1s', duration: '7s' },
    { Icon: PieChart, top: '15%', left: '15%', delay: '2s', duration: '8s' },
    { Icon: Briefcase, top: '70%', right: '15%', delay: '0.5s', duration: '6.5s' },
    { Icon: GraduationCap, top: '50%', left: '10%', delay: '1.5s', duration: '7s' },
  ];

  const services = [
    {
      color: 'bg-emerald-500',
      borderColor: 'border-emerald-500',
      text: 'Providing organizational structure, project planning and development',
    },
    {
      color: 'bg-orange-400',
      borderColor: 'border-orange-400',
      text: 'Assisting with Governance and management, staffing and financial structures; growth plans and projections',
    },
    {
      color: 'bg-red-500',
      borderColor: 'border-red-500',
      text: 'Giving advice on management structure, management leadership style, financial management/control; P& L accounts, management accounts/budgets',
    },
    {
      color: 'bg-purple-600',
      borderColor: 'border-purple-600',
      text: 'Helping your school develop a strategic development or business plan and advising on school/departmental reviews',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-200 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((item, index) => {
          const { Icon, top, left, right, delay, duration } = item;
          return (
            <div
              key={index}
              className="absolute animate-float opacity-20"
              style={{
                top,
                left,
                right,
                animationDelay: delay,
                animationDuration: duration,
              }}
            >
              <Icon className="w-12 h-12 text-orange-400" strokeWidth={1.5} />
            </div>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-900 mb-6">
            For Existing Schools
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed" >
            Learning Needs provides all levels of support for schools leading up to their inspections, 
            observations and preparations for affiliation networks and collaborations.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Mark Top */}
              <div className="absolute -top-4 -left-2 text-6xl font-bold text-gray-800 z-10">
                &ldquo;
              </div>

              {/* Card Container */}
              <div className={`relative h-full border-4 ${service.borderColor} rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300`}>
                {/* Colored Background */}
                <div className={`${service.color} h-full p-8 flex items-center justify-center relative`}>
                  {/* White text content */}
                  <p className="text-white font-semibold text-lg leading-relaxed text-center relative z-10" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
                    {service.text}
                  </p>
                  
                  {/* Subtle overlay pattern */}
                  <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white to-transparent"></div>
                </div>

                {/* Quote Mark Bottom */}
                <div className="absolute -bottom-4 -right-2 text-6xl font-bold text-gray-800 z-10">
                  &ldquo;
                </div>
              </div>

              {/* Glow effect on hover */}
              <div className={`absolute inset-0 ${service.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`}></div>
            </div>
          ))}
        </div>

        {/* Additional decorative elements */}
        <div className="mt-16 flex justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '100ms' }}></div>
          <div className="w-3 h-3 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: '200ms' }}></div>
          <div className="w-3 h-3 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
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

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SchoolServices;