import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Slider from "react-slick";
import "./VerifyOtp.css"; // Using the same styles as CustomerLogin
import { AuthContext } from "../Context/AuthContext";

const VerifyOTP = () => {
  const { setUserName } = useContext(AuthContext);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone; // Getting phone from state

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleChange = (e) => {
    setOtp(e.target.value);
    if (error) setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("OTP is required");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, otp }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        const jwtToken = data.token;
        const name = data.name;
        Cookies.set("jwtToken", jwtToken, { expires: 7 });
        setUserName(name);
        navigate("/"); // Redirect to home page after successful login
      } else {
        setError("Invalid OTP, please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Error verifying OTP");
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
        <h2 className="login-sub-heading">Verify OTP</h2>
        <p className="login-description">
          Enter the OTP sent to your mobile number.
        </p>
        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-label" htmlFor="otp">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            className="login-input"
          />
          {error && <p className="login-error-msg">{error}</p>}
          <button type="submit" className="login-button">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
