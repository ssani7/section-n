import React from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import SocialLogin from './SocialLogin';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const token = useToken();

    if (token) {
        navigate(from, { replace: true });
    }

    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;

        signInWithEmailAndPassword(email, password)
    }
    return (
        <div className='pt-20 bg-base-100'>
            <div className="card mx-6 bg-base-100 shadow-xl md:max-w-lg md:mx-auto">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Log In</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="form-control w-full mx-auto max-w-lg mt-4">
                        <label className="label mt-3">
                            <span className="label-text">Email Address</span>
                        </label>
                        <input type="email" placeholder="Your Email Address" className="input input-bordered w-full focus:outline-none focus:ring-2" {...register('email', {
                            required: 'Email is required'
                        })} />
                        {errors?.email && <small className='text-error'>{errors.email.message}</small>}

                        <label className="label mt-3">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Your Password" className="input input-bordered w-full focus:outline-none focus:ring-2" {...register('password', {
                            required: 'Password is required'
                        })} />
                        {errors?.password && <small className='text-error'>{errors.password.message}</small>}

                        <p className='text-sm mt-3'>Don't have an account? <Link to='/register' className='text-secondary'>Create an account</Link></p>

                        {
                            loading ? <button className="btn btn-primary mt-6 loading normal-case">Loggin In</button> : <input className='btn btn-primary mt-6 normal-case' type="submit" value="Log In" />
                        }

                        {error && <small className='text-error'>{error.message}</small>}
                    </form>

                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;