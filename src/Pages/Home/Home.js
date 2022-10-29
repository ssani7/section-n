import React, { useEffect } from 'react';
import Banner from './Banner';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Footer from '../Shared/Footer';
import Stars from './Stars';
import { useQuery } from 'react-query';
import Events from './Events';
import { useNavigate } from 'react-router-dom';
import Routine from '../Info/Routine/Routine';
import useToken from '../../hooks/useToken';

const Home = () => {
    const navigate = useNavigate();

    const { isLoading, data: achievementCount } = useQuery('countofAchvment', () => fetch('https://section-n-diu-server.herokuapp.com/achievements/count').then(res => res.json()));


    const preview = [
        { name: 'Students', number: 50, path: "students" },
        { name: 'Achievements', number: achievementCount?.count, path: "achievements/all" },
        { name: 'Completed Credit', number: 20, path: "courses" },
    ];

    const { ref, inView } = useInView({
        "threshold": 1,
        "triggerOnce": true
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const token = useToken();

    return (
        <div className='bg-base-100 overflow-y-hidden'>

            <Banner />

            {/* count summary */}
            <div className='grid grid-cols-3 mx-auto w-full' ref={ref}>
                {
                    preview.map((info, i) =>
                        <CountUp
                            key={i}
                            end={inView ? info.number : 0}
                            duration={1.8}
                        >
                            {({ countUpRef }) => (
                                <div onClick={info.path ? () => navigate(`/${info?.path}`) : undefined} className='h-auto text-xs text-center w-32 lg:w-full lg:text-3xl font-semibold py-3 lg:py-6 cursor-pointer group'>
                                    <h1 className='transition-all duration-300 group-hover:scale-110'>
                                        <span ref={countUpRef} ></span>
                                    </h1>
                                    <h1 className='group-hover: transition-all duration-300 group-hover:scale-110'>{info.name}</h1>
                                </div>
                            )}
                        </CountUp>)
                }

            </div>

            <Events />

            <Routine />

            <Stars />

            <Footer />
        </div>
    );
};

export default Home;