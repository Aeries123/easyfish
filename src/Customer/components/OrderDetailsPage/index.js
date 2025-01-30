// import React, { useState, useEffect } from "react";
// import MemberDetailsForm from "../MemberDetailsForm/MemberDetailsForm";
// import TestCheckupList from "../TestCheckupList";
// import OffersSection from "../OffersSection";
// import { PaymentSummary } from "../PaymentSummary/payment";
// import { SlotSelection } from "../SlotSelection";
// import "./index.css";

// const OrderDetailsPage = ({
//   cartData,
//   setCartData,
//   clickedIds,
//   setClickedIds,
// }) => {
//   const [userDetails, setUserDetails] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     phoneNumber: "",
//   });

//   const [isSlotBooked, setIsSlotBooked] = useState(false);
//   const [tests, setTests] = useState([
//     { name: "Fasting Blood Sugar (FBS)", price: 180 },
//     { name: "Orange Health Tax Saver Checkup", price: 5000 },
//   ]);
//   const [members, setMembers] = useState([
//     { name: "", age: "", gender: "", phoneNumber: "", selectedTests: [] },
//   ]);
//   const [step, setStep] = useState(1);
//   const [isMemberDetailsComplete, setIsMemberDetailsComplete] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [selectedAddress, setSelectedAddress] = useState(null);

//   const totalMRP = 18236;
//   const discount = 13056;
//   const toPay = 5180;

//   const handleDateSelection = (date) => {
//     setSelectedDate(date);
//     setSelectedSlot(null); // Reset the selected slot when the date changes
//   };

//   const handleSlotSelection = (slot) => {
//     setSelectedSlot(slot);
//     setIsSlotBooked(true);
//   };

//   const isAddMemberDisabled = !(
//     userDetails.name &&
//     userDetails.age &&
//     userDetails.gender &&
//     userDetails.phoneNumber
//   );

//   const handleAddMember = () => {
//     setMembers([
//       ...members,
//       { name: "", age: "", gender: "", phoneNumber: "", selectedTests: [] },
//     ]);
//   };

//   const handleRemoveTest = (memberIndex, testIndex) => {
//     const updatedMembers = [...members];
//     updatedMembers[memberIndex].selectedTests.splice(testIndex, 1);
//     setMembers(updatedMembers);
//   };

//   const handleApplyCoupon = () => {
//     alert("Coupon applied!");
//   };

//   const steps = ["Select Details", "Choose Slot", "Confirm Payment"];

//   useEffect(() => {
//     setIsMemberDetailsComplete(
//       userDetails.name && userDetails.age && userDetails.gender
//     );
//   }, [userDetails]);

//   const updateStep = (value) => setStep(value);

//   let totalPrice = 0;
//   members.forEach((member) => {
//     member.selectedTests.forEach((test) => {
//       totalPrice += test.price;
//     });
//   });

//   return (
//     <div className="order-order-details-page-container">
//       {/* Step Progress Bar */}
//       <div className="order-order-progress-bar-container">
//         <ul className="order-order-progress-bar">
//           {steps.map((label, index) => (
//             <li
//               key={index}
//               className={`order-order-progress-step ${
//                 index + 1 <= step ? "order-order-step-completed" : ""
//               }`}
//               onClick={() => {
//                 if (index === 0 && isMemberDetailsComplete) {
//                   updateStep(1);
//                 } else if (index === 1 && isSlotBooked) {
//                   updateStep(2);
//                 } else if (index === 2) {
//                   updateStep(3);
//                 }
//               }}
//             >
//               <div className="order-order-step-circle">
//                 {index + 1 <= step ? (
//                   <span className="order-order-step-check">✓</span>
//                 ) : (
//                   index + 1
//                 )}
//               </div>
//               <span className="order-order-step-label">{label}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="order-order-main-content">
//         {/* Member Details Section */}
//         <section className="order-order-section order-order-member-details-section">
//           <h2 className="order-order-section-heading">Member Details</h2>
//           {members.map((member, index) => (
//             <div key={index} className="order-order-member-container">
//               <h3 className="order-order-member-heading">Member {index + 1}</h3>
//               <hr />
//               <div className="order-order-member-details">
//                 <div>
//                   <MemberDetailsForm
//                     userDetails={member}
//                     setUserDetails={(updatedDetails) => {
//                       const updatedMembers = [...members];
//                       updatedMembers[index] = updatedDetails;
//                       setMembers(updatedMembers);
//                     }}
//                     setSelectedAddress={setSelectedAddress}
//                     selectedAddress={selectedAddress}
//                   />
//                 </div>
//                 <div>
//                   <TestCheckupList
//                     tests={tests}
//                     cartData={cartData}
//                     setCartData={setCartData}
//                     clickedIds={clickedIds}
//                     setClickedIds={setClickedIds}
//                     onRemoveTest={(testIndex) =>
//                       handleRemoveTest(index, testIndex)
//                     }
//                     memberIndex={index}
//                     setMembers={setMembers}
//                     members={members}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//           <button
//             className="order-order-add-member-btn"
//             onClick={handleAddMember}
//           >
//             Add Another Member
//           </button>
//         </section>

