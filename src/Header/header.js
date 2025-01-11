import "./header.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
const headerElements = [
  {
    elementName: "About us",
    elementPath: "/about-us",
  },
  {
    elementName: "Book a Test",
    elementPath: "/book-test",
  },
  {
    elementName: "Test Menu",
    elementPath: "/test/menu",
  },
  { elementName: "Home Sample Collection", elementPath: "/sample" },
  { elementName: "Download Report", elementPath: "/reports" },
  {
    elementName: "Upload Prescription",
    elementPath: "/prescption",
  },
];
export const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const onClickNavButton = () => {
    setIsMenuVisible((prev) => !prev);
  };
  return (
    <>
      <div>
        <div className="header-img">
          <div>
            <input
              type="search"
              className="hidden-input"
              id="header-input"
              placeholder="Search Tests Here"
            />
          </div>
          <div className="header-img-content-container">
            <div style={{ display: "flex" }}>
              <img
                src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736432518/support_wcadty.png"
                height="30px"
                width="30px"
              />
              <p style={{marginLeft: "10px"}}>914 227 1111</p>
            </div>
            <button className="login-sign-up-button">
              <Link className="login-signup-link" to="/customer/login">Login/Signup</Link>{" "}
            </button>
          </div>
        </div>

        <header className="header-container">
          <div className="navbar-toggle">
            <img
              src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736163989/menu_tyorem.png"
              height="30px"
              width="30px"
              onClick={onClickNavButton}
            />
          </div>
          <div
            className={`header-elements-container ${
              isMenuVisible ? "active" : ""
            }`}
          >
            {headerElements.map((each) => (
              <Link
                to={each.elementPath}
                style={{ textDecoration: "none", color: "white" }}
              >
                <h6 key={each.elementName} className="header-elements">
                  {each.elementName}
                </h6>
              </Link>
            ))}
          </div>
          {/* <button className="btn btn-primary header-btn"> */}
          <Link to="/cart">
            <img
              src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736424675/carts_mjdkfo.png"
              height="50px"
              width="50px"
              className="cart-icon"
            />
          </Link>
          {/* </button>  */}
        </header>
      </div>
    </>
  );
};
