import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import "./SearchCustomer.css";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Popconfirm } from "antd";

const SearchCustomer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleAdd = () => {
    const obj = {
      uId: null,
      email: null,
      contact: null,
      name: null,
      carOwned: null,
      service: null,
      id: null,
    };
    nav("/addCustomer/ADD/", { state: { data: obj } });
  };

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const q = query(collection(db, "customers"));
    onSnapshot(q, (snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(result);
      setLoading(false);
    });
  };

  const handleDelete = async (row) => {
    await deleteDoc(doc(db, "customers", row.id));
  };

  const handleEdit = (row) => {
    nav("/addCustomer/EDIT/", { state: { data: row } });
    // JSON.stringify(row)
  };

  const handleSearch = (e) => {
    const newData = data.filter((row) =>
      row.name.toLowerCase().includes(e.target.value.toLowerCase)
    );
    if (newData.length >= 1) {
      setData(newData);
    }
  };

  const columns = [
    {
      name: "อีเมลลูกค้า",
      center: true,
      selector: (row) => row.email,
    },
    {
      name: "ชื่อลูกค้า",
      center: true,
      selector: (row) => row.name,
    },
    {
      name: "บริการที่ใช้",
      center: true,
      selector: (row) => row.service,
    },
    {
      name: "รถที่ใช้บริการ",
      center: true,
      selector: (row) => row.carOwned,
    },
    {
      name: "ช่องทางติดต่อ",
      center: true,
      selector: (row) => row.contact,
    },
    {
      name: "แก้ไข/ลบ",
      center: true,
      cell: (row) => (
        <>
          <button onClick={() => handleEdit(row)}>แก้ไข</button>
          <Popconfirm
            title="ลบข้อมูล"
            description="คุณแน่ใจที่จะลบข้อมูลนี้หรือไม่?"
            onConfirm={() => handleDelete(row)}
            okText="ยันยัน"
            cancelText="ยกเลิก"
          >
            <button className="btn2">ลบ</button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="search-customer">
        <div className="search-container">
          <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
              placeholder="พิมพ์ข้อมูลที่ต้องการจะค้นหา..."
              type="text"
              onChange={handleSearch}
            />
          </div>
          <br></br>
          <button onClick={handleAdd}>เพิ่มประวัติลูกค้า</button>
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
export default SearchCustomer;
