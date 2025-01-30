import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Slider from "react-slick";
import "./customerlogin.css";
import Cookies from "js-cookie";
import { AuthContext } from "../Context/AuthContext";

const CustomerLogin = () => {
  const { setUserName } = useContext(AuthContext); // Access the context here
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const onSuccesful = (e) => {
    const jwtToken = e.token;
    const name = e.name;
    Cookies.set("jwtToken", jwtToken, { expires: 7 });
    setUserName(name);
    navigate("/");
  };

  // const handleChange = (e) => {
  //   setPhone(e.target.value);
  //   if (error) setError(""); // Clear error on input change
  // };
  const onChangeMobile = (e) => {
    setPhone(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone) {
      setError("Mobile number is required");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/customers/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone, password }),
        }
      );

      if (response.ok) {
        const e = await response.json();
        // navigate("/verify-otp", { state: { phone } });
        onSuccesful(e);
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
        <p className="login-description">
          Access your reports and manage bookings seamlessly.
        </p>
        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-label" htmlFor="mobile">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobile"
            value={phone}
            onChange={onChangeMobile}
            placeholder="Enter your mobile number"
            className="login-input"
          />
          <label className="login-label" htmlFor="password">
            Password
          </label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={onChangePassword}
            placeholder="Enter your password"
            className="login-input"
          />
          <Link to="/forgot-password">
            <p>Forgot Password ?</p>
          </Link>
          {error && <p className="login-error-msg">{error}</p>}
          <button type="submit" className="login-button">
            login
          </button>
        </form>
        <p className="signup-alternate">
          Don't have an account?{" "}
          <Link to="/customer/register">Register Here</Link>
        </p>
        <p className="login-terms">
          By proceeding, you agree to Access Path Labs T&C and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default CustomerLogin;
