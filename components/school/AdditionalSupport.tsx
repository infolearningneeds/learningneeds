import React from 'react';
import { Users, TrendingUp, BookOpen, ClipboardCheck, GraduationCap, Smile, Lightbulb, Megaphone, DollarSign, UserCheck, Heart, School, Wallet, Shield, CheckCircle, Sparkles } from 'lucide-react';

const AdditionalSupport: React.FC = () => {
  const supportItems = [
    {
      icon: Users,
      text: 'The quality of teaching (teachers and non-teaching staff)',
      color: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: TrendingUp,
      text: 'Teacher performance evaluation',
      color: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      icon: BookOpen,
      text: 'Curriculum management including resources and equipment',
      color: 'from-pink-500 to-pink-600',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600',
    },
    {
      icon: ClipboardCheck,
      text: 'Student assessment and evaluation system, educational standards achieved by pupils',
      color: 'from-indigo-500 to-indigo-600',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
    },
    {
      icon: GraduationCap,
      text: "The quality of pupils' learning, attitudes and behaviour",
      color: 'from-cyan-500 to-cyan-600',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
    },
    {
      icon: Lightbulb,
      text: 'Professional development',
      color: 'from-yellow-500 to-yellow-600',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
    },
    {
      icon: Megaphone,
      text: 'Marketing',
      color: 'from-orange-500 to-orange-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      icon: DollarSign,
      text: 'Development offices, fundraising, foundations and alumni relations',
      color: 'from-green-500 to-green-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      icon: UserCheck,
      text: 'Parental services',
      color: 'from-red-500 to-red-600',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      icon: Heart,
      text: 'Links with parents and the community',
      color: 'from-rose-500 to-rose-600',
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-600',
    },
    {
      icon: Smile,
      text: 'Formation of a parent association or subcommittee',
      color: 'from-teal-500 to-teal-600',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      icon: School,
      text: 'Higher education',
      color: 'from-violet-500 to-violet-600',
      iconBg: 'bg-violet-100',
      iconColor: 'text-violet-600',
    },
    {
      icon: Wallet,
      text: 'Staff pay structure',
      color: 'from-emerald-500 to-emerald-600',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      icon: Shield,
      text: 'Health and safety audit',
      color: 'from-amber-500 to-amber-600',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
  ];

  const floatingIcons = [
    { Icon: Sparkles, top: '10%', left: '8%', delay: '0s', duration: '6s' },
    { Icon: CheckCircle, top: '20%', right: '10%', delay: '1s', duration: '7s' },
    { Icon: Lightbulb, top: '70%', left: '5%', delay: '2s', duration: '8s' },
    { Icon: GraduationCap, top: '80%', right: '8%', delay: '0.5s', duration: '6.5s' },
    { Icon: Heart, top: '40%', left: '7%', delay: '1.5s', duration: '7.5s' },
    { Icon: School, top: '60%', right: '6%', delay: '2.5s', duration: '6s' },
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
              className="absolute animate-float opacity-10"
              style={{
                top,
                left,
                right,
                animationDelay: delay,
                animationDuration: duration,
              }}
            >
              <Icon className="w-20 h-20 text-blue-400" strokeWidth={1.5} />
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              Comprehensive Services
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Additional Support
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Team can also assist with:
          </p>
        </div>

        {/* Support Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportItems.map((item, index) => (
            <div
              key={index}
              className="group relative animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Card */}
              <div className="relative h-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className="relative flex items-start gap-4">
                  <div className={`flex-shrink-0 ${item.iconBg} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <item.icon className={`w-6 h-6 ${item.iconColor}`} strokeWidth={2} />
                  </div>
                  
                  {/* Text */}
                  <div className="flex-1 pt-1">
                    <p className="text-gray-700 font-medium leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                      {item.text}
                    </p>
                  </div>
                </div>

                {/* Animated checkmark on hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                    <CheckCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-blue-100 text-lg mb-6">
              Our comprehensive support services are designed to help your institution excel
            </p>
            <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Contact Our Team Today
            </button>
          </div>
        </div>

        {/* Decorative bottom elements */}
        <div className="mt-12 flex justify-center gap-3">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
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

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AdditionalSupport;