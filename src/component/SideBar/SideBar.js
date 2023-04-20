import { Link } from "react-router-dom";
import * as icons from "react-icons/bi";
import "./SideBar.css";
import { useState } from "react";
import { REMOVE_ACTIVE_USER } from "../../redux/Slice/authSlice";
import { useDispatch } from "react-redux";
import { AdminAccess } from "../AdminAccess";
import { REMOVE_CUSTOMER_DATA } from "../../redux/Slice/customerSlice";

export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(REMOVE_ACTIVE_USER(), REMOVE_CUSTOMER_DATA());
  };

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
        <AdminAccess>
          <li className="active">
            <Link to="/addCar">
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
            <Link to="/searchCustomer">
              <span
                className="icon"
                style={{ paddingRight: isOpen ? "0px" : "25px" }}
              >
                <icons.BiUserPlus />
              </span>
              <span className="title">จัดการประวัติลูกค้า</span>
            </Link>
          </li>
        </AdminAccess>
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

        <li className="active" onClick={logOut}>
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
