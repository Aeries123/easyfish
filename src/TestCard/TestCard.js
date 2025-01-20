import React from 'react';
import './TestCard.css';

const TestCard = ({ title, price, originalPrice, discount, reportsTime, testsIncluded }) => {
  return (
    <div className="test-card">
      <div className="test-card-header">
        <h3>{title}</h3>
        <span className="badge">Test</span>
      </div>
      <div className="test-card-body">
        <p className="price">
          <span className="original-price">₹{originalPrice}</span> <span className="discounted-price">₹{price}</span>
        </p>
        <p className="discount">{discount} Off</p>
        <div className="details">
          <p>Reports within <strong>{reportsTime}</strong></p>
          <p><strong>{testsIncluded}</strong> test included</p>
        </div>
      </div>
      <div className="test-card-footer">
        <button className="view-details">View Details</button>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default TestCard;
