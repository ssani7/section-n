import React from 'react';
import Banner from './Banner';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion'
import Footer from '../Shared/Footer';
import Stars from './Stars';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import Events from './Events';
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init';
import NLoading from '../Shared/NLoading';



const Home = () => {
    const { isLoading, data: achievementCount } = useQuery('countofAchvment', () => fetch('https://section-n-diu-server.herokuapp.com/achievementCount').then(res => res.json()));

    const [user, loading] = useAuthState(auth);

    const preview = [
        { name: 'Students', number: 43 },
        { name: 'Achievements', number: achievementCount?.count },
        { name: 'Completed Credit', number: 24 },
    ];

    const { ref, inView } = useInView({
        "threshold": 1,
        "triggerOnce": true
    })

    if (isLoading || loading) return <NLoading />

    return (
        <div className='bg-base-100 overflow-y-hidden'>
            <Banner />
            <div className='grid grid-cols-3 mx-auto lg:py-3 w-full' ref={ref}>
                {
                    preview.map((info, i) => <CountUp
                        key={i}
                        end={inView ? info.number : 0}
                        duration={1.8}
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

            <Events />

            <Stars />

            <Footer />
        </div>
    );
};

export default Home;