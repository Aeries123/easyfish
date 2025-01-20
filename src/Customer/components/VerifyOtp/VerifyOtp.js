import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import './VerifyOtp.css'

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const mobile = location.state?.mobile; // Get mobile from state passed from the login page

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("OTP is required");
      return;
    }

    // Call your API to verify OTP
    try {
      const response = await fetch("http://your-api-endpoint/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, otp }),
      });

      if (response.ok) {
        // Redirect to the home page upon successful verification
        navigate("/home");
      } else {
        setError("Invalid OTP, please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Error verifying OTP");
    }
  };

  return (
    <div className="verify-otp-container">
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter OTP</label>
          <input
            type="text"
            value={otp}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default VerifyOTP;
