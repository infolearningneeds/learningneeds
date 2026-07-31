'use client'

import Image from "next/image";
import { Suspense } from "react";
import {
    FaStar,
    FaGlobeAmericas,
    FaComments,
    FaLightbulb,
    FaUsers,
} from "react-icons/fa";
import Tilt from 'react-parallax-tilt'
const TeamMessage = () => {
    return (
        <div className="bg-linear-to-br from-[#043B93] via-[#0551B5] to-[#0a2d5f] text-white px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden shadow-2xl">

            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-blue-400 rounded-full blur-3xl -top-32 sm:-top-40 md:-top-48 -left-32 sm:-left-40 md:-left-48 animate-pulse" />
                <div className="absolute w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80 bg-cyan-300 rounded-full blur-3xl top-1/2 left-1/4 animate-pulse hidden sm:block animation-delay-1500" />
                <div className="absolute w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-blue-300 rounded-full blur-3xl -bottom-32 sm:-bottom-40 md:-bottom-48 -right-32 sm:-right-40 md:-right-48 animate-pulse animation-delay-1000" />
            </div>

            {/* Decorative Grid Pattern */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}
            />

            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center relative max-w-7xl mx-auto">

                {/* LEFT SECTION */}
                <div className="relative">

                    {/* Decorative Animated Icons - Distributed */}
                    <Suspense fallback={<div>Loading...</div>}>
                        {/* Left Side Icons */}
                        <FaStar
                            className="absolute text-yellow-300 text-2xl sm:text-3xl md:text-4xl -top-6 sm:-top-8 md:-top-10 -left-2 sm:-left-3 md:-left-4 opacity-80 animate-bounce drop-shadow-lg animation-duration-3000"
                        />
                        <FaLightbulb
                            className="absolute text-yellow-200/60 text-3xl sm:text-4xl md:text-5xl top-24 sm:top-28 md:top-32 -left-4 sm:-left-6 md:-left-8 icon-float hidden sm:block animation-delay-500"
                        />

                        {/* Right Side Icons */}
                        <FaGlobeAmericas
                            className="absolute text-cyan-200/50 text-5xl sm:text-6xl md:text-7xl -bottom-8 sm:-bottom-10 md:-bottom-12 -right-8 sm:-right-10 md:-right-12 icon-spin-slow drop-shadow-xl"
                        />
                        <FaComments
                            className="absolute text-blue-200/40 text-3xl sm:text-4xl md:text-5xl top-1/4 -right-6 sm:-right-8 md:-right-12 animate-pulse hidden sm:block animation-duration-2500"
                        />
                        <FaUsers
                            className="absolute text-white/30 text-2xl sm:text-3xl md:text-4xl bottom-16 sm:bottom-20 -right-4 sm:-right-6 md:-right-8 icon-float hidden md:block animation-delay-1000 animation-duration-5000"
                        />
                    </Suspense>

                    {/* Content */}
                    <div className="relative z-10">


                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight">
                            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-lg">
                                Team Message
                            </span>
                        </h1>

                        <div className="space-y-4 sm:space-y-5 md:space-y-6" >
                            <p className="text-blue-50/90 leading-relaxed text-sm sm:text-base md:text-lg" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
                                We share an enthusiasm for the kind of great learning made possible
                                by skillful and committed training. Specializing in school startup
                                and development projects, we work as a team to provide a full range
                                of personalized advice and training to our clients.
                            </p>

                            <p className="text-blue-50/90 leading-relaxed text-sm sm:text-base md:text-lg" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
                                Our team is fluent in the languages of strategy, business performance,
                                leadership, and interpersonal dynamics. We have worked extensively
                                with large and small organizations and schools, both as leaders and
                                as senior-level consultants brought in to rethink strategy, redesign
                                structure, amplify execution, and catalyze change.
                            </p>

                            <p className="text-blue-50/90 leading-relaxed text-sm sm:text-base md:text-lg" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
                                Our job is to mobilize our clients&lsquo; internal capacities to create change that is
                                lasting and meaningful. <span className="text-yellow-200 font-semibold">With all the best wishes!</span>
                            </p>
                        </div>

                        <div className="mt-6 sm:mt-8 inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl border border-white/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse flex-shrink-0" />
                            <p className="font-bold text-sm sm:text-base md:text-lg text-white">
                                Team Learning Needs - We facilitate transformation
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SECTION – Chat Icon */}
                <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
                    <div className="relative group">
                        {/* Multiple Glow Layers */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 opacity-20 blur-3xl rounded-full animate-pulse group-hover:opacity-40 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 to-blue-400 opacity-10 blur-2xl rounded-full animate-pulse hidden sm:block animation-delay-1000" />

                        {/* Orbital Ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-300/20 icon-spin-very-slow hidden md:block" />

                        {/* Floating Animation Container */}
                        <div className="icon-float-slow relative">
                            <div className="relative bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl group-hover:border-cyan-300/50 transition-all duration-500">
                                {/* Placeholder for Image */}
                                <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-300/30 to-cyan-300/30 rounded-xl sm:rounded-2xl flex items-center justify-center">
                                    <Tilt>
                                        <Image
                                            src="/images/teammain.png"
                                            alt="Team Message"
                                            width={220}
                                            height={220}
                                        />
                                    </Tilt>
                                </div>
                            </div>

                            {/* Floating Particles */}
                            <div className="absolute -top-2 sm:-top-3 md:-top-4 -right-2 sm:-right-3 md:-right-4 w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 bg-yellow-300/60 rounded-full blur-sm animate-bounce animation-duration-2000 animation-delay-300" />
                            <div className="absolute -bottom-3 sm:-bottom-4 md:-bottom-6 -left-3 sm:-left-4 md:-left-6 w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 bg-cyan-300/60 rounded-full blur-sm animate-bounce animation-duration-2500 animation-delay-800" />
                        </div>
                    </div>
                </div>

            </div>

            {/* Inline styles for custom animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes icon-float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(5deg);
                    }
                }

                @keyframes icon-float-slow {
                    0%, 100% {
                        transform: translateY(0px) scale(1);
                    }
                    50% {
                        transform: translateY(-20px) scale(1.02);
                    }
                }

                @keyframes icon-spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes icon-spin-very-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                .icon-float {
                    animation: icon-float 4s ease-in-out infinite;
                }

                .icon-float-slow {
                    animation: icon-float-slow 6s ease-in-out infinite;
                }

                .icon-spin-slow {
                    animation: icon-spin-slow 20s linear infinite;
                }

                .icon-spin-very-slow {
                    animation: icon-spin-very-slow 30s linear infinite;
                }

                .animation-delay-300 {
                    animation-delay: 0.3s;
                }

                .animation-delay-500 {
                    animation-delay: 0.5s;
                }

                .animation-delay-800 {
                    animation-delay: 0.8s;
                }

                .animation-delay-1000 {
                    animation-delay: 1s;
                }

                .animation-delay-1500 {
                    animation-delay: 1.5s;
                }

                .animation-duration-2000 {
                    animation-duration: 2s;
                }

                .animation-duration-2500 {
                    animation-duration: 2.5s;
                }

                .animation-duration-3000 {
                    animation-duration: 3s;
                }

                .animation-duration-5000 {
                    animation-duration: 5s;
                }
            `}} />
        </div>
    );
};

export default TeamMessage;