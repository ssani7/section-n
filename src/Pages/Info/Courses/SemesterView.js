import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import { useState } from 'react';
import useDBUser from '../../../hooks/useDBUser';
import NLoading from '../../Shared/Loading/NLoading';

const SemesterView = () => {
    const { semesterName } = useParams();
    const [userData, loadingData] = useDBUser();
    const [unlockedIndex, setUnlocked] = useState();

    const { isLoading, data: semester } = useQuery(['semester', semesterName],
        () => fetch(`https://section-n-server.vercel.app/courses/${semesterName}`).then(res => res.json()));

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                delayChildren: 0.8,
                staggerChildren: 0.2
            }
        }
    };

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

    if (isLoading || loadingData) return <NLoading />

    const handleUnlock = (index) => {
        userData?.verification === "verified"
            ? setUnlocked(index)
            : toast.error("You have to be a verified member of Section N")
    }

    return (
        <div className='w-full h-screen lg:h-full overflow-y-auto'>
            <h1 className='text-center md:text-2xl font-bold mb-12'>{semester?.semester}</h1>

            {
                semester?.courses?.length > 0
                    ? semester?.courses?.map((course, i) => (
                        <motion.div className='flex flex-col-reverse md:flex-row items-center justify-evenly border rounded-lg border-primary  mx-auto p-7 my-2'
                            key={i}
                            variants={container}
                            initial="hidden"
                            animate="visible">
                            <div variants={item} className='md:w-3/5 mt-6 md:mt-0'>
                                <motion.p variants={item} className='md:text-xl font-bold my-3 poppins'>Course Title : {course.courseTitle}</motion.p>
                                <motion.p variants={item} className='md:text-xl font-bold my-3'>Course Name : {course.courseName}</motion.p>
                                <motion.p variants={item} className='md:text-xl font-bold my-3'>Course Credit : {course.courseCredit}</motion.p>
                                <motion.p variants={item} className='md:text-xl font-bold my-3'>Course Teacher : {course.courseTeacher} ({course.courseTeacherTitle})</motion.p>
                                {
                                    course?.courseLink
                                        ? <motion.a variants={item} className={`link md:text-xl font-bold my-3`} href={course?.courseLink} target="_blank" rel="noreferrer">Course Link</motion.a>
                                        : <motion.p variants={item} className={`md:text-xl font-bold my-3`}>Course Link : Not Yet Available</motion.p>

                                }
                                <motion.div variants={item} className=''>
                                    {
                                        (unlockedIndex === i)
                                            ? <p className='md:text-lg font-bold my-3'>
                                                Enrollment Key : {course.enrollmentKey}
                                            </p>
                                            : <button onClick={() => handleUnlock(i)} className='btn btn-sm btn-primary normal-case mt-3'>
                                                Unlock Enrollment Key
                                            </button>
                                    }

                                </motion.div>
                            </div>
                            <motion.div variants={item} className='h-48 w-48'>
                                <img className='h-full w-full object-cover rounded-xl' src={course.teacherPhoto || 'https://i.ibb.co/pzpVdPV/no-user-image-icon-3.jpg'} alt="" />
                            </motion.div>
                        </motion.div>))
                    : <h2 className='font-bold my-3 text-center md:text-2xl'> No Courses yet</h2>
            }
        </div>
    );
};

export default SemesterView;