//         {/* Slot Selection Section */}
//         <section className="order-order-section order-order-slot-selection-section">
//           <h2 className="order-order-section-heading">Slot Selection</h2>
//           <SlotSelection
//             isSlotBooked={isSlotBooked}
//             setIsSlotBooked={setIsSlotBooked}
//             handleSlotBooking={handleSlotSelection}
//             handleDateSelection={handleDateSelection}
//             handleSlotSelection={handleSlotSelection}
//             setSelectedDate={setSelectedDate}
//             setSelectedSlot={setSelectedSlot}
//             selectedDate={selectedDate}
//             selectedSlot={selectedSlot}
//           />
//         </section>

//         {/* Offers and Payment Summary */}
//         <section className="order-order-section order-order-payment-summary-section">
//           <OffersSection
//             className="order-order-offers-section"
//             onApplyCoupon={handleApplyCoupon}
//           />
//           <PaymentSummary
//             className="order-order-payment-summary"
//             discount={discount}
//             isSlotBooked={isSlotBooked}
//             totalPrice={totalPrice}
//             cartData={cartData}
//             selectedDate={selectedDate}
//             selectedSlot={selectedSlot}
//             userDetails={userDetails}
//             selectedAddress={selectedAddress}
//           />
//         </section>
//       </div>
//     </div>
//   );
// };

