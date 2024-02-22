import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import NLoading from '../../components/shared/Loading/NLoading';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';

function RequireAdmin({ children }) {
	const [user, loading] = useAuthState(auth);
	const [isAdmin, adminLoading] = useAdmin();

	let location = useLocation();

	if (loading || adminLoading) {
		return <NLoading />;
	}

	if (!isAdmin) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}
	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
}
export default RequireAdmin;
