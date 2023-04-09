import { useSelector } from "react-redux";
import { selectEmail } from "../redux/Slice/authSlice";

export const AdminAccess = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "admin@first.auto") {
    return children;
  }
  return null;
};
