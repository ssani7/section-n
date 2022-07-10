import { signOut } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import Loading from '../Pages/Shared/Loading';
import useDBUser from './useDBUser';

const useToken = () => {
    const [user, loading] = useAuthState(auth);
    const [token, setToken] = useState('');
    let photo = user?.photoURL;

    const [userData, loadingData] = useDBUser();

    if (user?.photoURL?.includes("facebook")) {
        photo = user.photoURL + "?height=500";
    }
    else if (user?.photoURL?.includes('googleusercontent')) {
        photo = user.photoURL.replace("s96-c", "s400-c");
    }


    useEffect(() => {
        if (user) {
            fetch(`https://section-n-diu-server.herokuapp.com/users/${user?.email}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ email: user.email, photoURL: photo, displayName: user.displayName })
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                    }
                    return res.json();
                })
                .then(data => {
                    setToken(data.token);
                    localStorage.setItem('access-token', data.token)
                })
        }

    }, [user, userData])

    if (loading || loadingData) {
        // return <Loading></Loading>
    }

    return token;
};

export default useToken;