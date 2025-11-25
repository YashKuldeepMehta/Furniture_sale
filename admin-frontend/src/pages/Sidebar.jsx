import React from "react";
import "../styles/Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { FaChartPie, FaClipboardList, FaTruck, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "./authcontext"

const Sidebar = () => {
  const location = useLocation();
  const {logout} = useAuth()

  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>

      <ul className="sidebar-menu">
        <li className={location.pathname === "/admin-dashboard" ? "active" : ""}>
          <Link to="/admin-dashboard">
            <FaChartPie /> Dashboard
          </Link>
        </li>

        <li className={location.pathname === "/status-update" ? "active" : ""}>
          <Link to="/status-update">
            <FaTruck /> Status Update
          </Link>
        </li>

        <li className={location.pathname === "/admin-orders" ? "active" : ""}>
          <Link to="/admin-orders">
            <FaClipboardList /> All Orders
          </Link>
        </li>

        <li>
          <Link onClick={logout}>
            <FaSignOutAlt /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
