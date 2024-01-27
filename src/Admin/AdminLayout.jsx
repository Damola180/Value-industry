import { NavLink, Outlet } from "react-router-dom";
import AdminHeader from "../Admin/AdminHeader";
import { FaRegUser } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";

export default function HostLayout() {
  const activeStyles = {
    fontWeight: "bold",

    color: "#161616",
    borderBottom: " 2px solid  #007acc",
  };
  return (
    <>
      <AdminHeader />
      <div>
        <div className="Admin-container">
          <div className="admin-img_div">
            <CiHeart style={{ fontSize: "35px", marginLeft: "80%" }} />
            <FaRegUser style={{ fontSize: "150px" }} />
          </div>

          <nav className="admin-Nav_Outlet">
            <NavLink
              to="."
              end
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Orders
            </NavLink>
            <NavLink
              to="addproduct"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Add Products
            </NavLink>
          </nav>
          <Outlet />
        </div>
      </div>
    </>
  );
}