// export default OrderDetailsPage;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
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

  const [members, setMembers] = useState(() => {
    const savedMembers = localStorage.getItem("members");
    return savedMembers
      ? JSON.parse(savedMembers)
      : [
          {
            name: "",
            age: "",
            gender: "",
            phoneNumber: "",
            cartData: cartData,
            clickedIds: clickedIds,
          },
        ];
  });

  const [userDetails, setUserDetails] = useState({
    name: "",
    age: "",
    gender: "",
    phoneNumber: "",
  });

  const [isSlotBooked, setIsSlotBooked] = useState(false);
  const [testsData, setTestsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/tests");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setTestsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  const handleAddMember = () => {
    const newMember = {
      name: "",
      age: "",
      gender: "",
      phoneNumber: "",
      cartData: [],
      clickedIds: [],
    };
    setMembers([...members, newMember]);
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  const updateMemberDetails = (index, updatedDetails) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], ...updatedDetails };
    setMembers(updatedMembers);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
    setIsSlotBooked(true);
  };

  // const handleRemoveTest = (index) => {
  //   setTestsData(testsData.filter((_, i) => i !== index));
  // };

  const handleRemoveTestFromMember = (memberIndex, testId) => {
    setMembers((prevMembers) => {
      const updatedMembers = [...prevMembers];
      updatedMembers[memberIndex].cartData = updatedMembers[
        memberIndex
      ].cartData.filter((item) => item.test_id !== testId);
      updatedMembers[memberIndex].clickedIds = updatedMembers[
        memberIndex
      ].clickedIds.filter((id) => id !== testId);
      return updatedMembers;
    });
  };

  const totalPrice = members.reduce(
    (acc, member) =>
      acc + member.cartData.reduce((sum, item) => sum + Number(item.price), 0),
    0
  );

  console.log(totalPrice,"total Price")

  const steps = ["Select Details", "Choose Slot", "Confirm Payment"];

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
                if (index === 0) setStep(1);
                else if (index === 1 && isSlotBooked) setStep(2);
                else if (index === 2) setStep(3);
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
          {members.map((member, index) => (
            <div key={index} className="order-order-member-container">
              <h3 className="order-order-member-heading">Member {index + 1}</h3>
              <hr />
              <div className="order-order-member-details">
                <MemberDetailsForm
                  userDetails={member}
                  setUserDetails={setUserDetails}
                  updateMemberDetails={(updatedDetails) =>
                    updateMemberDetails(index, updatedDetails)
                  }
                />
                <TestCheckupList
                  tests={testsData}
                  mainCartData={cartData}
                  setMainCartData={setCartData}
                  mainClickedIds={clickedIds}
                  setMainClickedIds={setClickedIds}
                  cartData={member.cartData}
                  setCartData={(newCartData) => {
                    const updatedMembers = [...members];
                    updatedMembers[index].cartData = newCartData;
                    setMembers(updatedMembers);
                  }}
                  clickedIds={member.clickedIds}
                  setClickedIds={(newClickedIds) => {
                    const updatedMembers = [...members];
                    updatedMembers[index].clickedIds = newClickedIds;
                    setMembers(updatedMembers);
                  }}
                  onRemoveTest={(testId) =>
                    handleRemoveTestFromMember(index, testId)
                  }
                />
              </div>
              <button
                className="order-order-remove-member-btn"
                onClick={() => handleRemoveMember(index)}
              >
                Remove Member
              </button>
            </div>
          ))}
          <button
            className="order-order-add-member-btn"
            onClick={handleAddMember}
          >
            Add Another Member
          </button>
        </section>

        {/* Slot Selection Section */}
        <section className="order-order-section order-order-slot-selection-section">
          <h2 className="order-order-section-heading">Slot Selection</h2>
          <SlotSelection
            isSlotBooked={isSlotBooked}
            setIsSlotBooked={setIsSlotBooked}
            handleSlotBooking={handleSlotSelection}
            handleDateSelection={handleDateSelection}
            handleSlotSelection={handleSlotSelection}
            setSelectedDate={setSelectedDate}
            setSelectedSlot={setSelectedSlot}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
          />
        </section>

        {/* Offers and Payment Summary */}
        <section className="order-order-section order-order-payment-summary-section">
          <OffersSection onApplyCoupon={() => alert("Coupon applied!")} />
          <PaymentSummary
            discount={0}
            totalPrice={totalPrice}
            isSlotBooked={isSlotBooked}
            cartData={cartData}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            members={members}
          />
        </section>
      </div>
    </div>
  );
};

export default OrderDetailsPage;

// import React, { useState, useEffect } from "react";
// import MemberDetailsForm from "../MemberDetailsForm/MemberDetailsForm";
// import TestCheckupList from "../TestCheckupList";
// import OffersSection from "../OffersSection";
// import { PaymentSummary } from "../PaymentSummary/payment";
// import { SlotSelection } from "../SlotSelection";
// import "./index.css";

// const OrderDetailsPage = ({
//   cartData,
//   setCartData,
//   clickedIds,
//   setClickedIds,
// }) => {
//   const [userDetails, setUserDetails] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     phoneNumber: "",
//   });

//   const [isSlotBooked, setIsSlotBooked] = useState(false);
//   const [tests, setTests] = useState([
//     { name: "Fasting Blood Sugar (FBS)", price: 180 },
//     { name: "Orange Health Tax Saver Checkup", price: 5000 },
//   ]);
//   const [members, setMembers] = useState([{
//     name: "",
//     age: "",
//     gender: "",
//     phoneNumber: ""
//   }]);
//   const [step, setStep] = useState(1);
//   const [isMemberDetailsComplete, setIsMemberDetailsComplete] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [selectedAddress, setSelectedAddress] = useState(null);

//   const totalMRP = 18236;
//   const discount = 13056;
//   const toPay = 5180;

//   const handleDateSelection = (date) => {
//     setSelectedDate(date);
//     setSelectedSlot(null); // Reset the selected slot when the date changes
//   };

//   const handleSlotSelection = (slot) => {
//     setSelectedSlot(slot);
//     setIsSlotBooked(true);
//   };

//   const isAddMemberDisabled = !(
//     userDetails.name &&
//     userDetails.age &&
//     userDetails.gender &&
//     userDetails.phoneNumber
//   );

