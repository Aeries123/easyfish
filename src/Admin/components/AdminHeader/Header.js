import React from "react";
import { MdNotificationsActive } from "react-icons/md";

import "./Header.css";

const Header = () => {
  const handleLogout = () => {
    alert("Logged out successfully!");
    // Add logout logic here, e.g., clear session or redirect to login page.
  };

  return (
    <header className="admin-header-header">
      <div className="header-left">
        <img
          src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736159475/Screenshot_2025-01-06_160018_so8uaf.png"
          alt="Logo"
          className="logo"
        />
      </div>
      <button className="logout-button" onClick={handleLogout}>
        <MdNotificationsActive className="admin-header-notification-icon" />
      </button>
    </header>
  );
};

export default Header;

// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap JS

// function Header() {
//     return (
//         <div>
//             <nav className="navbar navbar-expand-lg bg-primary">
//                 <div className="container-fluid">
//                     <a className="navbar-brand" href="/">Navbar</a>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarNavDropdown">
//                         <ul className="navbar-nav">
//                             <li className="nav-item">
//                                 <a className="nav-link active" aria-current="page" href="/home">Home</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link" href="/features">Features</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link" href="/pricing">Pricing</a>
//                             </li>
//                         </ul>
//                     </div>
//                     <div>
//                         <form className="d-flex" role="search">
//                             <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
//                             <button className="btn btn-outline-success" type="submit">Search</button>
//                         </form>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     );
// }

// export default Header;
