import Contact from '@/components/contact/Contact'
import IndustryHero from '@/components/helper/IndustryHero'
import React from 'react'

const page = () => {
    return (
        <>
            <IndustryHero
                backgroundImage="/images/contactus.jpg"
                smallHeader="Conatact Us"
                titleMain="Get the Help You Need"
                titleHighlight="We're here to support, guide, and answer your questions"
                description="Whether you have a question, need assistance, or want to know more about our services, we're here to help. 
Reach out to us for quick support, guidance, and personalized responses. 
Our team is committed to ensuring you get the clarity and solutions you need.

                "
            />
            <Contact />
        </>
    )
}

export default page