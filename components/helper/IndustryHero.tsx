"use client";

import Image from "next/image";
import React from "react";

interface IndustryHeroProps {
    backgroundImage: string;
    smallHeader?: string;
    titleHighlight: string;
    titleMain: string;
    description?: string;
    buttonText?: string;
    image?: string;
    gradientFrom?: string;
    gradientTo?: string;
}

export default function IndustryHero({
    backgroundImage,
    smallHeader,
    titleHighlight,
    titleMain,
    description,
    buttonText = "Let's Get Started",
    image,
    gradientFrom = "#8b5cf6",
    gradientTo = "#facc15",
}: IndustryHeroProps) {
    return (
        <section className="relative w-full text-white py-40 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src={backgroundImage}
                    alt="Background"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-[#000655a2]" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">

                {/* Left Section */}
                <div className="flex-1">
                    {smallHeader && (
                        <p className="text-sm text-gray-300 mb-3">{smallHeader}</p>
                    )}

                    <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.15] mb-6 w-[90%] md:w-[70%]">
                        {titleMain}{" "}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
                            }}
                        >
                            {titleHighlight}
                        </span>
                    </h1>


                    {description && (
                        <p className="text-gray-300 text-lg w-[90%] md:w-[70%] mb-10" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
                            {description}
                        </p>
                    )}

                    <button
                        className="px-8 py-3 rounded-full border text-white text-lg font-medium transition-all duration-300 hover:scale-105"
                        style={{
                            borderColor: gradientFrom,
                        }}
                    >
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r"
                            style={{
                                backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
                            }}
                        >
                            {buttonText} →
                        </span>
                    </button>
                </div>

                {/* Right Image */}
                {image && (
                    <div className="flex-1 flex justify-center md:justify-end">
                        <div className="relative w-[400px] h-[350px] md:w-[480px] md:h-[400px]">
                            <Image
                                src={image}
                                alt={titleMain}
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
