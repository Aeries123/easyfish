import React, { useState, useEffect } from "react";
import MemberDetailsForm from "../MemberDetailsForm/MemberDetailsForm";
import TestCheckupList from "../TestCheckupList";
import OffersSection from "../OffersSection";
import { PaymentSummary } from "../PaymentSummary/payment";
import { SlotSelection } from "../SlotSelection";
import "./index.css";

const OrderDetailsPage = ({
  cartData,
  setCartData,
  clickedIds,
  setClickedIds,
}) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    age: "",
    gender: "",
  });
  const [isSlotBooked, setIsSlotBooked] = useState(false);
  const [tests, setTests] = useState([
    { name: "Fasting Blood Sugar (FBS)", price: 180 },
    { name: "Orange Health Tax Saver Checkup", price: 5000 },
  ]);
  const [members, setMembers] = useState([1]);
  const [step, setStep] = useState(1);
  const [isMemberDetailsComplete, setIsMemberDetailsComplete] = useState(false);
  const [isSlotSelected, setIsSlotSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  console.log(selectedDate, "abcdmahesh");
  console.log(userDetails, "user-details");

  const totalMRP = 18236;
  const discount = 13056;
  const toPay = 5180;

  const handleDateSelection = (date) => {
    console.log(date);
    setSelectedDate(date);
    setSelectedSlot(null); // Reset the selected slot when the date changes
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
    setIsSlotBooked(true);
    console.log("clicked........");
  };

  const handleSlotBooking = (slot) => {
    if (slot) {
      setIsSlotBooked(true);
    } else {
      setIsSlotBooked(false);
    }
  };

  const isAddMemberDisabled = !(
    userDetails.name &&
    userDetails.age &&
    userDetails.gender
  );

  const handleAddMember = () => {
    setMembers([...members, members.length + 1]);
  };

  const handleRemoveTest = (index) => {
    setTests(tests.filter((_, i) => i !== index));
  };

  const handleApplyCoupon = () => {
    alert("Coupon applied!");
  };

  const steps = ["Select Details", "Choose Slot", "Confirm Payment"];

  useEffect(() => {
    setIsMemberDetailsComplete(
      userDetails.name && userDetails.age && userDetails.gender
    );
  }, [userDetails]);

  useEffect(() => {
    setIsSlotSelected(isSlotBooked);
  }, [isSlotBooked]);

  const updateStep = (value) => setStep(value);

  let totalPrice = 0;
  for (let i of cartData) {
    totalPrice += parseInt(i.price);
  }

  return (
    <div className="order-order-details-page-container">
      {/* Step Progress Bar */}
      <div className="order-order-progress-bar-container">
        <ul className="order-order-progress-bar">
          {steps.map((label, index) => (
            <li
              key={index}
              className={`order-order-progress-step ${
                index + 1 <= step ? "order-order-step-completed" : ""
              }`}
              onClick={() => {
                if (index === 0 && isMemberDetailsComplete) {
                  updateStep(1);
                } else if (index === 1 && isSlotSelected) {
                  updateStep(2);
                } else if (index === 2) {
                  updateStep(3);
                }
              }}
            >
              <div className="order-order-step-circle">
                {index + 1 <= step ? (
                  <span className="order-order-step-check">✓</span>
                ) : (
                  index + 1
                )}
              </div>
              <span className="order-order-step-label">{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="order-order-main-content">
        {/* Member Details Section */}
        <section className="order-order-section order-order-member-details-section">
          <h2 className="order-order-section-heading">Member Details</h2>
          {members.map((_, index) => (
            <div key={index} className="order-order-member-container">
              <h3 className="order-order-member-heading">Member {index + 1}</h3>
              <hr />
              <div className="order-order-member-details">
                <div>
                  <MemberDetailsForm
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                    setSelectedAddress={setSelectedAddress}
                    selectedAddress={selectedAddress}
                  />
                </div>
                <div>
                  <TestCheckupList
                    tests={tests}
                    cartData={cartData}
                    setCartData={setCartData}
                    clickedIds={clickedIds}
                    setClickedIds={setClickedIds}
                    onRemoveTest={handleRemoveTest}
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            className="order-order-add-member-btn"
            onClick={handleAddMember}
            disabled={isAddMemberDisabled}
          >
            Add Another Member
          </button>
          <section className="order-order-section order-order-selected-address-section">
          <h3 className="order-order-section-heading">Selected Address</h3>
          
        </section>
        </section>

        {/* Slot Selection Section */}
        <section className="order-order-section order-order-slot-selection-section">
          <h2 className="order-order-section-heading">Slot Selection</h2>
          {members.map((_, index) => (
            <SlotSelection
              key={index}
              isSlotBooked={isSlotBooked}
              setIsSlotBooked={setIsSlotBooked}
              handleSlotBooking={handleSlotBooking}
              handleDateSelection={handleDateSelection}
              handleSlotSelection={handleSlotSelection}
              setSelectedDate={setSelectedSlot}
              setSelectedSlot={setSelectedSlot}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
            />
          ))}
        </section>

        {/* Offers and Payment Summary */}
        <section className="order-order-section order-order-payment-summary-section">
          <OffersSection
            className="order-order-offers-section"
            onApplyCoupon={handleApplyCoupon}
          />
          <PaymentSummary
            className="order-order-payment-summary"
            discount={discount}
            isSlotBooked={isSlotBooked}
            totalPrice={totalPrice}
            cartData={cartData}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            userDetails={userDetails}
            selectedAddress={selectedAddress}
          />
        </section>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
