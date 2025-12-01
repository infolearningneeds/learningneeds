import React, { useMemo } from 'react'
import { ArrowRight, Building2, Users, Trophy, Briefcase, Trees, Globe, IceCream } from 'lucide-react'
import Link from "next/link";

const Programs = () => {
  const programs = [
    {
      icon: <Building2 className="w-10 h-10" />,
      title: "School Management Services",
      description:
        "From vision to reality, expert school management guides you through every step of establishing a thriving educational institution.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      link: "/school-management-service",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Training Program",
      description:
        "Bridging the gap. Our inclusive training empowers teachers, engages students, and equips parents to foster a collaborative learning environment.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      link: "/training",
    },
    {
      icon: <Trophy className="w-10 h-10" />,
      title: "Sports Training",
      description:
        "From the classroom to the playing field, our comprehensive training nurtures athletic talent and fosters a love for physical fitness.",
      gradient: "from-green-500 to-teal-500",
      bgGradient: "from-green-50 to-teal-50",
      link: "/sports",
    },
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: "Services",
      description:
        "From essential supplies to expert services, we support schools in creating an inspiring effective learning environment.",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      link: "/school-essentials",
    },
  ];


  // Pre-calculate floating icon positions
  const floatingIcons = useMemo(() => [
    { Icon: Trees, left: 8, top: 10, delay: 0, duration: 20, color: "text-green-400" },
    { Icon: Globe, left: 88, top: 15, delay: 1, duration: 22, color: "text-blue-400" },
    { Icon: IceCream, left: 15, top: 75, delay: 2, duration: 18, color: "text-pink-400" },
    { Icon: Trees, left: 75, top: 70, delay: 1.5, duration: 21, color: "text-emerald-400" },
    { Icon: Globe, left: 92, top: 85, delay: 2.5, duration: 19, color: "text-cyan-400" },
    { Icon: IceCream, left: 10, top: 50, delay: 3, duration: 23, color: "text-rose-400" },
    { Icon: Trees, left: 50, top: 20, delay: 1, duration: 24, color: "text-lime-400" },
    { Icon: Globe, left: 25, top: 30, delay: 2, duration: 20, color: "text-indigo-400" },
    { Icon: IceCream, left: 70, top: 40, delay: 0.5, duration: 22, color: "text-fuchsia-400" },
  ], [])

  return (
    <div className="relative py-20 px-6 bg-gray-100 overflow-hidden">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {floatingIcons.map((item, i) => (
          <div
            key={i}
            className="absolute animate-float-gentle hidden md:block"
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`
            }}
          >
            <item.Icon className={item.color} size={40} />
          </div>
        ))}
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-orange-200 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-yellow-200 rounded-full opacity-30 blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="sparkle-text inline-block px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-sm font-bold mb-4 shadow-lg">
            Our Programs
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Programs</span>
          </h2>
        </div>

        {/* Programs Grid - Modern Design */}
        <div className="grid md:grid-cols-2 gap-6">
          {programs.map((program, index) => (
            <div
              key={index}
              className="group relative overflow-hidden"
            >
              {/* Main Container */}
              <div
                className={`relative h-full bg-gradient-to-br ${program.bgGradient} p-8 md:p-10 transition-all duration-500 hover:scale-[1.02] rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.15)]`}>

                {/* Content Wrapper */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className={`inline-flex w-20 h-20 bg-gradient-to-br ${program.gradient} items-center justify-center text-white mb-6 group-hover:scale-110 transition-all duration-500 shadow-xl`}>
                    {program.icon}
                  </div>

                  {/* Text Content */}
                  <div className="flex-grow">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {program.title}
                    </h3>

                    <p className="text-gray-700 leading-relaxed mb-6">
                      {program.description}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <Link href={program.link} className="flex items-center gap-2 group/link">
                    <span className={`font-bold text-lg bg-linear-to-r ${program.gradient} bg-clip-text text-transparent`}>
                      Read More
                    </span>
                    <ArrowRight
                      className={`w-5 h-5 bg-linear-to-r ${program.gradient} bg-clip-text text-transparent group-hover/link:translate-x-2 transition-transform duration-300`}
                    />
                  </Link>

                </div>

                {/* Decorative Background Element */}
                <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl ${program.gradient} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes float-gentle {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(15px, -15px) rotate(5deg);
          }
          50% {
            transform: translate(0, -25px) rotate(0deg);
          }
          75% {
            transform: translate(-15px, -15px) rotate(-5deg);
          }
        }
        
        .animate-float-gentle {
          animation: float-gentle 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Programs