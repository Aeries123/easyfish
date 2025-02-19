import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { index } from "../TechnicianContext";
import "./index.css";

const TechnicianVerifyOtp = () => {
  // const { setUserName } = useContext(index);
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const phone = location.state?.phone || "";
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError("OTP is required");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set("jwtToken", data.token, { expires: 7 });
        // setUserName(data.name);
        navigate("/technician/");
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
      <h2 className="otp-heading">Verify OTP</h2>
      <form onSubmit={handleVerifyOTP} className="otp-form">
        <label className="otp-label" htmlFor="otp">Enter OTP</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="otp-input"
        />
        {error && <p className="otp-error-msg">{error}</p>}
        <button type="submit" className="otp-button">Verify OTP</button>
      </form>
    </div>
  );
};

export default TechnicianVerifyOtp;
