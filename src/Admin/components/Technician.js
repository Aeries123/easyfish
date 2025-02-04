import React, { useState } from "react";

const TechnicianForm = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    phone: "",
    assign: "not_assigned",
    sample_collection: "not_collected",
    status: "Available",
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/technician", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create technician");
      }

      setMessage(`Technician created successfully! Assigned Area: ${data.assigned_area}`);
      setError(null);
      setFormData({
        user_id: "",
        name: "",
        phone: "",
        assign: "not_assigned",
        sample_collection: "not_collected",
        status: "Available",
      });
    } catch (err) {
      setError(err.message);
      setMessage(null);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Technician</h2>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">User ID:</label>
          <input
            type="text"
            className="form-control"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone:</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Assign Task:</label>
          <select className="form-control" name="assign" value={formData.assign} onChange={handleChange}>
            <option value="not_assigned">Not Assigned</option>
            <option value="assigned">Assigned</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Sample Collection:</label>
          <select className="form-control" name="sample_collection" value={formData.sample_collection} onChange={handleChange}>
            <option value="not_collected">Not Collected</option>
            <option value="collected">Collected</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Status:</label>
          <select className="form-control" name="status" value={formData.status} onChange={handleChange}>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Create Technician</button>
      </form>
    </div>
  );
};

export default TechnicianForm;
