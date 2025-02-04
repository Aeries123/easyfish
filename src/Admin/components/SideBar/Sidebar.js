// File: components/SideBar/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

import "./Sidebar.css"; // Add CSS for styling

const Sidebar = () => {
  const links = [
    { path: "/admin/", label: "Dashboard" },
    // { path: "/admin/login", label: "Login" },
    { path: "/admin/manage-booking", label: "Manage Bookings" },
    { path: "/admin/manage-tests", label: "Manage Tests" },
    { path: "/admin/manage-customer", label: "Manage Customers" },
    { path: "/admin/prescriptions", label: "Prescriptions" },

    { path: "/admin/manage-enquiry", label: "Manage Enquiry" },

    // { path: "/admin/customer", label: "Customers" },
    { path: "/admin/manage-review", label: "Manage Reviews" },
    { path: "/admin/manage-payment", label: "Manage Payments" },
    { path: "/admin/manage-category", label: "Manage Categories" },
    { path: "/admin/manage-technician", label: "Manage Technician" },
    // { path: "/admin/technician", label: "Technician" },

    // { path: "/admin/category", label: "Categories" },
    { path: "/admin/manage-notification", label: "Manage Notifications" },
    // { path: "/admin/review", label: "Reviews" },
    { path: "/admin/manage-address", label: "Manage Addresses" },
    // { path: "/admin/addresses", label: "Addresses" },
    { path: "/admin/settings", label: "Settings" },

    // { path: "/admin/lab-technician-form", label: "Lab Technician Form" },
    // { path: "/admin/payment", label: "Payments" },
    // { path: "/admin/notification", label: "Notifications" },
    // { path: "/admin/test-results", label: "Test Results" },
    // { path: "/admin/test-parameters", label: "Test Parameters" },
    // { path: "/admin/test-sample-types", label: "Test Sample Types" },

    // { path: "/admin/manage-appointment", label: "Manage Appointments" },
    // { path: "/admin/manage-time-slots", label: "Manage Time Slots" },
    // { path: "/admin/tests-form", label: "Tests Form" },
    //
    // { path: "/admin/admin-form", label: "Admin Form" },
    // { path: "/admin/booking", label: "Booking" },
    // { path: "/admin/appointment-summary", label: "Appointment Summary" },
    // { path: "/admin/bookings-form", label: "Bookings Form" },

    // { path: "/admin/manage-admin", label: "Manage Admins" },

    // { path: "/admin/manage-test-results", label: "Manage Test Results" },

    // { path: "/admin/manage-users", label: "Manage Users" },
    // { path: "/admin/time-slots", label: "Time Slots" },
    // { path: "/admin/users", label: "Users" },
    // { path: "/admin/manage-test-parameters", label: "Manage Test Parameters" },
    // { path: "/admin/manage-test-sample-types", label: "Manage Test Sample Types" },
    // { path: "/admin/manage-test-visit-types", label: "Manage Test Visit Types" },
  ];
  const navigate = useNavigate(); // Use useNavigate hook

  const onClickLogout = () => {
    Cookies.remove("authToken");

    // Redirect the user to the login page
    navigate('/admin/login'); // Use navigate instead of history.push
  };

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                className="sidebar-link"
                activeClassName="active-link"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <button onClick={onClickLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default Sidebar;
