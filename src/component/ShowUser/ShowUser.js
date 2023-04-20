import { useEffect, useState } from "react";
import "./ShowUser.css";
import { useSelector } from "react-redux";
import { selectEmail, selectUserName } from "../../redux/Slice/authSlice";

export const ShowUser = () => {
  const email = useSelector(selectEmail);
  const username = useSelector(selectUserName);
  const [user, setUser] = useState("");

  const checkUser = () => {
    if (email === "admin@first.auto") {
      setUser("ADMIN");
    } else {
      setUser(username);
    }
  };

  useEffect(() => {
    checkUser();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="show-user">
        <h2>ผู้ใช้งานปัจจุบัน : {user}</h2>
      </div>
    </>
  );
};
