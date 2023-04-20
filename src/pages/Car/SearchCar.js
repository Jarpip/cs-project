import DataTable from "react-data-table-component";
import "./SearchCar.css";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Popconfirm } from "antd";
import { useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";

const SearchCar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = (e) => {
    const newData = data.filter((row) =>
      row.name.toLowerCase().includes(e.target.value.toLowerCase)
    );
    setData(newData);
  };

  const columns = [
    {
      name: "รูปภาพ",
      cell: (row) => <img src={row.image} alt={row.name}></img>,
      selector: (row) => row.image,
    },
    {
      name: "เจ้าของ",
      center: true,
      selector: (row) => row.owner,
    },
    {
      name: "รถรุ่น",
      center: true,
      selector: (row) => row.model,
    },
    {
      name: "เลขทะเบียน",
      center: true,
      selector: (row) => row.plate,
    },
    {
      name: "บริการที่ใช้",
      center: true,
      selector: (row) => row.service,
    },
    {
      name: "สถานะ",
      center: true,
      selector: (row) => row.status,
    },
    {
      name: "วันที่เริ่ม",
      center: true,
      selector: (row) => row.startDate,
    },
    {
      name: "วันที่สิ้นสุด",
      center: true,
      selector: (row) => row.endDate,
    },
    {
      name: "แก้ไข/ลบ",
      center: true,
      cell: (row) => (
        <>
          <button>แก้ไข</button>
          <Popconfirm
            title="ลบข้อมูล"
            description="คุณแน่ใจที่จะลบข้อมูลนี้หรือไม่?"
            okText="ยันยัน"
            cancelText="ยกเลิก"
          >
            <button className="btn2">ลบ</button>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const q = query(collection(db, "cars"));
    onSnapshot(q, (snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(result);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="search-car">
        <div className="search-container">
          <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
              placeholder="พิมพ์ข้อมูลที่ต้องการจะค้นหา..."
              type="text"
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="result-container">
          <DataTable
            fixedHeader
            fixedHeaderScrollHeight="600px"
            columns={columns}
            data={data}
            pagination
            progressPending={loading}
          />
        </div>
      </div>
    </>
  );
};

export default SearchCar;
