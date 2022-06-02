import React, { useEffect, useState } from 'react';

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const slides = [
        { heading: 'hello', image: 'https://i.ibb.co/6rPx6N9/banner1.jpg' },
        { heading: 'hello', image: 'https://i.ibb.co/w6bYz0W/outdoor1.jpg' },
        { heading: 'hello', image: 'https://i.ibb.co/CmhDtKr/banner3.jpg' }
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
        const slideInterval = setInterval(nextSlide, 7000);
        return () => clearInterval(slideInterval);
    }, [currentSlide]);
    return (
        <div className='w-full min-h-screen mx-auto relative overflow-x-hidden'>
            {
                slides.map((slide, index) =>
                    <div className={`absolute w-full h-full right-0 transform ${index > currentSlide && 'translate-x-full'} ${index < currentSlide && '-translate-x-full'} transition-all duration-700`}>

                        <img className='w-full h-full object-cover' src={slide.image} alt="" />

                        <div className='absolute flex justify-center items-center transform -translate-y-1/2 left-0 right-0 top-1/2 bg-black w-full h-full bg-opacity-25'>
                            <h2 className='text-white font-bold opacity-100 '>Helloo</h2>
                        </div>

                        <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 h-full">
                            <button onClick={previousSlide} className='btn btn-ghost text-white h-full w-24 hover:bg-transparent'>❮</button>
                            <button onClick={nextSlide} className='btn btn-ghost text-white h-full w-24 hover:bg-transparent'>❯</button>
                        </div>
                    </div>)
            }
        </div>
    );
};

export default Banner;