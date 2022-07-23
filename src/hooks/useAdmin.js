import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth"
import auth from '../firebase.init';
import Loading from '../Pages/Shared/Loading';

const useAdmin = () => {
    const [admin, setAdmin] = useState(false);
    const [user, loading] = useAuthState(auth);
    const [adminLoading, setAdminLoading] = useState(true)

    useEffect(() => {
        if (user) {
            axios.get(`https://section-n-diu-server.herokuapp.com/role/${user?.email}`)
                .then(res => {
                    setAdmin(res.data)
                    setAdminLoading(false)
                })

        }
    }, [user])

    // if (loading) return <Loading />

    return [admin, adminLoading];
};

export default useAdmin;