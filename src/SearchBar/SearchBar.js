import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="container">
      {/* Test Card Section */}
      <div className="test-card">
        <h1>TEST CARD</h1>
      </div>
      
      {/* Test Box Section */}
      <div className="test-box">
        <p>TEST</p>
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
    </div>
  );
};

export default SearchBar;
