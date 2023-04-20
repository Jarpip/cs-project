import { useState } from "react";
import "./AddCustomer.css";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { TailSpin } from "react-loader-spinner";
import { Tooltip } from "antd";

const AddCustomer = () => {
  injectStyle();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [plate, setPlate] = useState("");
  const [id, setId] = useState("");
  const [car, setCar] = useState("");
  const [service, setService] = useState("");
  const [ownedCar, setOwnedCar] = useState("");
  const location = useLocation();
  const editData = location.state.data;
  const params = useParams();
  const nav = useNavigate();

  const back = () => {
    nav("/searchCustomer");
  };

  const autoFill = async (e) => {
    e.preventDefault();
    if (params.mode === "ADD") {
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setName(doc.data().name);
        setContact(doc.data().contact);
        setId(doc.data().uid);
      });
    }
  };

  const setEditData = () => {
    if (params.mode === "EDIT") {
      const carData = editData.carOwned.split(" ");
      setId(editData.uId);
      setName(editData.name);
      setEmail(editData.email);
      setContact(editData.contact);
      setService(editData.service);
      setCar(carData[0]);
      setPlate(carData[2]);
    }
  };

  useState(() => {
    setEditData();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (car && plate) {
      setOwnedCar(car + " ทะเบียน: " + plate);
    }
    try {
      if (params.mode === "ADD") {
        await addDoc(collection(db, "customers"), {
          uId: id,
          email: email,
          contact: contact,
          name: name,
          carOwned: ownedCar,
          service: service,
        });
        setLoading(false);
        toast.success("เพิ่มข้อมูลลูกค้าเรียบร้อยแล้ว");
      } else if (params.mode === "EDIT") {
        const data = {
          uId: id,
          email: email,
          contact: contact,
          name: name,
          carOwned: ownedCar,
          service: service,
        };
        const c = doc(db, "customers", editData.id);
        await updateDoc(c, data);
        setLoading(false);
        toast.success("แก้ไขข้อมูลลูกค้าเรียบร้อยแล้ว");
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error("เกิดข้อผิดพลาดกรุณาลองใหม่");
    }
  };

  return (
    <>
      <form onSubmit={save} autoComplete="off">
        <div className="add-customer-main">
          <div className="back">
            <button className="back-btn" onClick={back}>
              ย้อนกลับ
            </button>
          </div>

          <div className="add-customer-input-wrapper">
            <div className="add-customer-input">
              <label>
                ชื่อลูกค้า
                <input value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label>
                อีเมลลูกค้า
                <Tooltip
                  title="Tip: กรอกช่องนี้ก่อนเพื่อความรวดเร็วถ้าลูกค้าสมัครบัญชีแล้ว"
                  color="green"
                >
                  <input
                    type="mail"
                    placeholder=""
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={autoFill}
                  />
                </Tooltip>
              </label>
            </div>
            <div className="add-customer-input">
              <label>
                ช่องทางติดต่อ
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </label>
              <label>
                บริการที่ใช้
                <input
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                />
              </label>
            </div>
            <div className="add-customer-input">
              <label>
                รุ่นรถ
                <input value={car} onChange={(e) => setCar(e.target.value)} />
              </label>
              <label>
                เลขทะเบียนรถ
                <input
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                />
              </label>
            </div>
          </div>
          <button className="save-btn" type="submit">
            บันทึก
          </button>
          <div className="loader">
            {loading ? <TailSpin width="100" height="100" color="black" /> : ""}
          </div>
        </div>
      </form>
    </>
  );
};

export default AddCustomer;
