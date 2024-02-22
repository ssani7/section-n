import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const UserContext = React.createContext();

export function useUserContext() {
	return useContext(UserContext);
}

export function UserProvider({ children }) {
	const [user, loading] = useAuthState(auth);
	const [userData, setUserData] = useState();
	const [loadingData, setLoadingData] = useState(loading);

	const getUserData = useCallback(async () => {
		if (user?.email) {
			try {
				setLoadingData(true);
				const res = await axios.get(`https://section-n-server.vercel.app/user/${user?.email}`);

				if (res.status === 401 || res.status === 403) {
					return signOut(auth);
				}

				setLoadingData(false);
				setUserData(res.data);
			} catch (error) {
				console.log(error);
				setLoadingData(false);
				signOut(auth);
			}
		}

		if (!loading && !user?.email) {
			setUserData('');
			setLoadingData(false);
		}
	}, [user?.email, loading]);

	useEffect(() => {
		getUserData();
	}, [user?.email, user?.photoURL, loading, getUserData]);

	const value = {
		userData,
		loadingData,
		getUserData,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
