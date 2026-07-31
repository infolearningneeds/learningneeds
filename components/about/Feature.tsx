'use client'

import Image from 'next/image'
import React from 'react'
import { FaBriefcase } from 'react-icons/fa'
import Tilt from 'react-parallax-tilt'
import { FaStar, FaCircle, FaHeart } from "react-icons/fa";

const Feature = () => {
    return (
        <div className="relative pt-12 pb-12 overflow-hidden bg-gray-200">

            {/* FLOATING ICONS (BACKGROUND) */}
            <FaStar className="absolute text-yellow-400 text-xl opacity-60 animate-ping-slow top-20 left-10" />
            <FaCircle className="absolute text-blue-300 text-2xl opacity-40 animate-float top-56 right-16" />
            <FaHeart className="absolute text-rose-400 text-xl opacity-50 animate-float-slow bottom-20 left-1/3" />
            <FaStar className="absolute text-purple-400 text-xl opacity-60 animate-float-slow bottom-12 right-1/4" />

            {/* GRID */}
            <div className="mt-12 grid grid-cols-1 xl:grid-cols-2 items-center gap-20 w-[85%] mx-auto">

                {/* IMAGE */}
                <div className="flex justify-center items-center w-full">
                    <Tilt className="w-full flex justify-center items-center">
                        <Image
                            src="/images/about/hero.png"
                            alt="Feature Image"
                            width={1000}
                            height={1000}
                            className="mx-auto max-w-full h-auto"
                        />
                    </Tilt>
                </div>

                {/* TEXT CONTENT */}
                <div className="">
                    <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-rose-600 rounded-full flex items-center justify-center">
                            <FaBriefcase className="h-7 w-7 text-white" />
                        </div>
                        <h1 className="text-xl font-semibold text-black">Premium learning experience</h1>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl mt-10 font-bold leading-snug lg:leading-16 text-gray-800">
                        Learning Needs is committed to help its clients reach their goals
                    </h2>

                    <div className="mt-10 mb-6">
                        <p className="text-sm md:text-base text-black text-opacity-70 leading-7" style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
                            Learning Needs is committed to help its clients reach their goals. By providing
                            an innovative environment, which makes a difference. Our strong sense of
                            identification with client projects means that we are constantly striving to
                            provide solutions, even for issues they aren’t yet aware of. To this end, we adopt
                            a progressive approach to technology and marketing techniques. This sense of
                            identification also means we value and promote seamless interaction with clients’
                            own teams, and ensure the best value is obtained from their budget.
                            <br /><br />
                            Our long experience at the top of the education and training business means we have
                            expertise which reaches across a number of sectors and schools. But we know that
                            things change, and we are constantly striving to adapt and improve.
                        </p>
                    </div>
                </div>

            </div>

            {/* FLOAT ANIMATION KEYFRAMES (TAILWIND ONLY) */}
            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-12px); }
                    100% { transform: translateY(0px); }
                }
                @keyframes floatSlow {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                @keyframes pingSlow {
                    0%, 100% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(1.3); opacity: 0.3; }
                }
                .animate-float { animation: float 4s ease-in-out infinite; }
                .animate-float-slow { animation: floatSlow 6s ease-in-out infinite; }
                .animate-ping-slow { animation: pingSlow 3s infinite; }
            `}</style>
        </div>
    )
}

export default Feature
