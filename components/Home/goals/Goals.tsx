import React from 'react'
import { FaArrowRight, FaAward } from 'react-icons/fa'

const Goal = () => {
    return (
        <div className='pt-16 pb-16'>
            <div className="w-4/5 mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16">

                {/* LEFT SECTION */}
                <div>
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center flex-col">
                            <FaAward className='h-6 w-6 text-white' />
                        </div>
                        <h1 className='text-xl font-semibold text-black'>
                            Guaranteed and Certified
                        </h1>
                    </div>

                    <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-6xl mt-8 font-bold md:leading-[3rem] lg:leading-[3.5rem] xl:leading-[3.9rem] text-gray-800'>
                        Empowering People, Transforming Organizations,  
                        Building a Better Future.
                    </h1>

                    <p className='mt-4 text-gray-600' style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
                        This proverb perfectly defines the inception of Learning Needs.
                        We believe all companies have one thing in common — they survive 
                        and thrive by creating and maintaining satisfied customers through their people.
                        At Learning Needs, we help individuals, schools, and organizations unlock their true potential
                        through structured training, strategic consulting, and meaningful transformation.
                    </p>

                    <button className='flex items-center space-x-2 px-8 py-3 mt-8 hover:bg-gray-700 transition-all duration-200 rounded-3xl bg-black text-white'>
                        <span>Learn More</span>
                        <FaArrowRight />
                    </button>
                </div>

                {/* RIGHT SECTION */}
                <div>
                    {/* Mission */}
                    <div>
                        <h1 className='text-7xl lg:text-9xl font-bold text-black/10'>01</h1>
                        <div className="-mt-10">
                            <h1 className='text-xl md:text-2xl mb-3 text-black/70 font-bold'>
                                Mission Statement
                            </h1>
                            <p className='w-[90%] lg:w-full text-base text-black/60' style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
                                Our mission is to awaken, develop, and empower the greatness within people and organizations.
                                Through leadership training, school consulting, teacher development, startup guidance, and
                                customized learning solutions, we aim to create meaningful transformation that drives
                                long-term success and excellence.
                            </p>
                        </div>
                    </div>

                    {/* Vision */}
                    <div className='mt-8 w-full'>
                        <h1 className='text-7xl lg:text-9xl font-bold text-black/10'>02</h1>
                        <div className="-mt-10">
                            <h1 className='text-xl md:text-2xl mb-3 text-black/70 font-bold'>
                                Vision Statement
                            </h1>
                            <p className='w-[90%] lg:w-full text-base text-black/60' style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            hyphens: 'auto',
                            wordSpacing: 'normal'
                        }}>
                                Our vision is to be a global catalyst for educational and organizational transformation.
                                We strive to build a world where schools, educators, and professionals thrive through
                                continuous growth, inspired leadership, and innovative learning experiences.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Goal
