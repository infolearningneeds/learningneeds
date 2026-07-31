import React from 'react';
import { Presentation } from 'lucide-react';
import Image from 'next/image';

const Deliver = () => {
  return (
    <div className="w-full bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-purple-100 px-6 py-3 rounded-full border-2 border-purple-700 mb-6">
            <Presentation className="w-5 h-5 text-purple-700" />
            <span className="text-purple-700 font-semibold tracking-wider">OUR METHODOLOGY</span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-4 leading-tight">
            Way We <span className="text-purple-700">Deliver</span>
          </h2>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-700">
            Our Sessions
          </h3>
        </div>

        {/* Main Image Container */}
        <div className="relative group">
          {/* Decorative Background */}
          <div className="absolute -inset-6 bg-purple-100 rounded-3xl transform rotate-1 opacity-50 group-hover:rotate-2 transition-transform duration-300"></div>
          
          {/* Image Container */}
          <div className="relative bg-white border-4 border-gray-900 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/training/deliver.png"
              alt="Way we deliver our sessions"
              width={1600}
              height={900}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-700 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-700 rounded-full opacity-20 blur-xl"></div>
        </div>

      </div>
    </div>
  );
};

export default Deliver;