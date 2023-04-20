import { useSelector } from "react-redux";
import { selectIslogin } from "../redux/Slice/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLogin = useSelector(selectIslogin);
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
