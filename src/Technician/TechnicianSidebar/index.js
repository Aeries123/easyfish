import React from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import "./index.css"; // Add CSS for styling

const TechnicianSidebar = () => {
  const links = [
    { path: "/technician/", label: "Dashboard" },
    { path: "/technician/apply-leave", label: "Apply Leave" },
    { path: "/technicianview-leaves/", label: "View Leaves" },
    { path: "/admin/manage-asssigned-technician", label: "Assigned Tasks" },
    // { path: "/technician/schedule", label: "Schedule" },
    // { path: "/technician/patients", label: "Patients" },
    // { path: "/technician/test-results", label: "Test Results" },
    // { path: "/technician/notifications", label: "Notifications" },
    // { path: "/technician/settings", label: "Settings" },
  ];

  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("authToken");
    navigate("/technician/login"); // Redirect to login page
  };

  return (
    <div className="sidebar">
      <h2>Technician Panel</h2>
      <nav>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <NavLink to={link.path} className="sidebar-link" activeClassName="active-link">
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <button onClick={onClickLogout} className="logout-btn">Logout</button>
      </nav>
    </div>
  );
};

export default TechnicianSidebar;
