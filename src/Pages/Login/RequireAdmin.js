import { useAuthState } from "react-firebase-hooks/auth";
import {
    useLocation,
    Navigate
} from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";
import NLoading from "../Shared/Loading/NLoading";

function RequireAdmin({ children }) {
    const [user, loading] = useAuthState(auth);
    const [isAdmin, adminLoading] = useAdmin();

    let location = useLocation();

    if (loading || adminLoading) {
        return <NLoading />
    }

    if (!isAdmin) {
        return <Navigate to="/" state={{ from: location }} replace />
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
export default RequireAdmin;