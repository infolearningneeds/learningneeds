/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, Users, Target, Lightbulb, TrendingUp, Star } from "lucide-react";
import Image from "next/image";

const StudentsWorkshop = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="w-full bg-white">
      {/* Hero Image */}
      <div className="w-full mb-12">
        <Image
          src="/images/training/studentworkshop.png"
          alt="Students Workshop"
          width={1600}
          height={700}
          className="w-full h-auto rounded-3xl"
          priority
        />
      </div>

      {/* Header */}
      <div className="text-center mb-16 px-4">
        <div className="inline-block mb-4 px-6 py-2 bg-blue-100 border-2 border-blue-700 rounded-full">
          <span className="text-blue-700 text-sm font-medium tracking-wider">YOUTH DEVELOPMENT</span>
        </div>
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-900 mb-2 tracking-tight">
          Students
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
            { icon: BookOpen, label: "Workshops", value: "50+" },
            { icon: Users, label: "Students", value: "5K+" },
            { icon: Star, label: "Satisfaction", value: "98%" },
            { icon: Lightbulb, label: "Skills", value: "15+" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-700 transition-all duration-300 hover:shadow-lg">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-700" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Introduction Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-block mb-4 px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Holistic Development
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Empowering Young Minds
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg mb-6" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
              We offer educative workshops for children, parents and teachers. Children's workshops target different dimensions of the child's personality, which are essential for global development. Some of these include persona build-up, gender education, stress free living, study skills and spiritual growth.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
              They build upon the children's strengths by enabling them to open up to others easily and express their views, help them set positive impressions on their peers, allow sharing of ideas, and add to their own confidence.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-blue-100 rounded-3xl transform rotate-3" />
            <div className="relative bg-white border-2 border-gray-900 rounded-3xl p-8 shadow-xl">
              <BookOpen className="w-12 h-12 text-blue-700 mb-4" />
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Who Benefits?
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-700 rounded-full mt-2 flex-shrink-0" />
                  <span><strong>Children:</strong> Personality & skill development</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-700 rounded-full mt-2 flex-shrink-0" />
                  <span><strong>Parents:</strong> Enhanced parenting skills</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-700 rounded-full mt-2 flex-shrink-0" />
                  <span><strong>Teachers:</strong> Better student relationships</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Workshop Overview */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-12 border-2 border-gray-200">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Our Approach
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
            Sessions for parents enhance parenting skills while those for teachers target optimal teacher-student relationships and ways for teachers to deal with children better. Learning Needs regularly arranges student workshops in various fields to impart practical approach and experiential learning in students.
          </p>
        </div>

        {/* Read More Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowMore(!showMore)}
            className="group inline-flex items-center gap-3 bg-gray-900 text-white font-semibold px-10 py-5 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>{showMore ? "Show Less" : "Discover More"}</span>
            {showMore ? (
              <ChevronUp className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            ) : (
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            )}
          </button>
        </div>

        {/* Expandable Content */}
        {showMore && (
          <div className="space-y-12 animate-fadeIn">
            
            {/* Career Development Focus */}
            <div className="bg-white border-2 border-gray-900 rounded-3xl p-8 md:p-10">
              <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Career Development Workshop
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                This Workshop is designed to assist students in better career decision making by identifying their potential.
              </p>
            </div>

            {/* Workshop Objectives */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Star,
                  title: "Enjoy Entertainment",
                  description: "Engaging and interactive learning experiences that keep students motivated and excited."
                },
                {
                  icon: Lightbulb,
                  title: "Understand Potential",
                  description: "Make career aspirants understand their Interest, Aptitude, and Potential."
                },
                {
                  icon: TrendingUp,
                  title: "Explore Job Market",
                  description: "Help career aspirants understand the world of work and current job market trends."
                },
                {
                  icon: Target,
                  title: "Develop Career Alternatives",
                  description: "Assist career aspirants to develop career alternatives based on their potential."
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border-2 border-gray-900 rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Career Preparation */}
            <div className="bg-white border-2 border-gray-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Career Preparation & Development
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
                Assist career aspirants in career preparation and development through hands-on activities, mentorship, and practical guidance tailored to each student's unique strengths and aspirations.
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-700 text-white rounded-3xl p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Unlock Your Child's Potential?
              </h3>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of students who have discovered their true potential through our comprehensive workshop programs.
              </p>
              <button className="bg-white text-blue-700 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg">
                Enroll Today
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

export default StudentsWorkshop;