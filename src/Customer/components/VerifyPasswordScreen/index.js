import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || ""; // Get email from navigation state

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password"); // Redirect if email is not provided
    }
  }, [email, navigate]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/customers/forgot-password/verify_otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessage(data.message);

      // Redirect to login after successful OTP verification
      setTimeout(() => {
        navigate("/customer/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="forgot-main-container">
      <div className="forgot-form-container">
        <h2 className="forgot-sub-heading">Verify OTP</h2>
        <p className="forgot-description">
          Enter the OTP sent to {email} to reset your password.
        </p>

        <form onSubmit={handleVerifyOtp} className="forgot-form">
          <label className="forgot-label" htmlFor="otp">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            placeholder="Enter OTP"
            className="forgot-input"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button type="submit" className="forgot-button">
            Verify OTP
          </button>
        </form>

        {message && <p className="forgot-success-message">{message}</p>}
        {error && <p className="forgot-error-message">{error}</p>}
      </div>
    </div>
  );
};

export default VerifyOtp;
