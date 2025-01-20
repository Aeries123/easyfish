// src/components/ManageNotification.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsPerPage] = useState(5); // Number of notifications to display per page
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  // Mock Data - Example notifications
  const mockNotifications = [
    {
      notification_id: 1,
      message: "Your account has been successfully created.",
      sent_at: "2025-01-17T10:30:00Z",
      is_read: false,
    },
    {
      notification_id: 2,
      message: "You have a new message from support.",
      sent_at: "2025-01-16T14:45:00Z",
      is_read: true,
    },
    {
      notification_id: 3,
      message: "Don't forget to check out our latest features.",
      sent_at: "2025-01-15T09:00:00Z",
      is_read: false,
    },
    {
      notification_id: 4,
      message: "New updates available for your account.",
      sent_at: "2025-01-14T08:30:00Z",
      is_read: true,
    },
    {
      notification_id: 5,
      message: "Your password has been changed successfully.",
      sent_at: "2025-01-13T11:00:00Z",
      is_read: false,
    },
    {
      notification_id: 6,
      message: "Your subscription is about to expire.",
      sent_at: "2025-01-12T07:15:00Z",
      is_read: true,
    },
    {
      notification_id: 7,
      message: "You have a new comment on your post.",
      sent_at: "2025-01-11T17:30:00Z",
      is_read: false,
    },
    {
      notification_id: 8,
      message: "Your account settings have been updated.",
      sent_at: "2025-01-10T09:25:00Z",
      is_read: true,
    },
  ];

  // Simulate fetching data from an API
  useEffect(() => {
    setTimeout(() => {
      setNotifications(mockNotifications); // Set the mock data after a delay
      setLoading(false);
    }, 1000); // Simulate a 1-second delay for fetching
  }, []);

  // Filter notifications based on search query
  const filteredNotifications = notifications.filter((notification) =>
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate notifications
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = filteredNotifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Mark notification as read/unread
  const toggleReadStatus = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.notification_id === notificationId
          ? { ...notification, is_read: !notification.is_read }
          : notification
      )
    );
  };

  // Delete a notification
  const deleteNotification = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.notification_id !== notificationId
      )
    );
  };

  return (
    <div className="container mt-5">
      <h2>Manage Notifications</h2>
      
      {/* Search bar */}
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
                <th>Message</th>
                <th>Sent At</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentNotifications.map((notification) => (
                <tr
                  key={notification.notification_id}
                  className={notification.is_read ? 'table-success' : 'table-warning'}
                >
                  <td>{notification.notification_id}</td>
                  <td>{notification.message}</td>
                  <td>{new Date(notification.sent_at).toLocaleString()}</td>
                  <td>
                    {notification.is_read ? (
                      <span className="badge bg-success">Read</span>
                    ) : (
                      <span className="badge bg-warning">Unread</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary mr-2"
                      onClick={() => toggleReadStatus(notification.notification_id)}
                    >
                      Mark as {notification.is_read ? 'Unread' : 'Read'}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteNotification(notification.notification_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage * notificationsPerPage >= filteredNotifications.length}
            >
              Next
            </button>
          </div>

          {/* Pagination info */}
          <div className="mt-3 text-center">
            <p>
              Page {currentPage} of {Math.ceil(filteredNotifications.length / notificationsPerPage)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageNotification;
