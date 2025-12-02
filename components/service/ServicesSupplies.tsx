import React from 'react';
import { Laptop, Calendar, Palette, Wrench, Heart, BookOpen, FileText, Watch, Printer, Trophy, Shirt, Sofa, Sparkles } from 'lucide-react';

const ServicesSupplies = () => {
  const services = [
    {
      icon: <Laptop className="w-10 h-10" />,
      title: "IT Service",
      description: "Comprehensive technology solutions for your business needs",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Calendar className="w-10 h-10" />,
      title: "Fair Event Planning",
      description: "Professional planning and execution of exhibitions and events",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Palette className="w-10 h-10" />,
      title: "Interior & Exterior Decor",
      description: "Transform spaces with creative design solutions",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Wrench className="w-10 h-10" />,
      title: "Maintenance Services",
      description: "Reliable upkeep and repair for all your facilities",
      gradient: "from-teal-500 to-emerald-500"
    }
  ];

  const supplies = [
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Healthcare New Arrival",
      description: "Latest medical supplies and healthcare products",
      gradient: "from-rose-500 to-pink-500"
    },
    {
      icon: <BookOpen className="w-10 h-10" />,
      title: "Educational Material",
      description: "Quality learning resources and teaching aids",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <FileText className="w-10 h-10" />,
      title: "Stationary & Notebook",
      description: "Complete range of office and school stationery",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: <Watch className="w-10 h-10" />,
      title: "Accessories",
      description: "Diverse selection of practical accessories",
      gradient: "from-violet-500 to-fuchsia-500"
    },
    {
      icon: <Printer className="w-10 h-10" />,
      title: "Printing Material",
      description: "Professional printing supplies and equipment",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: <Trophy className="w-10 h-10" />,
      title: "Sports & Play Equipment",
      description: "Quality gear for athletics and recreation",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shirt className="w-10 h-10" />,
      title: "Uniform & Shoes",
      description: "Professional attire and footwear solutions",
      gradient: "from-slate-500 to-gray-600"
    },
    {
      icon: <Sofa className="w-10 h-10" />,
      title: "Furniture & Fitting",
      description: "Quality furniture for every space",
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span>Premium Quality Services & Supplies</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 mb-6">
            Our Offerings
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions tailored to meet your business and personal needs with excellence and innovation
          </p>
        </div>

        {/* Services Section */}
        <div className="mb-24">
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-slate-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-200 px-8 py-3 text-4xl font-black text-slate-800">
                Services
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-white overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl" 
                     style={{backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`}}></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className={`bg-gradient-to-br ${item.gradient} p-5 rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supplies Section */}
        <div className="mb-16">
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-slate-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-200 px-8 py-3 text-4xl font-black text-slate-800">
                Supplies
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {supplies.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-white overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className={`bg-gradient-to-br ${item.gradient} p-5 rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 transition-all duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default ServicesSupplies;