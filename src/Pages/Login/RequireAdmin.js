import { useAuthState } from "react-firebase-hooks/auth";
import {
    useLocation,
    Navigate
} from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";
import NLoading from '../Shared/NLoading';

function RequireAdmin({ children }) {
    const [user, loading] = useAuthState(auth);
    const isAdmin = useAdmin();
    let location = useLocation();

    if (loading) {
        return <NLoading />
    }

    if (!isAdmin) {
        if (!user) {
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
        return <Navigate to="/notfound" state={{ from: location }} replace />
    }

    return children;
}
export default RequireAdmin;