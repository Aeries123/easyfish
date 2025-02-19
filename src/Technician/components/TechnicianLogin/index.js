import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Slider from "react-slick";
import Cookies from "js-cookie";

import "./index.css";

const TechnicianLogin = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleOTPRequest = async (e) => {
    e.preventDefault();
    if (!phone) {
      setError("Mobile number is required");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
        credentials: "include",
      });

      if (response.ok) {
        navigate("/technician/verify-otp", { state: { phone } });
      } else {
        setError("Failed to send OTP, please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Error sending OTP");
    }
  };

  return (
    <div className="customer-login-main-container">
      <div className="login-slider-container">
        <Slider {...sliderSettings}>
          <div className="login-slider-image-container">
            <img
              src="https://res.cloudinary.com/dabzdwxet/image/upload/v1736427737/team_shgiay.jpg"
              alt="Slide 1"
              className="login-images"
            />
          </div>
          <div className="login-slider-image-container">
            <img
              src="https://res.cloudinary.com/dabzdwxet/image/upload/v1736427737/team_shgiay.jpg"
              alt="Slide 2"
              className="login-images"
            />
          </div>
        </Slider>
      </div>

      <div className="login-form-container">
        <h2 className="login-sub-heading">Login</h2>
        <p className="login-description">Access your reports and manage bookings seamlessly.</p>

        <form onSubmit={handleOTPRequest} className="login-form">
          <label className="login-label" htmlFor="mobile">Mobile Number</label>
          <input
            type="text"
            id="mobile"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your mobile number"
            className="login-input"
          />
          {error && <p className="login-error-msg">{error}</p>}
          <button type="submit" className="login-button">Send OTP</button>
        </form>

        <p className="signup-alternate">Don't have an account? <Link to="/customer/register">Register Here</Link></p>
        <p className="login-terms">By proceeding, you agree to Access Path Labs T&C and Privacy Policy.</p>
      </div>
    </div>
  );
};

export default TechnicianLogin;
