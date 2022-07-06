import React from 'react';
import Banner from './Banner';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion'
import Footer from '../Shared/Footer';
import Stars from './Stars';


const Home = () => {
    const preview = [
        { name: 'Students', number: 43 },
        { name: 'Achievements', number: 10 },
        { name: 'Completed Credit', number: 24 },
    ];

    const { ref, inView } = useInView({
        "threshold": 1,
        "triggerOnce": true
    })

    return (
        <div className='bg-base-100'>
            <Banner />
            <div className='grid grid-cols-3 mx-auto lg:py-3 border w-full' ref={ref}>
                {
                    preview.map((info, i) => <CountUp
                        key={i}
                        end={inView ? info.number : 0}
                        duration={.8}
                    >
                        {({ countUpRef }) => (
                            <div className='h-auto text-xs text-center w-32 lg:w-full lg:text-3xl font-semibold my-6'>
                                <span ref={countUpRef} ></span>
                                <h1>{info.name}</h1>
                            </div>
                        )}
                    </CountUp>)
                }

            </div>

            <div className='w-full'>
                <h2 className='text-4xl font-bold text-center py-10'>Meet Our Stars</h2>

                <Stars />

            </div>


            <Footer />
        </div>
    );
};

export default Home;