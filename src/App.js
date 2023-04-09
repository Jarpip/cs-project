import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Customers from "./pages/Owner/Customer/Customer";
import SearchCar from "./pages/SearchCar/SearchCar";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import SidebarLayout from "./component/SideBar/SideBarLayout";
import Cars from "./pages/Owner/Car/Cars";
import { ToastContainer } from "react-toastify";
import Queue from "./pages/Owner/Queue/Queue";
import AddCustomer from "./pages/Owner/Customer/AddCustomer";

const App = () => {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route element={<SidebarLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/car" element={<Cars />} />
            <Route path="/customer" element={<Customers />} />
            <Route path="/searchCar" element={<SearchCar />} />
            <Route path="/queue" element={<Queue />} />
            <Route path="/addCustomer" element={<AddCustomer />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
