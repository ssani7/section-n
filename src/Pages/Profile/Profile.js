import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faAt, faIdCard, faGraduationCap, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import useToken from '../../hooks/useToken';
import { useNavigate } from 'react-router-dom';
import useDBUser from '../../hooks/useDBUser';

const Profile = () => {
    const [user, loading] = useAuthState(auth);

    const navigate = useNavigate();
    const token = useToken();

    const [userFromDb, loadingData] = useDBUser(user);

    const { ref, inView } = useInView({
        triggerOnce: true
    })

    if (loading || loadingData) {
        return <Loading></Loading>
    }

    return (
        <>
            <div className='px-5 flex flex-col justify-center items-center bg-base-100 overflow-x-hidden md:px-11 md:pt-36 md:py-0 lg:h-screen lg:pt-0 md:w-full h-full'>
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
                    className='bg-base-300 w-full lg:w-4/6 lg:py-20 lg:pl-10 text-left rounded-2xl flex items-center md:flex-row relative'>

                    <div className='w-3/5 text-xs md:text-lg py-6 pl-5 md:p-10 text-base-content lg:w-full'>

                        <h1 className="text-2xl md:text-6xl font-bold mb-2">{userFromDb?.displayName}</h1>

                        <p className='mt-1 md:mt-3 flex items-center text-2xs md:text-base w-fit lg:text-2xl lg:mt-5 tooltip' data-tip="Email Addess">
                            <FontAwesomeIcon icon={faAt} className='mr-4 w-3 h-3 md:h-5 md:w-5 lg:w-6 lg:h-6' />
                            {userFromDb?.email}
                        </p>

                        <div className='mt-1 md:mt-3 flex items-center text-2xs md:text-base w-fit lg:text-2xl lg:mt-5 tooltip justify-start' data-tip="Your University">
                            <FontAwesomeIcon icon={faBuildingColumns} className='mr-4 w-3 h-3 md:h-5 md:w-5 lg:w-6 lg:h-6' />
                            {userFromDb
                                ? <span className='text-left'>{userFromDb?.varsity}</span>
                                : <span >Your University is not submitted</span>}
                        </div>

                        <p className='mt-1 md:mt-3 flex items-center text-2xs md:text-base w-fit lg:text-2xl lg:mt-5 tooltip' data-tip="Your Degree">
                            <FontAwesomeIcon icon={faGraduationCap} className='mr-4 w-3 h-3 md:h-5 md:w-5 lg:w-6 lg:h-6' />
                            {userFromDb?.degree || <span className='opacity-50 text-2xs md:text-base'>Your degree is not submitted</span>}
                        </p>

                        <p className='mt-1 md:mt-3 flex items-center text-2xs md:text-base w-fit lg:text-2xl lg:mt-5 tooltip' data-tip="Student ID">
                            <FontAwesomeIcon icon={faIdCard} className='mr-4 w-3 h-3 md:h-5 md:w-5 lg:w-6 lg:h-6' />
                            {userFromDb?.id || <span className='opacity-50 text-2xs md:text-base'>Your Student ID is not submitted</span>}
                        </p>

                        <p className='mt-1 md:mt-3 flex items-center text-2xs md:text-base w-fit lg:text-2xl lg:mt-5 tooltip' data-tip="Blood Group">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='w-3 h-3 md:h-5 md:w-5 lg:w-6 lg:h-6 fill-red-700 mr-4'><path d="M16 319.1C16 245.9 118.3 89.43 166.9 19.3C179.2 1.585 204.8 1.585 217.1 19.3C265.7 89.43 368 245.9 368 319.1C368 417.2 289.2 496 192 496C94.8 496 16 417.2 16 319.1zM112 319.1C112 311.2 104.8 303.1 96 303.1C87.16 303.1 80 311.2 80 319.1C80 381.9 130.1 432 192 432C200.8 432 208 424.8 208 416C208 407.2 200.8 400 192 400C147.8 400 112 364.2 112 319.1z" /></svg>
                            {userFromDb?.blood || <span className='opacity-50 text-2xs md:text-base'>Your Blood group is not submitted</span>}
                        </p>

                        <div className='md:my-6 mt-3'>
                            <a target='_blank' href={userFromDb?.fb || ''} rel="noreferrer" className={`${userFromDb?.fb || "tooltip tooltip-right md:tooltip w-fit"}`} data-tip="Add your Facebook Profile link">
                                <FontAwesomeIcon className={`h-4 md:h-8 mr-3 mt-2 md:mr-7 lg:h-10 hover:text-blue-600 hover:scale-125 cursor-pointer transition-all`} icon={faFacebookF} />
                            </a>

                            <a target='_blank' href={userFromDb?.linkedin} rel="noreferrer" className={`${userFromDb?.linkedin || "tooltip tooltip-right md:tooltip w-fit"}`} data-tip="Add your LinkedIn Profile link">
                                <FontAwesomeIcon className={`h-4 md:h-8 mr-3 mt-2 md:mr-7 lg:h-10 hover:text-blue-600 hover:scale-125 cursor-pointer transition-all`} icon={faLinkedin} />
                            </a>

                            <a target='_blank' href={userFromDb?.twitter} rel="noreferrer" className={`${userFromDb?.twitter || "tooltip tooltip-right md:tooltip w-fit"}`} data-tip="Add your Twitter Profile link">
                                <FontAwesomeIcon className={`h-4 md:h-8 mr-3 mt-2 md:mr-7 lg:h-10 hover:text-blue-600 hover:scale-125 cursor-pointer transition-all`} icon={faTwitter} />
                            </a>
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
                    }} className='w-2/5 lg:max-w-sm h-auto rounded-lg absolute -right-2 md:-right-5 lg:-right-10 group'>
                        <img
                            src={(userFromDb?.photoURL)} className="z-20 rounded-lg w-full h-full object-cover" alt=''
                        />
                        <FontAwesomeIcon onClick={() => navigate('/settings')} icon={faImages} className='absolute hidden bottom-0 right-0 p-1 group-hover:inline-block group-hover:bg-blue-600 hover:scale-105 cursor-pointer rounded-br-lg border-0' />
                    </motion.div>

                </motion.div>
            </div >
        </>
    );
};

export default Profile;