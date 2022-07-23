import React from 'react';
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer';
import { useQuery } from 'react-query';
import { addDays, format } from 'date-fns';
import Loading from '../Shared/Loading';
import { useState } from 'react';
import { useEffect } from 'react';



const Events = () => {
    const [events, setEvents] = useState([]);

    const { data, isLoading } = useQuery('events', () => fetch('https://section-n-diu-server.herokuapp.com/events').then(res => res.json()));


    useEffect(() => {
        const today = new Date();

        if (data) {
            const validEvents = data.filter(event => {
                const date = new Date(event.expires);
                return date >= today;
            });
            setEvents(validEvents);
        }
    }, [data])



    const { ref, inView } = useInView({
        "threshold": 1,
        "triggerOnce": true
    })
    const container = {
        hidden: { opacity: 1, scale: 0 },
        show: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: .8,
                staggerChildren: 0.3,
                duration: .8
            }
        }
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                duration: .5
            }
        }
    }
    if (isLoading) return <Loading />
    return (
        <div className='w-full'>
            {
                (events.length > 0) && <motion.div ref={ref} initial='hidden' animate={`${inView && 'show'}`} variants={container} className='border-y text-center py-5 md:py-10' >
                    <motion.h1 className='text-xl md:text-3xl font-bold' variants={item}>{events.length > 1 ? "Upcoming Events" : "Upcoming Event"}</motion.h1>
                    {
                        events && events.map((event, i) => <div key={i}>
                            <motion.h1 variants={item} className='text-2xl mt-6 md:text-5xl font-bold poppins md:mt-8'>{event.name}</motion.h1>
                            <motion.h1 variants={item} className='mt-2 md:text-3xl md:mt-6 poppins'>{(event.date)}</motion.h1>
                            <motion.h1 variants={item} className='mt-2 md:text-2xl md:mt-4 poppins'>{(event.time)}</motion.h1>
                        </div>)
                    }
                </motion.div >
            }
        </div>

    );
};

export default Events;