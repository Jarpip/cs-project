import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../../../firebase";
import { injectStyle } from "react-toastify/dist/inject-style";
import { addDoc, collection } from "firebase/firestore";

const Register = () => {
  injectStyle();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const [contact, setContact] = useState("");
  const [uid, setUid] = useState("");

  // const [passwordShown, setPasswordShown] = useState(false);
  // const togglePassword = () => {
  //   setPasswordShown(!passwordShown);
  // };

  const nav = useNavigate();
  const toLogin = () => {
    nav("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน!");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const docRef = await addDoc(collection(db, "users"), {
            name: name,
            contact: contact,
            email: email,
            uid: user.uid,
          });
          toast.success("สมัครสมาชิกสำเร็จ");
          nav("/login");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <>
      <div className="auth-form-container">
        <form
          className="register-form"
          onSubmit={handleRegister}
          autoComplete="off"
        >
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="กรุณากรอกชื่อจริงผู้ใช้"
            id="name"
            name="name"
          />
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="กรุณากรอกอีเมลผู้ใช้"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="กรุณากรอกรหัสผ่าน"
            id="password"
            name="password"
          />
          <label htmlFor="cPassword">Confirm Password</label>
          <input
            value={cPassword}
            onChange={(e) => setcPassword(e.target.value)}
            type="password"
            placeholder="กรุณากรอกยืนยันรหัสผ่าน"
            id="cPassword"
            name="cPassword"
          />
          <label htmlFor="contact">Contact</label>
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            type="text"
            placeholder="กรุณาช่องทางติดต่อ"
            id="contact"
            name="contact"
          />
          <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={toLogin}>
          Already have an account? Click Here.
        </button>
      </div>
    </>
  );
};

export default Register;
