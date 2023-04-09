import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar";
import { ShowUser } from "../ShowUser";

const SidebarLayout = () => (
  <>
    <SideBar />
    <ShowUser/>
    <Outlet />
  </>
);

export default SidebarLayout;
