import axios from 'axios';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const useDBUser = () => {
    const [userFromDb, setUserFromDb] = useState();
    const [user, loading] = useAuthState(auth);
    const [loadingData, setLoadingData] = useState(loading);

    useEffect(() => {
        if (user?.email) {
            setLoadingData(true);
            axios.get(`https://section-n-diu-server.herokuapp.com/user/${user?.email}`)
                .then(res => {
                    setLoadingData(false);
                    setUserFromDb(res.data)

                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setLoadingData(false);
                    signOut(auth);
                })
        }

        if (!loading && !user?.email) {
            setUserFromDb('')
            setLoadingData(false)
        }


    }, [user, loading])

    return [userFromDb, loadingData]
};

export default useDBUser;