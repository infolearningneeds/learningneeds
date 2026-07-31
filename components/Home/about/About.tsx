import React from 'react'
import { Sparkles, Users, BookOpen, TrendingUp, Award, ArrowRight } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Leadership Training",
      description: "Empowering leaders to inspire and transform their teams",
      gradient: "from-blue-50 to-cyan-50",
      iconGradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "School Consulting",
      description: "Expert guidance for educational excellence and growth",
      gradient: "from-purple-50 to-pink-50",
      iconGradient: "from-purple-500 to-pink-600"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Teacher Training",
      description: "Developing educators who shape future generations",
      gradient: "from-emerald-50 to-teal-50",
      iconGradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "School Startup",
      description: "Complete support for launching successful institutions",
      gradient: "from-orange-50 to-amber-50",
      iconGradient: "from-orange-500 to-amber-600"
    }
  ]

  return (
    <div className="relative py-20 px-6 overflow-hidden bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-200 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="sparkle-text text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500">Learning Needs</span>
          </h1>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 mb-12 border border-gray-100">
          <div className="grid lg:grid-cols-1 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="mb-6">
                <div className="inline-block px-4 py-2 bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-lg text-lg font-bold mb-4 shadow-lg">
                  Necessity is the Mother of Invention
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-6" style={{
                                textAlign: 'justify',
                                textJustify: 'inter-word',
                                hyphens: 'auto',
                                wordSpacing: 'normal'
                            }}>
                This proverb perfectly defines the inception of Learning Needs. We believe all companies have one thing in common - they survive and thrive by creating and maintaining satisfied customers through their people.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-8" style={{
                                textAlign: 'justify',
                                textJustify: 'inter-word',
                                hyphens: 'auto',
                                wordSpacing: 'normal'
                            }}>
                The Learning Needs understands the importance of awakening, developing, and rewarding the greatness of a company&lsquo;s people through transformation. With our experience and expertise in leadership training, school consulting, teachers training, school start up, and Learning Needs customized product, we help organization to achieve their goals.
              </p>

              <button className="group px-8 py-4 bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                Join Us Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>


          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-br ${feature.gradient} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100`}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.iconGradient} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About