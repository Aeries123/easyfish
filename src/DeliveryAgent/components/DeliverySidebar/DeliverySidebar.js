import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  FaTachometerAlt,
  FaShoppingBag,
  FaListAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import "./DeliverySidebar.css";

const DeliverySidebar = () => {
  const links = [
    { path: "/delivery/", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/delivery/orders", label: "My Orders", icon: <FaShoppingBag /> },
    { path: "/delivery/assigned-orders", label: "Assigned Orders", icon: <FaListAlt /> },
    { path: "/delivery/profile", label: "Profile", icon: <FaUser /> },
  ];

  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("authToken");
    navigate("/delivery/login");
  };

  return (
    <div className="sidebar">
      <h2>Delivery Panel</h2>
      <nav>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                className="sidebar-link"
                activeClassName="active-link"
              >
                <span className="icon">{link.icon}</span> {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <button onClick={onClickLogout} className="logout-btn">
          <FaSignOutAlt className="logout-icon" /> Logout
        </button>
      </nav>
    </div>
  );
};

export default DeliverySidebar;


