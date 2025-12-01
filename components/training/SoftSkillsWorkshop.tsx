/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles, Users, Target, TrendingUp } from "lucide-react";
import Image from "next/image";

const SoftSkillsWorkshop = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="w-full bg-white">
      {/* Hero Image */}
      <div className="w-full mb-12">
        <Image
          src="/images/training/softskill.png"
          alt="Soft Skills Workshop"
          width={1600}
          height={700}
          className="w-full h-auto rounded-3xl"
          priority
        />
      </div>

      {/* Header */}
      <div className="text-center mb-16 px-4">
        <div className="inline-block mb-4 px-6 py-2 bg-purple-100 border-2 border-purple-700 rounded-full">
          <span className="text-purple-700 text-sm font-medium tracking-wider">PROFESSIONAL DEVELOPMENT</span>
        </div>
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-900 mb-2 tracking-tight">
          Soft Skills
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
            { icon: Users, label: "Team Building", value: "100+" },
            { icon: Target, label: "Success Rate", value: "95%" },
            { icon: TrendingUp, label: "Growth", value: "3x" },
            { icon: Sparkles, label: "Industries", value: "20+" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 border-2 border-gray-200 rounded-2xl hover:border-purple-700 transition-all duration-300 hover:shadow-lg">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-700" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Introduction Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-block mb-4 px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              Why Soft Skills Matter
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Beyond Technical Expertise
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg mb-6" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
              The term "soft skills" is a common buzzword that employers and upper
              management often use when it comes to enhancing workplace efficiency
              and hiring new job candidates. But what does it really mean? People
              aren't naturally born with good communication and time management
              skills. These are soft skills that need to be developed and worked
              on over time.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
              Learning Needs provides exhaustive online and in-person soft skills
              training to help develop a positive and productive work culture.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-purple-100 rounded-3xl transform rotate-3" />
            <div className="relative bg-white border-2 border-gray-900 rounded-3xl p-8 shadow-xl">
              <Sparkles className="w-12 h-12 text-purple-700 mb-4" />
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Our Approach
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-purple-700 rounded-full mt-2 flex-shrink-0" />
                  <span>Custom-tailored workshops</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-purple-700 rounded-full mt-2 flex-shrink-0" />
                  <span>Real workplace scenarios</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-purple-700 rounded-full mt-2 flex-shrink-0" />
                  <span>Proven strategies & techniques</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-purple-700 rounded-full mt-2 flex-shrink-0" />
                  <span>Personalized solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Workshop Details */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-12 border-2 border-gray-200">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Our Soft Skills Workshop
          </h3>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
            <p>
              Our soft skills workshops are custom-tailored to the needs of your
              company. We help identify skill gaps and enhance personal,
              interpersonal, communication, conflict resolution, and time
              management abilities.
            </p>
            <p>
              Using real workplace scenarios, our trainers provide proven
              strategies that improve performance and confidence.
            </p>
            <p>
              Since every organization is unique, our workshops focus on your
              specific challenges to deliver personalized solutions.
            </p>
            <p>
              Through guided instruction and participation, your team learns to
              harness strengths, address weaknesses, and work at a higher level of
              effectiveness.
            </p>
            <p>
              A diverse workforce means each person has unique strengths. Our
              training highlights and develops these strengths for organizational
              growth.
            </p>
          </div>
        </div>

        {/* Read More Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowMore(!showMore)}
            className="group inline-flex items-center gap-3 bg-gray-900 text-white font-semibold px-10 py-5 rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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
            
            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Customized Training */}
              <div className="bg-white border-2 border-gray-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-purple-700 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Customized Training
                </h3>
                <p className="text-gray-700 leading-relaxed" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
                  Online soft skills training is essential for the modern workforce,
                  especially for remote and hybrid employees. We provide flexible,
                  custom-tailored soft skills training solutions designed to boost
                  communication, creativity, and collaboration.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4 " style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
                  Our trainers help your team develop naturally strong skills while
                  improving areas where they may need support.
                </p>
              </div>

              {/* Training Programs */}
              <div className="bg-white border-2 border-gray-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-purple-700 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Training Programs
                </h3>
                <p className="text-gray-700 leading-relaxed" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
                  Learning Needs trains companies across all industries and sizes.
                  Whether you're a new or established business, our goal is to help
                  you unlock the full potential of your workforce by developing
                  essential soft skills.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-purple-700 text-white rounded-3xl p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Transform Your Team?
              </h3>
              <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
                Join hundreds of organizations that have elevated their workplace culture through our soft skills training programs.
              </p>
              <button className="bg-white text-purple-700 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg">
                Get Started Today
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

export default SoftSkillsWorkshop;