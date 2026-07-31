import IndustryHero from '@/components/helper/IndustryHero'
import ProductFilter from '@/components/Home/products/ProductFilter'
import ReadingImportance from '@/components/product/ReadingImportance'
import React from 'react'

const page = () => {
    return (
        <>
            <IndustryHero
                backgroundImage="/images/products/prohero.jpg"
                smallHeader="Products"
                titleMain="Make No Bad Choices,Choose Us"
                titleHighlight="through Tailored, Future-Ready Learning Experiences"
                description="Discover a curated collection of books, digital PDFs, and learning aids designed to support learners of all ages. Each product is crafted to simplify concepts, enhance understanding, and help individuals grow at their own pace. Whether you're a student, educator, or professional, our resources provide practical knowledge and meaningful learning experiences."
            />
            <ReadingImportance/>
            <ProductFilter/>
        </>
    )
}

export default page