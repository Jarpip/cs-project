import { useState } from "react";
import "./AddCustomer.css"
import { auth, db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const AddCustomer=()=>{

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [plate, setPlate] = useState("");
    const [uid, setUid] = useState("");

    const nav = useNavigate();
    const back = ()=>{
        nav("/customer");    
    }

    const save = async ()=>{
        onAuthStateChanged(auth, (user)=>{
            if (user){
                const uid = user.uid;
            }
        })
        const docRef = await addDoc(collection(db, "customers"), {
            uId: uid,
            email: email,
            contact: contact,
            cName: name,
            cPlate: plate,

        });
    }

    return(
        <>
        <div className="add-customer-main">
            <div className="back">
                <button className="back-btn" onClick={back}>back</button>
            </div>
            
            <div className="add-customer-input-wrapper">
                <div className="add-customer-input">
                    <label>
                        ชื่อลูกค้า
                        <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        อีเมลลูกค้า
                        <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <div className="car-input">
                    <label>
                        ช่องทางติดต่อ
                        <input
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        />
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
            <button className="save-btn" onClick={save}>
                บันทึก
            </button>
        </div>
        </>
    )
}

export default AddCustomer;