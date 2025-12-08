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
                description="Learning Needs offers comprehensive school management services designed to streamline operations, enhance academic quality, and improve overall institutional performance.  
Located in Kolkata along the serene banks of the Ganges, we partner with schools to implement structured systems that ensure efficiency, transparency, and long-term growth.

Our goal is to empower institutions with effective administrative solutions, strengthened leadership practices, and modern management strategies.  
From academic planning to staff development and policy implementation, we help schools create an environment where educators can teach better and students can learn better—leading to measurable, sustainable improvement across the institution.
"
            />
            <SchoolManagement />

            <StartingNewSchool />
            <StartupSchoolServices />
            <SchoolServices />
            <ExpertiseSection />
            <AdditionalSupport />
        </>
    )
}

export default page