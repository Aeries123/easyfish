import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import "./index.css";

const AddDoctorPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [doctorPhone, setDoctorPhone] = useState("");
  const [doctors, setDoctors] = useState([
    { name: "Myself", phone: "", selected: true },
  ]);
  const [editingDoctorIndex, setEditingDoctorIndex] = useState(null); // Tracks if editing

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingDoctorIndex !== null) {
      // Update existing doctor
      const updatedDoctors = doctors.map((doctor, index) =>
        index === editingDoctorIndex
          ? { ...doctor, name: doctorName, phone: doctorPhone }
          : doctor
      );
      setDoctors(updatedDoctors);
    } else {
      // Add a new doctor
      const newDoctor = {
        name: doctorName,
        phone: doctorPhone,
        selected: true,
      };

      const updatedDoctors = doctors.map((doctor) => ({
        ...doctor,
        selected: false, // Unselect existing options
      }));

      setDoctors([...updatedDoctors, newDoctor]);
    }

    setDoctorName("");
    setDoctorPhone("");
    setEditingDoctorIndex(null);
    setShowPopup(false);
  };

  const handleSelection = (index) => {
    const updatedDoctors = doctors.map((doctor, i) => ({
      ...doctor,
      selected: i === index, // Select only the clicked doctor
    }));
    setDoctors(updatedDoctors);
  };

  const handleEdit = (index) => {
    setEditingDoctorIndex(index);
    setDoctorName(doctors[index].name);
    setDoctorPhone(doctors[index].phone);
    setShowPopup(true);
  };

  return (
    <div className="addDoctor-test-item-add-doctor-main-container">
      {/* Doctor List with Radio Buttons */}
      <p className="addDoctor-test-item-add-doctor-main-heading">Refferal:</p>
      {doctors.map((doctor, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <label className="addDoctor-popup-radio-option">
            <input
              type="radio"
              name="addDoctorOption"
              checked={doctor.selected}
              onChange={() => handleSelection(index)}
              className="addDoctor-radio-button"
            />
            {doctor.name} {doctor.phone && `(${doctor.phone})`}
          </label>
          {index > 0 && (
            <button
              className="addDoctor-popup-edit-button"
              onClick={() => handleEdit(index)}
              style={{ marginLeft: "10px" }}
            >
              Edit
            </button>
          )}
        </div>
      ))}

      {/* Add Doctor Button */}
      {doctors.length <= 1 && (
        <p
          className="addDoctor-test-item-add-doctor-container"
          onClick={() => setShowPopup(true)}
          style={{ cursor: "pointer", marginTop: "20px" }}
        >
          <IoMdAddCircleOutline className="addDoctor-test-item-add-doctor-icon" />
          {/* <p className="addDoctor-test-item-add-doctor-description"> */}
            Add a Doctor
          {/* </p> */}
        </p>
      )}

      {/* Popup Overlay */}
      {showPopup && (
        <div className="addDoctor-popup-overlay">
          <div className="addDoctor-popup-container">
            <h2 className="addDoctor-popup-title">
              {editingDoctorIndex !== null ? "Edit Doctor" : "Add Doctor"}
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Doctor Name Input */}
              <div className="addDoctor-popup-input-group">
                <label htmlFor="doctorName" className="addDoctor-popup-label">
                  Doctor Name
                </label>
                <input
                  id="doctorName"
                  type="text"
                  className="addDoctor-popup-input"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  required
                />
              </div>

              {/* Doctor Phone Number Input */}
              <div className="addDoctor-popup-input-group">
                <label htmlFor="doctorPhone" className="addDoctor-popup-label">
                  Phone Number
                </label>
                <input
                  id="doctorPhone"
                  type="tel"
                  className="addDoctor-popup-input"
                  value={doctorPhone}
                  onChange={(e) => setDoctorPhone(e.target.value)}
                  required
                />
              </div>

              {/* Buttons */}
              <div className="addDoctor-popup-buttons">
                <button type="submit" className="addDoctor-popup-submit-button">
                  {editingDoctorIndex !== null ? "Update Doctor" : "Add Doctor"}
                </button>
                <button
                  type="button"
                  className="addDoctor-popup-cancel-button"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDoctorPopup;
