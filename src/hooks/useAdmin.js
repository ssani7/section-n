import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth"
import auth from '../firebase.init';

const useAdmin = () => {
    const [admin, setAdmin] = useState(false);
    const [user, loading] = useAuthState(auth);
    const [adminLoading, setAdminLoading] = useState(true)

    useEffect(() => {
        if (user) {
            axios.get(`https://section-n-diu-server.herokuapp.com/user/role/${user?.email}`)
                .then(res => {
                    setAdminLoading(false)
                    setAdmin(res.data);
                })
                .catch(error => {
                    console.log(error);
                    setAdminLoading(false);
                })
        }
    }, [user])

    return [admin, adminLoading];
};

export default useAdmin;