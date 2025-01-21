import React from "react";
import "./index.css";

const OffersSection = ({ onApplyCoupon }) => {
  return (
    <div className="offers-address-main-container">
      <div className="offers-address-card-container-1">
        <h1 className="offers-address-heading">1 member added</h1>
        <button className="offers-address-add-button">Add Address</button>
      </div>
      <div className="offersaddress-card-container-2">
        <h4 className="offers-address-heading">Offers</h4>
        <input className="offers-address-input" type="text" placeholder="Enter coupon code" />
        <button className="offers-address-apply-button" onClick={onApplyCoupon}>Apply</button>
      </div>
    </div>
  );
};

export default OffersSection;
