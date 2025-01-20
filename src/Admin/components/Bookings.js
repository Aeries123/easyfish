import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingsForm = () => {
  const [formData, setFormData] = useState({
    appointment_id: '',
    user_id: '',
    technician_id: '',
    patient_name: '',
    patient_contact: '',
    notes: '',
    test_ids: '',
    appointment_date: '',
    slot_date: '',
    status: 'pending',
    total_price: '',
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

    const apiUrl = 'http://your-api-endpoint.com/add-booking';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Booking added successfully!');
          setFormData({
            appointment_id: '',
            user_id: '',
            technician_id: '',
            patient_name: '',
            patient_contact: '',
            notes: '',
            test_ids: '',
            appointment_date: '',
            slot_date: '',
            status: 'pending',
            total_price: '',
          });
        } else {
          alert('Failed to add booking.');
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
                required
              />
            </div>

            {/* Technician ID */}
            <div className="form-group">
              <label htmlFor="technician_id">Technician ID</label>
              <input
                type="number"
                className="form-control"
                id="technician_id"
                name="technician_id"
                value={formData.technician_id}
                onChange={handleChange}
              />
            </div>

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
              <label htmlFor="test_ids">Test IDs</label>
              <input
                type="number"
                className="form-control"
                id="test_ids"
                name="test_ids"
                value={formData.test_ids}
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

            {/* Status */}
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                className="form-control"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
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
        {/* Submit Button */}
        <div className="form-group col-md-12 text-center mt-4">
            <button type="submit" className="btn btn-primary" style={{ width: '100px' }}>Submit</button>
          </div>
      </form>
    </div>
  );
};

export default BookingsForm;
