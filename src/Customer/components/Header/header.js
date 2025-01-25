import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { AuthContext } from "../Context/AuthContext";
import "./header.css";
import { FaUserCircle } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";

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
  console.log("H Updated");

  const { userName } = useContext(AuthContext); // Consume AuthContext
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const onClickNavButton = () => {
    setIsMenuVisible((prev) => !prev);
  };

  return (
    <>
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
                <h1 className="header-header-elements">Tests</h1>
              </Link>
              {/* <Link to="/sample">
              {" "}
              <button className="header-elements">
                Home Sample Collection
              </button>
            </Link> */}
            </div>

            <div>
              <Link className="cart-icon-container" to="/cart">
                <IoCart className="cart-icon" />
                {/* Cart */}
              </Link>
            </div>
            <div className="header-img-content-container">
              <div className="header-logged-in-support">
                <BiSupport className="header-user-icon" />
                <span className="header-profile-support">914 227 1111</span>
              </div>
              {userName ? (
                <Link to="/my-dashboard" className="header-logged-in-user">
                  <FaUserCircle className="header-user-icon" />
                  <span className="header-profile-name">{userName}</span>
                </Link>
              ) : (
                <button className="login-sign-up-button">
                  <Link className="login-signup-link" to="/customer/login">
                    Login/Signup
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
    </>
  );
};
