'use client'

import IndustryHero from '@/components/helper/IndustryHero'
import AdditionalSupport from '@/components/school/AdditionalSupport'
import ExpertiseSection from '@/components/school/ExpertiseSection'
import SchoolManagement from '@/components/school/SchoolManagement'
import SchoolServices from '@/components/school/SchoolServices'
import StartingNewSchool from '@/components/school/StartingNewSchool'
import StartupSchoolServices from '@/components/school/StartupSchoolServices'
import React from 'react'

const page = () => {
    return (
        <>
            <IndustryHero
                backgroundImage="/images/school/school.jpg"
                smallHeader="School Management Service"
                titleMain="We Work to Make you Happy"
                titleHighlight="with Tailored Programs that Deliver Real-World Impact"
                description="Learning Needs provides targeted training and management consulting solutions designed to elevate performance and inspire meaningful growth. 
Located in Kolkata along the tranquil banks of the Ganges, we specialize in building tailor-made programs that address the unique needs of schools, institutions, and organizations.

Our mission is to equip every learner with future-ready skills, practical knowledge, and the confidence to excel. 
With a strong focus on measurable outcomes and high-quality delivery, we ensure that every training experience results in positive, lasting transformation."
            />
            <SchoolManagement />

            <StartingNewSchool />
            <StartupSchoolServices/>
            <SchoolServices/>
            <ExpertiseSection/>
            <AdditionalSupport/>
        </>
    )
}

export default page