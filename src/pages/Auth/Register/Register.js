import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../../../firebase";
import { injectStyle } from "react-toastify/dist/inject-style";
import { addDoc, collection } from "firebase/firestore";
import { TailSpin } from "react-loader-spinner";
import { FiEye } from "react-icons/fi";

const Register = () => {
  injectStyle();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const [contact, setContact] = useState("");
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const docRef = await addDoc(collection(db, "users"), {
            name: name,
            contact: contact,
            email: email,
            uid: user.uid,
          });
          setLoading(false);
          toast.success("สมัครสมาชิกสำเร็จ");
          nav("/login");
        })
        .catch((error) => {
          console.log(error.message);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="register">
        <h1>FIRST AUTO SERVICE</h1>
        <div className="register-form-container">
          <form
            className="register-form"
            onSubmit={handleRegister}
            autoComplete="off"
          >
            <div className="register-input-field">
              <label htmlFor="name">Name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="กรุณากรอกชื่อจริงผู้ใช้"
                id="name"
                name="name"
              />
            </div>
            <div className="register-input-field">
              <label htmlFor="email">Email</label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="กรุณากรอกอีเมลผู้ใช้"
                id="email"
                name="email"
              />
            </div>
            <div className="register-input-field">
              <label htmlFor="password">Password</label>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="กรุณากรอกรหัสผ่าน"
                id="password"
                name="password"
              />
            </div>
            <div className="register-input-field">
              <label htmlFor="cPassword">Confirm Password</label>
              <input
                required
                value={cPassword}
                onChange={(e) => setcPassword(e.target.value)}
                type="password"
                placeholder="กรุณากรอกยืนยันรหัสผ่าน"
                id="cPassword"
                name="cPassword"
              />
            </div>
            <div className="register-input-field">
              <label htmlFor="contact">Contact</label>
              <input
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                type="text"
                placeholder="กรุณาระบุช่องทางการติดต่อ"
                id="contact"
                name="contact"
              />
            </div>
            <button type="submit">Register</button>
          </form>
          <button className="register-link-btn" onClick={toLogin}>
            Already have an account? Click Here.
          </button>
          <div className="loader">
            {loading ? <TailSpin width="100" height="100" color="black" /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
