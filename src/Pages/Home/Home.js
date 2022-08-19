import React, { useEffect } from 'react';
import Banner from './Banner';
import CountUp from 'react-countup';
import { InView, useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion'
import Footer from '../Shared/Footer';
import Stars from './Stars';
import { useQuery } from 'react-query';
import Events from './Events';
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init';
import NLoading from '../Shared/NLoading';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { format, parse } from 'date-fns';




const Home = () => {
    const navigate = useNavigate();
    const inputRef = useRef();
    const [updating, setUpdating] = useState(false);
    const [routineImg, setRoutineImg] = useState('');

    const [user, loading] = useAuthState(auth);

    const { isLoading, data: achievementCount } = useQuery('countofAchvment', () => fetch('https://section-n-diu-server.herokuapp.com/achievementCount').then(res => res.json()));

    const { isLoading: loadingUser, data: userData } = useQuery(['userdata', user], () => fetch(`https://section-n-diu-server.herokuapp.com/user/${user?.email}`).then(res => res.json()));

    const { isLoading: loadingRoutine, data: routine } = useQuery(['userdata'], () => fetch(`https://section-n-diu-server.herokuapp.com/routine`).then(res => res.json()));


    const preview = [
        { name: 'Students', number: 50, path: "students" },
        { name: 'Achievements', number: achievementCount?.count, path: "achievements/all" },
        { name: 'Completed Credit', number: 20, path: "courses" },
    ];

    const { ref, inView } = useInView({
        "threshold": 1,
        "triggerOnce": true
    })

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [])

    useEffect(() => {
        setRoutineImg(routine?.routineData?.routineImg)
    }, [routine])

    if (isLoading || loading) return <NLoading />

    const uploadRoutine = async (e) => {

        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const imageApiKey = "906bfdafb7a4a5b92021d570714ff50f";
        const today = new Date();

        if (image) {
            setUpdating(true);
            console.log(image)

            await axios.post(`https://api.imgbb.com/1/upload?key=${imageApiKey}`, formData)
                .then(res => {
                    if (res.status === 200) {
                        const routineData = {
                            routineImg: res.data?.data?.url,
                            uploader: userData.displayName,
                            date: today
                        }

                        axios.put('https://section-n-diu-server.herokuapp.com/routine', routineData)
                            .then(response => {
                                if (response.status === 200) {
                                    setRoutineImg(res?.data?.data?.url);
                                    // setUpdating(false);
                                    toast.success("Updated Routine");
                                }
                            })
                    }
                })
                .catch(err => {
                    console.log(err);
                    setUpdating(false);
                    toast.error("Something Went Wrong");
                })
        }
    }

    return (
        <div className='bg-base-100 overflow-y-hidden'>
            <Banner />
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

            <div className='w-full my-5 md:my-20'>
                <h1 className='text-3xl font-bold mb-5 md:mb-10 text-center'> Class Routine</h1>
                <InView threshold={.2}>
                    {({ inView, ref }) => (
                        <div className='flex flex-col items-center'>
                            <motion.img ref={ref}
                                initial="hidden"
                                animate={`${inView && "visible"}`}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1, transition:
                                        {
                                            duration: 1.5,
                                            ease: "easeInOut"
                                        }
                                    }
                                }}
                                onLoad={() => setUpdating(false)}
                                className='h-96 w-auto max-w-full md:w-2/5 md:h-auto md:max-h-full object-contain mx-auto'
                                src={routineImg} alt="" />

                            <div className='w-fit mx-auto mt-10 text-center'>
                                <h2 className='font-semibold'>Updated By : <span className='poppins'>{routine?.routineData?.uploader}</span></h2>
                                {
                                    routine?.routineData?.date && <h2 className='font-semibold'>{format(Date.parse(routine?.routineData?.date), "PP")}</h2>
                                }
                            </div>

                            <input onChange={(e) => uploadRoutine(e)} type="file" className='hidden' ref={inputRef} />

                            {
                                loadingUser
                                    ? <button className='btn btn-primary btn-disabled loading mt-7'>Loading User Data</button>
                                    : <div data-tip="Verified Users Only"
                                        className={`${userData?.verification === "verified" || "tooltip"} h-fit mt-7 cursor-pointer`}>
                                        {
                                            updating
                                                ? <button
                                                    className={`btn btn-primary loading`}>Updating</button>
                                                : <button
                                                    onClick={() => inputRef.current.click()}
                                                    className={`btn btn-primary ${userData?.verification === "verified" || "btn-disabled"}`}>Update Routine</button>
                                        }
                                    </div>
                            }
                        </div>

                    )}
                </InView>
            </div>

            <Events />

            <Stars />

            <Footer />
        </div>
    );
};

export default Home;