import React, { useState } from "react";
import "./MemberDetailsForm.css"

const MemberDetailsForm = ({ onAddMember }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");

  return (
    <div className="member-form-container">
      {/* <label className="member-form-label">
        Testing for myself
        <input className="member-form-input" type="checkbox" checked disabled />
      </label> */}
      <div className="member-form-name-container">
        <label className="member-form-label">Full name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="member-form-input"
        />
      </div>
      <div className="member-form-name-container">
        <label className="member-form-label">Age *</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="member-form-input"
        />
      </div>
      <div>
        <label className="member-form-label">Gender</label>
        <input
          type="radio"
          checked={gender === "Male"}
          onChange={() => setGender("Male")}
          className="member-form-radio-input"
        />
        Male
        <input
          type="radio"
          checked={gender === "Female"}
          onChange={() => setGender("Female")}
          className="member-form-radio-input"
        />
        Female
      </div>
    </div>
  );
};

export default MemberDetailsForm;
