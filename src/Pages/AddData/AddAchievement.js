import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
import useAdmin from '../../hooks/useAdmin';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useState } from 'react';

const AddAchievement = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [uploading, setUploading] = useState(false)

    const isAdmin = useAdmin();
    const [user, loading] = useAuthState(auth);

    const onSubmit = async (data) => {
        const name = data.name;
        const id = data.id;
        const title = data.title;
        const formData = new FormData();
        formData.append('image', data.image[0]);
        const imageApiKey = "906bfdafb7a4a5b92021d570714ff50f";
        const sender = user?.displayName;
        const senderDp = user.photoURL;

        setUploading(true);

        await axios.post(`https://api.imgbb.com/1/upload?key=${imageApiKey}`, formData)
            .then(res => {
                const { data } = res;
                if (data.status === 200) {
                    const image = data.data.url;
                    const achievementData = { name, id, achievement: title, image, sender, senderDp, approved: isAdmin };

                    axios.post('https://section-n-diu-server.herokuapp.com/achievements', achievementData)
                        .then(res => {
                            console.log(res.data)
                            if (res.status === 403 || res.status === 401) {

                            }
                            toast.success(`${isAdmin ? 'Posted Achievement Successfully' : "Your achivement resquest is sent"}`)
                            reset();
                            setUploading(false)
                            console.log(user);
                        })
                }
            })

    }


    return (
        <div className='bg-base-100 pt-20 mx-auto w-full flex flex-col'>
            <h2 className='text-center text-2xl font-bold'>Add Your Achievement</h2>
            <form className='lg:max-w-xl lg:w-full mx-10 lg:mx-auto mt-10' onSubmit={handleSubmit(onSubmit)}>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Naam Bolo Bro</span>
                    </label>
                    <input type="text" placeholder="Type Name here" class="input input-bordered w-full" {...register("name", {
                        required: "Naam koi bara?"
                    })} />
                    {errors?.name && <span className='text-error text-sm text-center'>{errors?.name?.message}</span>}
                </div>


                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">ID ki bodda?</span>
                    </label>
                    <input type="text" placeholder="Type Student ID here" class="input input-bordered w-full" {...register("id", {
                        required: "ID na dile tui imposter!"
                    })} />
                    {errors?.id && <span className='text-error text-sm text-center'>{errors?.id?.message}</span>}
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Achivement Ta bole felo</span>
                    </label>
                    <input type="text" placeholder="Type Achievement here" class="input input-bordered w-full" {...register("title", {
                        required: "Achievement e des nai!"
                    })} />
                    {errors?.title && <span className='text-error text-sm text-center'>{errors?.title?.message}</span>}
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Foman ase to? </span>
                    </label>
                    <input type="file" class="input input-bordered w-full" {...register("image", {
                        required: "Pic dite vule gele hobeee?!"
                    })} />
                    {errors?.image && <span className='text-error text-sm text-center'>{errors?.image?.message}</span>}
                </div>

                {errors.exampleRequired && <span>This field is required</span>}

                {
                    uploading ? <button class="btn w-full mt-6 normal-case loading">loading</button>
                        : <input className='btn btn-primary w-full mt-6 normal-case' type="Submit" />
                }
            </form>
        </div>
    );
};

export default AddAchievement;