import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const slides = [
        { heading: 'Welcome to the coolest Section in town', image: 'https://i.ibb.co/XXbkQ29/IMG-20220407-WA0003.jpg' },
        { heading: 'Four years, One family', image: 'https://i.ibb.co/193GtTP/IMG-20220412-104341-735.jpg' },
        { heading: "Hot as fire, cold as ice ", image: 'https://i.ibb.co/HpbJfLw/diu-at-indoor-cricket-2022-1.jpg' }
    ];

    const nextSlide = () => {
        const next = currentSlide >= slides.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(next);
    }

    const previousSlide = () => {
        const next = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        setCurrentSlide(next);
    }

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 10000);
        return () => clearInterval(slideInterval);
    }, [currentSlide]);
    return (
        <div className='w-full min-h-screen mx-auto relative overflow-hidden'>
            {
                slides.map((slide, index) =>
                    <div key={index} className={`absolute w-full h-full right-0 transform ${index > currentSlide && 'translate-x-full'} ${index < currentSlide && '-translate-x-full'} transition-all duration-700`}>

                        <img className='w-full h-full object-cover' src={slide.image} alt="" />

                        <div className='absolute flex flex-col justify-center items-center transform -translate-y-1/2 left-0 right-0 top-1/2 bg-black w-full h-full bg-opacity-25'>
                            <motion.h2 initial='hidden' animate='visible' variants={{
                                hidden: { opacity: 0, x: 200 },
                                visible: {
                                    opacity: 1, x: 0,
                                    transition: {
                                        type: "spring", stiffness: 100,
                                        duration: 1
                                    }
                                }
                            }} className='text-white text-3xl text-center md:text-7xl font-bold opacity-100 capitalize great-vibes'>{slide.heading}
                            </motion.h2>
                            <motion.h2 initial='hidden' animate='visible' variants={{
                                hidden: { opacity: 0, x: -200 },
                                visible: {
                                    opacity: 1, x: 0,
                                    transition: {
                                        type: "spring", stiffness: 100,
                                        duration: 1
                                    }
                                }
                            }} className='text-white text-2xl text-right md:text-5xl font-bold opacity-100 capitalize great-vibes mt-5'>
                                Section: N
                            </motion.h2>
                        </div>

                        <div className="absolute flex justify-center transform right-5 bottom-5">
                            <button onClick={previousSlide} className='text-white h-fit w-fit px-2 border rounded-full hover:bg-white hover:text-black mr-4'>❮</button>
                            <button onClick={nextSlide} className='text-white h-fit w-fit px-2 border rounded-full hover:bg-white hover:text-black'>❯</button>
                        </div>
                    </div>)
            }
        </div>
    );
};

export default Banner;