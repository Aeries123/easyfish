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
      <div>
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
                <button className="header-elements">Book a Test</button>
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
        {/* <header className="header-container">
          <div className="navbar-toggle">
            <img
              src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736163989/menu_tyorem.png"
              height="30px"
              width="30px"
              onClick={onClickNavButton}
              alt="menu icon"
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
                key={each.elementPath}
              >
                <h6 className="header-elements">{each.elementName}</h6>
              </Link>
            ))}
          </div>
          <Link to="/cart">
            <img
              src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736573349/shopping_mapkoe.png"
              height="70px"
              width="70px"
              className="cart-icon"
              alt="cart icon"
            />
          </Link>
        </header> */}
      </div>
    </>
  );
};

// import "./header.css";
// import { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";
// import { IoCart } from "react-icons/io5";
// import Cookies from "js-cookie";

// const headerElements = [
//   {
//     elementName: "Home",
//     elementPath: "/",
//   },
//   {
//     elementName: "About us",
//     elementPath: "/about-us",
//   },
//   {
//     elementName: "Book a Test",
//     elementPath: "/book-test",
//   },
//   {
//     elementName: "Test Menu",
//     elementPath: "/test/menu",
//   },
//   { elementName: "Home Sample Collection", elementPath: "/sample" },
//   { elementName: "Download Report", elementPath: "/reports" },
//   {
//     elementName: "Upload Prescription",
//     elementPath: "/prescption",
//   },
// ];

// export const Header = () => {
//   const [isMenuVisible, setIsMenuVisible] = useState(false);
//   const [userName, setUserName] = useState(null); // Stores the logged-in user's name

//   console.log('username',userName)

//   const onClickNavButton = () => {
//     setIsMenuVisible((prev) => !prev);
//   };

//   // Fetch user details when the component mounts
//   useEffect(() => {
//     const token = Cookies.get("jwtToken"); // Retrieve token from cookies
//     if (token) {
//       // Fetch user details using the token
//       fetch("http://127.0.0.1:5000/api/get/profile", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.profile.customer_name) {
//             setUserName(data.profile.customer_name); // Assume `username` is the key in the response
//           }
//         })
//         .catch((error) => console.error("Error fetching user details:", error));
//     }
//   }, []); // Run this effect only once when the component mounts

//   return (
//     <>
//       <div>
//         <div className="header-img">
//           <div>
//             <img
//               className="header-logo-img-1"
//               src="https://res.cloudinary.com/dabzdwxet/image/upload/v1737127742/header-element-1_lbdnd0.png"
//               alt="logo-1"
//             />
//             <img
//               className="header-logo-img-2"
//               src="https://res.cloudinary.com/dabzdwxet/image/upload/v1737127742/header-element-2_bdtwkn.png"
//               alt="logo-2"
//             />
//           </div>
//           <div className="header-heading-names">
//             <button className="header-elements">Book a Test</button>
//             <button className="header-elements">Home Sample Collection</button>
//           </div>

//           <div>
//             <Link className="cart-icon-container" to="/cart">
//               <IoCart className="cart-icon" />
//               Cart
//             </Link>
//           </div>

//           <div>
//             <div className="header-img-content-container">
//               <div className="" style={{ display: "flex" }}>
//                 <img
//                   src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736432518/support_wcadty.png"
//                   height="20px"
//                   width="20px"
//                   alt="support icon"
//                 />
//                 <p style={{ marginLeft: "10px", fontSize: "15px" }}>
//                   914 227 1111
//                 </p>
//               </div>
//               {userName ? (
//                 // Show the user's name when logged in
//                 <div className="logged-in-user" style={{ display: "flex", alignItems: "center" }}>
//                   <img
//                     src="https://via.placeholder.com/30"
//                     alt="User Icon"
//                     className="user-icon"
//                     style={{ marginRight: "10px" }}
//                   />
//                   <span>{userName}</span>
//                 </div>
//               ) : (
//                 // Show login/signup button when not logged in
//                 <button className="login-sign-up-button">
//                   <Link className="login-signup-link" to="/customer/login">
//                     Login/Signup
//                   </Link>
//                 </button>
//               )}
//             </div>
//           </div>
//           <img
//             className="header-logo-img"
//             src="https://res.cloudinary.com/dabzdwxet/image/upload/v1737127742/header-element-3_puddrj.png"
//             alt="logo-3"
//           />
//         </div>
//         <header className="header-container">
//           <div className="navbar-toggle">
//             <img
//               src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736163989/menu_tyorem.png"
//               height="30px"
//               width="30px"
//               onClick={onClickNavButton}
//               alt="menu icon"
//             />
//           </div>
//           <div
//             className={`header-elements-container ${
//               isMenuVisible ? "active" : ""
//             }`}
//           >
//             {headerElements.map((each) => (
//               <Link
//                 to={each.elementPath}
//                 style={{ textDecoration: "none", color: "white" }}
//                 key={each.elementPath}
//               >
//                 <h6 key={each.elementName} className="header-elements">
//                   {each.elementName}
//                 </h6>
//               </Link>
//             ))}
//           </div>
//           <Link to="/cart">
//             <img
//               src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736573349/shopping_mapkoe.png"
//               height="70px"
//               width="70px"
//               className="cart-icon"
//               alt="cart icon"
//             />
//           </Link>
//         </header>
//       </div>
//     </>
//   );
// };
