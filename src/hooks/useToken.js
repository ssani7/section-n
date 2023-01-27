import axios from 'axios';
import { signOut, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const useToken = () => {
    const [user, loading] = useAuthState(auth);
    const [token, setToken] = useState('');
    let photo = user?.photoURL;

    if (user?.photoURL?.includes("facebook")) {
        photo = user.photoURL + "?height=500";
    }
    else if (user?.photoURL?.includes('googleusercontent')) {
        photo = user.photoURL.replace("s96-c", "s400-c");
    }

    useEffect(() => {
        if (user?.email) {
            createUser()
        }
    }, [user, loading])

    async function createUser() {
        const res = await axios.put(`https://section-n-server.vercel.app/user/${user?.email}`,
            JSON.stringify({ email: user.email, photoURL: photo, displayName: user.displayName }), {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            }
        })

        if (res.status === 401 || res.status === 403) {
            signOut(auth);
        }

        try {
            await updateProfile(auth.currentUser, { photoURL: photo })
            setToken(res?.data?.token);
            localStorage.setItem("access-token", res?.data?.token)
        } catch (error) {
            console.log(error);
        }
    }

    return token;
};

export default useToken;