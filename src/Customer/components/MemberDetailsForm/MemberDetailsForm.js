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
  const [addresses, setAddresses] = useState([]);
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleNameChange = (e) =>
    updateMemberDetails({ name: e.target.value });

  const handleAgeChange = (e) =>
    updateMemberDetails({ age: e.target.value });

  const handleGenderChange = (e) =>
    updateMemberDetails({ gender: e.target.value });

  const handlePhoneChange = (e) =>
    updateMemberDetails({ phone: e.target.value });

  const handleOpenAddressPopup = () => setIsPopupOpened(true);
  const handleCloseAddressPopup = () => setIsPopupOpened(false);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address); // Update the selected address in the parent component
    handleCloseAddressPopup(); // Close the popup
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = Cookies.get("jwtToken"); // Get JWT token using js-cookie

        if (!token) {
          setError("No authentication token found.");
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          "http://127.0.0.1:5000/api/user/addresses",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch addresses");
        }

        const data = await response.json();
        setAddresses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []);

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

      {/* Address Selection */}
      <div className="member-member-form-address-container">
        {selectedAddress ? (
          <div className="member-member-form-selected-address">
            <p>
              <strong>Address:</strong> {selectedAddress.door_no},{" "}
              {selectedAddress.street}, {selectedAddress.village},{" "}
              {selectedAddress.mandal}, {selectedAddress.district},{" "}
              {selectedAddress.state}, {selectedAddress.country},{" "}
              {selectedAddress.pincode}
            </p>
            <button
              className="member-member-form-change-address-button"
              onClick={handleOpenAddressPopup}
            >
              Change Address
            </button>
          </div>
        ) : (
          <button
            className="member-member-form-add-address-button"
            onClick={handleOpenAddressPopup}
          >
            Select Address
          </button>
        )}
      </div>

      {/* Address Popup */}
      {isPopupOpened && (
        <div className="member-member-address-main-popup">
          <div className="member-member-address-popup">
            <div className="member-member-popup-header">
              <h1>
                <strong>Choose your address</strong>
              </h1>
              <button
                className="member-member-popup-close-btn"
                onClick={handleCloseAddressPopup}
              >
                Close
              </button>
            </div>
            <div className="member-member-popup-body">
              {addresses.map((address) => (
                <div
                  key={address.address_id}
                  className="member-member-address-item"
                  onClick={() => handleAddressSelect(address)}
                >
                  <p>
                    {address.door_no}, {address.street}, {address.village},{" "}
                    {address.mandal}, {address.district}, {address.state},{" "}
                    {address.country}, {address.pincode}
                  </p>
                </div>
              ))}
              <Link to="/add-address">
                <button className="member-member-add-address-btn">
                  Add Address
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDetailsForm;

