import { useState } from "react";
import "./AddCar.css";
import {
  ref,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { TailSpin } from "react-loader-spinner";

const AddCar = () => {
  injectStyle();

  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [owner, setOwner] = useState("");
  const [model, setModel] = useState("");
  const [service, setService] = useState("");
  const [plate, setPlate] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleImage = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleUploadImage = async () => {
    if (!file) {
      toast.error("กรุณาเลือกรูปภาพรถ!");
      setLoading(false);
    } else {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `cars/รุ่น: ${model} เจ้าของ: ${owner} ทะเบียน: ${plate}`
      );

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              setLoading(false);
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (err) => {
          toast.error("เกิดข้อผิดพลาดในการอัพโหลดไฟล์กรุณาลองใหม่!");
          console.log(err.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImgUrl(url);
          });
        }
      );
    }
  };

  const save = async (e) => {
    setLoading(true);
    e.preventDefault();
    handleUploadImage();
    try {
      console.log(imgUrl);
      await addDoc(collection(db, "cars"), {
        image: imgUrl,
        owner: owner,
        model: model,
        service: service,
        plate: plate,
        status: status,
        startDate: startDate,
        endDate: endDate,
      });
      toast.success("เพิ่มข้อมูลรถสำเร็จ");
      setLoading(false);
    } catch (err) {
      toast.error("เพิ่มข้อมูลรถไม่สำเร็จกรุณาลองใหม่");
      console.log(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="car">
        <div className="image-container">
          <img src={preview} width="500" height="200" alt="car" />
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
                บริการที่ใช้
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
          <button className="save-btn" onClick={save}>
            บันทึก
          </button>
          <div className="loader">
            {loading ? <TailSpin width="100" height="100" color="black" /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};
export default AddCar;
