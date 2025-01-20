// src/components/Addresses.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Addresses = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    door_no: '',
    street: '',
    village: '',
    district: '',
    state: '',
    country: '',
    pincode: '',
    is_primary: 0,
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
    const apiUrl = 'http://your-api-endpoint.com/add-address';

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
          alert('Address added successfully!');
          setFormData({
            user_id: '',
            door_no: '',
            street: '',
            village: '',
            district: '',
            state: '',
            country: '',
            pincode: '',
            is_primary: 0,
          }); // Reset form
        } else {
          alert('Failed to add address.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred.');
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          {/* User ID */}
          <div className="col-md-6">
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
          </div>

          {/* Door Number */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="door_no">Door Number</label>
              <input
                type="text"
                className="form-control"
                id="door_no"
                name="door_no"
                value={formData.door_no}
                onChange={handleChange}
                placeholder="Enter Door Number"
                required
              />
            </div>
          </div>
        </div>

        <div className="row mb-3">
          {/* Street */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="street">Street</label>
              <input
                type="text"
                className="form-control"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Enter Street"
                required
              />
            </div>
          </div>

          {/* Village */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="village">Village</label>
              <input
                type="text"
                className="form-control"
                id="village"
                name="village"
                value={formData.village}
                onChange={handleChange}
                placeholder="Enter Village"
                required
              />
            </div>
          </div>
        </div>

        <div className="row mb-3">
          {/* District */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="district">District</label>
              <input
                type="text"
                className="form-control"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="Enter District"
                required
              />
            </div>
          </div>

          {/* State */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter State"
                required
              />
            </div>
          </div>
        </div>

        <div className="row mb-3">
          {/* Country */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter Country"
                required
              />
            </div>
          </div>

          {/* Pincode */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <input
                type="text"
                className="form-control"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter Pincode"
                required
              />
            </div>
          </div>
        </div>

        <div className="row mb-3">
          {/* Is Primary */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="is_primary">Is Primary Address?</label>
              <select
                className="form-control"
                id="is_primary"
                name="is_primary"
                value={formData.is_primary}
                onChange={handleChange}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-group col-md-12 text-center mt-4">
          <button type="submit" className="btn btn-primary" style={{ width: '100px' }}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addresses;
