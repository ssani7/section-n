import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import Loading from '../Shared/Loading';
import SocialLogin from './SocialLogin';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const token = useToken();

    if (updating || loading) {
        return <Loading></Loading>
    }

    if (token) {
        navigate(from, { replace: true });
    }

    const onSubmit = async (data) => {
        const displayName = data.name;
        const email = data.email;

        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName, photoURL: 'https://i.ibb.co/pzpVdPV/no-user-image-icon-3.jpg' });
    }
    return (
        <div className='pt-20 bg-base-100'>
            <div className="card mx-6 bg-base-100 shadow-xl md:max-w-lg md:mx-auto">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="form-control w-full mx-auto max-w-lg mt-4">
                        <label className="label mt-3">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Your Name" className="input input-bordered w-full focus:outline-none focus:ring-2" {...register('name', {
                            required: 'Name is required'
                        })} />
                        {errors?.name && <small className='text-error'>{errors.name.message}</small>}

                        <label className="label mt-3">
                            <span className="label-text">Email Address</span>
                        </label>
                        <input type="email" placeholder="Your Email Address" className="input input-bordered w-full focus:outline-none focus:ring-2" {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'Provide a valid email address'
                            }
                        })} />
                        {errors?.email && <small className='text-error'>{errors.email.message}</small>}

                        <label className="label mt-3">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Your Password" className="input input-bordered w-full focus:outline-none focus:ring-2" {...register('password', {
                            required: 'Password is required',
                            validate: {
                                size: p => p.length >= 6 || 'minimum 6 chatacter password required',
                                character: p => /[a-zA-Z]/.test(p) || 'Must contain a character',
                                number: p => /\d/.test(p) || 'Must contain a number',
                                special: p => /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(p) || 'Must contain a special character',
                            },
                            onBlur: e => setPassword(e.target.value)
                        })} />
                        {errors?.password && <small className='text-error'>{errors.password.message}</small>}

                        <label className="label mt-3">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input type="password" placeholder="Confirm Your Password" className="input input-bordered w-full focus:outline-none focus:ring-2" {...register('confirmPass', {
                            required: 'Password Confirmation is required',
                            validate: {
                                match: c => c === password || "Passwords do not match"
                            }
                        })} />
                        {errors?.confirmPass && <small className='text-error'>{errors.confirmPass.message}</small>}

                        <p className='text-sm mt-3'>Already have an account? <Link to='/login' className='text-secondary'>Log in here</Link></p>

                        {
                            loading ? <button className="btn btn-primary mt-6 loading normal-case">Creating Account</button> : <input className='btn btn-primary mt-6 normal-case' type="submit" value="Sign Up" />
                        }

                        {(error || updateError) && <small className='text-error'>{error.message || updateError.message}</small>}
                    </form>

                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Register;