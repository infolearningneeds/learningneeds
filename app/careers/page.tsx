import CareerForm from '@/components/career/CareerForm'
import IndustryHero from '@/components/helper/IndustryHero'
import React from 'react'

const page = () => {
    return (
        <>
            <IndustryHero
                backgroundImage="/images/career/job.jpg"
                smallHeader="Career"
                titleMain="Build Your Career With Us"
                titleHighlight="where talent, growth & purpose come together"
                description="We are always looking for passionate, skilled, and motivated individuals who want to grow and make a real impact.
    By filling out the form below, you take the first step toward working with a team that values learning, collaboration, and professional development.
    Whether you are starting your journey or looking to advance your career, this is your opportunity to be part of an environment that supports your goals and rewards dedication."
            />

            <CareerForm />
        </>
    )
}

export default page