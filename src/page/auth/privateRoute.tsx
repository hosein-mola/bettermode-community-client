import { useAppSelector } from "@/app/function/hooks";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ element }: { element: JSX.Element }): JSX.Element => {
  let location = useLocation();
  const { isLoggedIn } = useAppSelector(state => state.auth);
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return element;
};

export default PrivateRoute;
