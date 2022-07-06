import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import useToken from '../../hooks/useToken';

const Profile = () => {
    const [user, loading] = useAuthState(auth);

    const token = useToken();

    const { ref, inView } = useInView({
        triggerOnce: true
    })

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <>
            <div className='py-40 md:h-screen md:mt-0 md:py-0 lg:pt-0 md:w-full lg:w-full flex flex-col justify-center items-center bg-base-100 overflow-x-hidden'>
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
                    className='bg-base-300 w-5/6 md:w-3/4 lg:w-1/2 text-left rounded-2xl flex items-center md:flex-row relative'>

                    <div className='w-full text-xs md:text-lg p-6 md:p-10 text-base-content lg:w-3/5'>

                        <h1 className="text-2xl md:text-5xl font-bold mb-2">{user?.displayName}</h1>

                        <p className='md:my-6 md:w-4/6 mb-2'>{user?.email}</p>
                        <p className='md:my-6 md:w-4/6 mb-2'>I am super cool</p>

                        <div className='md:my-6'>
                            <a target='_blank' href='fas' rel="noreferrer"><FontAwesomeIcon className='md:h-8 mr-2 mt-2 md:m-3 hover:text-blue-600 hover:scale-125 transition-all' icon={faFacebookF} /></a>
                            <a target='_blank' href={faLinkedin} rel="noreferrer"><FontAwesomeIcon className='md:h-8 mr-2 mt-2 md:m-3 hover:text-blue-600 hover:scale-125 transition-all' icon={faLinkedin} /></a>
                            <a target='_blank' href="sdaf" rel="noreferrer"><FontAwesomeIcon className='md:h-8 mr-2 mt-2 md:m-3 hover:text-blue-600 hover:scale-125 transition-all' icon={faTwitter} /></a>
                        </div>
                    </div>
                    <motion.div initial="hidden" animate={`${inView && "animate"}`} variants={{
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
                    }} className='shadow-2xl w-1/4 h-fit absolute -right-3 md:-right-10 md:scale-110 group'>
                        <img
                            src={(user?.photoURL)} className="z-20 object-cover rounded-lg lg:w-full" alt=''
                        />
                        <FontAwesomeIcon icon={faImages} className='absolute invisible bottom-0 right-0 p-1 group-hover:visible group-hover:bg-blue-600 hover:scale-105 cursor-pointer'>edit</FontAwesomeIcon>
                    </motion.div>


                </motion.div>
            </div>
        </>
    );
};

export default Profile;