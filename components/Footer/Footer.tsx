'use client'

import React, { useState } from 'react';
import { Package, Award, Tag, Lock, Facebook, Twitter, Instagram, MessageCircle, Youtube, Mail, Phone, ArrowRight, Sparkles } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleSubscribe = () => {
    if (email && email.includes('@')) {
      alert('Thank you for subscribing!');
      setEmail('');
    } else {
      alert('Please enter a valid email address');
    }
  };

  const features = [
    {
      icon: Package,
      title: 'Express Delivery',
      desc: 'Ships in 24 Hours',
      bgColor: 'bg-blue-100',
      hoverColor: 'hover:bg-blue-200',
      shadowColor: 'shadow-blue-300/50'
    },
    {
      icon: Award,
      title: 'Brand Warranty',
      desc: 'Original products',
      bgColor: 'bg-pink-100',
      hoverColor: 'hover:bg-pink-200',
      shadowColor: 'shadow-pink-300/50'
    },
    {
      icon: Tag,
      title: 'Exciting Deals',
      desc: 'All prepaid orders',
      bgColor: 'bg-teal-100',
      hoverColor: 'hover:bg-teal-200',
      shadowColor: 'shadow-teal-300/50'
    },
    {
      icon: Lock,
      title: 'Secure Payment',
      desc: 'Secure certificate',
      bgColor: 'bg-emerald-100',
      hoverColor: 'hover:bg-emerald-200',
      shadowColor: 'shadow-emerald-300/50'
    }
  ];


  const helpLinks = ['Track Order', 'FAQs', 'Cancel Order', 'Return Order', 'Warranty Info'];
  const policyLinks = ['Return Policy', 'Security', 'Sitemap', 'Privacy Policy', 'T&C'];
  const companyLinks = ['About Us', 'Contact Us', 'Service Centres', 'Work With Us', 'Courses'];

  return (
    <footer className="relative overflow-hidden bg-blue-950">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-800 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-orange-600 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-red-500">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Let&lsquo;s Change, Learn,<br />
                Grow & Transform!
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/95 leading-relaxed max-w-2xl mx-auto lg:mx-0" style={{
                textAlign: 'justify',
                textJustify: 'inter-word',
                hyphens: 'auto',
                wordSpacing: 'normal'
              }}>
                Learning Needs offers variety of boutique services, tailored to each client&lsquo;s need. Our specialized expertise allows the Individual, Institution, Schools, and Organizations to achieve their objectives.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button className="group relative bg-blue-950 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:bg-blue-900 transition-all duration-300 hover:scale-105">
                <span className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards - 2x2 grid on mobile, 4x1 on larger screens */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative group cursor-pointer transition-all duration-500 ${hoveredCard === index ? "scale-105 z-10" : ""
                }`}
            >
              {/* Background */}
              <div
                className={`absolute inset-0 rounded-xl sm:rounded-2xl transition-all duration-300 
            ${feature.bgColor} 
            ${hoveredCard === index ? `${feature.hoverColor} shadow-2xl ${feature.shadowColor}` : ""}
          `}
              />

              {/* Content */}
              <div className="relative rounded-xl sm:rounded-2xl p-4 sm:p-6 transform transition-transform duration-300">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">

                  {/* Icon */}
                  <div className="bg-black/5 p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <feature.icon className="w-5 h-5 sm:w-7 sm:h-7 text-gray-700" />
                  </div>

                  {/* Text */}
                  <div>
                    <h4 className="font-bold text-sm sm:text-base lg:text-lg text-gray-900 mb-0.5 sm:mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-700/80">
                      {feature.desc}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Main Content */}
      <div className="relative w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-4">
            <div className="mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 flex items-center gap-2">
                <span className="text-orange-500">Learning</span>
                <span className="text-white">Needs</span>
              </h3>
              <p className="text-blue-200 text-sm leading-relaxed">
                Driving the power of education to reach new heights. Empowering learners worldwide with innovative solutions.
              </p>
            </div>

            {/* Contact Info */}
            <div className="mb-6 sm:mb-0">
              <h4 className="text-orange-500 font-bold text-base sm:text-lg mb-4 sm:mb-6">Contact</h4>
              <div className="space-y-3 sm:space-y-4">
                <a href="mailto:infolearningneeds@gmail.com" className="flex items-start gap-3 text-blue-200 hover:text-orange-500 transition-colors group">
                  <div className="bg-orange-500/10 p-2 rounded-lg group-hover:bg-orange-500 transition-colors flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm leading-relaxed break-all mt-1">infolearningneeds@gmail.com</span>
                </a>
                <a href="tel:8240554890" className="flex items-center gap-3 text-blue-200 hover:text-orange-500 transition-colors group">
                  <div className="bg-orange-500/10 p-2 rounded-lg group-hover:bg-orange-500 transition-colors flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm mt-1">8240554890</span>
                </a>
              </div>
            </div>
          </div>

          {/* Links Sections - 2x2 on mobile, row on desktop */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-2">
            <h4 className="text-orange-500 font-bold text-base sm:text-lg mb-4 sm:mb-6">Help</h4>
            <ul className="space-y-2 sm:space-y-3">
              {helpLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-blue-200 hover:text-orange-500 hover:translate-x-2 inline-block transition-all duration-300 flex items-center gap-2 group text-sm sm:text-base">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 sm:col-span-1 lg:col-span-2">
            <h4 className="text-orange-500 font-bold text-base sm:text-lg mb-4 sm:mb-6">Policies</h4>
            <ul className="space-y-2 sm:space-y-3">
              {policyLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-blue-200 hover:text-orange-500 hover:translate-x-2 inline-block transition-all duration-300 flex items-center gap-2 group text-sm sm:text-base">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 sm:col-span-1 lg:col-span-2">
            <h4 className="text-orange-500 font-bold text-base sm:text-lg mb-4 sm:mb-6">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-blue-200 hover:text-orange-500 hover:translate-x-2 inline-block transition-all duration-300 flex items-center gap-2 group text-sm sm:text-base">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <div className="transition-all duration-300">
              <h4 className="text-orange-500 font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                Newsletter
              </h4>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl bg-blue-950 border border-blue-800 text-white placeholder-blue-400 focus:outline-none focus:border-orange-500 transition-all"
                />
                <p className="text-xs text-blue-300">
                  By subscribing, you agree to our Terms & Conditions
                </p>
                <button
                  onClick={handleSubscribe}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50 hover:scale-105"
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-blue-300 text-sm sm:text-base mb-3 sm:mb-4">Get connected with us on social networks:</p>
              <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3">
                {[
                  { Icon: Facebook },
                  { Icon: Twitter },
                  { Icon: Instagram },
                  { Icon: MessageCircle },
                  { Icon: Youtube }
                ].map(({ Icon }, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-900 flex items-center justify-center text-blue-300 hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/50"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                ))}
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-blue-300 text-xs sm:text-sm">
                © 2025 <span className="text-orange-500 font-semibold">Learning Needs</span>. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;