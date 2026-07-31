'use client'

import { useState, useEffect } from 'react';

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Mouse move handler for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window === 'undefined') return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Hide loader when page is fully loaded
    const handleLoad = () => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
      }
    }

    return () => {
      clearInterval(progressInterval);
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', handleLoad);
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-indigo-950 overflow-hidden">
      {/* Animated background elements with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse transition-transform duration-300 ease-out"
          style={{ 
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
          }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse transition-transform duration-300 ease-out" 
          style={{ 
            animationDelay: '2s',
            transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)`
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse transition-transform duration-300 ease-out" 
          style={{ 
            animationDelay: '4s',
            transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`
          }}
        ></div>
        
        {/* Additional parallax layers */}
        <div 
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10 transition-transform duration-500 ease-out"
          style={{ 
            transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * 25}px)`
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 transition-transform duration-700 ease-out"
          style={{ 
            transform: `translate(${mousePosition.x * 35}px, ${mousePosition.y * -35}px)`
          }}
        ></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo/Brand */}
        <div className="mb-8 animate-bounce">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-6 hover:rotate-12 transition-transform duration-300">
            <span className="text-4xl font-bold text-white">LN</span>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-white">Learning </span>
          <span className="text-orange-500">Needs</span>
        </h1>
        
        <p className="text-gray-300 mb-8 text-lg">
          Loading your experience...
        </p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-2 bg-indigo-900 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-orange-600 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
            </div>
          </div>
          
          {/* Progress percentage */}
          <div className="mt-3 text-sm font-semibold text-gray-400">
            {Math.round(Math.min(progress, 100))}%
          </div>
        </div>

        {/* Spinning loader */}
        <div className="mt-8 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-blue-600 to-orange-600 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default PageLoader;