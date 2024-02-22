import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import NLoading from '../../components/shared/Loading/NLoading';
import auth from '../../firebase.init';
import useDBUser from '../../hooks/useDBUser';
import useToken from '../../hooks/useToken';

const RequireVerified = ({ children }) => {
	const [user, loading] = useAuthState(auth);
	const [userData, loadingData] = useDBUser();
	const token = useToken();
	let location = useLocation();

	if (loading || loadingData) {
		return <NLoading />;
	}

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	if (userData?.verification !== 'verified') {
		return <Navigate to="/settings/verify" state={{ from: location }} replace />;
	}

	return children;
};

export default RequireVerified;
