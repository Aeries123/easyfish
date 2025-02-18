import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie
 
const TechnicianPasswordLogin = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
 
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/technicians/login", {
        phone,
        password,
      });
 
      if (response.status === 200) {
        // Store JWT token in Cookies
        Cookies.set("techToken", response.data.token, { expires: 7, secure: true }); // Token expires in 7 days
 
        // Redirect to the technician dashboard
        navigate("/technician/");
      }
    } catch (err) {
      // Handle error response
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Technician Login</h2>
 
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
 
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              placeholder="+91XXXXXXXXXX"
              required
            />
          </div>
 
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your password"
              required
            />
          </div>
 
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
 
export default TechnicianPasswordLogin;