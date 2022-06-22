import React, { useEffect, useRef, useState } from 'react';
import Banner from './Banner';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion'


const Home = () => {
    const [isIntersecting, setIsintersescting] = useState();
    const preview = [
        { name: 'Students', number: 43 },
        { name: 'Achievements', number: 10 },
        { name: 'Completed Credit', number: 24 },
    ];

    const myRef = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                setIsintersescting(entry.isIntersecting);
                if (entry.isIntersecting) observer.unobserve(entry.target)
            })
        },
            {
                threshold: .5
            }
        )
        observer.observe(myRef.current);
    }, []);

    const { ref, inView } = useInView({
        "threshold": 1,
        "triggerOnce": true
    })

    return (
        <div className='bg-base-100'>
            <Banner />
            <div className='grid grid-cols-3 lg:gap-20 mx-auto w-fit' ref={ref}>
                {
                    preview.map((info, i) => <CountUp
                        key={i}
                        end={inView ? info.number : 0}
                        duration={2}
                    >
                        {({ countUpRef }) => (
                            <div className='h-20 text-center w-32 lg:w-full lg:text-3xl font-semibold my-6'>
                                <span ref={countUpRef} ></span>
                                <h1>{info.name}</h1>
                            </div>
                        )}
                    </CountUp>)
                }

            </div>

            <div ref={myRef} className='w-full h-screen overflow-hidden'>
                <motion.div initial='hidden' animate={`${inView && 'animation'}`} variants={{
                    hidden: { opacity: 0, x: 200 },
                    animation: { opacity: 1, x: 0, transition: { duration: 1 } },

                }}>
                    <h1 className='text-3xl font-bold mx-16'>HEllo</h1>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;