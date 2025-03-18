import React, { useState, useEffect } from "react";
import { MdNotificationsActive } from "react-icons/md";
import "./Header.css";

const Header = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Fetch notifications from the backend
  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/admin/notifications`
      );
      const data = await response.json();

      if (data.notifications) {
        setNotifications(data.notifications);
        setUnreadCount(data.notifications.length);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Mark notifications as read
  const markNotificationsAsRead = async () => {
    try {
      await fetch(`${BASE_URL}/api/admin/notifications/mark-read`, {
        method: "POST",
      });
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  // Toggle dropdown and mark notifications as read when opened
  const handleBellClick = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown && unreadCount > 0) {
      markNotificationsAsRead();
    }
  };

  // Fetch notifications every 30 seconds
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="admin-header-header">
      <div className="header-left">
        <img
          // src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736159475/Screenshot_2025-01-06_160018_so8uaf.png"
          src="https://res.cloudinary.com/dabzdwxet/image/upload/v1742019821/easy_fish_logo_llhozd.jpg"
          alt="Logo"
          className="logo"
        />
      </div>

      <div className="notification-container">
        <button className="notification-button" onClick={handleBellClick}>
          <MdNotificationsActive className="admin-header-notification-icon" />
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </button>

        {showDropdown && (
          <div className="notification-dropdown">
            {notifications.length > 0 ? (
              notifications.map((n, index) => (
                <div key={index} className="notification-item">
                  {n.message}
                </div>
              ))
            ) : (
              <div className="notification-item">No new notifications</div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap JS

// function Header() {
//     return (
//         <div>
//             <nav className="navbar navbar-expand-lg bg-primary">
//                 <div className="container-fluid">
//                     <a className="navbar-brand" href="/">Navbar</a>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarNavDropdown">
//                         <ul className="navbar-nav">
//                             <li className="nav-item">
//                                 <a className="nav-link active" aria-current="page" href="/home">Home</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link" href="/features">Features</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link" href="/pricing">Pricing</a>
//                             </li>
//                         </ul>
//                     </div>
//                     <div>
//                         <form className="d-flex" role="search">
//                             <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
//                             <button className="btn btn-outline-success" type="submit">Search</button>
//                         </form>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     );
// }

// export default Header;
