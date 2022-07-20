import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState, useUpdateEmail, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify'

const EditProfile = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [user, loading] = useAuthState(auth);
    const [updating, setUpdating] = useState(false);
    const [updateProfile, pUpdating, pError] = useUpdateProfile(auth);
    const [updateEmail, emUpdating, emError] = useUpdateEmail(auth);
    const [fetchError, setFetchErr] = useState('');

    const { isLoading, data: userData, refetch } = useQuery(['update', user], () => fetch(`https://section-n-diu-server.herokuapp.com/user/${user?.email}`).then(res =>
        res.json()));

    const updateUserDb = async (newUser) => {
        setUpdating(true);
        await axios.put(`https://section-n-diu-server.herokuapp.com/users/${user?.email}`, newUser, {
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => {
                if (res.status === 200) {
                    setUpdating(false);
                    window.location.reload(false);
                    return res;
                }
            })
            .catch(err => setFetchErr(err))
    }

    const onSubmit = async (data) => {
        setUpdating(true);
        const displayName = data.name;
        let email = data.email;
        const varsity = data.varsity;
        const degree = data.degree;
        const id = data.id;
        const blood = data.blood;
        const fb = data.fb;
        const linkedin = data.linkedin;
        const twitter = data.twitter;
        const formData = new FormData();
        formData.append('image', data.image[0]);
        const imageApiKey = "906bfdafb7a4a5b92021d570714ff50f";
        let updatedUser = { displayName, varsity, degree, id, blood, fb, linkedin, twitter };
        const previousUser = { displayName: userData?.displayName, varsity: userData?.varsity, degree: userData?.degree, id: userData?.id, blood: userData?.blood, fb: userData?.fb, linkedin: userData?.linkedin, twitter: userData?.twitter }

        if (data.image[0]) {
            await axios.post(`https://api.imgbb.com/1/upload?key=${imageApiKey}`, formData)
                .then(res => {
                    if (res.status === 200) {
                        setUpdating(false)
                        const photoURL = res.data.data.url;
                        updateProfile({ photoURL });
                        updatedUser = { ...updatedUser, photoURL }
                        updateUserDb(updatedUser)
                        toast.success("Updated DP");
                    }
                })
        }
        // else if (email !== userData?.email) {
        //     console.log(email)
        //     await updateEmail(email);
        //     // updatedUser = { ...updatedUser, email };
        //     // await updateUserDb(updatedUser);
        //     toast.success("Updated Email");
        //     refetch();
        // }

        else if (userData?.displayName !== displayName) {
            updateProfile({ displayName });
            if (!pError) {
                updateUserDb(updatedUser);
            }
            toast.success("Updated Name")
        }

        else if (userData?.varsity !== varsity || userData?.degree !== degree || userData?.id !== id || userData?.blood !== blood || userData?.fb !== fb || userData?.linkedin !== linkedin || userData?.twitter !== twitter) {
            updateUserDb(updatedUser);
            toast.success("Updated Profile");
        }
        else {
            toast.warn("Nothing To Update")
            setUpdating(false);
        }
        console.log(user)
    }


    if (loading || isLoading || emUpdating || pUpdating) return <Loading />

    return (
        <div className='bg-base-100 mx-auto w-full flex flex-col mb-20 md:mb-0 md:overflow-y-hidden'>
            <div className='flex flex-col md:flex-row w-full h-full px-5 md:items-center'>
                <div className='w-auto h-auto md:max-w-xl rounded-3xl mx-auto'>
                    <img src={userData?.photoURL} alt="" className='w-full h-full rounded-3xl object-cover' />
                </div>

                <form className='w-auto md:w-2/5 lg:max-w-3xl mt-6 mx-6 lg:mx-auto' onSubmit={handleSubmit(onSubmit)}>

                    <div className='grid md:grid-cols-2 gap-6'>
                        <div className="form-control w-full h-24">
                            <label className="label">
                                <span className="label-text">Foman ase to? </span>
                            </label>
                            <input type="file" className="input input-bordered w-full" {...register("image")} />
                            {errors?.image && <span className='text-error text-sm text-center'>{errors?.image?.message}</span>}
                        </div>

                        <div className="form-control w-full h-24">
                            <label className="label">
                                <span className="label-text">Agika Charai Naam Update Korun</span>
                            </label>
                            <input type="text" defaultValue={userData?.displayName} placeholder="Update Name here" className="input input-bordered w-full" {...register("name")} />
                            {errors?.name && <span className='text-error text-sm text-center'>{errors?.name?.message}</span>}
                        </div>

                        {/* <div className="form-control w-full h-24">
                        <label className="label">
                            <span className="label-text capitalize">Email Address. Currentlty Under Development</span>
                        </label>
                        <input type="text" disabled defaultValue={userData?.email} placeholder="Update Email Address here" className="input input-bordered w-full" {...register("email")} />
                        {errors?.email && <span className='text-error text-sm text-center'>{errors?.email?.message}</span>}
                    </div> */}

                        <div className="form-control w-full h-24">
                            <label className="label">
                                <span className="label-text">Kon Varsity? Daffodil na?</span>
                            </label>
                            <input type="text" defaultValue={userData?.varsity} placeholder="Update University Name here" className="input input-bordered w-full" {...register("varsity")} />
                            {errors?.varsity && <span className='text-error text-sm text-center'>{errors?.varsity?.message}</span>}
                        </div>

                        <div className="form-control w-full h-24">
                            <label className="label">
                                <span className="label-text capitalize">Degree. Please CSE boilen na bhai :')</span>
                            </label>
                            <input type="text" defaultValue={userData?.degree} placeholder="Update Degree here" className="input input-bordered w-full" {...register("degree")} />
                            {errors?.degree && <span className='text-error text-sm text-center'>{errors?.degree?.message}</span>}
                        </div>

                        <div className="form-control w-full h-24">
                            <label className="label">
                                <span className="label-text">ID Likhun Ekhane</span>
                            </label>
                            <input type="text" defaultValue={userData?.id} placeholder="Update Student ID here" className="input input-bordered w-full" {...register("id")} />
                            {errors?.id && <span className='text-error text-sm text-center'>{errors?.id?.message}</span>}
                        </div>

                        <div className="form-control w-full h-24">
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

                        <div className="form-control w-full h-24">
                            <label className="label">
                                <span className="label-text capitalize">Facebook id ta dibaaaa?</span>
                            </label>
                            <input type="text" defaultValue={userData?.fb} placeholder="Update Facebook Profile Link here" className="input input-bordered w-full" {...register("fb")} />
                            {errors?.fb && <span className='text-error text-sm text-center'>{errors?.fb?.message}</span>}
                        </div>

                        <div className="form-control w-full h-24">
                            <label className="label">
                                <span className="label-text capitalize">LinkedIn er Link Din</span>
                            </label>
                            <input type="text" defaultValue={userData?.linkedin} placeholder="Update LinkedIn Profile here" className="input input-bordered w-full" {...register("linkedin")} />
                            {errors?.linkedin && <span className='text-error text-sm text-center'>{errors?.linkedin?.message}</span>}
                        </div>

                        <div className="form-control w-full h-24">
                            <label className="label">
                                <span className="label-text capitalize">Twitter Profile Ta Dibaaa?</span>
                            </label>
                            <input type="text" defaultValue={userData?.twitter} placeholder="Update Twitter Profile Link here" className="input input-bordered w-full" {...register("twitter")} />
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