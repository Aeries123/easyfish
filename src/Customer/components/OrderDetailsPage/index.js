import React, { useState } from "react";
import MemberDetailsForm from "../MemberDetailsForm/MemberDetailsForm";
import TestCheckupList from "../TestCheckupList";
import OffersSection from "../OffersSection";
import { PaymentSummary } from "../PaymentSummary/payment";
import "./index.css";

const OrderDetailsPage = () => {
  const [tests, setTests] = useState([
    { name: "Fasting Blood Sugar (FBS)", price: 180 },
    { name: "Orange Health Tax Saver Checkup", price: 5000 },
  ]);

  const [duplicates, setDuplicates] = useState([
    { name: "Complete Blood Count (CBC)", price: 300 },
    { name: "Glycosylated Haemoglobin (HbA1c)", price: 490 },
  ]);

  const totalMRP = 18236;
  const discount = 13056;
  const toPay = 5180;

  const handleRemoveTest = (index) => {
    const updatedTests = [...tests];
    updatedTests.splice(index, 1);
    setTests(updatedTests);
  };

  const handleApplyCoupon = () => {
    alert("Coupon applied!");
  };

  return (
    <div className="order-details-first-container">
      <h3 className="order-details-heading">Member 2</h3>
      <div className="order-details-main-container">
        <div className="order-details-card-container">
          <div className="order-details-section-1">
            <div>
              <MemberDetailsForm />
            </div>
            <div>
              <TestCheckupList
                tests={tests}
                duplicates={duplicates}
                onRemoveTest={handleRemoveTest}
              />
            </div>
          </div>
          <button className="btn-button">Add Another Member</button>
        </div>
        <div className="order-details-section-2">
          <div>
            <OffersSection onApplyCoupon={handleApplyCoupon} />
          </div>
          <div>
            <PaymentSummary
              totalMRP={totalMRP}
              discount={discount}
              toPay={toPay}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
