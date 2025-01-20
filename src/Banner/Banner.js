import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <>
      <div className="banner-container">
        <div className="banner-text">
          <h1 className="banner-heading">
            This Year, Get <span className="highlight">Pain Free</span> Health
            Checkups
          </h1>
          <h2>Expert eMedics: 99.94% painless collections</h2>
        </div>
      </div>
      <div className="banner-card-container">
        <div className="search-container">
          <input
            type="text"
            className="search-container-bar"
            placeholder="Search for tests..."
          />
        </div>
        <div className="banner-buttons">
          <button className="banner-button primary">Download Report</button>
          <button className="banner-button">Upload Prescption</button>
        </div>
      </div>
    </>
  );
};

export default Banner;
