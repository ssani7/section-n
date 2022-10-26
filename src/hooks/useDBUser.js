import axios from 'axios';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const useDBUser = () => {
    const [userFromDb, setUserFromDb] = useState();
    const [user, loading] = useAuthState(auth);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        if (!user && !loading) {
            setLoadingData(false);
        }

        if (user && !loading) {
            axios.get(`https://section-n-diu-server.herokuapp.com/user/${user?.email}`)
                .then(res => {
                    setLoadingData(false);
                    if (res.status === 200) {
                        setUserFromDb(res.data);
                    }
                    else {
                        signOut(auth);
                    }
                })
                .catch(err => {
                    console.log(err)
                    setLoadingData(false);
                })
        }
    }, [user, loading])

    return [userFromDb, loadingData]
};

export default useDBUser;