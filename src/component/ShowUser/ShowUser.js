import { useState } from "react";
import { auth } from "../../firebase";
import "./ShowUser.css";

export const ShowUser = () => {
  const [username, setUsername] = useState("");
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  auth.onAuthStateChanged((user) => {
    setEmail(user.email);
  });
  return (
    <>
      <div className="show-user">
        <h2>ผู้ใช้งานปัจจุบัน : {email}</h2>
      </div>
    </>
  );
};