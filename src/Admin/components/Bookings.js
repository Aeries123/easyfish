import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingsForm = () => {
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_contact: '',
    notes: '',
    test_id: '',
    appointment_date: '',
    slot_date: '',
    total_price: '',
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

    const apiUrl = `${BASE_URL}/api/book-test`;

    // Make sure the 'test_id' is converted to an array for the backend
    const testIds = formData.test_id.split(',').map(id => id.trim());

    const payload = {
      ...formData,
      test_id: testIds,
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include your token if required
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert('Booking added successfully!');
          setFormData({
            patient_name: '',
            patient_contact: '',
            notes: '',
            test_id: '',
            appointment_date: '',
            slot_date: '',
            total_price: '',
          });
        } else {
          alert(data.error || 'Failed to add booking.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred.');
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6">
            {/* Patient Name */}
            <div className="form-group">
              <label htmlFor="patient_name">Patient Name</label>
              <input
                type="text"
                className="form-control"
                id="patient_name"
                name="patient_name"
                value={formData.patient_name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Patient Contact */}
            <div className="form-group">
              <label htmlFor="patient_contact">Patient Contact</label>
              <input
                type="text"
                className="form-control"
                id="patient_contact"
                name="patient_contact"
                value={formData.patient_contact}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-6">
            {/* Notes */}
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                className="form-control"
                id="notes"
                name="notes"
                rows="4"
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Test IDs */}
            <div className="form-group">
              <label htmlFor="test_ids">Test IDs (comma separated)</label>
              <input
                type="text"
                className="form-control"
                id="test_ids"
                name="test_id"
                value={formData.test_id}
                onChange={handleChange}
                required
              />
            </div>

            {/* Appointment Date */}
            <div className="form-group">
              <label htmlFor="appointment_date">Appointment Date</label>
              <input
                type="datetime-local"
                className="form-control"
                id="appointment_date"
                name="appointment_date"
                value={formData.appointment_date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Slot Date */}
            <div className="form-group">
              <label htmlFor="slot_date">Slot Date</label>
              <input
                type="datetime-local"
                className="form-control"
                id="slot_date"
                name="slot_date"
                value={formData.slot_date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Total Price */}
            <div className="form-group">
              <label htmlFor="total_price">Total Price</label>
              <input
                type="number"
                className="form-control"
                id="total_price"
                name="total_price"
                value={formData.total_price}
                onChange={handleChange}
                step="0.01"
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

export default BookingsForm;
