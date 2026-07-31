import Gallery from '@/components/gallery/Gallery'
import IndustryHero from '@/components/helper/IndustryHero'
import React from 'react'

const page = () => {
    return (
        <>
            <IndustryHero
                backgroundImage="/images/gallery/gallery.jpg"
                smallHeader="Gallery"
                titleMain="You'll Only See the Best of the Best"
                titleHighlight="captured through moments of Strength, Skill & Team Spirit"
                description="Our Sports Gallery brings together powerful moments that reflect dedication, teamwork, and the joy of active learning.
Each image highlights students developing essential skills, building confidence, and experiencing the true spirit of sportsmanship.
From training sessions to competitive events, this collection captures the energy, discipline, and passion that define holistic physical education in schools.
        "
            />
            <Gallery />
        </>
    )
}

export default page