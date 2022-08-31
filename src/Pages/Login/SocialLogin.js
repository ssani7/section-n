import React from 'react';
import { useSignInWithFacebook, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init'
import google from '../../images/icons/google.png'
import facebook from '../../images/icons/facebook.png'

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithFacebook, fbUser, fbLoading, fbError] = useSignInWithFacebook(auth);

    return (
        <>
            {
                loading
                    ? <button className='btn btn-primary hover:bg-gray-300 bg-gray-100 text-black w-full normal-case loading'>Hold on mate</button>
                    : <button onClick={() => signInWithGoogle()} className="btn btn-primary hover:bg-gray-300 bg-gray-100 text-black w-full normal-case">
                        <img src={google} alt="" className='h-6 w-6 mr-3' />
                        Continue With Google</button>
            }

            {
                fbLoading
                    ? <button className='btn bg-blue-500 w-full normal-case text-white loading'>Hold On Mate</button>
                    : <button onClick={() => signInWithFacebook()} className="btn bg-blue-500 w-full normal-case text-white">
                        <img src={facebook} alt="" className='h-6 w-6 mr-3' />
                        Continue With Facebook
                    </button>
            }

            {(error || fbError) && <small className='text-error'>{error?.message || fbError?.message}</small>}
        </>
    );

};

export default SocialLogin;