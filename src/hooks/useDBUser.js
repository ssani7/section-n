import axios from 'axios';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';



const useDBUser = () => {
    const [userFromDb, setUserFromDb] = useState();
    const [user, loading] = useAuthState(auth);
    const [loadingData, setLoadingData] = useState(loading);


    async function getUserData() {
        if (user?.email) {
            try {
                setLoadingData(true);
                const res = await axios.get(`https://section-n-server.vercel.app/user/${user?.email}`)

                if (res.status === 401 || res.status === 403) {
                    return signOut(auth);
                }

                setLoadingData(false);
                setUserFromDb(res.data)
            } catch (error) {
                console.log(error);
                setLoadingData(false);
                signOut(auth);
            }
        }

        if (!loading && !user?.email) {
            setUserFromDb('')
            setLoadingData(false)
        }
    }

    useEffect(() => {
        getUserData()
    }, [user, loading])

    return [userFromDb, loadingData, getUserData]
};

export default useDBUser;