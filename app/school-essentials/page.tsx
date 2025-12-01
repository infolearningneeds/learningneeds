import IndustryHero from '@/components/helper/IndustryHero'
import PricingComponent from '@/components/service/PricingComponent'
import ServicesLearningNeeds from '@/components/service/ServicesLearningNeeds'
import React from 'react'

const page = () => {
    return (
        <>
            <IndustryHero
                backgroundImage="/images/about/hero.jpeg"
                smallHeader="Sports"
                titleMain="Service Truly Different"
                titleHighlight="with Essential Tools Designed for Smarter, Stronger Schools"
                description="Learning Needs provides thoughtfully curated School Essentials designed to support modern educational environments. 
From foundational learning aids to development-focused materials, our solutions help schools create structured, engaging, and effective learning experiences.

Built with purpose and backed by expertise, our School Essentials empower teachers, simplify classroom processes, and enhance student learning outcomes. 
We are committed to equipping schools with the tools they need to deliver education that is impactful, organized, and future-ready.
"
            />
            <ServicesLearningNeeds/>
            <PricingComponent/>
        </>
    )
}

export default page