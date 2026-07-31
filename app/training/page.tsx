import IndustryHero from '@/components/helper/IndustryHero'
import ChallengesSolutions from '@/components/training/ChallengesSolutions'
import Deliver from '@/components/training/Deliver'
import TrainingPrograms from '@/components/training/TrainingPrograms'
import WorkshopTabs from '@/components/training/WorkshopTabs'
import React from 'react'

const page = () => {
    return (
        <div className="overflow-x-hidden w-full">
            <IndustryHero
                backgroundImage="/images/training/training.jpg"
                smallHeader="Training"
                titleMain="Delivering Positive Change"
                titleHighlight="with Customized Programs Built for Measurable Results"
                description="Learning Needs delivers high-quality, personalized training and management consulting solutions designed to inspire real growth. Based in Kolkata, along the serene banks of the Ganges, we create specialized programs that meet the unique requirements of individuals, institutions, schools, and organizations.
Our goal is to empower every learner with practical skills, purposeful knowledge, and the confidence to excel. With a commitment to excellence and meaningful transformation, we ensure every training experience drives positive, lasting change."
            />
            <TrainingPrograms />
            <ChallengesSolutions />
            <WorkshopTabs />
            <Deliver />
        </div>
    )
}

export default page