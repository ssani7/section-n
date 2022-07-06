import { signOut } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import Loading from '../Pages/Shared/Loading';

const useToken = () => {
    const [user, loading] = useAuthState(auth);
    const [token, setToken] = useState('');

    useEffect(() => {
        if (user) {
            fetch(`https://section-n-diu-server.herokuapp.com/users/${user.email}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ email: user.email, displayName: user.displayName, photoURL: user.photoURL })
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

    }, [user])

    if (loading) {
        return <Loading></Loading>
    }

    return token;
};

export default useToken;