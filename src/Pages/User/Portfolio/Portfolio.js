import { faFacebookF, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFileArrowDown, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"
import { InView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser'
import useDBUser from '../../../hooks/useDBUser';

const container = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.5,
            staggerChildren: 0.5,
            duration: .5
        }
    }
}

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: .5
        }
    }
}


const Portfolio = () => {
    const navigate = useNavigate();

    const [userData, loading] = useDBUser();

    // useEffect(() => {
    //     if (userData?.verification !== "verified") navigate("/editPortfolio")
    //     console.log(userData)
    // }, [userData, navigate, loading])

    const { portfolio } = userData;

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        const from_name = data.from_name;
        const to_name = userData?.portfolio?.email;
        const subject = data.subject;
        const message = data.message;

        const template = {
            from_name,
            to_name,
            message,
            subject
        }

        emailjs.send('google', 'template_xap02hr', template, 'Gk24mox0snUD7ToWx')
            .then(res => console.log(res))
    };

    // if (loading) return <NLoading />



    return (
        <div className='bg-base-100 overflow-x-hidden  scroll-smooth'>

            {/* banner */}
            <motion.div initial='hidden' animate="animate" variants={{
                hidden: { opacity: 0 },
                animate: {
                    opacity: 1,
                    transition: {
                        delayChildren: 0.5,
                        staggerChildren: 0.5,
                        duration: .5
                    }
                }

            }}
                className='w-full min-h-screen mx-auto overflow-hidden relative'>

                <motion.img initial="hidden" animate="visible" variants={{
                    hidden: {
                        opacity: 0,
                        transition: {
                            duration: 2
                        }
                    },
                    visible: { opacity: 1 }
                }} className='w-full h-full object-cover absolute' src={portfolio?.cover} alt="" />

                <div className='absolute flex flex-col justify-center items-center transform left-0 right-0 bottom-0 bg-black w-full h-full bg-opacity-50 whitespace-nowrap z-30'>
                    <motion.h2 initial='hidden' animate='visible' variants={{
                        hidden: { opacity: 0, x: 200 },
                        visible: {
                            opacity: 1, x: 0,
                            transition: {
                                type: "spring", stiffness: 100,
                                duration: 4
                            }
                        }
                    }} className='text-white text-2xl text-center md:text-5xl 2xl:text-8xl opacity-100 capitalize great-vibes drop-shadow-lg shadow-black'>{portfolio?.heading1}
                    </motion.h2>

                    <motion.h2 initial='hidden' animate='visible' variants={{
                        hidden: { opacity: 0, x: -200 },
                        visible: {
                            opacity: 1, x: 0,
                            transition: {
                                type: "spring", stiffness: 100,
                                duration: 4
                            }
                        }
                    }} className='text-white text-xl text-right md:text-4xl 2xl:text-7xl opacity-100 capitalize great-vibes md:mt-5 drop-shadow-lg shadow-black'>
                        {portfolio?.heading2}
                    </motion.h2>
                </div>


            </motion.div>

            {/* about */}
            <div className='my-20 lg:pt-0 md:w-full lg:w-full flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-bold mb-10 text-center'>About </h1>

                <InView threshold={.15} triggerOnce={false}>
                    {({ inView, ref, entry }) => (
                        <div className='flex justify-center w-full h-full' ref={ref}>
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
                                className='bg-base-300 mx-6 w-full xl:w-9/12 lg:mx-32 text-center md:text-left rounded-2xl flex flex-col-reverse items-center md:flex-row md:relative'>

                                <div className='lg:w-2/3 md:pl-12 md:py-10 p-8 text-base-content'>

                                    <h1 className="text-4xl lg:text-7xl font-bold">{portfolio?.name}</h1>

                                    <h1 className="text-xl lg:text-3xl font-bold mt-4 poppins">#{portfolio?.designation}</h1>

                                    <p className='mt-5 md:w-4/6 text-lg h-auto'>{portfolio?.bio}</p>

                                    <div className='my-5'>
                                        <h2 className='mb-2 text-xl poppins font-bold'>Experiences</h2>
                                        <p className="md:w-4/6 text-lg">{portfolio?.experience}</p>
                                    </div>

                                    <a href={portfolio?.cv || undefined} target='_blank' className="cursor-pointer link-hover" rel="noreferrer"><FontAwesomeIcon className='mr-2' icon={faFileArrowDown} />My Resume</a>
                                </div>
                                <motion.img initial="hidden" animate={`${inView && "animate"}`} variants={{
                                    hidden: { opacity: 0, x: -300 },
                                    animate: {
                                        opacity: 1, x: 0,
                                        scale: .95,
                                        transition: {
                                            duration: 1,
                                        }
                                    }
                                }}
                                    src={portfolio?.dp || 'https://i.ibb.co/pzpVdPV/no-user-image-icon-3.jpg'}
                                    className="z-20 h-60 object-cover w-2/3 md:w-1/3 xl:w-1/4 right-0 shadow-2xl rounded-full mt-3 md:m-0  md:-right-10 md:rounded-lg md:h-auto md:max-h-full  md:absolute " alt='' />

                            </motion.div>
                        </div>
                    )}
                </InView>

            </div>

            {/* statistics */}
            <InView threshold={.6}>
                {
                    ({ inView, ref, entry }) => (
                        <div className='grid grid-cols-1 lg:grid-cols-3 justify-center gap-10 mx-auto w-full my-20 py-10 border-y' ref={ref}>
                            {
                                portfolio?.statistics?.map((stat, i) =>
                                    <CountUp
                                        key={i}
                                        end={inView ? stat.number : 0}
                                        duration={1.8}
                                    >
                                        {({ countUpRef }) => (
                                            <div onClick={stat.path ? () => navigate(`/${stat?.path}`) : undefined} className='text-xl text-center  lg:text-4xl poppins cursor-pointer group'>
                                                <h1 className='transition-all duration-300 group-hover:scale-110'>
                                                    <span ref={countUpRef} ></span>
                                                </h1>
                                                <h1 className='group-hover: transition-all duration-300 group-hover:scale-110 font-semibold '>{stat.name}</h1>
                                            </div>
                                        )}
                                    </CountUp>)
                            }

                        </div>
                    )
                }

            </InView>

            {/* services */}
            <h1 className='text-3xl font-bold mb-28 text-center'>Services</h1>
            <motion.div className="scroll-smooth">
                <motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-ful md:mx-28 gap-20 mx-6'>
                    {
                        portfolio?.services?.map((service) => (
                            <InView threshold={0.1} triggerOnce={false}>
                                {({ inView, ref }) => (
                                    <motion.div ref={ref} initial="hidden" animate={`${inView && "visible"}`} variants={container} className="card max-w-sm bg-base-200 shadow-xl py-10 px-5 mx-auto h-full w-full">
                                        <figure className="h-32 w-32 mx-auto">
                                            <motion.img variants={item} src={service.serviceIcon} alt="Shoes" className="rounded-xl w-full h-full object-cover" />
                                        </figure>
                                        <div className="card-body items-center text-center">
                                            <motion.h2 variants={item} className="card-title">{service.serviceName}</motion.h2>
                                            <motion.p variants={item}>{service.serviceInfo}</motion.p>
                                        </div>
                                    </motion.div>
                                )}
                            </InView>

                        ))
                    }
                </motion.div>
            </motion.div>

            {/* skills */}
            <div className='my-36 flex flex-col md:flex-row w-full justify-center items-center'>
                <h2 className='text-3xl font-bold text-center md:text-right md:w-2/5 mb-10 px-6 capitalize'>Technologies I use & my expertise</h2>
                <InView threshold={.5}>
                    {({ inView, ref, entry }) => (
                        <div ref={ref} className='w-full md:w-2/5 px-6'>
                            {
                                portfolio?.skills?.map((skill) => (
                                    <div className='border max-w-xl mx-auto p-6' >
                                        <div className='flex items-center justify-between'>

                                            <h1 className='text-xl md:text-2xl text-left pr-5 poppins'>
                                                {skill.skillName}
                                            </h1>
                                            <h1 className='ml-2'>{inView ? skill.percentage : 0}%</h1>

                                        </div>
                                        <progress className={`progress progress-primary transform transition-all duration-700 ${inView ? 'w-full' : "w-0"}`} value={skill.percentage} max="100"></progress>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </InView>

            </div>

            {/* projects */}
            <div className='my-20 overflow-y-hidden'>
                <h2 className='text-3xl font-bold text-center '>Projects</h2>
                <div className='my-20 grid grid-cols-1 lg:grid-cols-3 gap-10 mx-6 lg:mx-20'>
                    {
                        portfolio?.projects?.map((project, i) => <InView threshold={.3} triggerOnce={false}>
                            {({ inView, ref, entry }) => (
                                <div ref={ref}>
                                    <motion.div variants={container}
                                        initial="hidden"
                                        animate={`${inView && 'visible'}`} key={i} className="hero rounded-xl shadow-2xl h-full relative group cursor-pointer overflow-y-hidden">

                                        <motion.img variants={item} src={project.image} className="rounded-xl lg:mx-12 absolute w-full z-10 h-full object-cover" alt='' />

                                        <div className={` hero-content px-8 py-10 rounded-xl flex-col z-20 transform duration-300 transition-all invisible translate-y-80 group-hover:visible group-hover:bg-black text-white group-hover:bg-opacity-50 group-hover:translate-y-0 w-full h-full`}>


                                            <div className='w-full h-full'>
                                                <h1 className="text-3xl md:text-3xl lg:text-5xl font-bold">{project.projectName}</h1>
                                                <p className="py-6">{project.projectInfo}</p>
                                                <div className='flex flex-wrap'>
                                                    <h2>{project.techs}</h2>
                                                    {/* {
                                                        project.technology.map((tech, i) => <div key={i} className='mx-2 flex items-center wrap'>
                                                            <img className='h-5 mr-1 ' src={tech.image} alt="" srcSet="" />
                                                            <span>{tech.name}</span>
                                                        </div>)
                                                    } */}
                                                </div>
                                                <a href={project.link || undefined}>
                                                    <button className="btn btn-primary mt-6 normal-case">See Details</button>
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </InView>)
                    }
                </div>
            </div>

            {/* contact */}
            <h1 className='text-3xl font-bold text-center '>Contact Me</h1>
            <InView threshold={.8} triggerOnce={true}>
                {({ inView, ref }) => (
                    <motion.div >
                        <motion.div ref={ref} initial="hidden" animate={`${inView && "visible"}`} variants={container} className='w-full flex justify-center items-center my-20'>
                            <div className="card w-full md:w-3/5 lg:w-3/5 bg-base-100 shadow-xl lg:px-10 mx-3 pb-6">
                                <div className="card-body w-full py-4">
                                    <motion.h2 variants={item} className="card-title text-3xl font-bold justify-center mb-6">Send Me an Email</motion.h2>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <motion.div variants={item} className="form-control w-full lg:max-w-2xl">
                                            <input type="email" placeholder="Your Email Address" className="input input-bordered my-6 text-xl w-full h-14" {...register("from_name", { required: true })} />
                                        </motion.div>
                                        <motion.div variants={item} className="form-control w-full">
                                            <input type="text" placeholder="Subject" className="input input-bordered mb-6 text-xl w-full h-14" {...register("subject", { required: true })} />
                                        </motion.div>
                                        <motion.div variants={item} className="form-control">
                                            <textarea className="textarea textarea-bordered h-32 text-xl" placeholder="Message" {...register("message", { required: true })}></textarea>
                                        </motion.div>

                                        {errors.exampleRequired && <span>This field is required</span>}

                                        <motion.input variants={item} className="btn btn-primary w-full mt-4 normal-case" type="submit" value='Send' />
                                    </form>

                                    <div className='flex flex-col md:flex-row items-center justify-between mt-5' >
                                        <div className='w-fit flex hover:scale-125 transition-all cursor-pointer items-center group'>
                                            <FontAwesomeIcon icon={faPhone} className="h-6 hover:text-blue-600 rounded-full border-2 p-2 group-hover:border-blue-600" />
                                            <h2 className='ml-3 transition-all'>08801919354759</h2>
                                        </div>
                                        <div className='my-5 flex justify-evenly w-1/4'>
                                            <a target='_blank' href={portfolio?.fb} rel="noreferrer"><FontAwesomeIcon className='h-8 w-8 m-3 hover:text-blue-600 hover:scale-125 transition-all rounded-full border-2 p-2 hover:border-blue-600' icon={faFacebookF} /></a>
                                            <a target='_blank' href={portfolio?.linkedin} rel="noreferrer"><FontAwesomeIcon className='h-8 w-8 m-3 hover:text-blue-600 hover:scale-125 transition-all rounded-full border-2 p-2 hover:border-blue-600' icon={faLinkedin} /></a>
                                            <a target='_blank' href={portfolio?.twitter} rel="noreferrer"><FontAwesomeIcon className='h-8 w-8 m-3 hover:text-blue-600 hover:scale-125 transition-all rounded-full border-2 p-2 hover:border-blue-600' icon={faTwitter} /></a>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </motion.div>
                    </motion.div>

                )}
            </InView>

        </div>
    );
};

export default Portfolio;
