import React from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import Loading from '../Pages/Shared/Loading';

const useToken = () => {
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            console.log(user)
            fetch(`http://localhost:5000/users/${user.email}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ email: user.email, displayName: user.displayName, photoURL: user.photoURL })
            })
        }

    }, [user])

    if (loading) {
        return <Loading></Loading>
    }

    return user;
};

export default useToken;