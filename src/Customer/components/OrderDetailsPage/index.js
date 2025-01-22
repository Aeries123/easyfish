import React, { useState } from "react";
import MemberDetailsForm from "../MemberDetailsForm/MemberDetailsForm";
import TestCheckupList from "../TestCheckupList";
import OffersSection from "../OffersSection";
import { PaymentSummary } from "../PaymentSummary/payment";
import "./index.css";

const OrderDetailsPage = (props) => {
  const { cartData, setCartData } = props;
  console.log(cartData, "orderDetails");
  const [tests, setTests] = useState([
    { name: "Fasting Blood Sugar (FBS)", price: 180 },
    { name: "Orange Health Tax Saver Checkup", price: 5000 },
  ]);

  const [duplicates, setDuplicates] = useState([
    { name: "Complete Blood Count (CBC)", price: 300 },
    { name: "Glycosylated Haemoglobin (HbA1c)", price: 490 },
  ]);

  const [members, setMembers] = useState([1]); // To keep track of members dynamically

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

  const handleAddMember = () => {
    setMembers([...members, members.length + 1]);
  };

  return (
    <div className="order-details-first-container">
      <h1 className="order-details-main-heading">Test Details:-</h1>
      <div className="order-details-main-container">
        <div className="order-details-card-container">
          
          {members.map((member, index) => (
            <div className="order-details-main-section-1" key={index}>
              <div className="order-details-sub-section-1">
                <div className="order-details-member-details-container">
                  <h3 className="order-details-heading">Member {index + 1}</h3>
                  <MemberDetailsForm />
                </div>
                <div className="order-details-test-checkup-container">
                  <TestCheckupList
                    tests={tests}
                    duplicates={duplicates}
                    onRemoveTest={handleRemoveTest}
                    cartData={cartData}
                    setCartData={setCartData}
                  />
                </div>
              </div>
            </div>
          ))}
          <button className="btn-button" onClick={handleAddMember}>
            Add Another Member
          </button>
        </div>
        <div className="order-details-sub-section-2">
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
