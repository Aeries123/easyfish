import React from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaShoppingCart, FaUsers, FaList, FaMoneyBillWave, FaStar, FaBell, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa"; // Importing icons
import "./Sidebar.css"; 

const Sidebar = () => {
  const links = [
    { path: "/admin/", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/admin/manage-packages", label: "Manage Products", icon: <FaBox /> },
    { path: "/admin/manage-booking", label: "Manage Orders", icon: <FaShoppingCart /> },
    { path: "/admin/manage-customer", label: "Manage Customers", icon: <FaUsers /> },
    { path: "/admin/manage-category", label: "Manage Categories", icon: <FaList /> },
      { path: "/admin/manage-payments", label: "Manage Payments", icon: <FaMoneyBillWave /> },
    { path: "/admin/manage-reviews", label: "Manage Reviews", icon: <FaStar /> },
    { path: "/admin/manage-notification", label: "Manage Notifications", icon: <FaBell /> },
    { path: "/admin/manage-address", label: "Manage Addresses", icon: <FaMapMarkerAlt /> },
    { path: "/admin/manage-bestseller", label: "BestSeller", icon: <FaMapMarkerAlt /> },
    { path: "/admin/delivery_boy", label: "Deliveryboy", icon: <FaMapMarkerAlt /> },
    { path: "/admin/manage-assigned", label: "AssignedDeliveryboy", icon: <FaMapMarkerAlt /> },



  ];

  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("authToken");
    navigate('/admin/login');
  };

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <NavLink to={link.path} className="sidebar-link" activeClassName="active-link">
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

export default Sidebar;
