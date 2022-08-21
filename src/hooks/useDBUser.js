import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const useDBUser = () => {
    const [userFromDb, setUserFromDb] = useState();
    const [user, loading] = useAuthState(auth);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        if (loading) {
            setLoadingData(true);
        }

        if (user && !loading && userFromDb) {
            setLoadingData(false);
        }

        if (user) {
            axios.get(`https://section-n-diu-server.herokuapp.com/user/${user?.email}`)
                .then(res => {
                    if (res.status === 200) {
                        setUserFromDb(res.data);
                        setLoadingData(false);
                    }
                })
                .catch(err => {
                    console.log(err)
                    setLoadingData(false)
                })
        }
    }, [user, loading])

    return [userFromDb, loadingData]
};

export default useDBUser;