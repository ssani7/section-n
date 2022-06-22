import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const Profile = () => {
    const [user, loading] = useAuthState(auth);

    const { ref, inView } = useInView({
        triggerOnce: true
    })

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <>
            <div className='h-screen mt-24 md:mt-0 py-52 md:py-0 lg:pt-0 md:w-full lg:w-full flex flex-col justify-center items-center'>
                <motion.div ref={ref}
                    initial="hidden" animate={`${inView && "animate"}`}
                    variants={{
                        hidden: { opacity: 0, x: 200 },
                        animate: {
                            opacity: 1,
                            x: 0,
                            delay: .5,
                            transition: {
                                type: "spring", stiffness: 50,
                                duration: 1.5,
                                delayChildren: 1,
                                when: "beforeChildren"
                            }
                        }
                    }}
                    className='bg-base-300 mx-6 md:w-2/3 text-center md:text-left rounded-2xl flex flex-col-reverse items-center md:flex-row relative'>
                    <div className='w-full p-10 text-base-content lg:w-3/5'>

                        <h1 className="text-5xl font-bold">{user.displayName}</h1>

                        <p className='my-10 md:w-4/6'>I am super cool</p>

                        <div className='my-10'>
                            <a target='_blank' href='fas' rel="noreferrer"><FontAwesomeIcon className='h-8 m-3 hover:text-blue-600 hover:scale-125 transition-all' icon={faFacebookF} /></a>
                            <a target='_blank' href={faLinkedin} rel="noreferrer"><FontAwesomeIcon className='h-8 m-3 hover:text-blue-600 hover:scale-125 transition-all' icon={faLinkedin} /></a>
                            <a target='_blank' href="sdaf" rel="noreferrer"><FontAwesomeIcon className='h-8 m-3 hover:text-blue-600 hover:scale-125 transition-all' icon={faTwitter} /></a>
                        </div>
                    </div>
                    <motion.img initial="hidden" animate={`${inView && "animate"}`} variants={{
                        hidden: { opacity: 0, x: -200 },
                        animate: {
                            opacity: 1, x: 0,
                            scale: 1.1,
                            transition: {
                                delay: 0.3,
                                type: "spring", stiffness: 50,
                                duration: 1.5,
                            }
                        }
                    }}
                        // 'https://i.ibb.co/RbLFHR1/sani.jpg'  {user.photoURL}
                        src={user.photoURL} className="z-20 mt-6 object-cover w-2/3 right-0 shadow-2xl rounded-full md:m-0 md:w-1/3 md:-right-10 md:rounded-lg md:h-fit md:scale-110 md:absolute lg:w-fit lg:max-h-full" alt='' />

                </motion.div>
            </div>
        </>
    );
};

export default Profile;