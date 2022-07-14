import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const useDBUser = () => {
    const [userFromDb, setUserFromDb] = useState('');
    const [user, loading] = useAuthState(auth);
    const [loadingData, setLoadingData] = useState(loading)

    useEffect(() => {
        if (user) {
            setLoadingData(true);
            axios.get(`https://section-n-diu-server.herokuapp.com/user/${user?.email}`)
                .then(res => {
                    if (res.status === 200) {
                        setUserFromDb(res.data);
                        setLoadingData(false);
                    }
                })
        }
    }, [user])

    return [userFromDb, loadingData]
};

export default useDBUser;