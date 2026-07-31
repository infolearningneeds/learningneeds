/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Quote, Award, TrendingUp, Users } from "lucide-react";

const FounderMessage = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="bg-gray-200 py-24 relative overflow-hidden">
            {/* Subtle Background Texture */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <div className="inline-block mb-6">
                        <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium tracking-wide shadow-sm">
                            LEADERSHIP VISION
                        </span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
                        Founder's Message
                    </h1>
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <div className="h-px w-24 bg-gray-400"></div>
                        <Quote className="w-6 h-6 text-gray-500" />
                        <div className="h-px w-24 bg-gray-400"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* LEFT – Message Card */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Main Card */}
                        <div className="relative bg-white shadow-2xl overflow-hidden transform transition-all duration-700 hover:shadow-3xl">
                            {/* Thin accent line */}
                            <div className="h-0.5 bg-gray-900"></div>
                            
                            {/* Content */}
                            <div className="p-10 sm:p-12 lg:p-14">
                                {/* Quote Icon */}
                                <div className="mb-8 flex items-center gap-4">
                                    <div className={`w-16 h-16 bg-gray-900 flex items-center justify-center shadow-lg transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                                        <Quote className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="h-px flex-1 bg-gray-300"></div>
                                </div>

                                {/* Message Text */}
                                <div className="space-y-6">
                                    <p className="text-gray-700 leading-[1.8] text-justify text-base" style={{
                                        textJustify: 'inter-word',
                                        hyphens: 'auto',
                                        wordSpacing: 'normal'
                                    }}>
                                        Consulting means different things to different people. For us, it is about being a <span className="font-semibold text-gray-900">trusted advisor</span> that helps clients chart and walk the path to sustained success. We are not a solution looking for a problem—we see every project and situation as unique.
                                    </p>
                                    
                                    <p className="text-gray-700 leading-[1.8] text-justify text-base" style={{
                                        textJustify: 'inter-word',
                                        hyphens: 'auto',
                                        wordSpacing: 'normal'
                                    }}>
                                        Our custom-tailored consulting engagements are based on <span className="font-semibold text-gray-900">deep listening</span> and decades of experience across industries and issues. The solutions we craft are <span className="font-semibold text-gray-900">practical, realistic, and highly effective</span>.
                                    </p>

                                    <p className="text-gray-700 leading-[1.8] text-justify text-base" style={{
                                        textJustify: 'inter-word',
                                        hyphens: 'auto',
                                        wordSpacing: 'normal'
                                    }}>
                                        We pride ourselves on having a seasoned and multidisciplinary team that can thoughtfully guide, support, and motivate leaders, teachers, and organizations to achieve levels of performance they never have before.
                                    </p>
                                </div>

                                {/* Signature Section */}
                                <div className="mt-10 pt-8 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-3xl font-light text-gray-900 mb-1 tracking-tight">
                                                Rahul Singh
                                            </p>
                                            <p className="text-gray-600 font-light tracking-wider text-sm uppercase">Founder & CEO</p>
                                            <p className="text-gray-500 font-light text-sm mt-1">LearningNeeds</p>
                                        </div>
                                        <div className="w-14 h-14 border-2 border-gray-900 flex items-center justify-center">
                                            <Award className="w-7 h-7 text-gray-900" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom accent line */}
                            <div className="h-0.5 bg-gray-200"></div>
                        </div>
                    </div>

                    {/* RIGHT – Image Section */}
                    <div className="relative group">
                        {/* Main Image Frame */}
                        <div className="relative transform transition-all duration-700 group-hover:scale-[1.02]">
                            {/* Outer border frame */}
                            <div className="absolute -inset-4 border border-gray-300 pointer-events-none"></div>
                            
                            {/* Inner frame */}
                            <div className="relative bg-white p-4 shadow-2xl">
                                {/* Corner accents */}
                                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gray-900"></div>
                                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gray-900"></div>
                                
                                {/* Image Placeholder */}
                                <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
                                    <Image
                                        src="/images/founderbw.jpeg"
                                        alt="Rahul Singh - Founder"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Name plate */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-8 py-3 shadow-lg">
                                <p className="font-light tracking-widest text-sm">RAHUL SINGH</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats Section */}
                <div className="mt-32 grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {[
                        { icon: TrendingUp, label: "Solutions Delivered", value: "500+", description: "Custom tailored projects" },
                        { icon: Award, label: "Years of Excellence", value: "20+", description: "Industry experience" },
                        { icon: Users, label: "Client Satisfaction", value: "98%", description: "Success rate" }
                    ].map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-500 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 border-2 border-gray-900 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-900 transition-colors duration-500">
                                        <Icon className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors duration-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-4xl font-light text-gray-900 mb-2">{stat.value}</p>
                                        <p className="text-gray-900 font-medium text-sm mb-1 uppercase tracking-wider">{stat.label}</p>
                                        <p className="text-gray-500 text-xs font-light">{stat.description}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FounderMessage;