import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Slider from "react-slick";
import "./customersignup.css";

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",       // Added email field
    phone: "",
    password: "",
    gender: "",
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/customers/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setFormData({
          customer_name: "",
          email: "",  // Reset email
          phone: "",
          password: "",
          gender: "",
        });

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate("/customer/login");
        }, 2000);
      } else {
        setError(data.error || "An error occurred during registration.");
      }
    } catch (err) {
      setError("Failed to communicate with the server.");
    }
  };

  return (
    <div className="signup-main-container">
      <div className="signup-slider-container">
        <Slider {...sliderSettings}>
          <div className="signup-slider-image-container">
            <img
              src="https://res.cloudinary.com/dabzdwxet/image/upload/v1736427737/team_shgiay.jpg"
              alt="Slide 1"
              className="signup-images"
            />
          </div>
          <div className="signup-slider-image-container">
            <img
              src="https://res.cloudinary.com/dabzdwxet/image/upload/v1736427737/team_shgiay.jpg"
              alt="Slide 2"
              className="signup-images"
            />
          </div>
        </Slider>
      </div>

      <div className="signup-form-container">
        <h2 className="signup-sub-heading">Sign Up</h2>
        <p className="signup-description">
          View your reports and upcoming health checkups at one place.
        </p>
        
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="signup-form-container">
          <label className="signup-label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="customer_name"
            placeholder="Enter your name"
            className="signup-input"
            value={formData.customer_name}
            onChange={handleChange}
          />

          <label className="signup-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="signup-input"
            value={formData.email}
            onChange={handleChange}
          />

          <label className="signup-label" htmlFor="mobile">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobile"
            name="phone"
            placeholder="Enter mobile number"
            className="signup-input"
            value={formData.phone}
            onChange={handleChange}
          />

          <label className="signup-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="signup-input"
            value={formData.password}
            onChange={handleChange}
          />

          <label className="signup-label" htmlFor="sex">
            Gender
          </label>
          <select
            id="sex"
            name="gender"
            className="signup-input"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="login-alternate">
          Already have an account?{" "}
          <Link to="/customer/login">Login Here</Link>
        </p>
        <p className="signup-terms">
          By proceeding, you agree to Access Path Labs T&C and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default CustomerSignup;
