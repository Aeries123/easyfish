import React from "react";
import "./DeliveryFooter.css";

const DeliveryFooter = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} My Website. <span className="marquee">All rights reserved by Aeries IT</span></p>
    </footer>
  );
};

export default DeliveryFooter;

