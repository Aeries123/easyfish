import React from "react";
import "./footer.css";
import {Link} from "react-router-dom"

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <Link to="/about-us" style={{textDecoration:"none"}}>
            <li>About Us</li>
            </Link>
            <Link to="/book-test"style={{textDecoration:"none"}}>
            <li>Book a Test</li>
            </Link>
            <Link to="/test/menu"style={{textDecoration:"none"}}>
            <li>Test Menu</li>
            </Link>
            <Link to="/sample"style={{textDecoration:"none"}}>
            <li>Home Sample Collection</li>
            </Link>
<Link to="/reports"style={{textDecoration:"none"}}>
            <li>Download Report</li>
            </Link>
            <Link to="/prescption"style={{textDecoration:"none"}}>
            <li>Upload Prescription</li>
            </Link>
          </ul>
        </div>
        <div className="footer-section">
          <ul>
            <li>Services</li>
            <li>Health Checkups</li>
            <li>Home Sample Collection</li>
            <li>Download Reports</li>
            <li>Corporate Wellness</li>
            <li>COVID-19</li>
          </ul>
        </div>
        <div className="footer-section contact">
          <ul>
            <li>Contact Us</li>
            <li>Virtual Tour</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Investors</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="footer-section newsletter">
          <h3>Subscribe to News Letter</h3>
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              className="email-input"
            />
            <button type="submit" className="subscribe-btn">
              Subscribe
            </button>
          </form>
          <div className="contact-info">
            <p>📧 info@accesspathlabs.com</p>
            <p>📞 8913571623</p>
          </div>
          <div className="social-media">
            <span>
                <img src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736330240/instagram_rpb7io.png" height="30px" width="30px"/>
            </span>
            <span><img src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736330376/facebook_sxzsal.png" height="30px" width="30px"/></span>
            <span><img src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736330481/twitter_g3jshy.png" height="25px" width="25px"/></span>
            <span><img src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736330859/linkedin_xxuxqf.png" height="30px" width="30px"/></span>
            <span><img src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736330963/youtube_kyjqad.png" height="30px" width="30px"/></span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © Copyright 2024 By Aeries Soft tech solutions. All Rights Reserved |
          <a href="/"> Sitemap</a> | <a href="/"> Privacy Policy</a> |
          <a href="/"> Terms of Use</a>
        </p>
      </div>
    </footer>
  );
};



// import React, { useState } from "react";
// import "./footer.css";

// export const Footer = () => {
//   const [expandedMobileSection, setExpandedMobileSection] = useState(false); // State for mobile toggle
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 478); // State to detect mobile view

//   const toggleMobileSection = () => {
//     setExpandedMobileSection((prev) => !prev);
//   };

//   // Handle window resize for responsiveness
//   React.useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 478);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <footer className="footer">
//       <div className="footer-sections">
//         {/* Merged Section for Mobile */}
//         {isMobile ? (
//           <div className="footer-section">
//             <div className="footer-header" onClick={toggleMobileSection}>
//               Quick Links & Services <span>{expandedMobileSection ? "-" : "+"}</span>
//             </div>
//             {expandedMobileSection && (
//               <ul className="footer-links">
//                 {/* Quick Links */}
//                 <li>About Us</li>
//                 <li>Our Team</li>
//                 <li>Accreditation</li>
//                 <li>Awards And Accolades</li>
//                 <li>Corporate Social Responsibility</li>
//                 <li>Tele Radiology</li>
//                 {/* Services */}
//                 <li>Health Checkups</li>
//                 <li>Home Sample Collection</li>
//                 <li>Download Reports</li>
//                 <li>Corporate Wellness</li>
//                 <li>COVID-19</li>
//               </ul>
//             )}
//           </div>
//         ) : (
//           // Desktop View: Separate Sections
//           <>
//             <div className="footer-section">
//               <div className="footer-header">Quick Links</div>
//               <ul className="footer-links">
//                 <li>About Us</li>
//                 <li>Our Team</li>
//                 <li>Accreditation</li>
//                 <li>Awards And Accolades</li>
//                 <li>Corporate Social Responsibility</li>
//                 <li>Tele Radiology</li>
//               </ul>
//             </div>
//             <div className="footer-section">
//               <div className="footer-header">Services</div>
//               <ul className="footer-links">
//                 <li>Health Checkups</li>
//                 <li>Home Sample Collection</li>
//                 <li>Download Reports</li>
//                 <li>Corporate Wellness</li>
//                 <li>COVID-19</li>
//               </ul>
//             </div>
//           </>
//         )}

//         {/* Contact Us Section */}
//         <div className="footer-section">
//           <div className="footer-header">Contact Us</div>
//           <ul className="footer-links">
//             <li>Subscribe to Newsletter</li>
//             <li>info@vijayadiagnostic.com</li>
//             <li>9240 222 222</li>
//             <li>Social Media</li>
//           </ul>
//         </div>
//       </div>

//       <div className="footer-bottom">
//         <p>
//           © Copyright 2024 By Aeries Soft Tech Solutions. All Rights Reserved | 
//           <a href="/sitemap"> Sitemap </a> | <a href="/privacy-policy">Privacy Policy</a> | 
//           <a href="/terms-of-use">Terms of Use</a>
//         </p>
//       </div>
//     </footer>
//   );
// };



