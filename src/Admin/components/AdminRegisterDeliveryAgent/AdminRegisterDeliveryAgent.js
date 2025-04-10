import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminRegisterDeliveryAgent.css"; // Link to the new CSS file

function AdminRegisterDeliveryAgent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!name || !email || !phone || !address || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/delivery_boys", {
        name,
        email,
        phone,
        address,
        password,
      });

      if (res.data.success) {
        setSuccess("Registration successful!");
        // setTimeout(() => navigate("/admin/delivery_boy"), 1500);
      } else {
        setError(res.data.message || "Registration failed.");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">📝 Delivery Agent Register</h2>

      <input
        className="register-input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="register-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="register-input"
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <textarea
        className="register-input register-textarea"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        rows={3}
      />
      <input
        className="register-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="register-button" onClick={handleRegister}>
        Register
      </button>

      {error && <p className="register-error">{error}</p>}
      {success && <p className="register-success">{success}</p>}
    </div>
  );
}

export default AdminRegisterDeliveryAgent;
