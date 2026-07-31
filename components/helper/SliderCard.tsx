// components/SliderCard.tsx
import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  name: string;
  designation: string;
  review: string;
};

const SliderCard = ({ image, name, designation, review }: Props) => {
  return (
    <div className="group relative bg-white p-4 sm:p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 w-full text-center border border-gray-200 h-full flex flex-col">

      {/* Decorative accent (light blue gradient) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Profile Image */}
      <div className="relative inline-block">
        <Image
          src={image}
          alt={name}
          width={96}
          height={96}
          className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full mx-auto object-cover ring-2 ring-gray-200 shadow-md"
        />
      </div>

      {/* Name */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-5 md:mt-6 text-gray-900 group-hover:text-blue-600 transition-all duration-300">
        {name}
      </h2>

      {/* Designation */}
      <p className="text-xs sm:text-sm font-medium text-gray-500 mt-1">
        {designation}
      </p>

      {/* Quote Icon */}
      <div className="mt-4 sm:mt-5 mb-3">
        <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-gray-300 group-hover:text-blue-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed italic flex-grow" style={{
        textAlign: 'justify',
        textJustify: 'inter-word',
        hyphens: 'auto',
        wordSpacing: 'normal'
      }}>
        {review}
      </p>

      {/* Stars - stuck to bottom */}
      <div className="mt-4 sm:mt-5 flex justify-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default SliderCard;
