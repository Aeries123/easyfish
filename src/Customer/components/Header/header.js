import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { AuthContext } from "../Context/AuthContext";
import "./header.css";
import { FaUserCircle } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { FaWhatsapp, FaPhone } from "react-icons/fa";


const headerElements = [
  { elementName: "Home", elementPath: "/" },
  { elementName: "About us", elementPath: "/about-us" },
  { elementName: "Book a Test", elementPath: "/book-test" },
  { elementName: "Test Menu", elementPath: "/test/menu" },
  { elementName: "Home Sample Collection", elementPath: "/sample" },
  { elementName: "Download Report", elementPath: "/reports" },
  { elementName: "Upload Prescription", elementPath: "/prescription" },
];

export const Header = () => {
  const { userName } = useContext(AuthContext); // Consume AuthContext
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleSupportClick = () => {
    const phoneNumber = "919142271111"; // WhatsApp number with country code
    const message = encodeURIComponent("Hello, I need support regarding your services.");
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="header-container">
      <div className="header-img">
        <div>
          <Link to="/">
            <img
              className="header-logo-img-1"
              src="https://res.cloudinary.com/dabzdwxet/image/upload/v1737127742/header-element-1_lbdnd0.png"
              alt="logo-1"
            />
          </Link>
          <img
            className="header-logo-img-2"
            src="https://res.cloudinary.com/dabzdwxet/image/upload/v1737127742/header-element-2_bdtwkn.png"
            alt="logo-2"
          />
        </div>

        <div className="header-right-component">
          <div className="header-heading-names">
            <Link to="/book-test">
              <h1 className="header-header-elements">Home Collections</h1>
            </Link>
          </div>

          <div className="header-heading-names">
            <Link to="/about-us">
              <h1 className="header-header-elements">About</h1>
            </Link>
          </div>

          <div>
            <Link className="cart-icon-container" to="/cart">
              <IoCart className="cart-icon" />
            </Link>
          </div>

          <div className="header-img-content-container">
            {/* Updated Support Section */}
            <div
              className="header-logged-in-support"
              onClick={handleSupportClick}
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
              style={{ cursor: "pointer", position: "relative" }}
            >
              <FaWhatsapp className="header-user-icon" />
              <span className="header-profile-support">Request Call back</span>
              {isTooltipVisible && (
                <div className="tooltip">
                  We help you select the test
                </div>
              )}
            </div>

            {userName ? (
              <Link to="/my-dashboard" className="header-logged-in-user">
                <FaUserCircle className="header-user-icon" />
                <span className="header-profile-name">{userName}</span>
              </Link>
            ) : (
              <button className="login-sign-up-button">
                <Link className="login-signup-link" to="/customer/login">
                  Signin
                </Link>
              </button>
            )}
          </div>
          <img
            className="header-logo-img"
            src="https://res.cloudinary.com/dabzdwxet/image/upload/v1737127742/header-element-3_puddrj.png"
            alt="logo-3"
          />
        </div>
      </div>
    </div>
  );
};
