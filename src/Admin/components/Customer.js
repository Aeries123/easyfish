import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    profile_picture: null, // File state
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profile_picture: e.target.files[0], // Store file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `${BASE_URL}/api/customers/register`;

    // Create FormData to send file
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('password', formData.password);
    if (formData.profile_picture) {
      formDataToSend.append('profile_picture', formData.profile_picture);
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataToSend, // Sending FormData instead of JSON
      });

      if (response.ok) {
        alert('Customer added successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          profile_picture: null,
        });
      } else {
        alert('Failed to add customer.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Customer Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Customer Name */}
          <div className="form-group col-md-6">
            <label htmlFor="name">Customer Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          {/* Phone */}
          <div className="form-group col-md-6">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group col-md-6">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          {/* Profile Picture Upload */}
          <div className="form-group col-md-6">
            <label htmlFor="profile_picture">Profile Picture</label>
            <input
              type="file"
              className="form-control"
              id="profile_picture"
              name="profile_picture"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-group text-center mt-4">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
