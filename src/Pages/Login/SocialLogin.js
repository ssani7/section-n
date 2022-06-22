import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const SocialLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    if (user) {
        navigate(from, { replace: true });
    }
    return (
        <>
            {
                loading
                    ? <button className='btn bg-gray-500 w-full normal-case loading'>Hold on mate</button>
                    : <button onClick={() => signInWithGoogle()} className="btn bg-gray-500 w-full normal-case">Continue With Google</button>
            }

            {error && <small className='text-error'>{error.message}</small>}
        </>
    );
};

export default SocialLogin;