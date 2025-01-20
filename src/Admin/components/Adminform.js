import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminForm = () => {
  const [formData, setFormData] = useState({
    admin_id: '',
    user_id: '',
    permissions: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your API endpoint
    const apiUrl = 'http://your-api-endpoint.com/add-admin';

    // Send form data to the server
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Admin added successfully!');
          setFormData({ admin_id: '', user_id: '', permissions: '' }); // Reset form
        } else {
          alert('Failed to add admin.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred.');
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Admin Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Admin ID */}
        <div className="form-group">
          <label htmlFor="admin_id">Admin ID</label>
          <input
            type="number"
            className="form-control"
            id="admin_id"
            name="admin_id"
            value={formData.admin_id}
            onChange={handleChange}
            placeholder="Enter Admin ID"
            required
          />
        </div>

        {/* User ID */}
        <div className="form-group">
          <label htmlFor="user_id">User ID</label>
          <input
            type="number"
            className="form-control"
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            placeholder="Enter User ID"
            required
          />
        </div>

        {/* Permissions */}
        <div className="form-group">
          <label htmlFor="permissions">Permissions</label>
          <textarea
            className="form-control"
            id="permissions"
            name="permissions"
            rows="4"
            value={formData.permissions}
            onChange={handleChange}
            placeholder="Enter Permissions"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="form-group col-md-12 text-center mt-4">
            <button type="submit" className="btn btn-primary" style={{ width: '100px' }}>Submit</button>
          </div>
      </form>
    </div>
  );
};

export default AdminForm;
