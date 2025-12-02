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
                description="Stay updated with expert articles on education, personal development, student growth, and modern learning practices. 
Our blog brings knowledge, inspiration, and practical tips for learners and educators.
            "
            />
            <BlogPage />
        </>
    )
}

export default page