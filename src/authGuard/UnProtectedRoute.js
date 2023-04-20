import { useSelector } from "react-redux";
import { selectIslogin } from "../redux/Slice/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const UnProtectedRoute = () => {
  const isLogin = useSelector(selectIslogin);
  return !isLogin ? <Outlet /> : <Navigate to="/home" />;
};

export default UnProtectedRoute;
