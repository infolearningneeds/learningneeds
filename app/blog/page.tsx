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
                description="Stay informed, discover new ideas, and gain practical knowledge through our latest blogs. From expert insights and helpful tips to important updates and inspiring stories, our content is designed to give you information you can actually use.

Read our latest blogs and discover something valuable every time you visit."
            />
            <BlogPage/>
        </>
    )
}

export default page