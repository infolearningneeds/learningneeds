import IndustryHero from '@/components/helper/IndustryHero'
import ReturnPolicy from '@/components/return-policy/ReturnPolicy'
import React from 'react'

const page = () => {
    return (
        <>
            <IndustryHero
                backgroundImage="/images/blog/blog.jpg"
                smallHeader="Return Policy"
                titleMain="Clear, Simple & Customer-Friendly Return Guidelines"
                titleHighlight="Hassle-Free Returns for a Smooth Shopping Experience"
                description="Enjoy a transparent and stress-free return process designed to give you confidence in every purchase.
Our Return Policy explains eligibility, timelines, conditions, and step-by-step instructions to help you request returns or exchanges with ease.
We’re committed to ensuring your satisfaction and making every interaction smooth and reliable.
                "
            />
            <ReturnPolicy/>
        </>
    )
}

export default page