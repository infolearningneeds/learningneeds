'use client'

import React, { useState } from 'react';
import { BookOpen, Brain, Heart, Sparkles, TrendingUp, Users, MessageCircle, Lightbulb, BarChart, Shield, BookMarked, Zap } from 'lucide-react';

export default function ReadingImportance() {
  const [isExpanded, setIsExpanded] = useState(false);

  const benefits = [
    { icon: Brain, text: "Gain valuable knowledge", color: "from-purple-500 to-pink-500" },
    { icon: Zap, text: "Exercise your brain", color: "from-yellow-500 to-orange-500" },
    { icon: TrendingUp, text: "Improve focus and concentration", color: "from-blue-500 to-cyan-500" },
    { icon: Lightbulb, text: "Improve your memory", color: "from-green-500 to-emerald-500" },
    { icon: Sparkles, text: "Enjoy entertainment", color: "from-pink-500 to-rose-500" },
    { icon: Heart, text: "Improve ability to empathize", color: "from-red-500 to-pink-500" },
    { icon: MessageCircle, text: "Improve communication skills", color: "from-indigo-500 to-purple-500" },
    { icon: Brain, text: "Mental stimulation", color: "from-violet-500 to-purple-500" },
    { icon: BarChart, text: "Stronger analytical thinking", color: "from-blue-500 to-indigo-500" },
    { icon: Shield, text: "Improve mental health", color: "from-teal-500 to-green-500" },
    { icon: BookMarked, text: "Vocabulary expansion", color: "from-orange-500 to-red-500" },
    { icon: Users, text: "Stress reduction", color: "from-cyan-500 to-blue-500" }
  ];

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-purple-600 rounded-full mb-4 sm:mb-6 shadow-lg">
            <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Why Book Reading is Important
          </h1>
          <div className="w-20 sm:w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Content Card */}
        <div className={`bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-300 ${isExpanded ? 'mb-6 sm:mb-8' : 'mb-2 sm:mb-3'}`}>
          <div className="max-w-none">
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4 sm:mb-6" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
              One of the great reasons that signify the importance of book reading in our life is that <span className="text-purple-600 font-semibold">books act as our best friends</span>. Friends are one of the most important parts of our life. We can&lsquo;t imagine our life without the companionship of a good friend. Similarly, a book is like a best friend that constantly inspires us to become the best versions of ourselves. Books enrich our minds with knowledge just like a good friend. We can learn a lot from books and they can help us in overcoming our failures as well as shape our minds.
            </p>

            <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="border-t border-gray-300 pt-4 sm:pt-6 mt-4 sm:mt-6">
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6 sm:mb-8" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
                  A variety of tasks in daily life require reading and understanding written instructions. If children do not learn to read, they cannot read to learn. Children should be encouraged to pick up a book they prefer. Children may not have much reading time at school but parents can encourage their children to pick up books at home. Reading books helps in <span className="text-purple-600 font-semibold">cognitive mental stimulation and brain exercising</span>, enhancing the child&lsquo;s imagination amongst many other benefits.
                </p>

                {/* Benefits Section */}
                <div className="mt-6 sm:mt-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Benefits of Reading Books
                  </h2>
                  <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
                    When you read every day, you unlock countless advantages:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {benefits.map((benefit, index) => {
                      const Icon = benefit.icon;
                      return (
                        <div
                          key={index}
                          className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4"
                        >
                          <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${benefit.color} rounded-lg sm:rounded-xl floating-icon flex-shrink-0`}>
                            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                          </div>
                          <p className="text-gray-800 font-medium text-base sm:text-lg leading-relaxed">
                            {benefit.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 sm:mt-6 px-6 sm:px-8 py-2.5 sm:py-3 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="hidden sm:block fixed top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="hidden sm:block fixed bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .floating-icon {
          animation: float 3s ease-in-out infinite;
        }
        
        .floating-icon:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .floating-icon:nth-child(3) {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}