import React from 'react';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Loading from '../Shared/Loading';
import useDBUser from '../../hooks/useDBUser';
import { useState } from 'react';
import { toast } from "react-toastify"


const VerifyAcc = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [userData, loadingData] = useDBUser();
    const [fetching, setFetching] = useState(false);
    const [multipleErr, setMultipleErr] = useState('')

    if (loadingData) return <Loading />

    if (userData?.verification === "verified") {
        return <>
            <h1 className='text-2xl font-bold text-center'>Hey {userData?.displayName}! <br /> You are a verified <s>member</s> Celebrity of Section N</h1>
            <img className='mt-12 max-w-xs' src="https://i.ibb.co/dW5sQ5r/michael-scott.gif" alt="" srcset="" />
        </>
    }
    else if (userData?.verification === "pending") {
        return <>
            <h1 className='text-2xl font-bold text-center'>Hold your horses mate. Your account verification is in process.</h1>
            <img className='mt-12 max-w-xs' src="https://i.ibb.co/SvC2J81/waiting.gif" alt="" srcset="" />
        </>
    }

    if (multipleErr) return multipleErr;

    const onSubmit = async (data) => {
        setFetching(true)

        await axios.put(`https://section-n-diu-server.herokuapp.com/verifyUser?id=${data?.id}&email=${userData?.email}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setFetching(false);
                    window.location.reload(false);
                }
                else if (res.data.error) {
                    toast.error("This id does not belong to any of us")
                    setFetching(false);
                }
                else if (Array.isArray(res.data)) {
                    toast.error("An existing verified account is using the same id");
                    setMultipleErr(
                        <div className='text-center'>
                            <h1 className='text-2xl my-3'>{`The following ${res.data.length > 1 ? "users are" : "user is"} using Student ID: ${data?.id}`}</h1>
                            <h1 className='text-3xl font-bold my-3'>
                                {res.data.map((user, i) => (
                                    <div
                                        key={i}
                                        className="border p-5">
                                        <img className='max-w-xs mx-auto' src={user.photoURL} alt="" />
                                        <h1 className='my-3'>Name : {user.displayName}</h1>
                                        <h1 className='my-3'>email : {user.email}</h1>
                                    </div>
                                ))}
                            </h1>
                            <h1 className='text-2xl my-3'>Please ask Sani to solve this problem</h1>
                        </div>
                    )
                }
            });

    }
    return (
        <div className='w-full text-center'>
            <h2>Verify yourself as a member of Section: N</h2>
            <form className='pt-12 max-w-xs md:max-w-2xl mx-auto' onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full h-24">
                    <label className="label">
                        <span className="label-text">Your Student ID</span>
                    </label>
                    <input type="text" className="input input-bordered w-full" {...register("id")} />
                    {errors?.id && <span className='text-error text-sm text-center'>{errors?.id?.message}</span>}
                </div>

                {
                    fetching
                        ? <button className='btn loading w-full md:w-auto' value="submit" >Updating</button>
                        : <input className='btn btn-primary w-full md:w-auto' type="submit" value="Verify Account" />
                }
            </form>
        </div>
    );
};

export default VerifyAcc;