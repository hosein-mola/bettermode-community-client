import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = (props: any): JSX.Element => {
  let location = useLocation();
  if (!props.isAuthenticated) {
    return <Navigate to="/login" state={ { from: location } } replace />;
  }
  return props.component;
};

export default PrivateRoute;
