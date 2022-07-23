import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const slides = [
        { heading: 'Welcome to the coolest Section in town', image: 'https://i.ibb.co/7z6THKb/IMG-20220407-WA0010.jpg' },
        { heading: "Hot as fire, cold as ice ", image: 'https://i.ibb.co/HpbJfLw/diu-at-indoor-cricket-2022-1.jpg' },
        { heading: "", image: 'https://i.ibb.co/pnZySrm/IMG-20220723-122711-610.jpg' },
        { heading: 'Four years, One family', image: 'https://i.ibb.co/4tMfSSv/banner2.jpg' },
        { heading: "", image: 'https://i.ibb.co/ykTV5GW/IMG-20220622-WA0000.jpg' },
        { heading: "", image: 'https://i.ibb.co/ZzyL84k/IMG-20220623-WA0005.jpg' }
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
        <div className='w-full h-72 md:min-h-screen mx-auto relative overflow-hidden'>
            {
                slides.map((slide, index) =>
                    <div key={index} className={`absolute w-full h-full right-0 transform ${index > currentSlide && 'translate-x-full'} ${index < currentSlide && '-translate-x-full'} transition-all duration-700`}>

                        <img className='w-full h-full object-cover' src={slide.image} alt="" />

                        <div className='absolute flex flex-col justify-end items-center transform left-0 right-0 bottom-0 bg-black w-full h-full bg-opacity-10 pb-16 whitespace-nowrap'>

                            {/* <motion.h2 initial='hidden' animate='visible' variants={{
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
                            </motion.h2> */}
                        </div>


                    </div>)
            }
            <motion.h2 initial='hidden' animate='visible' variants={{
                hidden: { opacity: 0, x: 200 },
                visible: {
                    opacity: 1, x: 0,
                    transition: {
                        type: "spring", stiffness: 100,
                        duration: 1
                    }
                }
            }} className='text-white text-3xl text-center md:text-7xl  opacity-100 capitalize great-vibes absolute bottom-5 lg:bottom-28 left-0 right-0 z-30 drop-shadow-lg shadow-black'>Welcome To The Coolest Section in Town
            </motion.h2>
            <div className="absolute flex justify-center transform md:right-5 right-2 bottom-1 md:bottom-5 z-50">
                <button onClick={previousSlide} className='text-white h-fit w-fit px-2 border rounded-full hover:bg-white hover:text-black mr-1 md:mr-4'>❮</button>
                <button onClick={nextSlide} className='text-white h-fit w-fit px-2 border rounded-full hover:bg-white hover:text-black'>❯</button>
            </div>
            {/* <h1 className='text-white text-3xl text-center md:text-7xl font-bold opacity-100 capitalize great-vibes z-50 absolute'>hello</h1> */}
        </div>
    );
};

export default Banner;