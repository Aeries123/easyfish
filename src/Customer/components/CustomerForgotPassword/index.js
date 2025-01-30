import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Slider from "react-slick";
import "./index.css"; // Separate styles for Forgot Password

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/customers/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            new_password: newPassword,
            confirm_password: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setMessage("OTP sent successfully! Check your email.");

        // Redirect to Verify OTP page after 2 seconds
        setTimeout(() => {
          navigate("/verify-otp", { state: { email } });
        }, 2000);
      }
    } catch (err) {
      setError("Failed to connect to server.");
    }
  };

  return (
    <div className="forgot-main-container">
      <div className="forgot-slider-container">
        <Slider {...sliderSettings}>
          <div className="forgot-slider-image-container">
            <img
              src="https://res.cloudinary.com/dabzdwxet/image/upload/v1736427737/team_shgiay.jpg"
              alt="Slide 1"
              className="forgot-images"
            />
          </div>
          <div className="forgot-slider-image-container">
            <img
              src="https://res.cloudinary.com/dabzdwxet/image/upload/v1736427737/team_shgiay.jpg"
              alt="Slide 2"
              className="forgot-images"
            />
          </div>
        </Slider>
      </div>

      <div className="forgot-form-container">
        <h2 className="forgot-sub-heading">Forgot Password</h2>
        <p className="forgot-description">
          Enter your email to receive an OTP and reset your password.
        </p>
        {error && <p className="forgot-error-message">{error}</p>}
        {message && <p className="forgot-success-message">{message}</p>}
        <form onSubmit={handleSubmit} className="forgot-form-container">
          <label className="forgot-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="forgot-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="forgot-label" htmlFor="new-password">
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            name="new-password"
            placeholder="Enter new password"
            className="forgot-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <label className="forgot-label" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirm new password"
            className="forgot-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="forgot-button">
            Reset Password
          </button>
        </form>
        <p className="forgot-alternate">
          Remember your password? <Link to="/customer/login">Login Here</Link>
        </p>
        <p className="forgot-terms">
          By proceeding, you agree to our T&C and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
