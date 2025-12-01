/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Heart, BookOpen, Gamepad2, AlertCircle, Users, Award, TrendingUp, Sparkles } from "lucide-react";
import Image from "next/image";

const ParentingWorkshop = () => {
  const [showMore, setShowMore] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { 
      name: "Parenting Workshop", 
      icon: Heart,
      image: "/images/training/parenting.png",
      content: "Discover comprehensive parenting strategies that help you connect with your child at every stage of development. Learn practical techniques for positive discipline, effective communication, and building strong family bonds."
    },
    { 
      name: "Education Issues", 
      icon: BookOpen,
      image: "/images/training/issue.png",
      content: "Navigate the complex world of modern education with confidence. Address learning challenges, homework struggles, and academic pressure while fostering a love for learning in your children."
    },
    { 
      name: "Play", 
      icon: Gamepad2,
      image: "/images/training/play.png",
      content: "Understand the crucial role of play in child development. Learn how to encourage creative play, balance screen time, and use play as a tool for teaching important life skills and values."
    },
    { 
      name: "Other Issues", 
      icon: AlertCircle,
      image: "/images/training/other.png",
      content: "Address various parenting challenges including behavioral issues, sibling rivalry, peer pressure, and emotional regulation. Get expert guidance on handling difficult situations with patience and understanding."
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Image */}
      <div className="w-full mb-12">
        <Image
          src="/images/training/parenting.png"
          alt="Parenting Workshop"
          width={1600}
          height={700}
          className="w-full h-auto rounded-3xl"
          priority
        />
      </div>

      {/* Header */}
      <div className="text-center mb-16 px-4">
        <div className="inline-block mb-4 px-6 py-2 bg-pink-100 border-2 border-pink-700 rounded-full">
          <span className="text-pink-700 text-sm font-medium tracking-wider">FAMILY DEVELOPMENT</span>
        </div>
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-900 mb-2 tracking-tight">
          Parenting
        </h1>
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-light text-gray-700 tracking-wider">
          WORKSHOP
        </h2>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { icon: Heart, label: "Parents Helped", value: "3K+" },
            { icon: Users, label: "Families", value: "2K+" },
            { icon: Award, label: "Success Rate", value: "96%" },
            { icon: TrendingUp, label: "Satisfaction", value: "99%" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 border-2 border-gray-200 rounded-2xl hover:border-pink-700 transition-all duration-300 hover:shadow-lg">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-pink-700" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Introduction Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-block mb-4 px-4 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold">
              Expert Guidance
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Raising Happy, Confident Children
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg mb-6" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
              Most parents always worry about their children and don't know how to deal with them. They may not know the fact that all children are unique in the way they process information and learn things from their parents.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
              Our successful Parenting workshop is especially for all such parents. Through this workshop, parents will learn parenting skills to tackle their children aging from 2 to 20 years.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-pink-100 rounded-3xl transform rotate-3" />
            <div className="relative bg-white border-2 border-gray-900 rounded-3xl p-8 shadow-xl">
              <Sparkles className="w-12 h-12 text-pink-700 mb-4" />
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                What You'll Learn
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-pink-700 rounded-full mt-2 flex-shrink-0" />
                  <span>Real-life parenting techniques</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-pink-700 rounded-full mt-2 flex-shrink-0" />
                  <span>Understanding child psychology</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-pink-700 rounded-full mt-2 flex-shrink-0" />
                  <span>Emotional & social support strategies</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-pink-700 rounded-full mt-2 flex-shrink-0" />
                  <span>Bridging the generational gap</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content Box */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-12 border-2 border-gray-200">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Break the Chain, Upgrade Your Parenting
          </h3>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
            <p>
              They can educate themselves to educate their child. Parents can apply real-life parenting techniques taught in this workshop. They will find so many parenting advice in this workshop, which will teach them how to deal with their children.
            </p>
            <p>
              The generational gap forbids parents to understand child's psychology, hence, they respond the same as their parents did. "Child Psychology" was not taught to our ancestors. Someone needs to break this chain and upgrade because with time new generation children are more advanced than ever.
            </p>
            <p>
              Parents have a huge part to play in understanding and supporting their children's emotional and social needs. Packed with expert advice, key strategies and examples of positive parenting, Learning Needs reveal the secrets of raising happy, confident and well-adjusted children.
            </p>
          </div>
        </div>

        {/* Read More Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowMore(!showMore)}
            className="group inline-flex items-center gap-3 bg-gray-900 text-white font-semibold px-10 py-5 rounded-full hover:bg-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>{showMore ? "Show Less" : "Explore Topics"}</span>
            {showMore ? (
              <ChevronUp className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            ) : (
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            )}
          </button>
        </div>

        {/* Expandable Tabs Content */}
        {showMore && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Tabs Navigation */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {tabs.map((tab, idx) => {
                const Icon = tab.icon;
                const isActive = activeTab === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300
                      ${isActive
                        ? "bg-pink-700 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-300 hover:border-pink-400"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{tab.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="bg-white border-2 border-gray-900 rounded-3xl overflow-hidden shadow-xl">
              {/* Tab Image */}
              <div className="w-full bg-gray-100">
                <Image
                  src={tabs[activeTab].image}
                  alt={tabs[activeTab].name}
                  width={1600}
                  height={700}
                  className="w-full h-auto"
                />
              </div>

              {/* Tab Text Content */}
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  {React.createElement(tabs[activeTab].icon, { className: "w-8 h-8 text-pink-700" })}
                  <h3 className="text-3xl font-bold text-gray-900">
                    {tabs[activeTab].name}
                  </h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {tabs[activeTab].content}
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-pink-700 text-white rounded-3xl p-12 text-center mt-12">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Transform Your Parenting Journey?
              </h3>
              <p className="text-pink-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of parents who have discovered the joy of confident, informed parenting through our comprehensive workshop programs.
              </p>
              <button className="bg-white text-pink-700 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg">
                Register Now
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ParentingWorkshop;