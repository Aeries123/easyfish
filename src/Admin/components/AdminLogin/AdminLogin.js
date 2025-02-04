import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

import "./AdminLogin.css";

const AdminLogin = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook


  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission default action
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages
  
    try {
      const response = await fetch("http://localhost:5000/api/customers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.error || "An error occurred. Please try again.");
      } else {
        setSuccess(data.message);
        navigate('/admin'); // Use navigate instead of history.push

        // Store the token in cookies
        Cookies.set("authToken", data.token, { expires: 2 }); // Token expires in 2 days
        console.log("Token stored in cookies:", data.token);
  
        // Clear form data after successful login
        setPhone("");
        setPassword("");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };
  

  return (
    <div className="admin-login">
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default AdminLogin;