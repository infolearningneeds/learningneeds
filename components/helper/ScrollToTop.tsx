'use client'

import React, { useState, useEffect } from 'react';
import { ArrowUp, Rocket } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.pageYOffset;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrolled / windowHeight) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrolled > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(249, 115, 22, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.7), 0 0 60px rgba(249, 115, 22, 0.5); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.4) 50%,
            transparent 100%
          );
          background-size: 1000px 100%;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>

     

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`
          fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50
          transition-all duration-500 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'}
        `}
        aria-label="Scroll to top"
      >
        {/* Pulse Ring Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 animate-pulse-ring"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-blue-500 animate-pulse-ring" style={{ animationDelay: '1s' }}></div>
        
        {/* Main Button Container */}
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-orange-500 to-blue-500 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-glow"></div>
          
          {/* Button */}
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-600 via-orange-600 to-blue-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 animate-float overflow-hidden">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 animate-shimmer"></div>
            
            {/* Progress Circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="3"
              />
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 46}`}
                strokeDashoffset={`${2 * Math.PI * 46 * (1 - scrollProgress / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-150"
              />
            </svg>
            
            {/* Icon */}
            <ArrowUp className="w-5 h-5 sm:w-7 sm:h-7 text-white relative z-10 group-hover:scale-125 transition-transform duration-300" />
          </div>
          
          {/* Tooltip - Hidden on mobile */}
          <div className="hidden sm:block absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
              Back to top
              <div className="absolute top-full right-6 -mt-1">
                <div className="border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </>
  );
};

export default ScrollToTop;