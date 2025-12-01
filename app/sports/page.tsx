import IndustryHero from '@/components/helper/IndustryHero'
import FitnessDevelopment from '@/components/sports/FitnessDevelopment'
import React from 'react'

const page = () => {
    return (
        <>
            <IndustryHero
                backgroundImage="/images/school/sports.jpg"
                smallHeader="Sports"
                titleMain="Sports Training"
                titleHighlight="through Active Learning, Discipline & Team-Building Excellence"
                description="Learning Needs offers a dedicated range of Sports Essentials crafted to strengthen physical development, teamwork, and discipline in schools. 
Our curated collection supports structured sports education that helps students stay active, confident, and motivated.

From skill-building training tools to safe and durable sports equipment, each resource is designed to encourage participation and inspire healthy competition. 
We empower schools with solutions that make sports more engaging, more organized, and more impactful for every learner.

With a focus on holistic development, our Sports Essentials help institutions nurture physical fitness, improve coordination, and build strong values through sportsmanship and team spirit.

    "
            />
            <FitnessDevelopment/>
        </>
    )
}

export default page