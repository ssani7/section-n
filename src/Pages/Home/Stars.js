import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';


const Stars = () => {
    const navigate = useNavigate();
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
    const { isLoading, data: stars } = useQuery('stars', () => fetch('https://section-n-diu-server.herokuapp.com/achievements').then(res => res.json()));

    const { ref, inView } = useInView({
        "threshold": 0.5,
        "triggerOnce": true
    });

    if (isLoading) return <Loading />



    return (
        <div className='text-center'>
            <div ref={ref} className='pb-10 grid grid-cols-2 gap-2 lg:gap-5 mx-4 lg:mx-auto w-fit'>
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
                            <motion.div variants={item} className="h-1/2 lg:w-1/2 lg:h-auto">
                                <img src={star.image} className='h-full lg:h-full w-full shadow-2xl object-cover rounded-lg transition-all' alt='' />
                            </motion.div>

                            <div className='h-1/2 lg:h-auto lg:w-1/3 lg:mt-0'>
                                <motion.h1 variants={item} className="text-lg lg:text-3xl font-bold poppins">{star?.name}</motion.h1>
                                <motion.p variants={item} className="text-xs lg:text-lg mt-4 font-semibold">{star.achievement}</motion.p>
                            </div>
                        </div>
                    </motion.div>)
                }
            </div>
            <button onClick={() => navigate('/addAchievement')} className='btn btn-primary mb-6 normal-case'>Add Your Achievements</button>
        </div>
    );
};

export default Stars;