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
                titleMain="We help schools build stronger and more reliable management systems,"
                titleHighlight="creating a smooth, well-coordinated environment for every department."
                description="Learning Needs offers complete school management support that helps institutions run efficiently, stay organized, and maintain strong operational standards.
Located in Kolkata beside the serene Ganges, we assist schools in building reliable systems that improve coordination, communication, and institutional performance.
Our services focus on strengthening administrative workflows, enhancing governance, and optimizing resource management—enabling schools to function smoothly and deliver consistent quality across all departments.
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