import React, { useMemo } from 'react'
import Image from 'next/image'
import { ArrowRight, Phone, Globe, Car, Rocket, Award, Target, TrendingUp, Zap, Users } from 'lucide-react'

const Services = () => {
  const services = [
    { title: "Leadership Development", icon: <Users className="w-5 h-5" /> },
    { title: "Process Optimization", icon: <Target className="w-5 h-5" /> },
    { title: "Ongoing Support", icon: <Rocket className="w-5 h-5" /> },
    { title: "Cost Efficiency", icon: <Award className="w-5 h-5" /> }
  ]

  // Pre-calculate positions for floating particles
  const floatingParticles = useMemo(() => [
    { Icon: Globe, left: 10, top: 15, delay: 0, scale: 1.2 },
    { Icon: Car, left: 85, top: 25, delay: 1.5, scale: 1 },
    { Icon: Rocket, left: 20, top: 75, delay: 3, scale: 0.8 },
    { Icon: Award, left: 75, top: 65, delay: 2, scale: 1.1 },
    { Icon: Zap, left: 45, top: 35, delay: 1, scale: 0.9 },
    { Icon: Globe, left: 90, top: 85, delay: 2.5, scale: 1.3 },
  ], [])

  return (
    <div className="relative min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden flex items-center">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingParticles.map((particle, i) => (
          <div
            key={i}
            className="absolute animate-particle opacity-10 hidden lg:block"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              transform: `scale(${particle.scale})`
            }}
          >
            <particle.Icon className="text-blue-600" size={32} />
          </div>
        ))}
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-10 sm:top-20 right-10 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 sm:bottom-20 left-10 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-orange-200 rounded-full opacity-30 blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Side - Image with 3D Card Effect */}
          <div className="relative group order-2 lg:order-1">
            {/* Decorative Elements Behind Image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-orange-400 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            
            <div className="relative">
              {/* Main Image Card */}
              <div className="relative h-[400px] sm:h-[500px] md:h-[600px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02]">
                <Image
                  src="/images/service.jpg"
                  alt="Business Success"
                  fill
                  className="object-cover"
                  priority
                  quality={90}
                />
              </div>

              {/* Floating Glass Cards */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white/95 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border-2 border-blue-200 shadow-xl animate-float">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-base sm:text-lg">500+</p>
                    <p className="text-gray-600 text-xs sm:text-sm">Global Clients</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-white/95 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border-2 border-orange-200 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-base sm:text-lg">98%</p>
                    <p className="text-gray-600 text-xs sm:text-sm">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="text-gray-900 space-y-6 sm:space-y-8 order-1 lg:order-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-100 border-2 border-blue-300 rounded-full">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-blue-700 font-semibold text-xs sm:text-sm tracking-wide">SIMPLY THE BEST</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Our Services
              <br />
              <span className="text-blue-600 sparkle-text">
                Help You Succeed
              </span>
              <br />
              in Business
            </h2>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 py-4">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="group relative p-4 sm:p-5 rounded-2xl bg-white border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 font-medium text-sm sm:text-base transition-colors">
                      {service.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
              <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm sm:text-base">
                <span className="relative z-10 flex items-center gap-2">
                  Explore More
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <a 
                href="tel:+918240554890"
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-xl font-bold border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm sm:text-base"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
                Call Us Now
              </a>
            </div>

            {/* Phone Number */}
            <div className="relative inline-block pt-2">
              <a 
                href="tel:+918240554890" 
                className="relative block text-2xl sm:text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-300"
              >
                +91 82405-54890
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes particle {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(30px, -30px) rotate(90deg);
          }
          50% {
            transform: translate(0, -60px) rotate(180deg);
          }
          75% {
            transform: translate(-30px, -30px) rotate(270deg);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-particle {
          animation: particle 25s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Services