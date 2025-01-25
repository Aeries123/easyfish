import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiTag, FiChevronDown } from "react-icons/fi";
import "./index.css";

const OffersSection = ({ onApplyCoupon }) => {
  return (
    <div className="offers-and-discounts-container">
      <div className="offers-and-discounts-coupon">
        <h4 className="offers-and-discounts-coupon-heading">
          <FiTag className="offers-and-discounts-coupon-icon" />
          Offers & Discounts
        </h4>
        <div className="offers-and-discounts-input-group">
          <input
            className="offers-and-discounts-coupon-input"
            type="text"
            placeholder="Enter coupon code"
          />
          <button
            className="offers-and-discounts-apply-btn"
            onClick={onApplyCoupon}
          >
            Apply
          </button>
        </div>
      </div>
      <button className="offers-and-discounts-view-coupons-button">
        View All Coupons
        <FiChevronDown className="offers-and-discounts-view-icon" />
      </button>
    </div>
  );
};

export default OffersSection;
