import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
 
const LabTechnicianForm = () => {
  const navigate = useNavigate();
 
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [expertise, setExpertise] = useState("");
  const [available, setAvailable] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
 
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;  // Validate for a 10-digit phone number
    return phoneRegex.test(phone);
  };
 
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
 
    // Validate input fields
    if (!validatePhone(phone)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }
 
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
 
    const technicianData = {
      name,
      password,
      phone,
      email,
      expertise,
      available: available ? 1 : 0,
    };
 
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/api/technicians/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(technicianData),
      });
 
      const data = await response.json();
 
      if (!response.ok) {
        throw new Error(data.error || "Failed to register technician");
      }
 
      setSuccessMessage(data.message);
 
      // Reset form fields after successful submission
      setName("");
      setPassword("");
      setPhone("");
      setEmail("");
      setExpertise("");
      setAvailable(true);
 
      // Redirect to technician list or dashboard
      navigate("/admin/admin-manage-technician");
 
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="container mt-4">
      <h2>Register Technician</h2>
 
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
 
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Technician Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
 
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"  // Add password validation for minimum length
          />
        </div>
 
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            id="phone"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
 
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
 
        <div className="mb-3">
          <label htmlFor="expertise" className="form-label">Expertise</label>
          <input
            type="text"
            id="expertise"
            className="form-control"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            required
          />
        </div>
 
        <div className="mb-3">
          <label htmlFor="available" className="form-check-label">Available</label>
          <input
            type="checkbox"
            id="available"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
            className="form-check-input"
          />
        </div>
 
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Registering..." : "Register Technician"}
        </button>
      </form>
    </div>
  );
};
 
export default LabTechnicianForm;