import { useAuthState } from "react-firebase-hooks/auth";
import {
    useLocation,
    Navigate
} from "react-router-dom";
import auth from "../../firebase.init";
import NLoading from "../Shared/Loading/NLoading";

function RequireAuth({ children }) {
    const [user, loading] = useAuthState(auth);
    let location = useLocation();

    if (loading) {
        return <NLoading />
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
export default RequireAuth;