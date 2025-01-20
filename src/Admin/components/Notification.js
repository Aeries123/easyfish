import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    user_id: '',
    message: '',
  });
  const [loading, setLoading] = useState(true);

  // Fetch notifications from API when component mounts
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/notifications'); // API endpoint to fetch notifications
      const data = await response.json();
      if (response.ok) {
        setNotifications(data);
      } else {
        console.error('Error fetching notifications:', data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({ user_id: '', message: '' }); // Clear form
        fetchNotifications(); // Refetch notifications
      } else {
        console.error('Error adding notification:', await response.json());
      }
    } catch (error) {
      console.error('Error adding notification:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Notification</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="user_id">User ID</label>
              <input
                type="number"
                id="user_id"
                name="user_id"
                className="form-control"
                value={formData.user_id}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                rows="3"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
          </div>
        </div>
        {/* <button type="submit" className="btn btn-primary mt-3">
          Add Notification
        </button> */}
                    <button type="submit" className="btn btn-primary" style={{ width: '100px' }}>Add Notification</button>

      </form>

      <h3>Existing Notifications</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="list-group">
          {notifications.map((notification) => (
            <div
              key={notification.notification_id}
              className={`list-group-item ${notification.is_read ? 'list-group-item-success' : 'list-group-item-warning'}`}
            >
              <h5>{notification.message}</h5>
              <p>
                <strong>Sent At:</strong> {new Date(notification.sent_at).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                {notification.is_read ? (
                  <span className="badge bg-success">Read</span>
                ) : (
                  <span className="badge bg-warning">Unread</span>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
