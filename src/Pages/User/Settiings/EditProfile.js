import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useUserContext } from '../../../Contexts/UserContex';
import NLoading from '../../../components/shared/Loading/NLoading';
import auth from '../../../firebase.init';
import { uploadImg } from '../../../hooks/useUpload';

const EditProfile = () => {
	const [updating, setUpdating] = useState(false);
	const [visible, setvisible] = useState(false);
	const [password, setPassword] = useState('');
	const [emError, setEmError] = useState();
	const [passError, setPassError] = useState();
	const [currentUser, setCurrentUser] = useState({
		displayName: '',
		photoURL: '',
		email: '',
		varsity: '',
		degree: '',
		id: '',
		blood: '',
		fb: '',
		twitter: '',
		linkedin: '',
	});

	const { userData, loadingData, getUserData } = useUserContext();

	useEffect(() => {
		setCurrentUser(userData);
	}, [userData]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		unregister,
		getValues,
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		shouldUnregister: true,
	});

	useEffect(() => {
		if (password) {
			register('password', {
				validate: {
					size: (p) => p.length >= 6 || 'minimum 6 chatacter password required',
					character: (p) => /[a-zA-Z]/.test(p) || 'Must contain a character',
					number: (p) => /\d/.test(p) || 'Must contain a number',
					special: (p) => /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(p) || 'Must contain a special character',
				},
			});
		} else if (!password) {
			reset({ ...getValues(), password: undefined });
			unregister('password');
		}
	}, [password, unregister, getValues, register, reset]);

	async function updateUserDb(_id, verification, studentID, data) {
		try {
			setUpdating(true);
			const res = await axios.put(`https://section-n-server.vercel.app/user/update/${_id}/${verification}/${studentID || undefined}`, data, {
				headers: {
					'content-type': 'application/json',
				},
			});

			if (res.data.modifiedCount > 0) {
				await getUserData();
				reset();
				toast.success('Updated Profile');
			} else {
				toast.error('Nothing Updated');
			}
			setUpdating(false);
		} catch (error) {
			toast.error('Please login again or try again later');
			setUpdating(false);
			reset();
			console.log(error);
		}
	}

	const onSubmit = async (data) => {
		setUpdating(true);
		let updateCount = 0;
		let passUpdate = 0;
		let updatedUser = {};

		try {
			if (currentUser.photoURL !== userData?.photoURL) {
				try {
					const url = await uploadImg(data.image[0]);
					await updateProfile(auth.currentUser, { photoURL: url });
					updatedUser = { ...updatedUser, photoURL: url };
					++updateCount;
				} catch (error) {
					console.log(error);
					return toast.error(error.message);
				}
			}

			if (currentUser?.email !== userData?.email) {
				try {
					await updateEmail(auth.currentUser, currentUser.email);
					updatedUser = { ...updatedUser, email: currentUser?.email };
					++updateCount;
				} catch (error) {
					setEmError(error.message);
					return toast.error(error.message);
				}
			}

			if (userData?.displayName !== currentUser?.displayName) {
				try {
					await updateProfile(auth.currentUser, { displayName: currentUser?.displayName });
					updatedUser = { ...updatedUser, displayName: currentUser.displayName };
					++updateCount;
				} catch (error) {
					return toast.error(error.message);
				}
			}

			if (
				userData?.varsity !== currentUser?.varsity ||
				userData?.degree !== currentUser?.degree ||
				userData?.id !== currentUser?.id ||
				userData?.blood !== currentUser?.blood ||
				userData?.fb !== currentUser?.fb ||
				userData?.linkedin !== currentUser?.linkedin ||
				userData?.twitter !== currentUser?.twitter
			) {
				const { photoURL, displayName, email, ...rest } = currentUser;
				updatedUser = { ...updatedUser, ...rest };
				++updateCount;
			}

			if (password) {
				const confirm = window.confirm('Confirm to change password?!');
				if (confirm) {
					try {
						++passUpdate;
						await updatePassword(auth.currentUser, password);
						reset();
						toast.success('Changed Password');
						window.location.reload(false);
					} catch (error) {
						setPassError(error);
						return toast.error(error.message);
					}
				}
			}

			if (updateCount > 0) {
				await updateUserDb(userData._id, userData.verification, userData.id, updatedUser);
			} else if (passUpdate === 0) {
				toast.warn('Nothing To Update');
			}
		} catch (error) {
			toast.error('Something went wrong');
			console.log(error);
		} finally {
			setUpdating(false);
		}
	};

	if (loadingData) return <NLoading />;

	return (
		<div className="bg-base-100 mx-auto w-full flex flex-col mb-20 md:mb-0">
			<div className="flex flex-col xl:flex-row mt-6 w-full h-full px-5 gap-10">
				<div className="w-full xl:w-[500px] rounded-3xl mx-auto mt-8">
					<img className="w-full max-w-[400px] mx-auto rounded-3xl object-cover" src={currentUser?.photoURL} alt="" />
				</div>

				<form className="w-auto px-6" onSubmit={handleSubmit(onSubmit)}>
					<div className="grid md:grid-cols-2 gap-6">
						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text">Shundor Ekta Pic Den </span>
							</label>
							<input
								type="file"
								className="input input-bordered w-full"
								{...register('image', {
									onChange: (e) => setCurrentUser({ ...currentUser, photoURL: URL.createObjectURL(e.target.files[0]) }),
									// onChange: e => handleUpload(e.target.files[0])
								})}
							/>
							{errors?.image && <span className="text-error text-sm text-center">{errors?.image?.message}</span>}
						</div>

						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text">Akika Charai Naam Update Korun</span>
							</label>
							<input
								type="text"
								value={currentUser?.displayName}
								placeholder="Your Name"
								className="input input-bordered w-full"
								{...register('name', {
									onChange: (e) => setCurrentUser({ ...currentUser, displayName: e.target.value }),
								})}
							/>
							{errors?.name && <span className="text-error text-sm text-center">{errors?.name?.message}</span>}
						</div>

						<div className="form-control w-full">
							<label className="label">
								<span className="label-text capitalize">Email Address</span>
							</label>
							<input
								type="text"
								value={currentUser?.email}
								placeholder="Your Email Address"
								className="input input-bordered w-full"
								{...register('email', {
									onChange: (e) => setCurrentUser({ ...currentUser, email: e.target.value }),
									pattern: {
										// value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
										message: 'Provide a valid email',
									},
								})}
							/>
							{errors?.email && <span className="text-error text-sm text-center">{errors?.email?.message}</span>}
							{emError && <span className="text-error text-sm text-center">{emError?.message}</span>}
						</div>

						{/* password update */}
						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text capitalize">Password niye insecurity dur korun</span>
							</label>
							<div className="flex items-center relative">
								<input
									type={visible ? 'text' : 'password'}
									placeholder="Your Password"
									className="input input-bordered w-full"
									{...register('password', {
										onChange: (e) => setPassword(e.target.value),
									})}
								/>
								<FontAwesomeIcon onClick={() => setvisible(!visible)} icon={visible ? faEye : faEyeSlash} className="absolute right-0 py-4 px-2 h-5 w-7 cursor-pointer hover:scale-105" />
							</div>
							{errors?.password && <span className="text-error text-sm text-center">{errors?.password?.message}</span>}
							{passError && <span className="text-error text-sm text-center">{passError.message}</span>}
						</div>

						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text">Kon Varsity? Daffodil nakiiiiii?</span>
							</label>
							<input
								type="text"
								value={currentUser?.varsity}
								placeholder="Your University Name"
								className="input input-bordered w-full"
								{...register('varsity', {
									onChange: (e) => setCurrentUser({ ...currentUser, varsity: e.target.value }),
								})}
							/>
							{errors?.varsity && <span className="text-error text-sm text-center">{errors?.varsity?.message}</span>}
						</div>

						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text capitalize">Please CSE boilen na bhai :')</span>
							</label>
							<input
								type="text"
								value={currentUser?.degree}
								placeholder="Enter Degree"
								className="input input-bordered w-full"
								{...register('degree', {
									onChange: (e) => setCurrentUser({ ...currentUser, degree: e.target.value }),
								})}
							/>
							{errors?.degree && <span className="text-error text-sm text-center">{errors?.degree?.message}</span>}
						</div>

						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text">ID Likhun Ekhane</span>
							</label>
							<input
								type="text"
								value={currentUser?.id}
								placeholder="Your Student ID"
								className="input input-bordered w-full"
								{...register('id', {
									onChange: (e) => setCurrentUser({ ...currentUser, id: e.target.value }),
								})}
							/>
							{errors?.id && <span className="text-error text-sm text-center">{errors?.id?.message}</span>}
						</div>

						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text capitalize">Rokto din, jibon bachan</span>
							</label>
							<select
								type="text"
								value={currentUser?.blood}
								placeholder="Your Blood Group"
								className="input input-bordered w-full"
								{...register('blood', {
									onChange: (e) => setCurrentUser({ ...currentUser, blood: e.target.value }),
								})}>
								<option value="A+">A positive</option>
								<option value="A-">A negative</option>
								<option value="B+">B positive</option>
								<option value="B-">B negative</option>
								<option value="AB+">AB positive</option>
								<option value="AB-">AB negative</option>
								<option value="O+">O positive</option>
								<option value="O-">O negative</option>
							</select>
							{errors?.blood && <span className="text-error text-sm text-center">{errors?.blood?.message}</span>}
						</div>

						{/* facebook url */}
						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text capitalize">Facebook id ta dibaaaa?</span>
							</label>
							<input
								type="text"
								value={currentUser?.fb}
								placeholder="Your Facebook Profile Link"
								className="input input-bordered w-full"
								{...register('fb', {
									onChange: (e) => setCurrentUser({ ...currentUser, fb: e.target.value }),
									pattern: {
										value: /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
										message: 'Provide a valid url',
									},
								})}
							/>
							{errors?.fb && <span className="text-error text-sm text-center">{errors?.fb?.message}</span>}
						</div>

						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text capitalize">LinkedIn er Link Din</span>
							</label>
							<input
								type="text"
								value={currentUser?.linkedin}
								placeholder="Your LinkedIn Profile"
								className="input input-bordered w-full"
								{...register('linkedin', {
									onChange: (e) => setCurrentUser({ ...currentUser, linkedin: e.target.value }),
									pattern: {
										value: /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
										message: 'Provide a valid url',
									},
								})}
							/>
							{errors?.linkedin && <span className="text-error text-sm text-center">{errors?.linkedin?.message}</span>}
						</div>

						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text capitalize">Twitter Profile Ta Dibaaa?</span>
							</label>
							<input
								type="text"
								value={currentUser?.twitter}
								placeholder="Your Twitter Profile Link"
								className="input input-bordered w-full"
								{...register('twitter', {
									onChange: (e) => setCurrentUser({ ...currentUser, twitter: e.target.value }),
									pattern: {
										value: /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
										message: 'Provide a valid url',
									},
								})}
							/>
							{errors?.twitter && <span className="text-error text-sm text-center">{errors?.twitter?.message}</span>}
						</div>
					</div>
					<input className={`btn btn-primary w-full mt-6 normal-case ${updating && 'pointer-events-none bg-gray-400'}`} type="Submit" value={updating ? 'Updating...' : 'Submit'} />
					{/* {updating ? <button className="btn w-full mt-6 normal-case loading">Updating Profile</button> : } */}
				</form>
			</div>
		</div>
	);
};

export default EditProfile;
