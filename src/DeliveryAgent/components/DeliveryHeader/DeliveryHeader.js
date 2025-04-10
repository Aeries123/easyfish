import React, { useState, useEffect } from "react";
import { MdNotificationsActive } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import "./DeliveryHeader.css";

const DeliveryHeader = ({ onToggleMenu }) => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchNotifications = async () => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(`${BASE_URL}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allNotifications = response.data.notifications || [];
      const unreadNotifications = allNotifications.filter((n) => !n.is_read);
      setNotifications(unreadNotifications);
      setUnreadCount(unreadNotifications.length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markNotificationAsRead = async (id) => {
    try {
      const token = Cookies.get("authToken");
      await axios.post(
        `${BASE_URL}/api/notifications/mark-read/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setUnreadCount((prevCount) => Math.max(0, prevCount - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleBellClick = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="admin-header-header">
      <div className="header-left">
        <button className="mobile-menu-button" onClick={onToggleMenu}>
          <FaBars />
        </button>
        <img
          src="https://res.cloudinary.com/dabzdwxet/image/upload/v1742019821/easy_fish_logo_llhozd.jpg"
          alt="Logo"
          className="logo"
        />
        <p className="easyfish">EASYFISH</p>
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

export default DeliveryHeader;
