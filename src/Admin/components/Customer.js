import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    customer_id: '',
    user_id: '',
    customer_name: '',
    password: '',
    phone: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = 'http://your-api-endpoint.com/add-customer';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Customer added successfully!');
          setFormData({
            customer_id: '',
            user_id: '',
            customer_name: '',
            password: '',
            phone: '',
            gender: '',
          });
        } else {
          alert('Failed to add customer.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred.');
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Customer Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Customer ID */}
          <div className="form-group col-md-6">
            <label htmlFor="customer_id">Customer ID</label>
            <input
              type="number"
              className="form-control"
              id="customer_id"
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              required
            />
          </div>

          {/* User ID */}
          <div className="form-group col-md-6">
            <label htmlFor="user_id">User ID</label>
            <input
              type="number"
              className="form-control"
              id="user_id"
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          {/* Customer Name */}
          <div className="form-group col-md-6">
            <label htmlFor="customer_name">Customer Name</label>
            <input
              type="text"
              className="form-control"
              id="customer_name"
              name="customer_name"
              value={formData.customer_name}
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

          {/* Gender */}
          <div className="form-group col-md-6">
            <label htmlFor="gender">Gender</label>
            <select
              className="form-control"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
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
