import React, { useState, useEffect } from "react";
import { MdNotificationsActive } from "react-icons/md";
import "./Header.css";

const Header = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  console.log("Fetched Notifications:", notifications);



  const BASE_URL = process.env.REACT_APP_BASE_URL;

  

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


  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/notifications`);
      const data = await response.json();
      console.log("Fetched Notifications:", data); // Debugging
      if (data.notifications) {
        setNotifications(data.notifications);
        setUnreadCount(data.notifications.length);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
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
              <p className="easyfish" >EASYFISH</p>


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