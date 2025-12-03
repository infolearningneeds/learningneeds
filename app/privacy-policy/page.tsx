import IndustryHero from '@/components/helper/IndustryHero'
import PrivacyPolicy from '@/components/privacy-policy/PrivacyPolicy'
import React from 'react'

const page = () => {
    return (
        <>
            <IndustryHero
                backgroundImage="/images/blog/blog.jpg"
                smallHeader="Privacy Policy"
                titleMain="Your Privacy, Protected with Transparency & Care"
                titleHighlight="We Safeguard Your Personal Information"
                description="We value your trust and are committed to keeping your personal information safe and secure.
Our Privacy Policy clearly explains what data we collect, how we use it, and the measures we take to protect your privacy.
From browsing to checkout, your information is handled responsibly and with complete transparency.
                    "
            />
            <PrivacyPolicy />
        </>
    )
}

export default page