'use client'

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

const items = [
    {
        title: "Rahul Singh",
        tag: "C.E.O / Founder",
        image: "/images/about/rahul.jpg",
        description: "Leads the institute with a vision for accessible, career-focused education. Oversees strategy, growth, and student success initiatives.",
    },
    {
        title: "Dr. Anwesha Sengupta",
        tag: "Sr. Advisor",
        image: "/images/about/anwesha.png",
        description: "Drives operational excellence and program development to ensure every program delivers real-world value.",
    },
    {
        title: "Dr. Arunangshu Ghosh",
        tag: "Chief Training Advisor",
        image: "/images/about/aru.jpg",
        description: "Creates engaging learning content and ensures all materials meet quality, clarity, and training standards.",
    },
    {
        title: "Ritu G Chopra",
        tag: "Chief Training Advisor",
        image: "/images/about/ritu.png",
        description: "Works with instructors to refine curriculum accuracy and maintain high educational consistency.",
    },
];

const Team = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="px-6 md:px-12 py-12 bg-gradient-to-b from-white to-gray-100 overflow-hidden">
            {/* Title */}
            <div className="text-center mb-20">
                <h3 className="text-5xl md:text-6xl font-extrabold bg-gray-900 bg-clip-text text-transparent mt-1">
                    Our Team
                </h3>

                <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                    Learning Needs dedicated leadership team is focused on delivering quality service.
                </p>
            </div>

            {/* Grid */}
            <div className="flex flex-col md:flex-row gap-8 mb-2 min-h-[550px]">

                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        animate={{
                            flex:
                                hoveredIndex === null
                                    ? 1
                                    : hoveredIndex === index
                                        ? 1.4
                                        : 0.8,
                        }}
                        transition={{ type: "spring", stiffness: 90, damping: 18 }}
                        className="flex flex-col items-center w-full"
                    >
                        {/* Image */}
                        <div className="relative overflow-hidden rounded-3xl w-full h-80 md:h-96 shadow-lg transition-all duration-700 cursor-pointer bg-gray-200">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 25vw"
                                priority={index < 2}
                                className={`object-cover transition-all duration-700 ${hoveredIndex === index
                                    ? "scale-110 brightness-100"
                                    : "scale-100 brightness-95"
                                    }`}
                                onError={(e) => {
                                    console.error(`Failed to load image: ${item.image}`);
                                    e.currentTarget.style.display = 'none';
                                }}
                            />

                            {/* Overlay Gradient */}
                            <div
                                className={`absolute inset-0 transition-all duration-700 bg-gradient-to-t 
                                ${hoveredIndex === index
                                        ? "from-black/20 via-black/10 to-transparent"
                                        : "from-black/50 via-black/30 to-transparent"
                                    }`}
                            ></div>

                            {/* Tag */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: hoveredIndex === index ? 1 : 0,
                                    y: hoveredIndex === index ? 0 : 20,
                                }}
                                transition={{ duration: 0.4 }}
                                className="absolute bottom-5 left-5 bg-gradient-to-r from-teal-600 to-green-500 text-white px-4 py-2 text-sm md:text-base font-semibold rounded-full shadow-lg tracking-wide"
                            >
                                {item.tag}
                            </motion.div>
                        </div>

                        {/* Title */}
                        <h4
                            className={`mt-6 text-xl md:text-2xl font-semibold text-center tracking-tight transition-all duration-300 
                            ${hoveredIndex === index ? "text-gray-900 scale-105" : "text-gray-600"}
                            `}
                        >
                            {item.title}
                        </h4>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                                opacity: hoveredIndex === index ? 1 : 0,
                                y: hoveredIndex === index ? 0 : 10,
                            }}
                            transition={{ duration: 0.5 }}
                            className="text-center text-gray-700 mt-3 max-w-sm mx-auto leading-relaxed overflow-hidden"
                            style={{
                                height: hoveredIndex === index ? "80px" : "0px",
                            }}
                        >
                            <p>{item.description}</p>
                        </motion.div>

                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Team;