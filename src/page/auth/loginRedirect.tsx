import { useAppSelector } from "@/app/function/hooks";
import { Navigate, useLocation } from "react-router-dom";

const LoginRedirect = ({ element }: { element: JSX.Element }): JSX.Element => {
    let location = useLocation();
    const { isLoggedIn } = useAppSelector(state => state.auth);
    if (isLoggedIn) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return element;
};

export default LoginRedirect;
