'use client'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React from 'react'
import SliderCard from './SliderCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
    desktop: { breakpoint: { max: 3000, min: 1324 }, items: 1 },
    tablet: { breakpoint: { max: 1324, min: 764 }, items: 1 },
    mobile: { breakpoint: { max: 764, min: 0 }, items: 1 }
};

// Custom Left Arrow - Smaller size
const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
        onClick={onClick}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100 transition-colors"
    >
        <FaChevronLeft className="text-black text-sm" />
    </button>
);

// Custom Right Arrow - Smaller size
const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
        onClick={onClick}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100 transition-colors"
    >
        <FaChevronRight className="text-black text-sm" />
    </button>
);

const Slider = () => {
    return (
        <Carousel
            additionalTransfrom={0}
            arrows={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            centerMode={false}
            infinite
            responsive={responsive}
            itemClass='item'
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
        >
            <SliderCard
                image="/images/about/neha.jpg"
                name="Neha Ashwin"
                designation="Principal, Maharishi Vidya Mandir Senior Secondary School, Jolarpet"
                review="Learning Needs is indeed true to its name when it comes to service.It is indeed the best program on teachers training which I have come across.Mr.Rahul is a thorough professional who creates tailor made sessions according to the client's need.This was a very interactive workshop compared to those available from other providers which feel more like lectures. The day really fine tuned my skills and the updates I have received since mean I can continue my learning into the future. Maharishi Vidya Mandir school has been immensely benefitted by the training program.The performance of the teachers has also shown remarkable difference after the training session."
            />
            <SliderCard
                image="/images/about/char.jpg"
                name="Mrs. Charmaine Peters"
                designation="Don Bosco School, Kalyani"
                review="The Learning Needs English workshop training was of great help for the children. Your presentation of facts and origin of many English words which were unknown to the kids really enlightened them, the games played made it a highly interactive session. Overall an excellent experience. Good wishes and Regards."
            />
            <SliderCard
                image="/images/about/sudhakar.jpg"
                name="M.Sudhakar"
                designation="BE, B.ED , Teacher of Maharishi Vidya Mandir School, Anna Street , Jolarpettai , Tirupattur District "
                review="I recently attended the teacher training program, and I was thoroughly impressed with the trainer session led by Mr.Rahul. The Teacher Training program was engaging, informative, and  demonstrated exceptional knowledge and expertise in the field, and their passion for teaching was truly remarkable.                       
The session was packed with valuable resources, including practical tips, templates, and tools that I can apply immediately. I appreciated the emphasis on  technology integration, project-based learning, and how it can enhance student engagement and learning outcomes.                         
The training session made me  inspired, motivated, and equipped with new ideas to transform my teaching practice and make a positive impact on their students learning experiences."
            />
            <SliderCard
                image="/images/about/suman.jpg"
                name="Suman kurmi"
                designation="B.sc(H), B.Ed Sri Chaitanya techno school , Chinsurah branch"
                review="Recently I have done a wonderful session of learning needs which is conducted by Mr Rahul sir.It is the gap between the learner's current level of knowledge and skills, and the level of knowledge and skills required to perform a task or a set of tasks. The session was truly informative and transformative in nature.I gained an excellent understanding of effective teaching which I can apply in my classroom to make my children understand.
The training session made me motivated, happy and positive too. I must say I can create a positive and a joyful learning environment for my students."
            />
            <SliderCard
                image="/images/about/s.jpg"
                name="S.Swathika."
                designation="BBA.,MBA Teacher of Maharishi Vidya Mandir. Pudur, Jolarpettai Tirupattur dt."
                review="I recently completed the teacher training program and I must say it was a truly transformative Experience.The Program provided me with a deeper understanding of Effective Teaching practices.I gained a wealth of Knowledge and Skills that I can apply in my classroom.

It was particularly helpful as it allowed me to explore new approaches and strategies that I can use to engage and motivate my students.I really wanted to thank Mr.RAHUL ,a best educator who guided and educated me all through the teacher training program."
            />

        </Carousel>
    )
}

export default Slider;