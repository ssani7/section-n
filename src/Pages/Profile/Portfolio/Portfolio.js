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
import { useInView, InView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser'


const Portfolio = ({ reference }) => {
    // const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [about, setAbout] = useState({
        name: "Sanaullah Sani",
        designation: "Junior Web Developer",
        bio: "I am a Junior Web Developer. I am currently a student and have been learning web develpment for half a year now. I make dynamic full stack web application using #reactjs #node.js #mongoDB #javaScript. I am a student and completing my BSC in Computer Sciene in Daffodil International University",
        email: "sanaullah.sani756@gmail.com"

    })



    const projects = [
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

    const preview = [
        { name: 'Projects Done', number: 43, path: "students" },
        { name: 'Appreciation', number: 20, path: "achievements/all" },
        { name: 'Technology Skills', number: 20, path: "courses" },
    ];

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
        <div className='bg-base-100 pt-20 overflow-x-hidden'>
            <div className='lg:pt-0 md:w-full lg:w-full flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-bold mb-28 text-center'>About </h1>

                <InView>
                    {({ inView, ref, entry }) => (
                        <div className='flex justify-center' ref={ref}>
                            <motion.div
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
                                className='bg-base-300 mx-6 xl:w-9/12 lg:mx-32 text-center md:text-left rounded-2xl flex flex-col-reverse items-center md:flex-row md:relative'>
                                <div className='lg:w-2/3 pl-12 py-10 text-base-content'>

                                    <h1 className="text-5xl lg:text-7xl font-bold">{about?.name}</h1>

                                    <h1 className="text-2xl lg:text-3xl font-bold mt-4 poppins">#{about?.designation}</h1>

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
                                    src='https://i.ibb.co/kQdMxMC/sani.jpg'
                                    className="z-20 h-60 object-cover w-2/3 md:w-1/3 xl:w-1/4 right-0 shadow-2xl rounded-full mt-3 md:m-0  md:-right-10 md:rounded-lg md:h-auto md:max-h-full  md:absolute " alt='' />

                            </motion.div>
                        </div>
                    )}
                </InView>

            </div>

            <InView threshold={1}>
                {
                    ({ inView, ref, entry }) => (
                        <div className='grid grid-cols-1 lg:grid-cols-3 justify-center gap-10 mx-auto w-full my-20 py-10 border-y' ref={ref}>
                            {
                                preview.map((info, i) =>
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

            {/* projects */}
            <div className='my-20 overflow-y-hidden'>
                <h2 className='text-3xl font-bold text-center '>Projects</h2>
                <div className='my-20 grid grid-cols-1 lg:grid-cols-3  gap-10 mx-6 lg:mx-20'>
                    {
                        projects.map((project, i) => <InView threshold={.3} triggerOnce={false}>
                            {({ inView, ref, entry }) => (
                                <div ref={ref}>
                                    <motion.div variants={container}
                                        initial="hidden"
                                        animate={`${inView && 'visible'}`} key={i} className="hero rounded-xl shadow-2xl h-full relative group cursor-pointer overflow-y-hidden">

                                        <motion.img variants={item} src={project.image} className="rounded-xl lg:mx-12 absolute w-full z-10 h-full object-cover" alt='' />

                                        <div className={` hero-content px-6 py-10 rounded-xl flex-col z-20 transform duration-300 transition-all invisible translate-y-52 group-hover:visible group-hover:bg-black text-white group-hover:bg-opacity-50 group-hover:translate-y-0 w-full h-full ${i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>


                                            <div className=''>
                                                <h1 className="text-3xl md:text-3xl lg:text-5xl font-bold invisible  group-hover:visible">{project.title}</h1>
                                                <p className="py-6 invisible  group-hover:visible">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi</p>
                                                <div className='flex flex-wrap'>
                                                    {
                                                        project.technology.map((tech, i) => <div key={i} className='mx-2 flex items-center wrap invisible  group-hover:visible'>
                                                            <img className='h-5 mr-1 ' src={tech.image} alt="" srcSet="" />
                                                            <span>{tech.name}</span>
                                                        </div>)
                                                    }
                                                </div>
                                                <button className="btn btn-primary mt-6 normal-case invisible  group-hover:visible">See Details</button>
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
            <div ref={reference} className='w-full flex justify-center items-center my-20'>
                <div className="card w-full md:w-3/5 lg:w-3/5 bg-base-100 shadow-xl lg:px-10 mx-3 pb-6">
                    <div className="card-body w-full">
                        <h2 className="card-title text-3xl font-bold justify-center mb-6">Send Me an Email</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full lg:max-w-2xl">
                                <input type="email" placeholder="Your Email Address" className="input input-bordered my-6 text-xl w-full h-14" {...register("from_name", { required: true })} />
                            </div>
                            <div className="form-control w-full">
                                <input type="text" placeholder="Subject" className="input input-bordered mb-6 text-xl w-full h-14" {...register("subject", { required: true })} />
                            </div>
                            <div className="form-control">
                                <textarea className="textarea textarea-bordered h-32 text-xl" placeholder="Message" {...register("message", { required: true })}></textarea>
                            </div>

                            {errors.exampleRequired && <span>This field is required</span>}

                            <input className="btn btn-primary w-full mt-4 normal-case" type="submit" value='Send' />
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Portfolio;
