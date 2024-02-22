import { faFacebookF, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faAt, faBuildingColumns, faCircleCheck, faGraduationCap, faIdCard, faUserPen, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useInView } from 'react-intersection-observer';
import { useQuery } from 'react-query';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import NLoading from '../../../components/shared/Loading/NLoading';
import auth from '../../../firebase.init';
import useToken from '../../../hooks/useToken';

const UserProfile = () => {
	const { email, option } = useParams();
	const navigate = useNavigate();
	const [user, loading] = useAuthState(auth);
	let location = useLocation();

	const token = useToken();

	useEffect(() => {
		window.scrollTo(0, 0);
	});

	const { isLoading, data: userFromDb } = useQuery(['user', email], () => fetch(`https://section-n-server.vercel.app/user/${email}`).then((res) => res.json()));

	const { ref, inView } = useInView({
		triggerOnce: true,
	});

	if (isLoading || loading) {
		return <NLoading />;
	}

	if (option === 'self' && !user) return <Navigate to="/login" state={{ from: location }} replace />;

	if (option === 'self' && user?.email !== email) return <Navigate to={`/userProfile/${user?.email}/self`} state={{ from: location }} replace />;

	return (
		<>
			<div className="px-5 flex flex-col pt-40 md:pt-60 xl:justify-center items-center bg-base-100 overflow-x-hidden md:px-10 md:py-0 md:w-full xl:h-screen lg:pt-28 2xl:pt-0 h-full">
				<motion.div
					ref={ref}
					initial="hidden"
					animate={`${inView && 'animate'}`}
					variants={{
						hidden: { opacity: 0, x: 200 },
						animate: {
							opacity: 1,
							x: 0,
							delay: 0.5,
							transition: {
								type: 'spring',
								stiffness: 50,
								duration: 1.5,
								delayChildren: 1,
								when: 'beforeChildren',
							},
						},
					}}
					className="bg-base-300 w-full text-left rounded-2xl flex flex-col-reverse items-center md:flex-row relative xl:max-w-6xl 2xl:max-w-7xl xl:py-10 2xl:py-20 xl:pl-10">
					<div className="w-full md:w-1/2 text-xs md:text-lg py-6 md:pl-10 text-base-content text-center md:text-left">
						<div className="relative">
							<span className="text-2xl md:text-3xl xl:text-6xl font-bold xl:mb-2 w-fit ">{userFromDb?.displayName}</span>
							{userFromDb?.verification === 'verified' && <FontAwesomeIcon className="text-blue-600 ml-1 mb-auto mt-1 h-4 w-4 md:ml-4 md:h-8 md:w-8 absolute" icon={faCircleCheck} />}
						</div>

						<div className="w-fit mx-auto md:mx-0">
							<p className="mt-1 md:mt-3 flex items-center text-2xs md:text-base w-fit xl:text-2xl xl:mt-5 tooltip" data-tip={`Email Addess`}>
								<FontAwesomeIcon icon={faAt} className="mr-4 w-3 h-3 md:h-5 md:w-5 xl:w-6 xl:h-6" />
								{userFromDb?.email}
							</p>

							<div className="mt-1 md:mt-3 flex items-center text-2xs md:text-base w-fit xl:text-2xl xl:mt-5 tooltip justify-start" data-tip={`${option === 'self' ? 'Your' : "User's"} University`}>
								<FontAwesomeIcon icon={faBuildingColumns} className="mr-4 w-3 h-3 md:h-5 md:w-5 xl:w-6 xl:h-6" />
								{userFromDb?.varsity || <span className="opacity-50 text-2xs md:text-base">{`${option === 'self' ? 'Your' : "User's"} university name is not submitted`}</span>}
							</div>

							<p className="mt-1 md:mt-3 flex items-center text-2xs md:text-base w-fit xl:text-2xl xl:mt-5 tooltip" data-tip={`${option === 'self' ? 'Your' : "User's"} Degree`}>
								<FontAwesomeIcon icon={faGraduationCap} className="mr-4 w-3 h-3 md:h-5 md:w-5 xl:w-6 xl:h-6" />
								{userFromDb?.degree || <span className="opacity-50 text-2xs md:text-base">{`${option === 'self' ? 'Your' : "User's"} degree is not submitted`}</span>}
							</p>

							<p className="mt-1 md:mt-3 flex items-center text-2xs md:text-base w-fit xl:text-2xl xl:mt-5 tooltip" data-tip={`Student ID`}>
								<FontAwesomeIcon icon={faIdCard} className="mr-4 w-3 h-3 md:h-5 md:w-5 xl:w-6 xl:h-6" />
								{userFromDb?.id || <span className="opacity-50 text-2xs md:text-base">{`${option === 'self' ? 'Your' : "User's"} Student ID is not submitted`}</span>}
							</p>

							<p className="mt-1 md:mt-3 flex items-center text-2xs md:text-base w-fit xl:text-2xl xl:mt-5 tooltip" data-tip={`Blood Group`}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-3 h-3 md:h-5 md:w-5 xl:w-6 xl:h-6 fill-red-700 mr-4">
									<path d="M16 319.1C16 245.9 118.3 89.43 166.9 19.3C179.2 1.585 204.8 1.585 217.1 19.3C265.7 89.43 368 245.9 368 319.1C368 417.2 289.2 496 192 496C94.8 496 16 417.2 16 319.1zM112 319.1C112 311.2 104.8 303.1 96 303.1C87.16 303.1 80 311.2 80 319.1C80 381.9 130.1 432 192 432C200.8 432 208 424.8 208 416C208 407.2 200.8 400 192 400C147.8 400 112 364.2 112 319.1z" />
								</svg>
								{userFromDb?.blood || <span className="opacity-50 text-2xs md:text-base">{`${option === 'self' ? 'Your' : "User's"} Blood group is not submitted`}</span>}
							</p>

							{option === 'self' ? (
								<>
									{userFromDb?.verification === 'verified' || (
										<button onClick={() => navigate('/settings/verify')} className="link link-hover mt-1 md:mt-3 flex items-center text-2xs md:text-base w-fit xl:text-2xl xl:mt-5 cursor-pointer">
											<FontAwesomeIcon icon={faUserPen} className="mr-4 w-3 h-3 md:h-5 md:w-5 xl:w-6 xl:h-6" />
											Verify Account and Become a Celebrity?
										</button>
									)}

									<button onClick={() => navigate('/settings')} className="link link-hover mt-1 md:mt-3 flex items-center text-2xs md:text-base w-fit xl:text-2xl xl:mt-5 cursor-pointer">
										<FontAwesomeIcon icon={faUserPen} className="mr-4 w-3 h-3 md:h-5 md:w-5 xl:w-6 xl:h-6" />
										Edit Profile
									</button>

									<button onClick={() => navigate('/editPortfolio')} className="link link-hover mt-1 md:mt-3 flex items-center text-2xs md:text-base w-fit xl:text-2xl xl:mt-5 cursor-pointer">
										<FontAwesomeIcon icon={faUserTie} className="mr-4 w-3 h-3 md:h-5 md:w-5 xl:w-6 xl:h-6" />
										{userFromDb?.portfolio ? 'Edit Portfolio' : 'Create Portfolio'}
									</button>
								</>
							) : (
								<>
									{userFromDb?.portfolio && (
										<p data-tip="Professional Portfolio" className="mt-1 md:mt-3 flex items-center text-2xs md:text-base w-fit xl:text-xl xl:mt-5 tooltip">
											<FontAwesomeIcon icon={faUserTie} className="w-3 h-3 md:h-5 md:w-5 xl:w-6 xl:h-6 fill-red-700 mr-4" />
											<span className="link" onClick={userFromDb ? () => navigate(`/userPortfolio/${userFromDb?.email}/other`) : undefined}>
												See Portfolio
											</span>
										</p>
									)}
								</>
							)}
						</div>

						<div className="md:mt-10 mt-3 w-fit mx-auto md:mx-0">
							<a
								target={`${userFromDb.fb ? '_blank' : '_self'}`}
								href={userFromDb?.fb || (option === 'self' ? '/settings' : undefined)}
								rel="noreferrer"
								className={`${userFromDb?.fb || 'tooltip tooltip-right md:tooltip'} w-fit`}
								data-tip={`${option === 'self' ? 'Add your Facebook profile link' : "User's Facebook profile link not submitted"} `}>
								<FontAwesomeIcon className={`h-4 md:h-8 mr-3 mt-2 md:mr-7 xl:h-10 hover:text-blue-600 hover:scale-125 cursor-pointer transition-all`} icon={faFacebookF} />
							</a>

							<a
								target={`${userFromDb.linkedin ? '_blank' : '_self'}`}
								href={userFromDb?.linkedin || (option === 'self' ? '/settings' : undefined)}
								rel="noreferrer"
								className={`${userFromDb?.linkedin || 'tooltip tooltip-right md:tooltip'} w-fit`}
								data-tip={`${option === 'self' ? 'Add your LinkedIn profile link' : "User's LinkedIn profile link not submitted"} `}>
								<FontAwesomeIcon className={`h-4 md:h-8 mr-3 mt-2 md:mr-7 xl:h-10 hover:text-blue-600 hover:scale-125 cursor-pointer transition-all`} icon={faLinkedin} />
							</a>

							<a
								target={`${userFromDb.twitter ? '_blank' : '_self'}`}
								href={userFromDb?.twitter || (option === 'self' ? '/settings' : undefined)}
								rel="noreferrer"
								className={`${userFromDb?.twitter || 'tooltip tooltip-right md:tooltip'} w-fit`}
								data-tip={`${option === 'self' ? 'Add your Twitter profile link' : "User's Twitter profile link not submitted"} `}>
								<FontAwesomeIcon className={`h-4 md:h-8 mr-3 mt-2 md:mr-7 xl:h-10 hover:text-blue-600 hover:scale-125 cursor-pointer transition-all`} icon={faTwitter} />
							</a>
						</div>
					</div>
					<motion.div
						initial="hidden"
						animate={`${inView && 'animate'}`}
						variants={{
							hidden: { opacity: 0, x: -200, scale: 0.8 },
							animate: {
								opacity: 1,
								x: 0,
								scale: 0.95,
								transition: {
									delay: 0.3,
									type: 'spring',
									stiffness: 50,
									duration: 1.5,
								},
							},
						}}
						className="drop-shadow-2xl rounded-full md:w-1/3 md:max-w-full md:h-full md:rounded-3xl md:absolute md:-right-5 lg:-right-14 xl:max-w-xl flex items-center">
						<img src={userFromDb?.photoURL} className="rounded-full w-40 h-40 object-cover md:z-20 md:rounded-3xl md:w-full md:h-auto max-h-full md:object-cover border-red-500 " alt="" />
					</motion.div>
				</motion.div>
			</div>
		</>
	);
};

export default UserProfile;
