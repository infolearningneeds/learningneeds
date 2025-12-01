/* eslint-disable react-hooks/purity */
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, BookOpen, Sparkles, Star, Palette, GraduationCap, Lightbulb, Rocket, Award, Heart, Zap, Crown, Target, TrendingUp } from 'lucide-react';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const slides = [
        {
            title: "Empowering Kids With Smart Education",
            subtitle: "Adventure awaits in every page",
            description: "Innovative learning solutions designed to boost creativity, critical thinking, and academic success",
            image: "/images/hero1.png"
        },
        {
            title: "Simplify Education with School Management",
            subtitle: "Expert guidance for every child",
            description: "Comprehensive tools to streamline school operations, enhance efficiency, and support student success",
            image: "/images/hero4.png"
        },
        {
            title: "Training for Teachers, Parents, and Students",
            subtitle: "Building bright futures",
            description: "Up to 50% Off",
            image: "/images/hero3.png"
        }
    ];

    const floatingIcons = [
        { Icon: BookOpen, color: "text-yellow-400" },
        { Icon: Sparkles, color: "text-blue-400" },
        { Icon: Star, color: "text-yellow-300" },
        { Icon: Palette, color: "text-pink-400" },
        { Icon: GraduationCap, color: "text-cyan-400" },
        { Icon: Lightbulb, color: "text-yellow-400" },
        { Icon: Rocket, color: "text-purple-400" },
        { Icon: Award, color: "text-green-400" },
        { Icon: Heart, color: "text-red-400" },
        { Icon: Zap, color: "text-yellow-300" },
        { Icon: Crown, color: "text-amber-400" },
        { Icon: Target, color: "text-blue-400" },
        { Icon: TrendingUp, color: "text-green-400" },
        { Icon: BookOpen, color: "text-cyan-300" },
        { Icon: Star, color: "text-pink-300" }
    ];

    const randomShapes = useMemo(() => {
        return Array.from({ length: 20 }, (_, i) => ({
            id: i,
            size: Math.random() * 200 + 100,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 15,
            opacity: Math.random() * 0.15 + 0.05,
            type: Math.random() > 0.5 ? 'circle' : 'blob'
        }));
    }, []);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, slides.length]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
            {/* Fixed Background Layer - Stays constant */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950" />

            {/* Random Animated Shapes - Fixed Background */}
            <div className="absolute inset-0 overflow-hidden">
                {randomShapes.map((shape) => (
                    <div
                        key={shape.id}
                        className={`absolute ${shape.type === 'circle' ? 'rounded-full' : 'magicpattern animate-blob'
                            }`}
                        style={{
                            width: `${shape.size}px`,
                            height: `${shape.size}px`,
                            left: `${shape.left}%`,
                            top: `${shape.top}%`,
                            opacity: shape.opacity,
                            filter: 'blur(40px)',
                            animation: `float-random ${shape.duration}s ease-in-out infinite`,
                            animationDelay: `${shape.delay}s`
                        }}
                    />
                ))}
            </div>

            {/* Floating Icon Elements - Fixed Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {floatingIcons.map((item, i) => {
                    const { Icon, color } = item;
                    const iconLeft = (i * 7.3) % 100;
                    const iconTop = (i * 13.7) % 100;
                    const iconSize = 24 + (i % 5) * 4;
                    const floatDuration = 10 + (i % 6) * 2.5;
                    const floatDelay = (i % 5);

                    return (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${iconLeft}%`,
                                top: `${iconTop}%`,
                                animation: `float ${floatDuration}s ease-in-out infinite`,
                                animationDelay: `${floatDelay}s`
                            }}
                        >
                            <Icon className={`${color} opacity-30`} size={iconSize} />
                        </div>
                    );
                })}
            </div>

            {/* Slides Container - Only content transitions */}
            <div className="relative w-full h-full">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide
                            ? 'opacity-100 z-10'
                            : 'opacity-0 z-0 pointer-events-none'
                            }`}
                    >
                        {/* Content - New Layout */}
                        <div className="relative z-10 h-full flex items-center pt-20 md:pt-24 lg:pt-0">
                            <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                                    {/* Text Content - Takes 6 columns */}
                                    <div className={`lg:col-span-6 text-center lg:text-left transition-all duration-700 ${index === currentSlide
                                        ? 'translate-x-0 opacity-100'
                                        : '-translate-x-10 opacity-0'
                                        }`}>
                                        <div className="mb-4 inline-block px-4 py-1.5 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-full text-xs font-bold shadow-xl animate-pulse">
                                            {slide.subtitle}
                                        </div>
                                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight text-white drop-shadow-2xl">
                                            {slide.title}
                                        </h1>
                                        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed font-medium">
                                            {slide.description}
                                        </p>
                                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                            <button className="px-8 py-3.5 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-all hover:scale-105 hover:shadow-2xl shadow-lg text-base">
                                                Explore Books
                                            </button>
                                            <button className="px-8 py-3.5 bg-white text-orange-600 rounded-lg font-bold hover:bg-gray-50 transition-all shadow-lg border-2 border-orange-600 hover:scale-105 hover:shadow-2xl text-base">
                                                Book Consultation
                                            </button>
                                        </div>
                                    </div>

                                    {/* Image Content - Creative Layered Design - Takes 6 columns */}
                                    <div className={`lg:col-span-6 hidden lg:block transition-all duration-700 ${index === currentSlide
                                        ? 'translate-x-0 opacity-100'
                                        : 'translate-x-10 opacity-0'
                                        }`}>
                                        <div className="relative h-[500px] lg:h-[600px] w-full">
                                            {/* Main Image Container with 3D Perspective */}
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[85%] h-[85%]">
                                                {/* Main Image */}
                                                <div className="relative w-full h-full bg-white/75
 rounded-3xl overflow-hidden 
shadow-[0_10px_20px_rgba(0,0,0,0.4),0_20px_40px_rgba(0,0,0,0.25)]
hover:scale-105 transition-transform duration-700">


                                                    <Image
                                                        src={slide.image}
                                                        alt={slide.title}
                                                        fill
                                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                                        className="object-cover"
                                                        priority={index === 0}
                                                        quality={90}
                                                    />
                                                </div>
                                            </div>

                                            {/* Decorative Elements */}
                                            {/* Small accent cards */}
                                            <div className="absolute top-20 right-[-30px] w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 flex items-center justify-center animate-float">
                                                <Star className="text-yellow-400 w-12 h-12" />
                                            </div>
                                            <div className="absolute bottom-20 left-10 w-28 h-28 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 flex items-center justify-center animate-float-delayed">
                                                <Rocket className="text-orange-400 w-14 h-14" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-2 md:left-4 lg:left-8 bottom-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-20 p-2 md:p-3 lg:p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all shadow-2xl hover:scale-110 group border border-white/30"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 lg:right-8 bottom-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-20 p-2 md:p-3 lg:p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all shadow-2xl hover:scale-110 group border border-white/30"
                aria-label="Next slide"
            >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all ${index === currentSlide
                            ? 'w-12 bg-orange-500 shadow-lg shadow-orange-500/50'
                            : 'w-3 bg-white/40 hover:bg-white/60'
                            } h-3 rounded-full`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            <style>{`
                .magicpattern { 
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center center;
                    background-repeat: repeat;
                    background-image: url("data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3ClinearGradient id=%22b%22 gradientTransform=%22rotate(-45 .5 .5)%22%3E%3Cstop offset=%220%25%22 stop-color=%22%23F54A00%22%2F%3E%3Cstop offset=%22100%25%22 stop-color=%22%23ebecf8%22%2F%3E%3C%2FlinearGradient%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M750 750q-250 250-500 0t0-500q250-250 500 0t0 500Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22url(%23b)%22 d=%22M750 750q-250 250-500 0t0-500q250-250 500 0t0 500Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) translateX(0) rotate(0deg);
                    }
                    25% {
                        transform: translateY(-20px) translateX(10px) rotate(5deg);
                    }
                    50% {
                        transform: translateY(-30px) translateX(-10px) rotate(-5deg);
                    }
                    75% {
                        transform: translateY(-15px) translateX(5px) rotate(3deg);
                    }
                }
                
                @keyframes float-random {
                    0%, 100% {
                        transform: translate(0, 0) rotate(0deg) scale(1);
                    }
                    25% {
                        transform: translate(30px, -40px) rotate(90deg) scale(1.1);
                    }
                    50% {
                        transform: translate(-20px, -60px) rotate(180deg) scale(0.9);
                    }
                    75% {
                        transform: translate(40px, -30px) rotate(270deg) scale(1.05);
                    }
                }
                
                @keyframes blob {
                    0%, 100% {
                        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
                    }
                    25% {
                        border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
                    }
                    50% {
                        border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
                    }
                    75% {
                        border-radius: 60% 40% 60% 40% / 70% 30% 50% 60%;
                    }
                }
                
                .animate-blob {
                    animation: blob 8s ease-in-out infinite;
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-float-delayed {
                    animation: float 6s ease-in-out infinite;
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
};

export default Hero;