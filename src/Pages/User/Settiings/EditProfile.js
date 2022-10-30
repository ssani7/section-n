import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import NLoading from '../../Shared/Loading/NLoading';
import auth from '../../../firebase.init';
import useDBUser from '../../../hooks/useDBUser';
import { useUserContext } from '../../../Contexts/UserContex';

const EditProfile = () => {
    const [updating, setUpdating] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const [visible, setvisible] = useState(false);
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState({
        displayName: "",
        photoURL: "",
        email: "",
        varsity: "",
        degree: "",
        id: "",
        blood: "",
        fb: "",
        twitter: "",
        linkedin: ""
    })

    // const [userData, loadingData, getUserData] = useDBUser();

    const { userData, loadingData, getUserData } = useUserContext();

    useEffect(() => {
        setCurrentUser(userData)
    }, [userData])

    const [emError, setEmError] = useState()
    const [passError, setPassError] = useState()

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

    async function updateUserDb(oldUser, newUser) {
        try {
            setUpdating(true);
            const res = await axios.put(`https://section-n-diu-server.herokuapp.com/user/update/${oldUser?._id}/${oldUser?.verification}/${newUser?.id || undefined}`, newUser, {
                headers: {
                    "content-type": "application/json"
                }
            })

            if (res.data.modifiedCount > 0) {
                await getUserData()
                console.log("updated db");
                reset();
                toast.success("Updated Profile");
            }
            else {
                toast.error("Nothing Updated");
            }
            setUpdating(false);

        } catch (error) {
            toast.error("Please login again or try again later")
            setUpdating(false);
            reset();
            console.log(error)
        }

    }

    useEffect(() => {
        if (password) {
            register("password", {
                validate: {
                    size: p => p.length >= 6 || 'minimum 6 chatacter password required',
                    character: p => /[a-zA-Z]/.test(p) || 'Must contain a character',
                    number: p => /\d/.test(p) || 'Must contain a number',
                    special: p => /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(p) || 'Must contain a special character',
                }
            })

        }
        else if (!password) {
            reset({ ...getValues(), password: undefined });
            unregister("password");
        }

    }, [password, unregister, getValues, register, reset]);

    async function handleImage(e) {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        const imageApiKey = "906bfdafb7a4a5b92021d570714ff50f";

        if (e.target.files[0]) {
            try {
                setImgLoading(true)
                const imgResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${imageApiKey}`, formData)
                if (imgResponse.status === 200) {
                    const photoURL = imgResponse.data.data.url;
                    setCurrentUser({ ...currentUser, photoURL });
                }
            } catch (error) {
                console.log(error);
                return toast.error(error.message)
            }
            finally {
                setImgLoading(false)
            }

        }
    }

    const onSubmit = async (data) => {
        setUpdating(true);

        let updateCount = 0;
        let passUpdate = 0;
        let updatedUser = {};

        if (currentUser.photoURL !== userData?.photoURL) {
            try {
                await updateProfile(auth.currentUser, { photoURL: currentUser?.photoURL });
                updatedUser = { ...updatedUser, photoURL: currentUser?.photoURL };
                ++updateCount;

            } catch (error) {
                return toast.error(error.message)
            }
        }

        if (currentUser?.email !== userData?.email) {
            try {
                setUpdating(true)
                await updateEmail(auth.currentUser, currentUser.email)
                updatedUser = { ...updatedUser, email: currentUser?.email }
                ++updateCount;

            } catch (error) {
                setEmError(error.message)
                return toast.error(error.message)
            }
            finally {
                setUpdating(false)
            }

        }

        if (userData?.displayName !== currentUser?.displayName) {
            try {
                await updateProfile(auth.currentUser, { displayName: currentUser?.displayName });
                updatedUser = { ...updatedUser, displayName: currentUser.displayName }
                ++updateCount;

            } catch (error) {
                return toast.error(error.message)
            }
        }

        if (userData?.varsity !== currentUser?.varsity || userData?.degree !== currentUser?.degree || userData?.id !== currentUser?.id || userData?.blood !== currentUser?.blood || userData?.fb !== currentUser?.fb || userData?.linkedin !== currentUser?.linkedin || userData?.twitter !== currentUser?.twitter) {
            updatedUser = currentUser
            ++updateCount;
        }

        if (password) {
            console.log(password);
            const confirm = window.confirm("Confirm to change password?!");
            if (confirm) {
                try {
                    ++passUpdate
                    setUpdating(true)
                    await updatePassword(auth.currentUser, password);
                    reset()
                    toast.success("Changed Password")
                    window.location.reload(false);

                } catch (error) {
                    setPassError(error)
                    toast.error(error.message)
                }
                finally {
                    setUpdating(false)
                }
            }
        }

        if (updateCount > 0) {
            updateUserDb(userData, updatedUser)
        }
        else if (passUpdate === 0) {
            toast.warn("Nothing To Update")
            setUpdating(false);
        }

        setUpdating(false)

    }


    if (loadingData) return <NLoading />

    return (
        <div className='bg-base-100 mx-auto w-full flex flex-col mb-20 md:mb-0'>
            <div className='flex flex-col md:flex-row w-full h-full px-5 md:items-center'>
                <div className='w-auto h-auto max-h-screen md:max-w-sm 2xl:max-w-xl rounded-3xl mx-auto'>
                    {
                        imgLoading
                            ? <div className="w-16 h-16 border-b-2 border-info-content rounded-full animate-spin"></div>
                            : <img src={currentUser?.photoURL} alt="" className='w-full h-full rounded-3xl object-cover' />
                    }

                </div>

                <form className='w-auto md:w-2/5 lg:max-w-3xl mt-6 mx-6 lg:mx-auto' onSubmit={handleSubmit(onSubmit)}>

                    <div className='grid md:grid-cols-2 gap-6'>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Shundor Ekta Pic Den </span>
                            </label>
                            <input type="file" className="input input-bordered w-full" {...register("image", {
                                onChange: e => handleImage(e)
                            })} />
                            {errors?.image && <span className='text-error text-sm text-center'>{errors?.image?.message}</span>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Akika Charai Naam Update Korun</span>
                            </label>
                            <input type="text" value={currentUser?.displayName} placeholder="Update Name here" className="input input-bordered w-full" {...register("name", {
                                onChange: e => setCurrentUser({ ...currentUser, displayName: e.target.value })
                            })} />
                            {errors?.name && <span className='text-error text-sm text-center'>{errors?.name?.message}</span>}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text capitalize">Email Address</span>
                            </label>
                            <input type="text" value={currentUser?.email} placeholder="Update Email Address here" className="input input-bordered w-full" {...register("email", {
                                onChange: e => setCurrentUser({ ...currentUser, email: e.target.value }),
                                pattern: {
                                    // value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "Provide a valid email"
                                }
                            })} />
                            {errors?.email && <span className='text-error text-sm text-center'>{errors?.email?.message}</span>}
                            {emError && <span className='text-error text-sm text-center'>{emError?.message}</span>}
                        </div>

                        {/* password update */}
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text capitalize">Password niye insecurity dur korun</span>
                            </label>
                            <div className='flex items-center relative'>
                                <input type={visible ? "text" : "password"} placeholder="Update Password here" className="input input-bordered w-full" {...register('password', {
                                    onChange: e => setPassword(e.target.value)
                                })} />
                                <FontAwesomeIcon onClick={() => setvisible(!visible)} icon={visible ? faEye : faEyeSlash} className="absolute right-0 py-4 px-2 h-5 w-7 cursor-pointer hover:scale-105" />
                            </div>
                            {errors?.password && <span className='text-error text-sm text-center'>{errors?.password?.message}</span>}
                            {passError && <span className='text-error text-sm text-center'>{passError.message}</span>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Kon Varsity? Daffodil na?</span>
                            </label>
                            <input type="text" value={currentUser?.varsity} placeholder="Update University Name here" className="input input-bordered w-full" {...register("varsity", {
                                onChange: e => setCurrentUser({ ...currentUser, varsity: e.target.value })
                            })} />
                            {errors?.varsity && <span className='text-error text-sm text-center'>{errors?.varsity?.message}</span>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text capitalize">Degree. Please CSE boilen na bhai :')</span>
                            </label>
                            <input type="text" value={currentUser?.degree} placeholder="Update Degree here" className="input input-bordered w-full" {...register("degree", {
                                onChange: e => setCurrentUser({ ...currentUser, degree: e.target.value })
                            })} />
                            {errors?.degree && <span className='text-error text-sm text-center'>{errors?.degree?.message}</span>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">ID Likhun Ekhane</span>
                            </label>
                            <input type="text" value={currentUser?.id} placeholder="Update Student ID here" className="input input-bordered w-full" {...register("id", {
                                onChange: e => setCurrentUser({ ...currentUser, id: e.target.value })
                            })} />
                            {errors?.id && <span className='text-error text-sm text-center'>{errors?.id?.message}</span>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text capitalize">Blood Group. Rokto din, jibon bachan</span>
                            </label>
                            <select type="text" value={currentUser?.blood} placeholder="Update Blood Group here" className="input input-bordered w-full" {...register("blood", {
                                onChange: e => setCurrentUser({ ...currentUser, blood: e.target.value })
                            })} >
                                <option value="A+">A positive</option>
                                <option value="A-">A negative</option>
                                <option value="B+">B positive</option>
                                <option value="B-">B negative</option>
                                <option value="AB+">AB positive</option>
                                <option value="AB-">AB negative</option>
                                <option value="O+">O positive</option>
                                <option value="O-">O negative</option>
                            </select>
                            {errors?.blood && <span className='text-error text-sm text-center'>{errors?.blood?.message}</span>}
                        </div>

                        {/* facebook url */}
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text capitalize">Facebook id ta dibaaaa?</span>
                            </label>
                            <input type="text" value={currentUser?.fb} placeholder="Update Facebook Profile Link here" className="input input-bordered w-full" {...register("fb", {
                                onChange: e => setCurrentUser({ ...currentUser, fb: e.target.value }),
                                pattern: {
                                    value: /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
                                    message: "Provide a valid url"
                                }
                            })} />
                            {errors?.fb && <span className='text-error text-sm text-center'>{errors?.fb?.message}</span>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text capitalize">LinkedIn er Link Din</span>
                            </label>
                            <input type="text" value={currentUser?.linkedin} placeholder="Update LinkedIn Profile here" className="input input-bordered w-full" {...register("linkedin", {
                                onChange: e => setCurrentUser({ ...currentUser, linkedin: e.target.value }),
                                pattern: {
                                    value: /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
                                    message: "Provide a valid url"
                                }
                            })} />
                            {errors?.linkedin && <span className='text-error text-sm text-center'>{errors?.linkedin?.message}</span>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text capitalize">Twitter Profile Ta Dibaaa?</span>
                            </label>
                            <input type="text" value={currentUser?.twitter} placeholder="Update Twitter Profile Link here" className="input input-bordered w-full" {...register("twitter", {
                                onChange: e => setCurrentUser({ ...currentUser, twitter: e.target.value }),
                                pattern: {
                                    value: /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
                                    message: "Provide a valid url"
                                }
                            })} />
                            {errors?.twitter && <span className='text-error text-sm text-center'>{errors?.twitter?.message}</span>}
                        </div>
                    </div>

                    {
                        (updating) ? <button className="btn w-full mt-6 normal-case loading">Updating Profile</button>
                            : <input className='btn btn-primary w-full mt-6 normal-case' type="Submit" />
                    }
                </form>
            </div>
        </div>
    );
};

export default EditProfile;