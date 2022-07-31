import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState, useUpdateEmail, useUpdatePassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify'
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const EditProfile = () => {
    const [user, loading] = useAuthState(auth);
    const [updating, setUpdating] = useState(false);
    const [visible, setvisible] = useState(false);
    const [password, setPassword] = useState('');
    const [fb, setFb] = useState('');
    const [linkedin, setlinkedin] = useState('');
    const [twitter, setTwitter] = useState('');

    const [updateProfile, pUpdating, pError] = useUpdateProfile(auth);
    const [updateEmail, emUpdating, emError] = useUpdateEmail(auth);
    const [updatePassword, passUpdating, passError] = useUpdatePassword(auth);

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

    const { isLoading, data: userData, refetch } = useQuery(['update', user], () => fetch(`https://section-n-diu-server.herokuapp.com/user/${user?.email}`).then(res => res.json()));




    const updateUserDb = async (oldUser, newUser) => {
        setUpdating(true);
        await axios.put(`https://section-n-diu-server.herokuapp.com/updateUser?id=${oldUser?._id}&verification=${oldUser?.verification}&studentId=${oldUser?.id}`, newUser, {
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    reset();
                    toast.success("Updated Profile");
                    setUpdating(false);
                }


            })
            .catch(err => {
                toast.error("Please login again or try again later")
                setUpdating(false);
                reset();
                refetch();
                console.log(err)
            })
    }

    const checkEmail = async (updatedUser) => {
        if (user?.email !== userData.email) {
            updateUserDb(userData, updatedUser);
            toast.success("Updated Email");
        }
        else {
            toast.error("Something went wrong, Please try again later")
        }
    }

    useEffect(() => {
        if (!password) {
            reset({ ...getValues(), password: undefined });
            unregister("password");
        }
        else {
            register("password", {
                validate: {
                    size: p => p.length >= 6 || 'minimum 6 chatacter password required',
                    character: p => /[a-zA-Z]/.test(p) || 'Must contain a character',
                    number: p => /\d/.test(p) || 'Must contain a number',
                    special: p => /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(p) || 'Must contain a special character',
                }
            })
        }

        setFb(userData?.fb);
        setlinkedin(userData?.linkedin);
        setTwitter(userData?.twitter);

    }, [password, unregister, getValues, register, reset, userData]);


    const handlePassword = async () => {
        const confirm = window.confirm("Password Change Korlam Kintu?!");
        if (confirm) {
            updatePassword(password);
            if (passError) {
                toast.success(passError.message)
            }
            else {
                toast.success("Password changed bodda!!!");
                reset();
            }
        }
        setUpdating(false)
    }

    const onSubmit = async (data) => {
        setUpdating(true);
        const displayName = data.name;
        const email = data.email;
        const varsity = data.varsity;
        const degree = data.degree;
        const id = data.id;
        const blood = data.blood;

        const formData = new FormData();
        formData.append('image', data.image[0]);
        const imageApiKey = "906bfdafb7a4a5b92021d570714ff50f";

        let updatedUser = { displayName, varsity, degree, id, blood, fb, linkedin, twitter };

        if (data.image[0]) {
            await axios.post(`https://api.imgbb.com/1/upload?key=${imageApiKey}`, formData)
                .then(res => {
                    if (res.status === 200) {
                        setUpdating(false)
                        const photoURL = res.data.data.url;
                        updateProfile({ photoURL });
                        updatedUser = { ...updatedUser, photoURL }
                        updateUserDb(userData, updatedUser)
                            .then(() => window.location.reload(false))
                        toast.success("Updated DP");
                    }
                })
        }
        else if (email !== userData?.email) {
            await updateEmail(email);
            updatedUser = { ...updatedUser, email };
            await checkEmail(updatedUser);
            setUpdating(false)

        }

        else if (userData?.displayName !== displayName) {
            updateProfile({ displayName });
            if (!pError) {
                updateUserDb(userData, updatedUser);
            }
            toast.success("Updated Name")
        }

        else if (userData?.varsity !== varsity || userData?.degree !== degree || userData?.id !== id || userData?.blood !== blood || userData?.fb !== fb || userData?.linkedin !== linkedin || userData?.twitter !== twitter) {
            updateUserDb(userData, updatedUser);
            // window.location.reload(false);
        }
        else if (password) {
            handlePassword();
        }
        else {
            toast.warn("Nothing To Update")
            setUpdating(false);
        }
    }


    if (loading || isLoading || emUpdating || pUpdating || passUpdating) return <Loading />

    return (
        <div className='bg-base-100 mx-auto w-full flex flex-col mb-20 md:mb-0 md:overflow-y-hidden'>
            <div className='flex flex-col md:flex-row w-full h-full px-5 md:items-center'>
                <div className='w-auto h-auto max-h-screen md:max-w-sm lg:max-w-2xl rounded-3xl mx-auto'>
                    <img src={userData?.photoURL} alt="" className='w-full h-full rounded-3xl object-cover' />
                </div>

                <form className='w-auto md:w-2/5 lg:max-w-3xl mt-6 mx-6 lg:mx-auto' onSubmit={handleSubmit(onSubmit)}>

                    <div className='grid md:grid-cols-2 gap-6'>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Shundor Ekta Pic Den </span>
                            </label>
                            <input type="file" className="input input-bordered w-full" {...register("image")} />
                            {errors?.image && <span className='text-error text-sm text-center'>{errors?.image?.message}</span>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Akika Charai Naam Update Korun</span>
                            </label>
                            <input type="text" defaultValue={userData?.displayName} placeholder="Update Name here" className="input input-bordered w-full" {...register("name")} />
                            {errors?.name && <span className='text-error text-sm text-center'>{errors?.name?.message}</span>}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text capitalize">Email Address</span>
                            </label>
                            <input type="text" defaultValue={userData?.email} placeholder="Update Email Address here" className="input input-bordered w-full" {...register("email", {
                                required: 'Email address is required to update profile',
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
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
                            <input type="text" defaultValue={userData?.varsity} placeholder="Update University Name here" className="input input-bordered w-full" {...register("varsity")} />
                            {errors?.varsity && <span className='text-error text-sm text-center'>{errors?.varsity?.message}</span>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text capitalize">Degree. Please CSE boilen na bhai :')</span>
                            </label>
                            <input type="text" defaultValue={userData?.degree} placeholder="Update Degree here" className="input input-bordered w-full" {...register("degree")} />
                            {errors?.degree && <span className='text-error text-sm text-center'>{errors?.degree?.message}</span>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">ID Likhun Ekhane</span>
                            </label>
                            <input type="text" defaultValue={userData?.id} placeholder="Update Student ID here" className="input input-bordered w-full" {...register("id")} />
                            {errors?.id && <span className='text-error text-sm text-center'>{errors?.id?.message}</span>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text capitalize">Blood Group. Rokto din, jibon bachan</span>
                            </label>
                            <select type="text" defaultValue={userData?.blood} placeholder="Update Blood Group here" className="input input-bordered w-full" {...register("blood")} >
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
                            <input type="text" value={fb} placeholder="Update Facebook Profile Link here" className="input input-bordered w-full" {...register("fb", {
                                onChange: e => setFb(e.target.value),
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
                            <input type="text" value={linkedin} placeholder="Update LinkedIn Profile here" className="input input-bordered w-full" {...register("linkedin", {
                                onChange: e => setlinkedin(e.target.value),
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
                            <input type="text" value={twitter} placeholder="Update Twitter Profile Link here" className="input input-bordered w-full" {...register("twitter", {
                                onChange: e => setTwitter(e.target.value),
                                pattern: {
                                    value: /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
                                    message: "Provide a valid url"
                                }
                            })} />
                            {errors?.twitter && <span className='text-error text-sm text-center'>{errors?.twitter?.message}</span>}
                        </div>
                    </div>

                    {
                        updating ? <button className="btn w-full mt-6 normal-case loading">Updating Profile</button>
                            : <input className='btn btn-primary w-full mt-6 normal-case' type="Submit" />
                    }
                </form>
            </div>
        </div>
    );
};

export default EditProfile;