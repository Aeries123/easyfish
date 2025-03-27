 
import React, { useState, useEffect } from "react";
import { MdNotificationsActive } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";
import "./Header.css";
 
const Header = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
 
  const BASE_URL = process.env.REACT_APP_BASE_URL;
 
  console.log(notifications,"notifications")
 
  // Fetch notifications from the backend
  const fetchNotifications = async () => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(`${BASE_URL}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
 
      const allNotifications = response.data.notifications || [];
      const unreadNotifications=allNotifications.filter((n) => !n.is_read)
      setNotifications(unreadNotifications);
 
      // Count unread notifications
      const unread = allNotifications.filter((n) => !n.is_read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };
 
  // Mark a single notification as read
  const markNotificationAsRead = async (id) => {
    try {
      const token = Cookies.get("authToken");
      await axios.post(
        `${BASE_URL}/api/notifications/mark-read/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
 
      // Remove the clicked notification from the list
      setNotifications(notifications.filter((n) => n.id !== id));
 
      // Decrease unread count
      setUnreadCount((prevCount) => Math.max(0, prevCount - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };
 
 
  // Toggle notification dropdown
  const handleBellClick = () => {
    setShowDropdown(!showDropdown);
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
          src="https://res.cloudinary.com/dabzdwxet/image/upload/v1742019821/easy_fish_logo_llhozd.jpg"
          alt="Logo"
          className="logo"
        />
      </div>
      <p className="easyfish">EASYFISH</p>
 
      <div className="notification-container">
        <button className="notification-button" onClick={handleBellClick}>
          <MdNotificationsActive className="admin-header-notification-icon" />
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </button>
 
        {showDropdown && (
          <div className="notification-dropdown">
            {loading ? (
              <div className="notification-item">Loading...</div>
            ) : notifications.length > 0 ? (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className="notification-item"
                  onClick={() => markNotificationAsRead(n.id)}
                >
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
 