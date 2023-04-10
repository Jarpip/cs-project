import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { auth, db } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../../../redux/Slice/authSlice";
import { collection, getDocs, query, where } from "firebase/firestore";
import { TailSpin } from "react-loader-spinner";

const Login = () => {
  injectStyle();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();
  const toRegis = () => nav("/register");

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const q = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        const result = [];
        querySnapshot.forEach((doc) => {
          result.push(doc.data().name);
        });
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userID: user.uid,
            userName: result[0],
          })
        );
        setLoading(false);
        nav("/home");
        toast.success("เข้าสู่ระบบสำเร็จ");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        switch (error.code) {
          case "auth/wrong-password":
            toast.error("รหัสผ่านผิด!");
            break;
          case "auth/too-many-requests":
            toast.error(
              "ใส่รหัสผ่านผิดบ่อยเกินไปกรุณารอสักพักแล้วลองใหม่หรือกรุณาติดต่อแอดมิน"
            );
            break;
          default:
            toast.error("ไม่พบผู้ใช้ในระบบ!");
            break;
        }
      });
  };

  return (
    <>
      <div className="login">
        <h1>FIRST AUTO SERVICE</h1>
        <div className="login-form-container">
          <form
            className="login-form"
            onSubmit={handleLogin}
            autoComplete="off"
          >
            <div className="login-input-field">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="mail"
                placeholder="กรุณากรอกอีเมลผู้ใช้"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="login-input-field">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="กรุณากรอกรหัสผ่าน"
                id="password"
                name="password"
                required
              />
            </div>
            <button className="login-btn" type="submit">
              Log In
            </button>
          </form>
          <button className="login-link-btn" onClick={toRegis}>
            Don't have account? Click Here.
          </button>
          <div className="loader">
            {loading ? <TailSpin width="100" height="100" color="black" /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
