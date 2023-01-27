import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Shared/Footer';
import NLoadingMini from '../Shared/Loading/NLoadingMini';


const Stars = () => {
    const navigate = useNavigate();
    const { length } = useParams();

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: .5
            }
        }
    };

    let { isLoading, data: stars } = useQuery('stars', () => fetch('https://section-n-server.vercel.app/achievements').then(res => res.json()));

    const { ref, inView } = useInView({
        "threshold": 0.2,
        "triggerOnce": true
    });

    useEffect(() => {
        if (length === 'all') return window.scrollTo(0, 0)
    }, [length])

    if (isLoading) return <NLoadingMini title="Loading Achievements" />

    stars = length ? stars : stars.slice(0, 4);


    return (
        <div className={`text-center ${length === "all" && "pt-20"} bg-base-100`}>
            <h2 className='text-xl md:text-4xl font-bold text-center py-10'>Our Achievements</h2>
            <div ref={ref} className='pb-10 grid grid-cols-2 gap-2 md:gap-5 mx-4 lg:mx-auto w-fit'>
                {
                    stars.map((star, i) => <motion.div key={i} initial='hidden' animate={`${inView && 'visible'}`} className="hero py-2 bg-base-200 max-w-3xl rounded-xl shadow-lg"

                        variants={{
                            hidden: { opacity: 1, scale: 0 },
                            visible: {
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    delayChildren: .8,
                                    staggerChildren: 0.3,
                                    duration: .8
                                }
                            }
                        }}>
                        <div className={`hero-content flex-col ${(i + 1) % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} w-full justify-evenly h-full`}>
                            <motion.div variants={item} className="h-1/2 lg:w-1/2 lg:h-96">
                                <img src={star.image} className='h-full lg:h-full w-full object-contain rounded-xl transition-all' alt='' />
                            </motion.div>

                            <div className='h-1/2 md:h-auto lg:w-1/3 lg:mt-0'>
                                <motion.h1 variants={item} className="text-lg md:text-3xl font-bold poppins">{star?.name}</motion.h1>
                                <motion.p variants={item} className="text-xs md:text-lg mt-4 font-semibold">{star.achievement}</motion.p>
                            </div>
                        </div>
                    </motion.div>)
                }
            </div>
            {
                length === "all"
                    ? <button onClick={() => navigate('/addAchievement')} className='btn btn-primary mb-6 normal-case'>Add Your Achievements</button>
                    : <button onClick={() => navigate('/achievements/all')} className='btn btn-primary mb-6 normal-case'>Show All Achievements</button>
            }

            {
                length === "all" && <Footer />
            }
        </div>
    );
};

export default Stars;