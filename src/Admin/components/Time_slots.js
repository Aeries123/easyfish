// src/components/Time_slots.js
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const TimeSlots = () => {
  const [formData, setFormData] = useState({
    test_id: "",
    slot_date: "",
    is_available: 1,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission to add a new time slot
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.test_id || !formData.slot_date) {
      setError("Both test_id and slot_date are required.");
      return;
    }

    try {
      const response = await fetch("/api/time-slots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess("Time slot added successfully!");
        setFormData({ test_id: "", slot_date: "", is_available: 1 }); // Clear the form
      } else {
        setError("Failed to add time slot. Please try again.");
      }
    } catch (error) {
      console.error("Error adding time slot:", error);
      setError("Error connecting to server. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Time Slot</h2>

      {/* Display error or success messages */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Form to add a new time slot */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="test_id">Test ID</label>
          <input
            type="number"
            id="test_id"
            name="test_id"
            className="form-control"
            value={formData.test_id}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="slot_date">Slot Date</label>
          <input
            type="datetime-local"
            id="slot_date"
            name="slot_date"
            className="form-control"
            value={formData.slot_date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="is_available">Is Available</label>
          <select
            id="is_available"
            name="is_available"
            className="form-control"
            value={formData.is_available}
            onChange={handleInputChange}
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>

        <div className="form-group col-md-12 text-center mt-4">
            <button type="submit" className="btn btn-primary" style={{ width: '100px' }}>Submit</button>
          </div> 
      </form>
    </div>
  );
};

export default TimeSlots;
