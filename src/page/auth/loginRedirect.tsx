import {Navigate, useLocation} from "react-router-dom";

const LoginRedirect = (props): JSX.Element => {
    let location = useLocation();
    if (props.isAuthenticated) {
        return <Navigate to="/" state={{from: location}} replace />;
    }
    return props.component;
};

export default LoginRedirect;