//   const handleAddMember = () => {
//     console.log("clicked")
//     setMembers([
//       ...members,
//       { name: "", age: "", gender: "", phoneNumber: "" }
//     ]);
//   };

//   const handleRemoveTest = (index) => {
//     setTests(tests.filter((_, i) => i !== index));
//   };

//   const handleApplyCoupon = () => {
//     alert("Coupon applied!");
//   };

//   const steps = ["Select Details", "Choose Slot", "Confirm Payment"];

//   useEffect(() => {
//     setIsMemberDetailsComplete(
//       userDetails.name && userDetails.age && userDetails.gender
//     );
//   }, [userDetails]);

//   const updateStep = (value) => setStep(value);

//   let totalPrice = 0;
//   for (let i of cartData) {
//     totalPrice += parseInt(i.price);
//   }

//   return (
//     <div className="order-order-details-page-container">
//       {/* Step Progress Bar */}
//       <div className="order-order-progress-bar-container">
//         <ul className="order-order-progress-bar">
//           {steps.map((label, index) => (
//             <li
//               key={index}
//               className={`order-order-progress-step ${
//                 index + 1 <= step ? "order-order-step-completed" : ""
//               }`}
//               onClick={() => {
//                 if (index === 0 && isMemberDetailsComplete) {
//                   updateStep(1);
//                 } else if (index === 1 && isSlotBooked) {
//                   updateStep(2);
//                 } else if (index === 2) {
//                   updateStep(3);
//                 }
//               }}
//             >
//               <div className="order-order-step-circle">
//                 {index + 1 <= step ? (
//                   <span className="order-order-step-check">✓</span>
//                 ) : (
//                   index + 1
//                 )}
//               </div>
//               <span className="order-order-step-label">{label}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="order-order-main-content">
//         {/* Member Details Section */}
//         <section className="order-order-section order-order-member-details-section">
//           <h2 className="order-order-section-heading">Member Details</h2>
//           {members.map((_, index) => (
//             <div key={index} className="order-order-member-container">
//               <h3 className="order-order-member-heading">Member {index + 1}</h3>
//               <hr />
//               <div className="order-order-member-details">
//                 <div>
//                   <MemberDetailsForm
//                     userDetails={userDetails}
//                     setUserDetails={setUserDetails}
//                     setSelectedAddress={setSelectedAddress}
//                     selectedAddress={selectedAddress}
//                   />
//                 </div>
//                 <div>
//                   <TestCheckupList
//                     tests={tests}
//                     cartData={cartData}
//                     setCartData={setCartData}
//                     clickedIds={clickedIds}
//                     setClickedIds={setClickedIds}
//                     onRemoveTest={handleRemoveTest}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//           <button
//             className="order-order-add-member-btn"
//             onClick={handleAddMember}
//             // disabled={isAddMemberDisabled}
//           >
//             Add Another Member
//           </button>
//         </section>

//         {/* Slot Selection Section */}
//         <section className="order-order-section order-order-slot-selection-section">
//           <h2 className="order-order-section-heading">Slot Selection</h2>
//           <SlotSelection
//             isSlotBooked={isSlotBooked}
//             setIsSlotBooked={setIsSlotBooked}
//             handleSlotBooking={handleSlotSelection}
//             handleDateSelection={handleDateSelection}
//             handleSlotSelection={handleSlotSelection}
//             setSelectedDate={setSelectedDate}
//             setSelectedSlot={setSelectedSlot}
//             selectedDate={selectedDate}
//             selectedSlot={selectedSlot}
//           />
//         </section>

//         {/* Offers and Payment Summary */}
//         <section className="order-order-section order-order-payment-summary-section">
//           <OffersSection
//             className="order-order-offers-section"
//             onApplyCoupon={handleApplyCoupon}
//           />
//           <PaymentSummary
//             className="order-order-payment-summary"
//             discount={discount}
//             isSlotBooked={isSlotBooked}
//             totalPrice={totalPrice}
//             cartData={cartData}
//             selectedDate={selectedDate}
//             selectedSlot={selectedSlot}
//             userDetails={userDetails}
//             selectedAddress={selectedAddress}
//           />
//         </section>
//       </div>
//     </div>
//   );
// };

// export default OrderDetailsPage;
