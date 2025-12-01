/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
    {
        question: "What type of training and workshops do you provide?",
        category: "Training",
        answer: "We are diversified in all training areas. It depends on what you are exactly looking for. We do customized training for corporates and schools according to the need of our client.",
    },
    {
        question: "Where and how do you deliver your training and workshop?",
        category: "Training",
        answer: `We deliver onsite training and in person.`,
    },
    {
        question: "Who can attend the training and workshop?",
        category: "Training",
        answer: `Anyone who is willing to transform from good to better.`,
    },
    {
        question: " What are the topics covered in training and workshop?",
        category: "Training",
        answer: `Every individual and organizations have different challenges, so we
            do need analysis and prepare module according to their need.`,
    },
    {
        question: `What is the cost involved during training and workshop? type of
            training and workshops do you provide?`,
        category: "Training",
        answer: `Well! That is a good news, even if we deliver customized program, we
            are very much competitive to market and work in your budget range.`,
    },
    {
        question: "Who can open a school?",
        category: "School",
        answer: `Anyone who is willing to join education industry to contribute
            something good to society`,
    },
    {
        question: "Why choose Learning Needs?",
        category: "School",
        answer: `We don't give franchisee rather we help you to build your own school
            without any franchisee fee and royalty. Our expertise and experience
            has helped many people in establishing their own Pre-schools and
            High School.`,
    },
    {
        question: "How much area is required for opening a school?",
        category: "School",
        answer: ` It's totally depended on your school model - Primary, Middle, or
            High School. Generally to open a Pre-schools you should have minimum
            2000 to 25000 square feet space, for Primary school it's suggested
            5000 to 6000 square feet, and for High School according to the
            government affiliation norms.`,
    },
    {
        question: "What is the investment to open a school?",
        category: "School",
        answer: `Again it depends upon the school model and geographical location for
            Pre School 10 to 15 Lac, Primary School it's 20 to 25 Lac and for
            High School it's depends upon construction and school size.`,
    },
    {
        question: "How you will help in curriculum?",
        category: "School",
        answer: `We don't sell books. Yes, we provide curriculum and syllabus along
            with its implementation and teachers training.`,
    },
    {
        question: "Benefits of choosing Learning Needs for our School?",
        category: "School",
        answer: `With our domain expertise and justified fee, your school will rise
            from any level.`,
    },
    {
        question: "Benefits for existing school?",
        category: "School",
        answer: ` We provide total transformation in all the areas like Teachers
            Training, Marketing Training, Admission, Operational Plan,
            Advertisement and Marketing Plan, Expansion Plan, Branding and many
            more.`,
    },
    {
        question: "What is your consultancy fee?",
        category: "School",
        answer: ` Discuss financials according to the project model.`,
    },
    {
        question: " What products you sell on Learning Needs Site?",
        category: "Product",
        answer: `We sell world class selected books, exclusive work sheets along with
            our Learning Needs exclusive product range which is not available
            anywhere in market or online. Our products give every individual
            chance to enhance their skills.`,
    },
    {
        question: "  When will you ship my order?",
        category: "Product",
        answer: `Your order will be shipped within 24-48 hours after receipt of
            payment. You will be informed if for any reason the order is
            delayed. Please note that weekends and holidays are not counted as
            business days.`,
    },
    {
        question: " Which carrier do you use to ship orders to your customers?",
        category: "Product",
        answer: ` We use reliable carriers to ensure prompt and secure delivery.`,
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("All");

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const categories = ["All", "Training", "School", "Product"];

    const filteredData = activeCategory === "All" 
        ? faqData 
        : faqData.filter(item => item.category === activeCategory);

    const leftColumn = filteredData.filter((_, i) => i % 2 === 0);
    const rightColumn = filteredData.filter((_, i) => i % 2 === 1);

    const FAQItem = ({ item }: { item: typeof faqData[0] }) => {
        const actualIndex = faqData.indexOf(item);
        const isOpen = openIndex === actualIndex;

        return (
            <div className="mb-4">
                <button
                    onClick={() => toggle(actualIndex)}
                    className={`w-full text-left p-5 transition-all duration-300 
          ${isOpen
                            ? "bg-black text-white shadow-xl rounded-t-2xl"
                            : "bg-white text-black hover:bg-gray-50 shadow-sm hover:shadow-md border border-gray-100 rounded-2xl"
                        }`}
                >
                    <div className="flex items-center justify-between gap-4">
                        <span className="font-semibold text-base pr-4">{item.question}</span>
                        <motion.div
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
              ${isOpen ? "bg-white/20" : "bg-gray-100"}`}
                        >
                            <svg
                                className={`w-4 h-4 ${isOpen ? "text-white" : "text-gray-600"}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </motion.div>
                    </div>
                </button>

                <AnimatePresence initial={false} mode="wait">
                    {isOpen && (
                        <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0, scaleY: 0.95 }}
                            animate={{
                                height: "auto",
                                opacity: 1,
                                scaleY: 1,
                                transition: {
                                    height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                                    opacity: { duration: 0.25, delay: 0.1 },
                                    scaleY: { duration: 0.3 }
                                }
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                                scaleY: 0.95,
                                transition: {
                                    height: { duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] },
                                    opacity: { duration: 0.2 },
                                    scaleY: { duration: 0.25 }
                                }
                            }}
                            style={{ originY: 0 }}
                            className="overflow-hidden bg-black text-white rounded-b-2xl -mt-2"
                        >
                            <div className="px-5 pb-5 pt-2">
                                <div className="pt-3 border-t border-white/20">
                                    <p className="text-sm leading-relaxed whitespace-pre-line opacity-90">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <div className="bg-gray-50 py-16 lg:py-24 relative overflow-hidden">
            {/* Decorative Background Blobs with Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top Left - Training Icon Blob */}
                <motion.div
                    animate={{ 
                        y: [0, 30, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ 
                        duration: 8, 
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-20 -left-20 w-80 h-80 bg-blue-100 rounded-full opacity-40 flex items-center justify-center"
                >
                    <svg className="w-32 h-32 text-blue-300 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                    </svg>
                </motion.div>

                {/* Top Right - School Icon Blob */}
                <motion.div
                    animate={{ 
                        y: [0, -30, 0],
                        rotate: [0, -5, 0]
                    }}
                    transition={{ 
                        duration: 10, 
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-32 -right-32 w-96 h-96 bg-purple-100 rounded-full opacity-40 flex items-center justify-center"
                >
                    <svg className="w-40 h-40 text-purple-300 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                    </svg>
                </motion.div>

                {/* Bottom Left - Product Icon Blob */}
                <motion.div
                    animate={{ 
                        y: [0, 40, 0],
                        x: [0, 20, 0]
                    }}
                    transition={{ 
                        duration: 12, 
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -bottom-24 -left-24 w-72 h-72 bg-green-100 rounded-full opacity-40 flex items-center justify-center"
                >
                    <svg className="w-28 h-28 text-green-300 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2v-4h4v-2h-4V7h-2v4H7v2h5z"/>
                    </svg>
                </motion.div>

                {/* Bottom Right - Question Mark Blob */}
                <motion.div
                    animate={{ 
                        y: [0, -25, 0],
                        x: [0, -15, 0]
                    }}
                    transition={{ 
                        duration: 9, 
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -bottom-16 -right-16 w-64 h-64 bg-orange-100 rounded-full opacity-40 flex items-center justify-center"
                >
                    <svg className="w-24 h-24 text-orange-300 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
                    </svg>
                </motion.div>

                {/* Small accent circles */}
                <motion.div
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ 
                        duration: 6, 
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 right-1/4 w-32 h-32 bg-pink-200 rounded-full opacity-30"
                />
                <motion.div
                    animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ 
                        duration: 7, 
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-yellow-200 rounded-full opacity-30"
                />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 bg-black text-white text-sm font-medium rounded-full mb-4"
                    >
                        Got Questions?
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                    >
                        Frequently Asked Questions
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto text-base lg:text-lg"
                    >
                        Everything you need to know about our services, training, and products.
                        Can't find what you're looking for? Feel free to contact us.
                    </motion.p>
                </div>

                {/* Category Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => {
                                setActiveCategory(category);
                                setOpenIndex(null);
                            }}
                            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 
                                ${activeCategory === category
                                    ? "bg-black text-white shadow-lg scale-105"
                                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm hover:shadow-md"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* FAQ Grid - Two Columns on Desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                    <div>
                        {leftColumn.map((item) => (
                            <FAQItem key={faqData.indexOf(item)} item={item} />
                        ))}
                    </div>
                    <div>
                        {rightColumn.map((item) => (
                            <FAQItem key={faqData.indexOf(item)} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;