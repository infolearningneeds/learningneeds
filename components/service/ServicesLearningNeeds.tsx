/* eslint-disable react/no-unescaped-entities */
'use client'
import React from 'react';
import Image from 'next/image';
import { Handshake, DollarSign, Shield, TrendingUp, FileCheck, Laptop, Users, Award, Target, Lightbulb, Rocket, Globe, Settings, CheckCircle, Star, Briefcase } from 'lucide-react';

const ServicesLearningNeeds: React.FC = () => {
  const floatingIcons = [
    { Icon: Handshake, top: '8%', left: '5%', delay: '0s', duration: '7s', color: 'text-blue-300' },
    { Icon: DollarSign, top: '15%', right: '8%', delay: '1s', duration: '8s', color: 'text-green-300' },
    { Icon: Shield, top: '65%', left: '4%', delay: '2s', duration: '6.5s', color: 'text-purple-300' },
    { Icon: Award, top: '80%', right: '12%', delay: '0.5s', duration: '7.5s', color: 'text-yellow-300' },
    { Icon: Target, top: '30%', left: '8%', delay: '1.5s', duration: '8s', color: 'text-red-300' },
    { Icon: Lightbulb, top: '50%', right: '6%', delay: '2.5s', duration: '6s', color: 'text-orange-300' },
    { Icon: Rocket, top: '88%', left: '10%', delay: '1s', duration: '7s', color: 'text-indigo-300' },
    { Icon: Globe, top: '12%', left: '18%', delay: '2s', duration: '7.5s', color: 'text-pink-300' },
    { Icon: Settings, top: '72%', right: '18%', delay: '0.5s', duration: '6.5s', color: 'text-teal-300' },
    { Icon: CheckCircle, top: '55%', left: '12%', delay: '1.5s', duration: '8s', color: 'text-cyan-300' },
    { Icon: Star, top: '40%', right: '10%', delay: '0.8s', duration: '7s', color: 'text-violet-300' },
    { Icon: Briefcase, top: '25%', left: '15%', delay: '1.8s', duration: '6.8s', color: 'text-rose-300' },
    { Icon: Users, top: '60%', right: '15%', delay: '1.2s', duration: '7.2s', color: 'text-emerald-300' },
    { Icon: TrendingUp, top: '20%', right: '20%', delay: '2.2s', duration: '6.3s', color: 'text-lime-300' },
    { Icon: FileCheck, top: '75%', left: '20%', delay: '0.7s', duration: '7.7s', color: 'text-amber-300' },
  ];

  const keyServices = [
    {
      icon: Handshake,
      title: 'Vendor Management',
      description: 'Selecting partners, negotiating contracts, controlling costs, reducing risks, and ensuring smooth service delivery',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Laptop,
      title: 'School Consultancy',
      description: 'Streamlining tasks from accounting to complex projects, software solutions, and digital transformation management',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Users,
      title: 'Operational Excellence',
      description: 'Understanding ethos, values, and day-to-day operations with respect for your school\'s unique environment',
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-200 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((item, index) => {
          const { Icon, top, left, right, delay, duration, color } = item;
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
              <Icon className={`w-16 h-16 ${color}`} strokeWidth={1.5} />
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-sm font-bold shadow-xl uppercase tracking-wide">
              Professional Excellence
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Services of Learning Needs
          </h1>
          <p className="text-2xl font-semibold text-blue-600 mb-8">
            Our services help you succeed in business
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12 animate-slide-up">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-6 " style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
              Learning Needs actively works with various reliable preferred associates from different walks of life. This exercise ensures <span className="font-semibold text-blue-600">durable, timely and quality supply</span> of school needs at reasonable price.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
              <span className="font-semibold text-purple-600">Vendor management</span> includes activities such as selecting the right partners, negotiating contracts, controlling costs, reducing vendor-related risks and ensuring smooth service delivery.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
              We provide the <span className="font-semibold text-green-600">school consultancy services</span> needed to streamline and systematize various tasks, from period accounting to complex and sensitive whole-school projects, guidance on the best software solutions for your administration or a project manager to lead a school's digital transformation.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
              The Learning Needs team has worked with <span className="font-semibold text-orange-600">hundreds of schools</span>, and we have a deep respect for how ethos and values impact the day-to-day operations within a school. We understand that there are many moving parts, roles, and responsibilities to running a successful school operation.
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-l-4 border-blue-600 mt-8">
              <p className="text-gray-800 text-xl font-semibold italic">
                If you feel like you've gotten off track, why not trust the experts to help you get back on the road to success?
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="relative group max-w-5xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02]">
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src="/images/school/service.png"
                  alt="Learning Needs Services"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Decorative corner accents */}
              <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>

        {/* Key Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {keyServices.map((service, index) => (
            <div
              key={index}
              className="group relative animate-scale-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 h-full">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
                  {service.description}
                </p>

                {/* Bottom gradient line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-bold mb-2">100+</div>
            <div className="text-blue-100 font-semibold">Schools Served</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white text-center shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-purple-100 font-semibold">Projects Completed</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white text-center shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-bold mb-2">100%</div>
            <div className="text-green-100 font-semibold">Client Satisfaction</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white text-center shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-orange-100 font-semibold">Support Available</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-scale-in" style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your School?
            </h3>
            <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
              Let our experienced team guide you to operational excellence and sustainable success
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Schedule a Consultation
              </button>
              <button className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Decorative dots */}
        <div className="mt-12 flex justify-center gap-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
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

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
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
            transform: translateY(-25px) translateX(15px) rotate(8deg);
          }
          50% {
            transform: translateY(-15px) translateX(-15px) rotate(-8deg);
          }
          75% {
            transform: translateY(-35px) translateX(10px) rotate(5deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }

        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ServicesLearningNeeds;