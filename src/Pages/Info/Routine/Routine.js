import axios from 'axios';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserContext } from '../../../Contexts/UserContex';
import NLoadingMini from '../../../components/shared/Loading/NLoadingMini';

const Routine = () => {
	const [routineImg, setRoutineImg] = useState('');
	const [updating, setUpdating] = useState(false);
	const [inside, setInside] = useState(false);

	const navigate = useNavigate();

	const inputRef = useRef();

	const { userData } = useUserContext();

	const { isLoading: loadingRoutine, data: routine } = useQuery(['routine'], () => fetch(`https://section-n-server.vercel.app/routine`).then((res) => res && res.json()));

	useEffect(() => {
		setRoutineImg(routine?.routineData?.routineImg);
	}, [routine]);

	const uploadRoutine = async (e) => {
		const image = e.target.files[0];
		const formData = new FormData();
		formData.append('image', image);
		const imageApiKey = '906bfdafb7a4a5b92021d570714ff50f';
		const today = new Date();

		if (image) {
			setUpdating(true);
			await axios
				.post(`https://api.imgbb.com/1/upload?key=${imageApiKey}`, formData)
				.then((res) => {
					if (res.status === 200) {
						const routineData = {
							routineImg: res.data?.data?.url,
							uploader: userData.displayName,
							date: today,
						};

						axios.put('https://section-n-server.vercel.app/routine', routineData).then((response) => {
							if (response.status === 200) {
								setRoutineImg(res?.data?.data?.url);
								toast.success('Updated Routine');
							}
						});
					}
				})
				.catch((err) => {
					console.log(err);
					setUpdating(false);
					toast.error('Something Went Wrong');
				});
		}
	};

	function handleUpload() {
		if (userData?.verification === 'verified') {
			inputRef.current.click();
		} else {
			navigate('/settings/verify');
		}
	}

	if (loadingRoutine) return <NLoadingMini title="Loading Routine" />;

	return (
		<>
			<div className="w-full my-5 md:my-20">
				<h1 className="text-3xl font-bold mb-5 md:mb-10 text-center"> Class Routine</h1>
				<InView threshold={0.2}>
					{({ inView, ref }) => (
						<div className="flex flex-col items-center">
							<motion.img
								ref={ref}
								initial="hidden"
								animate={`${inView && 'visible'}`}
								variants={{
									hidden: { opacity: 0 },
									visible: {
										opacity: 1,
										transition: {
											duration: 1.5,
											ease: 'easeInOut',
										},
									},
								}}
								onLoad={() => setUpdating(false)}
								className="h-96 w-auto max-w-full md:w-3/5 md:h-auto md:max-h-full object-contain mx-auto"
								src={routineImg}
								alt=""
							/>

							<div className="w-fit mx-auto mt-10 text-center">
								<h2 className="font-semibold">
									Updated By : <span className="poppins">{routine?.routineData?.uploader}</span>
								</h2>
								{routine?.routineData?.date && <h2 className="font-semibold">{format(Date.parse(routine?.routineData?.date), 'PP')}</h2>}
							</div>

							<input onChange={(e) => uploadRoutine(e)} type="file" className="hidden" ref={inputRef} />

							<div className="mt-6">
								<span className="group"></span>
								{updating ? (
									<button className={`btn btn-primary loading`}>Updating</button>
								) : (
									<div className="group w-fit">
										<div
											onMouseEnter={() => setInside(true)}
											onMouseLeave={() => setInside(false)}
											className={`border-4 absolute btn opacity-0 z-10 ${userData?.verification === 'verified' && 'hidden'}`}>
											Update Routine
										</div>
										<button
											onClick={() => handleUpload()}
											className={`z-0 btn btn-primary ${userData?.verification !== 'verified' && inside && 'translate-x-40 '} ${userData?.verification !== 'verified' && 'btn-disabled'}`}>
											Update Routine
										</button>
									</div>
								)}
							</div>
						</div>
					)}
				</InView>
			</div>
		</>
	);
};

export default Routine;
