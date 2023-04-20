import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchCustomer from "./pages/Customer/SearchCustomer";
import AddCustomer from "./pages/Customer/AddCustomer";
import SearchCar from "./pages/Car/SearchCar";
import AddCar from "./pages/Car/AddCar";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import SidebarLayout from "./component/SideBar/SideBarLayout";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./authGuard/ProtectedRoute";
import UnProtectedRoute from "./authGuard/UnProtectedRoute";

const App = () => {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route element={<UnProtectedRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<SidebarLayout />}>
              <Route path="/home" element={<HomePage />} exact />
              <Route path="/searchCustomer" element={<SearchCustomer />} />
              <Route path="/addCustomer/:mode" element={<AddCustomer />} />
              <Route path="/addCar" element={<AddCar />} />
              <Route path="/searchCar" element={<SearchCar />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
