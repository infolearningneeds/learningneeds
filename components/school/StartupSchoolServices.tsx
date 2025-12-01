import React from 'react';
import { School, GraduationCap, Building2, TrendingUp, LayoutDashboard, Megaphone, ClipboardList, Users, Tag, MapPin, Sofa, Network, FileText, Sparkles, Zap, Rocket } from 'lucide-react';

const StartupSchoolServices = () => {
  const services = [
    { title: "New Start-up School", icon: School, color: "from-pink-500 to-rose-600" },
    { title: "Teacher's Training", icon: GraduationCap, color: "from-purple-500 to-indigo-600" },
    { title: "Infrastructure Designing", icon: Building2, color: "from-blue-500 to-cyan-600" },
    { title: "Marketing Training", icon: TrendingUp, color: "from-emerald-500 to-teal-600" },
    { title: "Interior Layout Designing", icon: LayoutDashboard, color: "from-orange-500 to-amber-600" },
    { title: "Advertisement Plan", icon: Megaphone, color: "from-red-500 to-pink-600" },
    { title: "Operation Plan", icon: ClipboardList, color: "from-violet-500 to-purple-600" },
    { title: "Staff Selection Support", icon: Users, color: "from-sky-500 to-blue-600" },
    { title: "Name Selection", icon: Tag, color: "from-fuchsia-500 to-pink-600" },
    { title: "Area & Site Selection", icon: MapPin, color: "from-lime-500 to-green-600" },
    { title: "Furniture & Learning Aid Selection", icon: Sofa, color: "from-amber-500 to-orange-600" },
    { title: "School Organization Structure", icon: Network, color: "from-indigo-500 to-blue-600" },
    { title: "Collateral Designing Support", icon: FileText, color: "from-teal-500 to-cyan-600" }
  ];

  const floatingElements = [
    { Icon: Sparkles, style: { top: '10%', left: '8%', animationDelay: '0s' } },
    { Icon: Zap, style: { top: '20%', right: '12%', animationDelay: '2s' } },
    { Icon: Rocket, style: { bottom: '15%', left: '10%', animationDelay: '4s' } },
    { Icon: School, style: { top: '60%', right: '8%', animationDelay: '1s' } },
    { Icon: GraduationCap, style: { bottom: '25%', right: '15%', animationDelay: '3s' } },
  ];

  return (
    <div className="relative w-full bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 py-24 px-4 overflow-hidden">
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Icons */}
      {floatingElements.map((item, idx) => (
        <div
          key={idx}
          className="hidden lg:block absolute text-white/30"
          style={{
            ...item.style,
            animation: 'float 6s ease-in-out infinite'
          }}
        >
          <item.Icon className="w-20 h-20" strokeWidth={1.5} />
        </div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900">
              Start Your
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Dream School
            </span>
          </h2>
          <p className="text-2xl text-gray-800 font-medium max-w-2xl mx-auto">
            13 Essential Services to Launch Successfully
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {services.map((service, idx) => {
            // Create varied sizes for bento grid
            const isLarge = idx === 0 || idx === 7 || idx === 10;
            const isTall = idx === 2 || idx === 5;
            const gridClass = isLarge ? 'col-span-2 row-span-2' : isTall ? 'row-span-2' : '';
            
            return (
              <div
                key={idx}
                className={`group ${gridClass}`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="relative h-full min-h-[140px] bg-white/80 backdrop-blur-xl rounded-3xl p-6 border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  
                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 mb-4`}>
                      <service.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                    
                    <div>
                      <h3 className="text-base font-bold text-gray-900 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-white/20 rounded-bl-3xl"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <button className="group relative bg-gray-900 text-white px-14 py-6 rounded-full font-bold text-xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-gray-900/50 overflow-hidden">
            <span className="relative z-10 flex items-center gap-3">
              Let&lsquo;s Build Together
              <Rocket className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default StartupSchoolServices;