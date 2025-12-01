import IndustryHero from '@/components/helper/IndustryHero'
import React from 'react'
import BlogPage from '@/components/blog/BlogPage'
const page = () => {
    return (
        <>
            <IndustryHero
                backgroundImage="/images/blog/blog.jpg"
                smallHeader="Blogs"
                titleMain="Personal Development for Smart People"
                titleHighlight="captured through moments of Strength, Skill & Team Spirit"
                description="Our Sports Gallery brings together powerful moments that reflect dedication, teamwork, and the joy of active learning.
    Each image highlights students developing essential skills, building confidence, and experiencing the true spirit of sportsmanship.
    From training sessions to competitive events, this collection captures the energy, discipline, and passion that define holistic physical education in schools.
            "
            />
            <BlogPage/>
        </>
    )
}

export default page