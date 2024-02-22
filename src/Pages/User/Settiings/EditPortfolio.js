import { faFacebookF, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCircleUser, faFileArrowDown, faImage, faPhone, faPlusCircle, faTrash, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NLoading from '../../../components/shared/Loading/NLoading';
import useDBUser from '../../../hooks/useDBUser';

export const ghostInput = 'w-full bg-transparent outline-none focus:border-b overflow-hidden placeholder:my-10  placeholder:text-gray-500';

const container = {
	hidden: { opacity: 0, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.5,
			staggerChildren: 0.5,
			duration: 0.5,
		},
	},
};

const item = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.5,
		},
	},
};

const EditPortfolio = () => {
	const navigate = useNavigate();

	const [updating, setUpdating] = useState({
		task: '',
	});
	const [cover, setCover] = useState('https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png');

	const [dp, setDp] = useState('https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png');

	const [statistics, setStatistics] = useState([{ number: '', name: '' }]);

	const [services, setServices] = useState([{ serviceName: '', serviceInfo: '', serviceIcon: '' }]);

	const [skills, setSkills] = useState([{ skillName: '', percentage: '' }]);

	const [projects, setProjects] = useState([
		{
			projectName: '',
			projectInfo: '',
			image: '',
			link: '',
			techs: '',
			// techs: [
			//     { techName: "", techIcon: "" },
			//     { techName: "", techIcon: "" },
			// ]
		},
	]);

	const [reviews, setReviews] = useState([{ clientName: '', clientImg: '', clientCompany: '', review: '', rating: 0 }]);

	const dpRef = useRef();
	const serviceIconRef = useRef([]);
	const projectImgRef = useRef([]);
	const reviewImgRef = useRef([]);

	const [userData, loading] = useDBUser();

	useEffect(() => {
		serviceIconRef.current = serviceIconRef.current.slice(0, services.length);
		projectImgRef.current = projectImgRef.current.slice(0, projects.length);
	}, [services, projects]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		shouldUnregister: true,
	});

	useEffect(() => {
		if (userData?.portfolio) {
			setCover(userData?.portfolio?.cover);
			setDp(userData?.portfolio?.dp);
			setStatistics(userData?.portfolio?.statistics || []);
			setServices(userData?.portfolio?.services || []);
			setSkills(userData?.portfolio?.skills || []);
			setProjects(userData?.portfolio?.projects || []);
			setReviews(userData?.portfolio?.reviews || []);
		}

		let defaultValues = {};
		defaultValues.heading1 = userData?.portfolio?.heading1;
		defaultValues.heading2 = userData?.portfolio?.heading2;
		defaultValues.name = userData?.portfolio?.name;
		defaultValues.designation = userData?.portfolio?.designation;
		defaultValues.bio = userData?.portfolio?.bio;
		defaultValues.experience = userData?.portfolio?.experience;
		defaultValues.cv = userData?.portfolio?.cv;
		defaultValues.fb = userData?.portfolio?.fb;
		defaultValues.twitter = userData?.portfolio?.twitter;
		defaultValues.linkedin = userData?.portfolio?.linkedin;
		defaultValues.phone = userData?.portfolio?.phone;
		defaultValues.email = userData?.portfolio?.email;

		reset({ ...defaultValues });
	}, [userData, reset]);

	const uploadPic = async (image, task) => {
		const formData = new FormData();
		if (image) {
			formData.append('image', image[0]);
		}
		const imageApiKey = '906bfdafb7a4a5b92021d570714ff50f';

		if (image[0]) {
			setUpdating({ task });
			return await axios.post(`https://api.imgbb.com/1/upload?key=${imageApiKey}`, formData);
		}
	};

	const handleCover = (e) => {
		uploadPic(e.target.files, 'cover')
			.then((res) => {
				if (res.status === 200) {
					setCover(res.data.data.url);
				}
			})
			.catch((error) => console.log(error));
	};

	const handleDp = (e) => {
		e.stopPropagation();
		uploadPic(e.target.files, 'dp')
			.then((res) => {
				if (res.status === 200) {
					setDp(res.data.data.url);
				}
			})
			.catch((error) => console.log(error));
	};

	const handleServiceIcon = (e, i) => {
		uploadPic(e.target.files, `serviceIcon${i}`)
			.then((res) => {
				if (res.status === 200) {
					const newServices = [...services];
					newServices[i].serviceIcon = res.data.data.url;
					setServices(newServices);
				}
			})
			.catch((error) => console.log(error));
	};

	const handleProjectImg = (e, i) => {
		uploadPic(e.target.files, `projectImg${i}`)
			.then((res) => {
				if (res.status === 200) {
					const newProjects = [...projects];
					newProjects[i].image = res.data.data.url;
					setProjects(newProjects);
				}
			})
			.catch((error) => console.log(error));
		console.log('e = ', e.target.files, 'i = ', i);
	};

	const handleReviewtImg = (e, i) => {
		uploadPic(e.target.files, `reviewImg${i}`)
			.then((res) => {
				if (res.status === 200) {
					const newReview = [...reviews];
					newReview[i].clientImg = res.data.data.url;
					setReviews(newReview);
				}
			})
			.catch((error) => console.log(error));
	};

	const handleStats = (e, i) => {
		e.stopPropagation();

		const { name, value } = e.target;
		const newStats = [...statistics];
		newStats[i][name] = value;

		setStatistics(newStats);
	};

	const handleServices = (e, i) => {
		e.stopPropagation();

		const { name, value } = e.target;
		const newServices = [...services];
		newServices[i][name] = value;

		setServices(newServices);
	};

	const handleSkills = (e, i) => {
		e.stopPropagation();

		const { name, value } = e.target;
		const newSkills = [...skills];
		newSkills[i][name] = value;

		setSkills(newSkills);
	};

	const handleProjects = (e, i) => {
		e.stopPropagation();

		const { name, value } = e.target;
		const newProjects = [...projects];
		newProjects[i][name] = value;

		setProjects(newProjects);
	};

	const handleReviews = (e, i) => {
		e.stopPropagation();

		const { name, value } = e.target;
		const newReviews = [...reviews];
		newReviews[i][name] = value;

		setReviews(newReviews);
	};

	const onSubmit = async (data) => {
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
			skills: skills,
			projects: projects,
			reviews: reviews,
			email: data.email,
			fb: data.fb,
			twitter: data.twitter,
			linkedin: data.linkedin,
			phone: data.phone,
		};
		console.log(portfolioData);

		setUpdating({ task: 'uploading' });
		await axios
			.post(`https://section-n-server.vercel.app/user/portfolio/update?id=${userData?._id}&verification=${userData?.verification}`, portfolioData)
			.then((res) => {
				setUpdating({ task: '' });
				if (res.data.modifiedCount > 0) toast.success('Updated Portfolio');
				else toast.error('Nothing Updated');
				console.log(res);
			})
			.catch((errors) => {
				console.log(errors);
				setUpdating({ task: '' });
				toast.error('Something Went Wrong');
			});
	};

	if (loading) return <NLoading />;

	if (userData?.verification !== 'verified')
		return (
			<div className="min-h-screen w-full flex flex-col justify-center items-center text-center">
				<h2 className="text-3xl">You are not verified. Please Verify account first to create your portfolio</h2>

				<button onClick={() => navigate('/settings/verify')} className="link mt-10 text-2xl">
					Verify Account?
				</button>
			</div>
		);
	return (
		<div className="w-full bg-base-100">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="relative w-full min-h-screen flex items-center justify-center">
					<img onLoad={() => setUpdating({ task: '' })} src={cover} alt="" className="w-full h-full absolute object-cover" />
					<div className="h-full w-full bg-black absolute bg-opacity-40"></div>
					<div className="z-20 px-6">
						<input
							type="text"
							placeholder={`Type a Heading.\n eg. Hello! Welcome to my portfolio!`}
							className={`${ghostInput} text-white text-center text-2xl md:text-5xl xl:text-6xl 2xl:text-8xl great-vibes placeholder:text-lg placeholder:md:text-5xl placeholder:2xl:text-7xl border-b mb-4`}
							{...register('heading1', {
								required: 'Please Add Atleast This Heading',
							})}
						/>
						{errors?.heading1 && <small className="text-error mx-auto">{errors.heading1.message}</small>}

						<input
							type="text"
							placeholder="Type another Heading. eg. My name is Solimuddin!"
							className={`${ghostInput} text-white lg:py-2 text-center text-xl md:text-4xl xl:text-5xl 2xl:text-6xl great-vibes placeholder:text-base placeholder:md:text-4xl placeholder:2xl:text-6xl border-b`}
							{...register('heading2')}
						/>

						<input
							type="file"
							name="cover"
							id="cover"
							className="hidden"
							{...register('cover', {
								onChange: (e) => handleCover(e),
							})}
						/>
					</div>
				</div>
				<div className="w-full flex justify-center py-10">
					{updating?.task === 'cover' ? (
						<label className="btn btn-primary mx-auto loading md:w-1/5 capitalize">Updating</label>
					) : (
						<label htmlFor="cover" className="btn btn-primary mx-auto md:w-1/5 capitalize">
							Add Cover Photo
						</label>
					)}
				</div>

				{/* about */}
				<div className="my-20 lg:pt-0 md:w-full lg:w-full flex flex-col justify-center items-center overflow-x-hidden ">
					<h1 className="text-3xl font-bold mb-10 text-center">About </h1>

					<InView threshold={0.15} triggerOnce={false}>
						{({ inView, ref, entry }) => (
							<div className="flex justify-center w-full" ref={ref}>
								<motion.div
									initial="hidden"
									animate={`${inView && 'animate'}`}
									variants={{
										hidden: { opacity: 0, x: 200 },
										animate: {
											opacity: 1,
											x: 0,
											transition: {
												duration: 1,
											},
										},
									}}
									className="bg-base-300 mx-6 xl:w-full lg:mx-32 rounded-2xl flex flex-col-reverse items-center md:flex-row md:relative">
									<div className="lg:w-2/4 md:pl-12 md:py-10 p-8 text-base-content ">
										<input
											type="text"
											className={`${ghostInput} text-4xl lg:text-7xl text-center md:text-left font-bold`}
											placeholder="Your Name"
											{...register('name', {
												required: 'Please Add Your Name',
											})}
										/>

										{errors?.name && <small className="text-error">{errors.name.message}</small>}

										<div className="w-full">
											<input
												type="text"
												className={`${ghostInput} text-xl lg:text-3xl text-center md:text-left font-bold mt-4 poppins`}
												placeholder="Your Designation"
												{...register('designation', {
													required: 'Please Add Your Name',
												})}
											/>

											{errors?.designation && <small className="text-error">{errors.designation.message}</small>}
										</div>

										<div className="flex flex-col w-full">
											<textarea
												type="text"
												className={`${ghostInput} text-left my-5 h-40 text-lg textarea textarea-bordered`}
												placeholder="Write Your bio here"
												{...register('bio', {
													required: 'Please Add Your Name',
												})}
											/>

											{errors?.bio && <small className="text-error">{errors.bio.message}</small>}
										</div>

										<textarea
											type="text"
											className={`${ghostInput} text-left my-5 md:w-4/6 h-28 text-lg textarea textarea-bordered`}
											placeholder="Write Your Experiences and Skills"
											{...register('experience')}
										/>

										<div className="flex items-end">
											<FontAwesomeIcon className=" h-5 w-6 md:h-8 md:w-8 mr-3" icon={faFileArrowDown} />

											<input type="text" className={`${ghostInput} text-left lg:text-2xl mt-4 border-b`} placeholder="Add Resume/CV Download Link" {...register('cv')} />
										</div>
									</div>

									<input type="file" ref={dpRef} className="hidden" onChange={(e) => handleDp(e)} />

									<motion.div
										initial="hidden"
										animate={`${inView && 'animate'}`}
										whileTap={{
											scale: 0.8,
											transition: { duration: 0.1 },
										}}
										variants={{
											hidden: { opacity: 0, x: -500 },
											animate: {
												opacity: 1,
												x: 0,
												scale: 0.9,
												transition: {
													ease: 'easeOut',
													duration: 1,
												},
											},
										}}
										className="h-60 w-60 md:w-1/3 xl:w-1/3 shadow-2xl rounded-full mt-3 md:m-0 md:-right-10 md:rounded-lg md:h-full md:max-h-full md:absolute group cursor-pointer overflow-hidden"
										onClick={() => {
											dpRef.current.click();
										}}>
										<img src={dp} onLoad={() => setUpdating({ task: '' })} className="z-20 object-cover w-full h-full rounded-full md:rounded-lg" alt="" />

										<div className="md:w-full h-full transition duration-500 md:group-hover:bg-black absolute top-0 md:group-hover:bg-opacity-30"></div>

										{updating?.task === 'dp' && <div className="btn btn-square loading bg-opacity-50 absolute z-50 h-full w-full text-4xl top-0"></div>}

										<div className="absolute z-30 bottom-2 left-2 transform transition duration-500 invisible translate-y-full md:group-hover:visible group-hover:translate-y-0 flex items-center text-gray-200">
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
				<div className="my-20">
					<h2 className="text-3xl font-bold mb-10 text-center">Add a statistics</h2>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center justify-center border-y py-5">
						{statistics?.map((statistic, i) => (
							<div key={i} className="flex flex-col justify-center items-center mx-auto relative">
								{
									<span className="absolute top-3 right-2 btn btn-xs badge-outline btn-error" onClick={() => setStatistics([...statistics].filter((stat, index) => index !== i))}>
										x
									</span>
								}
								<input
									name="number"
									type="number"
									required
									placeholder="Add a number"
									className={`${ghostInput} text-5xl w-3/5 text-center placeholder:text-xl`}
									onChange={(e) => handleStats(e, i)}
									value={statistic.number}
								/>

								<input
									type="text"
									required
									placeholder="Add Statistic Name"
									className={`${ghostInput} text-4xl text-center my-4 h-full`}
									onChange={(e) => handleStats(e, i)}
									name="name"
									value={statistic.name}
								/>
							</div>
						))}
						{statistics.length < 3 && (
							<div className="w-full">
								<motion.div
									whileTap={{ scale: 0.9 }}
									className="border w-fit flex flex-col p-5 justify-center items-center rounded-lg btn-outline cursor-pointer mx-auto"
									onClick={() => setStatistics([...statistics, { name: '', number: '' }])}>
									<FontAwesomeIcon icon={faPlusCircle} className="h-6 w-6 py-4" />
									<h1>{`Add ${statistics?.length > 0 ? 'One More' : 'A'} Statistic?`}</h1>
								</motion.div>
							</div>
						)}
					</div>
				</div>

				{/* services */}
				<div className="w-full">
					<h1 className="text-3xl font-bold mb-10 text-center">What Services Do You Provide?</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-center justify-center mx-10">
						{services?.map((service, i) => (
							<div key={i} className="card max-w-sm bg-base-200 shadow-xl py-10 px-5 mx-auto h-full w-full">
								{
									<span className="absolute top-3 right-2 btn btn-xs btn-outline btn-error" onClick={() => setServices([...services].filter((stat, index) => index !== i))}>
										x
									</span>
								}

								<motion.figure whileTap={{ scale: 0.9 }} onClick={() => serviceIconRef.current[i].click()} className="h-32 w-32 mx-auto cursor-pointer relative">
									{service.serviceIcon ? (
										<img onLoad={() => setUpdating({ task: '' })} src={service.serviceIcon} alt="Shoes" className="rounded-xl w-full h-full object-cover" />
									) : (
										<div className="flex flex-col items-center justify-center border rounded-xl w-full h-full px-3 mb-3">
											<FontAwesomeIcon icon={faImage} className="h-10 w-10" />
											<h1 className="mt-3 text-center text-sm">Add A Service Icon</h1>
										</div>
									)}
									{updating.task === `serviceIcon${i}` && <div className="btn btn-square loading bg-opacity-50 absolute z-50 h-full w-full text-4xl top-0"></div>}
								</motion.figure>

								<input type="file" name={i} id="serviceIcon" className="hidden" ref={(el) => (serviceIconRef.current[i] = el)} onChange={(e) => handleServiceIcon(e, i)} />

								<div className="flex flex-col items-center text-center px-4">
									<input
										required
										name="serviceName"
										type="text"
										placeholder="Add Service Name"
										className={`${ghostInput} card-title text-center border-b w-auto my-4`}
										onChange={(e) => handleServices(e, i)}
										value={service.serviceName}
									/>

									<textarea
										required
										name="serviceInfo"
										type="text"
										placeholder="Add Some Details"
										className={`textarea textarea-bordered w-full bg-transparent`}
										onChange={(e) => handleServices(e, i)}
										value={service.serviceInfo}
									/>
								</div>
							</div>
						))}
						{services.length < 4 && (
							<div className="mx-auto">
								<motion.div
									whileTap={{ scale: 0.9 }}
									className="border w-fit flex flex-col p-5 justify-center items-center rounded-lg btn-outline cursor-pointer mx-auto"
									onClick={() => setServices([...services, { serviceName: '', serviceInfo: '', serviceIcon: '' }])}>
									<FontAwesomeIcon icon={faPlusCircle} className="h-6 w-6 py-4" />

									<h1>{`Add ${services?.length > 0 ? 'One More' : 'A'} Service?`}</h1>
								</motion.div>
							</div>
						)}
					</div>
				</div>

				{/* skills */}
				<section className="my-20">
					<h2 className="text-xl lg:text-3xl font-bold mb-10 text-center">Add Your Skills or Your Expertise With The Tools & Technologies You Use</h2>

					<div>
						<div className="max-w-3xl mx-auto">
							{skills?.map((skill, i) => (
								<div key={i} className="flex flex-col md:flex-row items-center justify-evenly mx-4 border-y py-5 md:border-y-0">
									<input
										type="text"
										required
										name="skillName"
										placeholder="Skill/Technology Name. eg: Photoshop/Reactjs"
										className={`input input-bordered w-full md:w-3/5 border md:text-lg`}
										value={skill.skillName}
										onChange={(e) => handleSkills(e, i)}
									/>

									<div className="md:w-1/3 my-4 ml-3 md:my-0">
										<input
											type="number"
											required
											name="percentage"
											placeholder="Expertise"
											className={`input input-bordered w-10/12 border md:text-lg`}
											value={skill.percentage}
											onChange={(e) => handleSkills(e, i)}
										/>{' '}
										%
									</div>

									{skills.length >= 2 && (
										<span onClick={() => setSkills([...skills].filter((stat, index) => index !== i))} className="btn btn-sm btn-error">
											<FontAwesomeIcon icon={faTrash} />
										</span>
									)}
								</div>
							))}
						</div>
						<motion.div
							whileTap={{ scale: 0.9 }}
							className="border w-fit flex flex-col p-2 justify-center items-center rounded-lg btn-outline cursor-pointer mx-auto mt-5"
							onClick={() => setSkills([...skills, { skillName: '', percentage: '' }])}>
							<FontAwesomeIcon icon={faPlusCircle} className="h-6 w-6 py-2" />
							<h1>Add More Skills?</h1>
						</motion.div>
					</div>
				</section>

				{/* projects */}
				<div className="my-20">
					<h2 className="text-3xl font-bold mb-10 text-center">Add Your Projects</h2>
					<div className="flex flex-col justify-center items-center w-full">
						{projects?.map((project, i) => (
							<div key={i} className="card lg:card-side bg-base-200 shadow-xl md:w-full md:max-w-5xl my-5 mx-6">
								<motion.figure whileTap={{ scale: 0.9 }} onClick={() => projectImgRef.current[i].click()} className="w-full lg:w-1/2 h-72 rounded-2xl mx-auto lg:ml-5 my-auto relative">
									{project.image ? (
										<img onLoad={() => setUpdating({ task: '' })} src={project.image} alt="project Pic" className="rounded-xl w-full h-full object-contain absolute" />
									) : (
										<div className="w-1/2 h-1/2 rounded-xl flex flex-col justify-center items-center border cursor-pointer p-4">
											<FontAwesomeIcon icon={faImage} className="h-10 w-10" />
											<h2 className="mt-4">Add Project Image</h2>
										</div>
									)}

									<input type="file" className="hidden" ref={(el) => (projectImgRef.current[i] = el)} onChange={(e) => handleProjectImg(e, i)} />
									{updating?.task === `projectImg${i}` && <div className="btn btn-square loading bg-opacity-50 absolute z-50 h-full w-full text-4xl top-0"></div>}
								</motion.figure>

								<div className="card-body my-5">
									<input
										required
										type="text"
										value={project.projectName}
										name="projectName"
										placeholder="Type Project Name"
										className={`${ghostInput} text-2xl border-b`}
										onChange={(e) => handleProjects(e, i)}
									/>

									<textarea
										value={project.projectInfo}
										required
										type="text"
										name="projectInfo"
										placeholder="Type Some Description"
										className={`textarea textarea-bordered mt-3 h-28`}
										onChange={(e) => handleProjects(e, i)}
									/>

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

									<input
										required
										value={project.techs}
										type="text"
										name="techs"
										placeholder="Add technologies you used"
										className="input input-bordered w-full"
										onChange={(e) => handleProjects(e, i)}
									/>

									<input required value={project.link} name="link" type="text" placeholder="Add Project Link" className="input input-bordered w-full" onChange={(e) => handleProjects(e, i)} />
								</div>

								{
									<span className="btn btn-sm btn-outline btn-circle btn-error absolute top-3 right-3" onClick={() => setProjects([...projects].filter((stat, index) => index !== i))}>
										x
									</span>
								}
							</div>
						))}
						<motion.div
							whileTap={{ scale: 0.9 }}
							className="border w-fit flex flex-col p-2 justify-center items-center rounded-lg btn-outline cursor-pointer mx-auto mt-5"
							onClick={() =>
								setProjects([
									...projects,
									{
										projectName: '',
										projectInfo: '',
										image: '',
										link: '',
										techs: '',
									},
								])
							}>
							<FontAwesomeIcon icon={faPlusCircle} className="h-6 w-6 py-2" />
							<h1>{`Add ${projects?.length > 0 ? 'One More' : 'A'} Project?`}</h1>
						</motion.div>
					</div>
				</div>

				{/* reviews */}
				<div className="my-20">
					<h2 className="text-3xl font-bold text-center ">Add Client Reviews</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-5 lg:gap-10 mx-auto  md:w-fit items-center justify-center">
						{reviews?.map((review, i) => (
							<div class="card w-96 bg-base-100 shadow-xl justify-center items-center p-5 mx-auto relative">
								<motion.div whileTap={{ scale: 0.9 }} className="h-44 w-44 cursor-pointer relative rounded-full" onClick={() => reviewImgRef.current[i].click()}>
									{review.clientImg ? (
										<img onLoad={() => setUpdating({ task: '' })} src={review.clientImg} alt="Client" class="w-full h-full object-cover rounded-full" />
									) : (
										<div className="border rounded-xl p-4 w-full h-full flex flex-col items-center">
											<FontAwesomeIcon icon={faCircleUser} className="h-20 w-20 p-4" />
											<h2 className="text-center">Add Client Image</h2>
										</div>
									)}
									{updating?.task === `reviewImg${i}` && <div className="btn btn-square loading bg-black opacity-40 absolute h-full w-full inset-0 flex justify-center"></div>}
									<input type="file" className="hidden" ref={(el) => (reviewImgRef.current[i] = el)} onChange={(e) => handleReviewtImg(e, i)} />
								</motion.div>
								<div class="items-center text-center py-5 px-3 ">
									<h2 className="mt-2 flex items-center justify-center">
										Ratings :
										<input type="number" name="rating" min="0" max="5" required value={review.rating} onChange={(e) => handleReviews(e, i)} className=" w-16 h-10 mx-1 input input-bordered" /> /5
									</h2>

									<input
										type="text"
										value={review.clientName}
										name="clientName"
										onChange={(e) => handleReviews(e, i)}
										className={`${ghostInput} border-b my-2 text-center `}
										placeholder="Client Name"
									/>

									<input
										type="text"
										name="clientCompany"
										value={review.clientCompany}
										onChange={(e) => handleReviews(e, i)}
										className={`${ghostInput} border-b my-2 text-center `}
										placeholder="Client Company Name"
									/>

									<textarea name="review" value={review.review} onChange={(e) => handleReviews(e, i)} className="w-full p-3 mt-2 textarea textarea-bordered" rows="3"></textarea>
								</div>

								<span className="btn btn-sm btn-outline btn-circle btn-error absolute top-3 right-3" onClick={() => setReviews([...reviews].filter((rev, index) => index !== i))}>
									x
								</span>
							</div>
						))}
						<motion.div
							whileTap={{ scale: 0.9 }}
							className="border w-fit h-fit flex flex-col p-2 justify-center items-center rounded-lg btn-outline cursor-pointer mx-auto mt-5"
							onClick={() => setReviews([...reviews, { clientName: '', clientImg: '', clientCompany: '', review: '', rating: '' }])}>
							<FontAwesomeIcon icon={faPlusCircle} className="h-6 w-6 py-2" />
							<h1>{`Add ${projects?.length > 0 ? 'One More' : 'A'} Project?`}</h1>
						</motion.div>
					</div>
				</div>

				{/* contact */}
				<h1 className="text-3xl font-bold text-center ">Contact Information</h1>
				<InView threshold={0.8} triggerOnce={true}>
					{({ inView, ref }) => (
						<motion.div ref={ref} initial="hidden" animate={`${inView && 'visible'}`} variants={container} className="w-full flex justify-center items-center my-20">
							<div className="card w-full md:w-3/5 lg:w-3/5 shadow-xl lg:px-10 mx-3 pb-6 bg-base-200">
								<div className="card-body w-full">
									<motion.div variants={item} className="form-control w-full">
										<input type="email" placeholder="Your Email Address" className="input input-bordered my-6 text-xl w-full h-14" {...register('email', { required: 'Email Address Lagbe Mia' })} />

										{errors?.email && <small className="text-error">{errors.email.message}</small>}
									</motion.div>

									<motion.div variants={item} className="flex items-end">
										<FontAwesomeIcon className=" h-5 w-6 md:h-8 md:w-8 mr-3 mt-5" icon={faFacebookF} />

										<input type="text" className={`${ghostInput} text-left lg:text-2xl mt-4 border-b`} placeholder="Add Facebook Profile Link" {...register('fb')} />
									</motion.div>

									<motion.div variants={item} className="flex items-end">
										<FontAwesomeIcon className=" h-5 w-6 md:h-8 md:w-8 mr-3 mt-5" icon={faTwitter} />

										<input type="text" className={`${ghostInput} text-left lg:text-2xl mt-4 border-b`} placeholder="Add Twitter Profile Link" {...register('twitter')} />
									</motion.div>

									<motion.div variants={item} className="flex items-end">
										<FontAwesomeIcon className=" h-5 w-6 md:h-8 md:w-8 mr-3 mt-5" icon={faLinkedin} />

										<input type="text" className={`${ghostInput} text-left lg:text-2xl mt-4 border-b`} placeholder="Add LinkedIn Profile Link" {...register('linkedin')} />
									</motion.div>

									<motion.div variants={item} className="flex items-end">
										<FontAwesomeIcon className=" h-5 w-6 md:h-8 md:w-8 mr-3 mt-5" icon={faPhone} />

										<input type="text" className={`${ghostInput} text-left lg:text-2xl mt-4 border-b`} placeholder="Add Your Phone Number" {...register('phone')} />
									</motion.div>
								</div>
							</div>
						</motion.div>
					)}
				</InView>

				<div className="flex justify-center pb-20">
					{updating?.task === 'uploading' ? (
						<span className="btn btn-primary loading max-w-xl w-full capitalize">Submitting Portfolio</span>
					) : (
						<input type="submit" value="Submit" className="btn btn-primary max-w-xl w-full capitalize" />
					)}
				</div>
			</form>
		</div>
	);
};

export default EditPortfolio;
