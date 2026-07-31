

import FAQ from '@/components/about/FAQ'
import Feature from '@/components/about/Feature'
import FounderMessage from '@/components/about/FounderMessage'
import LearningNeedsTree from '@/components/about/LearningNeedsTree'
import Review from '@/components/about/Review'
import Team from '@/components/about/Team'
import VideoTextReveal from '@/components/about/VideoRevealHero'
import IndustryHero from '@/components/helper/IndustryHero'
import React from 'react'

const page = () => {
    return (
        <>
            <IndustryHero
                backgroundImage="/images/about/hero.jpeg"
                smallHeader="About Us"
                titleMain="Innovation In Every Step"
                titleHighlight="through Personalized, Purpose-Driven Education"
                description="Learning Needs is a training & management consulting company based in Kolkata in the lap of nature beside river Ganges, India. Learning Needs offers a variety of boutique services, tailored to each client's need. Our specialized expertise allows the Individual, Institution, Schools and Organizations to achieve their objectives; we are very much committed to the success of our clients and their individual."
            />
            <LearningNeedsTree />
            <VideoTextReveal />
            <Feature />
            <Team />
            <FounderMessage />
            <Review />
            <FAQ/>
        </>
    )
}

export default page