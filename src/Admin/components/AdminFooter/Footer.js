import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} My Website. <span className="marquee">All rights reserved by Aeries IT</span></p>
    </footer>
  );
};

export default Footer;

