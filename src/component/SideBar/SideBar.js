import { Link } from "react-router-dom";
import * as icons from "react-icons/bi";
import "./SideBar.css";
import { useState } from "react";
import { Store } from "redux";
import authSlice from "../../redux/Slice/authSlice";
import { useDispatch } from "react-redux";

export const SideBar = () => {
  // const getUser =()=>{

  // }
  const [user,setUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="sidebar" style={{ width: isOpen ? "300px" : "50px" }}>
      <div className="top-section">
        <h1 className="logo" style={{ fontSize: isOpen ? "20px" : "0px" }}>
          FIRST AUTO SERVICE
        </h1>
        <div
          className="toggle-bar"
          style={{ marginLeft: isOpen ? "30px" : "-5px" }}
        >
          <icons.BiMenu onClick={toggle} />
        </div>
      </div>
      <ul className="nav-links">
        <li className="active">
          <Link to="/searchCar">
            <span
              className="icon"
              style={{ paddingRight: isOpen ? "0px" : "25px" }}
            >
              <icons.BiSearchAlt />
            </span>
            <span className="title">ค้นหารถ</span>
          </Link>
        </li>
        <li className="active">
          <Link to="/car">
            <span
              className="icon"
              style={{ paddingRight: isOpen ? "0px" : "25px" }}
            >
              <icons.BiCar />
            </span>
            <span className="title">จัดการรถ</span>
          </Link>
        </li>
        <li className="active">
          <Link to="/customer">
            <span
              className="icon"
              style={{ paddingRight: isOpen ? "0px" : "25px" }}
            >
              <icons.BiUserPlus />
            </span>
            <span className="title">จัดการลูกค้า</span>
          </Link>
        </li>
        <li className="active">
          <Link to="/login">
            <span
              className="icon"
              style={{ paddingRight: isOpen ? "0px" : "25px" }}
            >
              <icons.BiLogOut />
            </span>
            <span className="title">ออกจากระบบ</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
