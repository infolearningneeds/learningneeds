import React, { useState } from 'react';
import { TrendingUp, Palette, Users, UserPlus, Megaphone, Settings, Sofa, BarChart3, Building2, LayoutGrid, FileText, RefreshCw } from 'lucide-react';

const ExpertiseInclude = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const allItems = [
    { text: "Expansion Plan", icon: TrendingUp, gradient: "from-orange-500 to-red-600" },
    { text: "Branding", icon: Palette, gradient: "from-pink-500 to-rose-600" },
    { text: "Teachers Training", icon: Users, gradient: "from-purple-500 to-indigo-600" },
    { text: "Admission", icon: UserPlus, gradient: "from-amber-500 to-orange-600" },
    { text: "Marketing Training", icon: Megaphone, gradient: "from-red-500 to-pink-600" },
    { text: "Operation Plan", icon: Settings, gradient: "from-yellow-500 to-amber-600" },
    { text: "Furniture Selection", icon: Sofa, gradient: "from-teal-500 to-emerald-600" },
    { text: "Marketing Plan", icon: BarChart3, gradient: "from-cyan-500 to-blue-600" },
    { text: "Infrastructure Designing", icon: Building2, gradient: "from-blue-500 to-indigo-600" },
    { text: "Interior Layout Designing", icon: LayoutGrid, gradient: "from-emerald-500 to-teal-600" },
    { text: "Collateral Designing", icon: FileText, gradient: "from-sky-500 to-cyan-600" },
    { text: "Review & Development", icon: RefreshCw, gradient: "from-indigo-500 to-purple-600" }
  ];

  return (
    <div className="w-full min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
       

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allItems.map((item, idx) => {
            const IconComponent = item.icon;
            const isHovered = hoveredIndex === idx;
            
            return (
              <div 
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group cursor-pointer"
              >
                <div className={`
                  bg-white rounded-2xl p-6 h-full
                  shadow-md hover:shadow-2xl
                  transition-all duration-500 ease-out
                  ${isHovered ? 'scale-105 -translate-y-2' : 'scale-100'}
                  border border-gray-100
                `}>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`
                      w-16 h-16 rounded-xl bg-gradient-to-br ${item.gradient}
                      flex items-center justify-center
                      transition-all duration-500
                      ${isHovered ? 'rotate-6 scale-110' : 'rotate-0 scale-100'}
                      shadow-lg
                    `}>
                      <IconComponent className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="font-semibold text-gray-800 text-sm leading-tight">
                      {item.text}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          {allItems.map((item, idx) => {
            const IconComponent = item.icon;
            
            return (
              <div 
                key={idx}
                className="bg-white rounded-xl p-4 shadow-md active:scale-95 transition-transform"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`
                    w-12 h-12 rounded-lg bg-gradient-to-br ${item.gradient}
                    flex items-center justify-center shadow-md
                  `}>
                    <IconComponent className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="font-medium text-gray-800 text-xs leading-tight">
                    {item.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExpertiseInclude;