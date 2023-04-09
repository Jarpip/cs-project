import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "./Car.css";
import { auth, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";

const Cars = () => {
  injectStyle();

  const [selectedDate, setSelectedDate] = useState();
  const [imgUrl, setImgUrl] = useState(null);
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [percent, setPercent] = useState(0);

  const [id, setId] = useState("");
  const [owner, setOwner] = useState("");
  const [model, setModel] = useState("");
  const [service, setService] = useState("");
  const [plate, setPlate] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleImage = (e) => {
    //setFile(URL.createObjectURL(e.target.files[0]));
    setPreview(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    if (!file) {
      toast.error("Please choose a file first!");
    }

    const storageRef = ref(storage, "cars/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    auth.onAuthStateChanged( user=>{
      setId(user.uid);
      console.log(user);
      console.log(user.uid);
    })
    const docRef = await addDoc(collection(db, "cars"), {
      uId: id,
      cImage: imgUrl,
      cOwner: owner,
      cModel: model,
      cService: service,
      cPlate: plate,
      cStatus: status,
      startDate: startDate,
    });
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgUrl(url);
          console.log(url);
        });
      }
    );
  };

  return (
    <>
      <div className="car">
        <div className="image-container">
          <img src={preview} width="500" height="200" />
          <div className="select-image">
            <h2>เพิ่มรูปภาพรถ</h2>
            <input type="file" onChange={handleImage} accept="/image/*" />
          </div>
          <div className="car-input-wrapper">
            <div className="car-input">
              <label>
                ชื่อเจ้าของรถ
                <input
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                />
              </label>
              <label>
                รุ่นรถ
                <input
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </label>
            </div>
            <div className="car-input">
              <label>
                ปัญหา/บริการที่ใช้
                <input
                  value={service}
                  onChange={(e) => setService(e.target.value)}
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
            <div className="car-input">
              <label>
                สถานะ
                <input
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </label>
              <label>
                วันที่เริ่ม
                <input
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
            </div>
          </div>
          <button className="save-btn" onClick={handleUpload}>
            บันทึก
          </button>
        </div>
      </div>
    </>
  );
};
export default Cars;
