import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';  // Import js-cookie
import 'bootstrap/dist/css/bootstrap.min.css';
 
const ManageNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";
 
  useEffect(() => {
    fetchNotifications();
  }, []);
 
  const fetchNotifications = async () => {
    try {
      const token = Cookies.get('authToken'); // Get token from cookies
      const response = await axios.get(`${BASE_URL}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` }  // Use token from cookies
      });
      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };
 
  const toggleReadStatus = async (id, isRead) => {
    try {
      const token = Cookies.get('authToken');
      await axios.put(`${BASE_URL}/api/notifications/${id}`, { is_read: !isRead }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.map(notification =>
        notification.id === id ? { ...notification, is_read: !isRead } : notification
      ));
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };
 
  const deleteNotification = async (id) => {
    try {
      const token = Cookies.get('authToken');
      await axios.delete(`${BASE_URL}/api/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.filter(notification => notification.id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };
 
  const filteredNotifications = notifications.filter(notification =>
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = filteredNotifications.slice(indexOfFirstNotification, indexOfLastNotification);
 
  return (
    <div className="container-fluid mt-5">
      <h2>Manage Notifications</h2>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search notifications"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Message</th>
                <th>Sent At</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentNotifications.map(notification => (
                <tr key={notification.id} className={notification.is_read ? 'table-success' : 'table-warning'}>
                  <td>{notification.id}</td>
                  <td>{notification.title}</td>
                  <td>{notification.message}</td>
                  <td>{new Date(notification.created_at).toLocaleString()}</td>
                  <td>
                    <span className={`badge ${notification.is_read ? 'bg-success' : 'bg-warning'}`}>
                      {notification.is_read ? 'Read' : 'Unread'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary me-2"
                      onClick={() => toggleReadStatus(notification.id, notification.is_read)}
                    >
                      Mark as {notification.is_read ? 'Unread' : 'Read'}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage * notificationsPerPage >= filteredNotifications.length}
            >
              Next
            </button>
          </div>
          <div className="mt-3 text-center">
            <p>Page {currentPage} of {Math.ceil(filteredNotifications.length / notificationsPerPage)}</p>
          </div>
        </>
      )}
    </div>
  );
};
 
export default ManageNotification;