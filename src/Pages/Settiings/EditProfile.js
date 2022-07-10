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
                    refetch();
                    reset();
                }
                setUpdating(false);
            })
    }


    const onSubmit = async (data) => {
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

        if (data.image[0]) {
            await axios.post(`https://api.imgbb.com/1/upload?key=${imageApiKey}`, formData)
                .then(res => {
                    if (res.status === 200) {
                        const photoURL = res.data.data.url;
                        updateProfile({ photoURL });
                        updatedUser = { ...updatedUser, photoURL }
                        updateUserDb(updatedUser)
                        toast.success("Updated DP");
                        refetch();
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

        else if (userData !== updatedUser) {
            console.log(updatedUser)
            await updateUserDb(updatedUser);
            toast.success("Updated Profile");

        }
    }


    if (loading || isLoading || emUpdating || pUpdating) return <Loading />

    return (
        <div className='bg-base-100 mx-auto w-full flex flex-col'>
            <h2 className='text-center text-2xl font-bold'>Edit Your Profile</h2>
            <div className='flex flex-col mt-6 md:mt-0 md:flex-row w-full px-5 items-center'>
                <img src={userData?.photoURL} alt="" className='max-w-full md:max-w-xl h-fit rounded-3xl' />
                <form className='lg:max-w-3xl lg:w-full mx-6 lg:mx-auto mt-10 grid md:grid-cols-2 gap-6' onSubmit={handleSubmit(onSubmit)}>

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

                    <div className="form-control w-full h-24">
                        <label className="label">
                            <span className="label-text capitalize">Email Address. Currentlty Under Development</span>
                        </label>
                        <input type="text" disabled defaultValue={userData?.email} placeholder="Update Email Address here" className="input input-bordered w-full" {...register("email")} />
                        {errors?.email && <span className='text-error text-sm text-center'>{errors?.email?.message}</span>}
                    </div>

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
                        <input type="text" defaultValue={userData?.blood} placeholder="Update Blood Group here" className="input input-bordered w-full" {...register("blood")} />
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

                    {
                        updating ? <button className="btn w-full mt-6 normal-case loading">loading</button>
                            : <input className='btn btn-primary w-full mt-6 normal-case' type="Submit" />
                    }
                </form>
            </div>
        </div>
    );
};

export default EditProfile;