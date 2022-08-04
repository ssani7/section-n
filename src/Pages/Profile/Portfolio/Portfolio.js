import { faFacebookF, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
// import git from '../../Images/icons/git.png'
// import mongo from '../../Images/icons/mongo.png'
// import firebase from '../../Images/icons/firebase.png'
// import node from '../../Images/icons/node.png'
// import react from '../../Images/icons/React-icon.svg.png'
// import bootstrap from '../../Images/icons/bootstrap-logo.png'
// import html from '../../Images/icons/html.png'
// import css from '../../Images/icons/css.png'
// import js from '../../Images/icons/javascript.png'
// import tail from '../../Images/icons/Tailwind_CSS_Logo.svg.png'
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"
import { InView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser'

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
            duration: .3
        }
    }
}

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: .3
        }
    }
}


const Portfolio = ({ reference }) => {
    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [about, setAbout] = useState({
        banner: {
            image: "https://res.cloudinary.com/practicaldev/image/fetch/s--StRkI7Ze--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://codesandtags.github.io/blog/static/0c42bdee6c2a7e213cacc2b33ac3039c/a0304/hero.webp",
            heading1: "Welcome to Sanaullah Sani's portfolio",
            heading2: "Best Web application and services",
        },
        name: "Sanaullah Sani",
        designation: "Junior Web Developer",
        bio: "I am a Junior Web Developer. I am currently a student and have been learning web develpment for half a year now. I make dynamic full stack web application using #reactjs #node.js #mongoDB #javaScript. I am a student and completing my BSC in Computer Sciene in Daffodil International University",
        email: "sanaullah.sani756@gmail.com",

        summary: [
            { name: 'Projects Done', number: 43, path: "students" },
            { name: 'Appreciation', number: 20, path: "achievements/all" },
            { name: 'Technology Skills', number: 20, path: "courses" },
        ],

        services: [
            { name: "UI/UX Design", info: "Create unique and personalized UI designs and idea with responsive experience", icon: "https://pic.onlinewebfonts.com/svg/img_560905.png" },
            { name: "Fullstack Dynamic Website", info: "Both static and dynamic websites can be developed with necessary features", icon: "https://pic.onlinewebfonts.com/svg/img_471076.png" },
            { name: "Server API and Backend Support", info: "Client and server side data store and fetch API can be created with  full database support", icon: "https://pic.onlinewebfonts.com/svg/img_474457.png" },
            { name: "Bug fix & Error Handling", info: "Any bugs and error of an existing web application can be fixed", icon: "http://cdn.onlinewebfonts.com/svg/img_463192.png" },
        ],

        skills: [
            { name: "HTML", percentage: 90 },
            { name: "CSS", percentage: 70 },
            { name: "JavaSript", percentage: 65 },
            { name: "React", percentage: 55 },
        ],

        projects: [
            {
                "id": 1,
                "title": "Bicycleverse",
                "features": [
                    {
                        "name": "Proper Authentication With Complete Security",
                        "info": "Authentiaction for users using a fustion of Firebase and custom databae using Mongo DB. Secured by JSON Web Token",
                        "image": "https://i.ibb.co/99XFYQp/4th.png",
                        "link": "https://assignment-12-cameraverse.web.app/login"
                    },
                    {
                        "name": "Personalized Updatable Profile",
                        "info": "Create and update your own profile in the dashboard. Can be updated including profile photo, email address, passwords and social profile links",
                        "image": "https://i.ibb.co/pZB2KxT/3rd.png",
                        "link": "https://assignment-12-cameraverse.web.app/dashboard"
                    },
                    {
                        "name": "Catergorized Products",
                        "info": "Properly categorized list of products. Also have proper pagination for full product list and fully responsive design all over",
                        "image": "https://i.ibb.co/0J3GpDk/2nd.png",
                        "link": "https://assignment-12-cameraverse.web.app/home"
                    }
                ],
                "technology": [
                    {
                        "name": "ReactJs",
                        "image": "https://i.ibb.co/Fnvm1JJ/React-icon-svg.png"
                    },
                    {
                        "name": "Tailwind",
                        "image": "https://i.ibb.co/HxXpcpW/Tailwind-CSS-Logo-svg.png"
                    },
                    {
                        "name": "Firebase",
                        "image": "https://i.ibb.co/VDr7kZy/firebase.png"
                    },
                    {
                        "name": "MongoDB",
                        "image": "https://i.ibb.co/3BhpCZF/mongo.png"
                    }
                ],
                "image": "https://i.ibb.co/0J3GpDk/2nd.png",
                "live": "https://assignment-12-cameraverse.web.app/",
                "client": "",
                "server": ""
            },
            {
                "id": 2,
                "title": "Tech Review Website",
                "features": [
                    {
                        "name": "Proper Authentication With Complete Security",
                        "info": "Authentiaction for users using a fustion of Firebase and custom databae using Mongo DB. Secured by JSON Web Token",
                        "image": "https://i.ibb.co/99XFYQp/4th.png",
                        "link": "https://assignment-12-cameraverse.web.app/login"
                    },
                    {
                        "name": "Personalized Updatable Profile",
                        "info": "Create and update your own profile in the dashboard. Can be updated including profile photo, email address, passwords and social profile links",
                        "image": "https://i.ibb.co/pZB2KxT/3rd.png",
                        "link": "https://assignment-12-cameraverse.web.app/dashboard"
                    },
                    {
                        "name": "Catergorized Products",
                        "info": "Properly categorized list of products. Also have proper pagination for full product list and fully responsive design all over",
                        "image": "https://i.ibb.co/4N1SHKF/Screenshot-2022-06-11-135612.png",
                        "link": "https://assignment-12-cameraverse.web.app/home"
                    }
                ],
                "technology": [
                    {
                        "name": "ReactJs",
                        "image": "https://i.ibb.co/Fnvm1JJ/React-icon-svg.png"
                    },
                    {
                        "name": "Tailwind",
                        "image": "https://i.ibb.co/HxXpcpW/Tailwind-CSS-Logo-svg.png"
                    }
                ],
                "image": "https://i.ibb.co/dL5fT8n/review.png",
                "live": "https://assignment9bysani.netlify.app/home",
                "client": "",
                "server": ""
            },
            {
                "id": 3,
                "title": "Wedding Planners Website",
                "features": [
                    {
                        "name": "Proper Authentication With Complete Security",
                        "info": "Authentiaction for users using a fustion of Firebase and custom databae using Mongo DB. Secured by JSON Web Token",
                        "image": "https://i.ibb.co/99XFYQp/4th.png",
                        "link": "https://assignment-12-cameraverse.web.app/login"
                    },
                    {
                        "name": "Personalized Updatable Profile",
                        "info": "Create and update your own profile in the dashboard. Can be updated including profile photo, email address, passwords and social profile links",
                        "image": "https://i.ibb.co/pZB2KxT/3rd.png",
                        "link": "https://assignment-12-cameraverse.web.app/dashboard"
                    },
                    {
                        "name": "Catergorized Products",
                        "info": "Properly categorized list of products. Also have proper pagination for full product list and fully responsive design all over",
                        "image": "https://i.ibb.co/4N1SHKF/Screenshot-2022-06-11-135612.png",
                        "link": "https://assignment-12-cameraverse.web.app/home"
                    }
                ],
                "technology": [
                    {
                        "name": "HTML",
                        "image": "https://i.ibb.co/6WwLYX3/html.png"
                    },
                    {
                        "name": "CSS",
                        "image": "https://i.ibb.co/X2Vm2nr/css.png"
                    },
                    {
                        "name": "JavaScript",
                        "image": "https://i.ibb.co/549BGV8/javascript.png"
                    },
                    {
                        "name": "Bootstrap",
                        "image": "https://i.ibb.co/t3kdbwD/bootstrap-logo.png"
                    }
                ],
                "image": "https://i.ibb.co/Wx5yP8y/wedding-1-1.png",
                "live": "https://zealous-nobel-72493e.netlify.app/",
                "client": "",
                "server": ""
            },

            {
                "id": 4,
                "title": "Tech Inventory",
                "features": [
                    {
                        "name": "Proper Authentication With Complete Security",
                        "info": "Authentiaction for users using a fustion of Firebase and custom databae using Mongo DB. Secured by JSON Web Token",
                        "image": "https://i.ibb.co/99XFYQp/4th.png",
                        "link": "https://assignment-12-cameraverse.web.app/login"
                    },
                    {
                        "name": "Personalized Updatable Profile",
                        "info": "Create and update your own profile in the dashboard. Can be updated including profile photo, email address, passwords and social profile links",
                        "image": "https://i.ibb.co/pZB2KxT/3rd.png",
                        "link": "https://assignment-12-cameraverse.web.app/dashboard"
                    },
                    {
                        "name": "Catergorized Products",
                        "info": "Properly categorized list of products. Also have proper pagination for full product list and fully responsive design all over",
                        "image": "https://i.ibb.co/4N1SHKF/Screenshot-2022-06-11-135612.png",
                        "link": "https://assignment-12-cameraverse.web.app/home"
                    }
                ],
                "technology": [
                    {
                        "name": "ReactJs",
                        "image": "https://i.ibb.co/Fnvm1JJ/React-icon-svg.png"
                    },
                    {
                        "name": "Bootstrap",
                        "image": "https://i.ibb.co/t3kdbwD/bootstrap-logo.png"
                    },
                    {
                        "name": "Firebase",
                        "image": "https://i.ibb.co/VDr7kZy/firebase.png"
                    },
                    {
                        "name": "MongoDB",
                        "image": "https://i.ibb.co/3BhpCZF/mongo.png"
                    }
                ],
                "image": "https://i.ibb.co/SdHLMh4/ass-1.png",
                "live": "https://assignment11-gpu-incentory.web.app/",
                "client": "",
                "server": ""
            }
        ]

    })




    const onSubmit = data => {
        const from_name = data.from_name;
        const to_name = about?.email;
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
                }} className='w-full h-full object-cover absolute' src={about?.banner?.image} alt="" />

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
                    }} className='text-white text-2xl text-center md:text-5xl 2xl:text-8xl opacity-100 capitalize great-vibes drop-shadow-lg shadow-black'>{about?.banner?.heading1}
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
                        {about?.banner?.heading2}
                    </motion.h2>
                </div>


            </motion.div>

            {/* about */}
            <div className='my-20 lg:pt-0 md:w-full lg:w-full flex flex-col justify-center items-center'>
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
                                className='bg-base-300 mx-6 xl:w-9/12 lg:mx-32 text-center md:text-left rounded-2xl flex flex-col-reverse items-center md:flex-row md:relative'>
                                <div className='lg:w-2/3 md:pl-12 md:py-10 p-8 text-base-content'>

                                    <h1 className="text-4xl lg:text-7xl font-bold">{about?.name}</h1>

                                    <h1 className="text-xl lg:text-3xl font-bold mt-4 poppins">#{about?.designation}</h1>

                                    <p className='my-5 md:w-4/6 text-lg'>{about?.bio}</p>

                                    <p className="my-5 md:w-4/6">I am fluent in #HTML, #CSS and use #TailwindCSS and #Bootstrap for UI design. I have good ability in #javaScript and use #Reactjs for most of my projects. For backend I use #mongoDB and #javaScript using #node.js and #express.js</p>

                                    <a href='https://drive.google.com/file/d/12PtFY9TNixXj-_3DA9vFBRCihGJK3xFf/view?usp=sharing' target='_blank' className="cursor-pointer link-hover" rel="noreferrer"><FontAwesomeIcon className='mr-2' icon={faFileArrowDown} />My Resume</a>

                                    <div className='my-5'>
                                        <a target='_blank' href='fas' rel="noreferrer"><FontAwesomeIcon className='h-8 m-3 hover:text-blue-600 hover:scale-125 transition-all' icon={faFacebookF} /></a>
                                        <a target='_blank' href={faLinkedin} rel="noreferrer"><FontAwesomeIcon className='h-8 m-3 hover:text-blue-600 hover:scale-125 transition-all' icon={faLinkedin} /></a>
                                        <a target='_blank' href="sdaf" rel="noreferrer"><FontAwesomeIcon className='h-8 m-3 hover:text-blue-600 hover:scale-125 transition-all' icon={faTwitter} /></a>
                                    </div>
                                </div>
                                <motion.img initial="hidden" animate={`${inView && "animate"}`} variants={{
                                    hidden: { opacity: 0, x: -300 },
                                    animate: {
                                        opacity: 1, x: 0,
                                        scale: 1.1,
                                        transition: {
                                            duration: 1,
                                        }
                                    }
                                }}
                                    src='https://i.ibb.co/kQdMxMC/sani.jpg'
                                    className="z-20 h-60 object-cover w-2/3 md:w-1/3 xl:w-1/4 right-0 shadow-2xl rounded-full mt-3 md:m-0  md:-right-10 md:rounded-lg md:h-auto md:max-h-full  md:absolute " alt='' />

                            </motion.div>
                        </div>
                    )}
                </InView>

            </div>

            {/* summary */}
            <InView threshold={.6}>
                {
                    ({ inView, ref, entry }) => (
                        <div className='grid grid-cols-1 lg:grid-cols-3 justify-center gap-10 mx-auto w-full my-20 py-10 border-y' ref={ref}>
                            {
                                about?.summary?.map((info, i) =>
                                    <CountUp
                                        key={i}
                                        end={inView ? info.number : 0}
                                        duration={1.8}
                                    >
                                        {({ countUpRef }) => (
                                            <div onClick={info.path ? () => navigate(`/${info?.path}`) : undefined} className='text-xl text-center  lg:text-4xl poppins cursor-pointer group'>
                                                <h1 className='transition-all duration-300 group-hover:scale-110'>
                                                    <span ref={countUpRef} ></span>
                                                </h1>
                                                <h1 className='group-hover: transition-all duration-300 group-hover:scale-110 font-semibold '>{info.name}</h1>
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
                <motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-fit md:mx-28 gap-20 mx-6'>
                    {
                        about?.services?.map((service) => (
                            <InView threshold={0.1} triggerOnce={false}>
                                {({ inView, ref }) => (
                                    <motion.div ref={ref} initial="hidden" animate={`${inView && "visible"}`} variants={container} class="card bg-base-100 shadow-xl py-6">
                                        <figure class="h-32 w-32 mx-auto">
                                            <motion.img variants={item} src={service.icon} alt="Shoes" class="rounded-xl" />
                                        </figure>
                                        <div class="card-body items-center text-center">
                                            <motion.h2 variants={item} class="card-title">{service.name}</motion.h2>
                                            <motion.p variants={item}>{service.info}</motion.p>
                                        </div>
                                    </motion.div>
                                )}
                            </InView>

                        ))
                    }
                </motion.div>
            </motion.div>

            {/* skills */}
            <div className='my-20 flex flex-col md:flex-row w-full justify-center items-center'>
                <h2 className='text-3xl font-bold text-center md:text-right md:w-2/5 mb-10 px-6 capitalize'>Technologies I use & my expertise</h2>
                <InView threshold={.5}>
                    {({ inView, ref, entry }) => (
                        <div ref={ref} className='w-full md:w-2/5 px-6'>
                            {
                                about?.skills?.map((skill) => (
                                    <div className='border max-w-xl mx-auto p-6' >
                                        <div className='flex items-center justify-between'>

                                            <h1 className='text-xl md:text-2xl text-left pr-5 poppins'>
                                                {skill.name}
                                            </h1>
                                            <h1 className='ml-2'>{inView ? skill.percentage : 0}%</h1>

                                        </div>
                                        <progress class={`progress progress-primary transform transition-all duration-700 ${inView ? 'w-full' : "w-0"}`} value={skill.percentage} max="100"></progress>
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
                <div className='my-20 grid grid-cols-1 lg:grid-cols-3  gap-10 mx-6 lg:mx-20'>
                    {
                        about?.projects?.map((project, i) => <InView threshold={.3} triggerOnce={false}>
                            {({ inView, ref, entry }) => (
                                <div ref={ref}>
                                    <motion.div variants={container}
                                        initial="hidden"
                                        animate={`${inView && 'visible'}`} key={i} className="hero rounded-xl shadow-2xl h-full relative group cursor-pointer overflow-y-hidden">

                                        <motion.img variants={item} src={project.image} className="rounded-xl lg:mx-12 absolute w-full z-10 h-full object-cover" alt='' />

                                        <div className={` hero-content px-6 py-10 rounded-xl flex-col z-20 transform duration-300 transition-all invisible translate-y-80 group-hover:visible group-hover:bg-black text-white group-hover:bg-opacity-50 group-hover:translate-y-0 w-full h-full ${i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>


                                            <div className=''>
                                                <h1 className="text-3xl md:text-3xl lg:text-5xl font-bold">{project.title}</h1>
                                                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi</p>
                                                <div className='flex flex-wrap'>
                                                    {
                                                        project.technology.map((tech, i) => <div key={i} className='mx-2 flex items-center wrap'>
                                                            <img className='h-5 mr-1 ' src={tech.image} alt="" srcSet="" />
                                                            <span>{tech.name}</span>
                                                        </div>)
                                                    }
                                                </div>
                                                <button className="btn btn-primary mt-6 normal-case">See Details</button>
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
                                <div className="card-body w-full">
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
