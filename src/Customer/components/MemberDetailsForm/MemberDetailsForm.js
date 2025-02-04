import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./MemberDetailsForm.css";

const MemberDetailsForm = ({
  userDetails,
  setUserDetails,
  setSelectedAddress,
  selectedAddress,
  updateMemberDetails,
}) => {
  
  

  const handleNameChange = (e) =>
    updateMemberDetails({ name: e.target.value });

  const handleAgeChange = (e) =>
    updateMemberDetails({ age: e.target.value });

  const handleGenderChange = (e) =>
    updateMemberDetails({ gender: e.target.value });

  const handlePhoneChange = (e) =>
    updateMemberDetails({ phone: e.target.value });

  

  return (
    <div className="member-member-form-container">
      {/* Full Name Field */}
      <div className="member-member-form-field">
        <label className="member-member-form-label">Full Name *</label>
        <input
          type="text"
          value={userDetails.name || ""}
          onChange={handleNameChange}
          className="member-member-form-input"
        />
      </div>

      {/* Phone Number Field */}
      <div className="member-member-form-field">
        <label className="member-member-form-label">Phone *</label>
        <input
          type="text"
          value={userDetails.phone || ""}
          onChange={handlePhoneChange}
          className="member-member-form-input"
        />
      </div>

      {/* Age Field */}
      <div className="member-member-form-field">
        <label className="member-member-form-label">Age *</label>
        <input
          type="number"
          value={userDetails.age || ""}
          onChange={handleAgeChange}
          className="member-member-form-input"
        />
      </div>

      {/* Gender Selection */}
      <div className="member-member-form-field">
        <label className="member-member-form-label">Gender</label>
        <div className="member-member-form-radio-group">
          <label className="member-member-form-radio-label">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={userDetails.gender === "Male"}
              onChange={handleGenderChange}
              className="member-member-form-radio-input"
            />
            Male
          </label>
          <label className="member-member-form-radio-label">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={userDetails.gender === "Female"}
              onChange={handleGenderChange}
              className="member-member-form-radio-input"
            />
            Female
          </label>
        </div>
      </div>

      
    </div>
  );
};

export default MemberDetailsForm;

