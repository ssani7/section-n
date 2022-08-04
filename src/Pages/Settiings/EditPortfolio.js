import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { InView } from 'react-intersection-observer';
import { faFacebookF, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFileArrowDown, faPlusCircle, faTrash, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from "framer-motion"
import { useRef } from 'react';
import { toast } from 'react-toastify';

const ghostInput = "w-full bg-transparent outline-none focus:border-b overflow-hidden placeholder:my-10  placeholder:text-gray-500";




const EditPortfolio = () => {
    const [updating, setUpdating] = useState({
        task: ""
    });
    const [cover, setCover] = useState("https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png");

    const [dp, setDp] = useState("https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png");

    const [statistics, setStatistics] = useState([
        { number: "", name: "" }
    ])

    const [services, setServices] = useState([
        { serviceName: "", serviceInfo: "", serviceIcon: "" }
    ])

    const [skills, setSkills] = useState([
        { skillName: "", percentage: "" }
    ]);

    const [projects, setProjects] = useState([
        {
            skillName: "", percentage: "",
            techs: [
                { techName: "", techIcon: "" },
                { techName: "", techIcon: "" },
            ]
        }
    ]);

    const dpRef = useRef();
    const serviceIconRef = useRef([]);

    useEffect(() => {
        serviceIconRef.current = serviceIconRef.current.slice(0, services.length);
    }, [services]);

    const { register,
        handleSubmit,
        formState: { errors },
        reset,
        unregister,
        getValues
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur",
        shouldUnregister: true
    });

    const uploadPic = async (image, task) => {
        const formData = new FormData();
        if (image) {
            formData.append('image', image[0]);
        }
        const imageApiKey = "906bfdafb7a4a5b92021d570714ff50f";

        if (image[0]) {
            setUpdating({ task });
            return await axios.post(`https://api.imgbb.com/1/upload?key=${imageApiKey}`, formData);
        }
    }

    const handleCover = (e) => {
        uploadPic(e.target.files, "cover").then(res => {
            if (res.status === 200) {
                setCover(res.data.data.url);
            }
        })
            .catch(error => console.log(error));
    }

    const handleDp = (e) => {
        e.stopPropagation();
        uploadPic(e.target.files, "dp").then(res => {
            if (res.status === 200) {
                setDp(res.data.data.url);
            }
        })
            .catch(error => console.log(error));
    }

    const handleServiceIcon = (e, i) => {
        // e.stopPropagation();

        uploadPic(e.target.files, "serviceIcon").then(res => {
            if (res.status === 200) {
                const newServices = [...services];
                newServices[i].serviceIcon = res.data.data.url;
                setServices(newServices);
            }
        })
            .catch(error => console.log(error));

        // console.log(serviceIcons)

    }

    const handleStats = (e, i) => {
        e.stopPropagation();

        const { name, value } = e.target;
        const newStats = [...statistics];
        newStats[i][name] = value;

        setStatistics(newStats);

    }

    const handleServices = (e, i) => {
        e.stopPropagation();

        const { name, value } = e.target;
        const newServices = [...services];
        newServices[i][name] = value;

        setServices(newServices);

    }

    const handleSkills = (e, i) => {
        e.stopPropagation();

        const { name, value } = e.target;
        const newSkills = [...skills];
        newSkills[i][name] = value;

        setSkills(newSkills);

    }

    const onSubmit = (data) => {
        const portfolioData = {
            heading1: data.heading1,
            heading2: data.heading2,
            name: data.name,
            designation: data.designation,
            bio: data.bio,
            experience: data.experience,
            cv: data.cv,
            cover: cover,
            dp: dp,
            statistics: statistics,
            services: services,
            skills: skills
        }

        console.log(portfolioData)
    }



    return (
        <div className='w-full bg-base-100'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='relative w-full min-h-screen flex items-center justify-center'>
                    <img onLoad={() => setUpdating({ task: "" })} src={cover} alt="" className='w-full h-full absolute object-cover' />
                    <div className='h-full w-full bg-black absolute bg-opacity-40'></div>
                    <div className='z-20'>

                        <textarea type="text" placeholder={`Type a Heading.\n eg. Hello! Welcome to my portfolio!`} className={`${ghostInput} text-white text-center text-2xl md:text-5xl xl:text-6xl 2xl:text-8xl great-vibes placeholder:text-lg placeholder:md:text-5xl placeholder:2xl:text-7xl`} {...register("heading1")} />

                        <input type="text" placeholder="Type another Heading. eg. My name is Solimuddin!" className={`${ghostInput} text-white lg:py-2 text-center text-xl md:text-4xl xl:text-5xl 2xl:text-6xl great-vibes placeholder:text-base placeholder:md:text-4xl placeholder:2xl:text-6xl`} {...register("heading2")} />

                        <input type="file" name="cover" id="cover" className='hidden' {...register("cover", {
                            onChange: (e) => handleCover(e)
                        })} />

                    </div>

                </div>
                <div className='w-full flex justify-center py-10'>
                    {
                        (updating?.task === "cover")
                            ? <label className='btn btn-primary mx-auto loading md:w-1/5 capitalize'>Updating</label>
                            : <label htmlFor="cover" className='btn btn-primary mx-auto md:w-1/5 capitalize'>Add Cover Photo</label>
                    }
                </div>

                {/* about */}
                <div className='my-20 lg:pt-0 md:w-full lg:w-full flex flex-col justify-center items-center overflow-x-hidden'>
                    <h1 className='text-3xl font-bold mb-10 text-center'>About </h1>

                    <InView threshold={.15} triggerOnce={false}>
                        {({ inView, ref, entry }) => (
                            <div className='flex justify-center' ref={ref}>
                                <motion.div
                                    initial="hidden" animate={`${inView && "animate"}`}
                                    variants={{
                                        hidden: { opacity: 0, x: 200 },
                                        animate: {
                                            opacity: 1,
                                            x: 0,
                                            transition: {
                                                duration: 1
                                            }
                                        }
                                    }}
                                    className='bg-base-300 mx-6 xl:w-9/12 lg:mx-32 rounded-2xl flex flex-col-reverse items-center md:flex-row md:relative'>

                                    <div className='lg:w-2/3 md:pl-12 md:py-10 p-8 text-base-content'>



                                        <input type="text" className={`${ghostInput} text-4xl lg:text-7xl text-center md:text-left font-bold`} placeholder="Your Name" {...register("name")} />

                                        <input type="text" className={`${ghostInput} text-xl lg:text-3xl text-center md:text-left font-bold mt-4 poppins`} placeholder="Your Designation" {...register("designation")} />

                                        <textarea type="text" className={`${ghostInput} text-left my-5 md:w-4/6 text-lg textarea textarea-bordered`} placeholder="Write Your bio here" {...register("bio")} />

                                        <textarea type="text" className={`${ghostInput} text-left my-5 md:w-4/6 text-lg textarea textarea-bordered`} placeholder="Write Your Experiences and Skills" {...register("experience")} />

                                        <div className='flex items-end'>
                                            <FontAwesomeIcon className=' h-5 w-6 md:h-8 md:w-8 mr-3' icon={faFileArrowDown} />

                                            <input type="text" className={`${ghostInput} text-left lg:text-2xl mt-4`} placeholder="Add Resume/CV Download Link" {...register("cv")} />
                                        </div>

                                        <div className='flex items-end'>
                                            <FontAwesomeIcon className=' h-5 w-6 md:h-8 md:w-8 mr-3' icon={faFacebookF} />

                                            <input type="text" className={`${ghostInput} text-left lg:text-2xl mt-4`} placeholder="Add Facebook Profile Link" />
                                        </div>

                                        <div className='flex items-end'>
                                            <FontAwesomeIcon className=' h-5 w-6 md:h-8 md:w-8 mr-3' icon={faTwitter} />

                                            <input type="text" className={`${ghostInput} text-left lg:text-2xl mt-4`} placeholder="Add Twitter Profile Link" />
                                        </div>

                                        <div className='flex items-end'>
                                            <FontAwesomeIcon className=' h-5 w-6 md:h-8 md:w-8 mr-3' icon={faLinkedin} />

                                            <input type="text" className={`${ghostInput} text-left lg:text-2xl mt-4`} placeholder="Add LinkedIn Profile Link" />
                                        </div>


                                    </div>

                                    <input type="file" ref={dpRef} className="hidden" onChange={(e) => handleDp(e)} />

                                    <motion.div initial="hidden" animate={`${inView && "animate"}`}
                                        whileTap={{
                                            scale: .95,
                                            transition: { duration: 0.1 }
                                        }}
                                        variants={{
                                            hidden: { opacity: 0, x: -500 },
                                            animate: {
                                                opacity: 1, x: 0,
                                                scale: 1.1,
                                                transition: {
                                                    ease: "easeOut",
                                                    duration: 1,
                                                }
                                            }
                                        }} className='h-60 w-60 md:w-1/3 xl:w-1/3 shadow-2xl rounded-full mt-3 md:m-0 md:-right-10 md:rounded-lg md:h-auto md:max-h-96 md:absolute group cursor-pointer overflow-hidden'
                                        onClick={() => { dpRef.current.click() }}
                                    >
                                        <img
                                            src={dp}
                                            onLoad={() => setUpdating({ task: "" })}
                                            className="z-20 object-cover w-full h-full rounded-full md:rounded-lg" alt='' />

                                        <div className='md:w-full h-full transition duration-500 md:group-hover:bg-black absolute top-0 md:group-hover:bg-opacity-30'></div>

                                        {
                                            (updating?.task === "dp") && <div className='btn btn-square loading absolute z-50 h-full w-full text-4xl top-0'></div>
                                        }

                                        <div className='absolute z-30 bottom-2 left-2 transform transition duration-500 invisible translate-y-full md:group-hover:visible group-hover:translate-y-0 flex items-center text-gray-200'>
                                            <FontAwesomeIcon icon={faUserPen} className="h-8 w-8  mr-3" />
                                            Update Photo
                                        </div>
                                    </motion.div>

                                </motion.div>
                            </div>
                        )}
                    </InView>

                </div>

                {/* statistics */}
                <div className='my-20'>
                    <h2 className='text-3xl font-bold mb-10 text-center'>Add a statistics</h2>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-center justify-center'>
                        {
                            statistics?.map((statistic, i) => (
                                <div key={i} className='flex flex-col justify-center items-center mx-auto relative'>
                                    {
                                        (statistics.length >= 2) && <span className='absolute top-3 right-2 btn btn-xs badge-outline btn-error' onClick={() => setStatistics([...statistics].filter((stat, index) => index !== i))}>x</span>
                                    }
                                    <input name='number' type="text" placeholder='Add a number' pattern="\d*" maxLength={5} className={`${ghostInput} text-5xl w-32 text-center placeholder:text-xl`} onChange={e => handleStats(e, i)} value={statistic.number} />

                                    <input type="text" placeholder='Add Statistic Name' className={`${ghostInput} text-4xl text-center my-4`} onChange={e => handleStats(e, i)} name="name" value={statistic.name} />
                                </div>
                            ))
                        }
                        {
                            (statistics.length < 3) && (
                                <div className='w-full'>
                                    <motion.div whileTap={{ scale: .9 }} className='border w-fit flex flex-col p-5 justify-center items-center rounded-lg btn-outline cursor-pointer mx-auto' onClick={() => setStatistics([...statistics, { name: "", number: "" }])}>
                                        <FontAwesomeIcon icon={faPlusCircle} className="h-6 w-6 py-4" />
                                        <h1>Add One More Statistic?</h1>
                                    </motion.div>
                                </div>
                            )
                        }

                    </div>

                </div>

                {/* services */}
                <div className='w-full'>
                    <h1 className='text-3xl font-bold mb-10 text-center'>What Services Do You Provide?</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center mx-auto'>
                        {
                            services?.map((service, i) => (
                                <div key={i} class="card max-w-sm bg-base-100 shadow-xl py-5 px-2 mx-auto h-full w-full">
                                    {
                                        (services.length >= 2) && <span className='absolute top-3 right-2 btn btn-xs badge-outline btn-error' onClick={() => setServices([...services].filter((stat, index) => index !== i))}>x</span>
                                    }

                                    <motion.figure whileTap={{ scale: .9 }} onClick={() => serviceIconRef.current[i].click()} class="h-32 w-32 mx-auto cursor-pointer">
                                        {
                                            service.serviceIcon
                                                ? <img src={service.serviceIcon} alt="Shoes" class="rounded-xl" />
                                                : <FontAwesomeIcon icon={faPlusCircle} className="h-10 w-10" />
                                        }
                                    </motion.figure>

                                    <input type="file" name={i} id="serviceIcon" className='hidden' ref={el => serviceIconRef.current[i] = el} onChange={(e) => handleServiceIcon(e, i)} />

                                    <div class="flex flex-col items-center text-center">

                                        <input name='serviceName' type="text" placeholder='Add Service Name'
                                            className={`${ghostInput} card-title text-center`}
                                            onChange={e => handleServices(e, i)}
                                            value={service.serviceName} />

                                        <input name="serviceInfo" type="text" placeholder='Add Some Details'
                                            className={`${ghostInput}  text-center my-4`}
                                            onChange={e => handleServices(e, i)} value={service.serviceInfo} />
                                    </div>
                                </div>

                            ))
                        }
                        {
                            (services.length < 4) && (
                                <div className='w-full'>
                                    <motion.div whileTap={{ scale: .9 }}
                                        className='border w-fit flex flex-col p-5 justify-center items-center rounded-lg btn-outline cursor-pointer mx-auto'
                                        onClick={() => setServices([...services, { serviceName: "", serviceInfo: "", serviceIcon: "" }])}>

                                        <FontAwesomeIcon icon={faPlusCircle} className="h-6 w-6 py-4" />

                                        <h1>Add One More service?</h1>
                                    </motion.div>
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* skills */}
                <section className='my-20'>
                    <h2 className='text-3xl font-bold mb-10 text-center'>Add Your Skills or Your Expertise With The Tools & Technologies You Use</h2>

                    <div>
                        <div className='max-w-3xl mx-auto'>
                            {
                                skills?.map((skill, i) => (
                                    <div className='flex flex-col md:flex-row items-center justify-evenly mx-4'>

                                        <input type="text" name='skillName' placeholder='Skill/Technology Name. eg: Photoshop/Reactjs' className={`input input-bordered w-full md:w-3/5 border md:text-lg`}
                                            onChange={e => handleSkills(e, i)}
                                        />

                                        <div className='md:w-1/3'>
                                            <input type="number" name='percentage' placeholder='Expertise' className={`input input-bordered w-10/12 border md:text-lg`}
                                                onChange={e => handleSkills(e, i)} /> %
                                        </div>

                                        {
                                            (skills.length >= 2) && <span onClick={() => setSkills([...skills].filter((stat, index) => index !== i))}
                                                className='btn btn-sm btn-error'>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </span>
                                        }

                                    </div>
                                ))
                            }
                        </div>
                        <motion.div whileTap={{ scale: .9 }}
                            className='border w-fit flex flex-col p-2 justify-center items-center rounded-lg btn-outline cursor-pointer mx-auto mt-5'
                            onClick={() => setSkills([...skills, { skillName: "", percentage: "" }])}>
                            <FontAwesomeIcon icon={faPlusCircle} className="h-6 w-6 py-2" />
                            <h1>Add More Skills?</h1>
                        </motion.div>
                    </div>

                </section>

                {/* projects */}
                <div className='my-20'>
                    <h2 className='text-3xl font-bold mb-10 text-center'>Add Your Projects</h2>
                    <div className='flex flex-col justify-center items-center w-full'>
                        {
                            projects?.map((project, i) => (
                                <div class="card lg:card-side bg-base-100 shadow-xl md:w-full md:max-w-5xl my-5 mx-6">
                                    <figure><img src="https://placeimg.com/400/400/arch" alt="Album" /></figure>
                                    <div class="card-body">
                                        <input type="text" placeholder='Type Project Name' className={`${ghostInput} text-2xl border-b`} />

                                        <textarea type="text" placeholder='Type Some Description' className={`textarea textarea-bordered mt-3`} />

                                        {/* <h2 className='mt-3'>Add technologies you used</h2>
                                        <div className='flex flex-col'>
                                            {
                                                project.techs?.map(tech => (
                                                    <div className='flex items-center mt-3'>
                                                        <input type="text" className='input input-bordered w-3/5' />
                                                        {
                                                            project.techs?.length > 1 && <span className='btn btn-sm btn-error btn-circle mx-3'>
                                                                <FontAwesomeIcon icon={faTrash} className="" />
                                                            </span>
                                                        }
                                                        <FontAwesomeIcon icon={faPlusCircle} className="h-7 w-7 cursor-pointer active:scale-90"
                                                        onClick={() => setSkills([...skills, { skillName: "", percentage: "" }])} />
                                                    </div>
                                                ))

                                            }
                                        </div> */}

                                        <input type="text" placeholder='Add technologies you used' className='input input-bordered w-3/5' />

                                        <input type="text" placeholder='Add Project Link' className='input input-bordered w-3/5' />

                                        <div class="card-actions justify-end">
                                            <button class="btn btn-primary">Submit</button>
                                        </div>
                                    </div>

                                    {
                                        projects?.length > 1 && <span className='btn btn-sm btn-outline btn-error rounded-2xl'
                                            onClick={() => setProjects([...projects].filter((stat, index) => index !== i))}>
                                            x
                                        </span>
                                    }
                                </div>
                            ))
                        }
                        <motion.div whileTap={{ scale: .9 }}
                            className='border w-fit flex flex-col p-2 justify-center items-center rounded-lg btn-outline cursor-pointer mx-auto mt-5'
                            onClick={() => setProjects([...projects, { skillName: "", percentage: "" }])}>
                            <FontAwesomeIcon icon={faPlusCircle} className="h-6 w-6 py-2" />
                            <h1>Add More Skills?</h1>
                        </motion.div>
                    </div>
                </div>

                <div className='flex justify-center pb-20'>
                    <input type="submit" value="Submit" className='btn btn-primary max-w-xl w-full' />
                </div>
            </form>

        </div>
    );
};

export default EditPortfolio;