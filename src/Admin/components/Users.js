// src/components/Users.js
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Users = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    role: "",
    phone: "",
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

  // Handle form submission to add a new user
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.password || !formData.role || !formData.phone) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess("User added successfully!");
        setFormData({ name: "", password: "", role: "", phone: "" }); // Clear the form
      } else {
        setError("Failed to add user. Please try again.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Error connecting to server. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New User</h2>

      {/* Display error or success messages */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Form to add a new user */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            className="form-control"
            value={formData.role}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleInputChange}
            required
            pattern="^\+?[1-9]\d{1,14}$" // Basic phone number validation (e.g., +1234567890)
          />
        </div>

        <div className="form-group col-md-12 text-center mt-4">
            <button type="submit" className="btn btn-primary" style={{ width: '100px' }}>Submit</button>
          </div> 
      </form>
    </div>
  );
};

export default Users;
