import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, redirect }) => {
  const isAuth = Boolean(useSelector((state) => state.user.token));
  if (isAuth === true) {
    return children;
  } else if (isAuth === false) {
    return <Navigate to={redirect} replace />;
  }
};