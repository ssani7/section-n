import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth"
import auth from '../firebase.init';
import Loading from '../Pages/Shared/Loading';

const useAdmin = () => {
    const [admin, setAdmin] = useState(false);
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            axios.get(`https://section-n-diu-server.herokuapp.com/role/${user?.email}`)
                .then(res => setAdmin(res.data))

        }
    }, [user])

    if (loading) return <Loading />

    return admin;
};

export default useAdmin;