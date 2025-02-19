// ManageBooking.js (React)

import React, { useState } from 'react';
import BookingsForm from './Bookings';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const Booking = () => {
  const [formData, setFormData] = useState({
    appointment_id: '',
    test_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = `${BASE_URL}/addappointmenttest`; // Backend URL

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Appointment test added successfully.') {
          alert('Test added to appointment successfully!');
          setFormData({
            appointment_id: '',
            test_id: '',
          });
        } else {
          alert('Failed to add test.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred.');
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Manage Booking - Add Test</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            {/* Appointment ID */}
            <div className="form-group">
              <label htmlFor="appointment_id">Appointment ID</label>
              <input
                type="number"
                className="form-control"
                id="appointment_id"
                name="appointment_id"
                value={formData.appointment_id}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            {/* Test ID */}
            <div className="form-group">
              <label htmlFor="test_id">Test ID</label>
              <input
                type="number"
                className="form-control"
                id="test_id"
                name="test_id"
                value={formData.test_id}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-group col-md-12 text-center mt-4">
          <button type="submit" className="btn btn-primary" style={{ width: '100px' }}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Booking;
