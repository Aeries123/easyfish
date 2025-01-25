import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./MemberDetailsForm.css";

const MemberDetailsForm = ({
  setUserDetails,
  setSelectedAddress,
  selectedAddress,
}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");

  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleNameChange = (e) => setName(e.target.value);
  const handleAgeChange = (e) => setAge(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);

  const handleInputChange = () => {
    setUserDetails({ name, age, gender });
  };

  console.log(addresses, "address2");

  const [isPopupOpened, setIsPopupOpened] = useState(false);
  // const [addresses, setAddresses] = useState([
  //   { id: 1, address: "123 Street, City, State, 12345" },
  //   { id: 2, address: "456 Avenue, City, State, 67890" },
  // ]);

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
          "http://127.0.0.1:5000//api/user/addresses",
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
        console.log(data, "address");
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
      {/* <label className="member-member-form-label member-member-form-checkbox-label">
        Testing for myself
        <input
          className="member-member-form-input member-member-form-checkbox"
          type="checkbox"
          checked
          disabled
        />
      </label> */}
      <div className="member-member-form-field member-member-form-name-container">
        <label className="member-member-form-label">Full name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            handleNameChange(e);
            handleInputChange();
          }}
          className="member-member-form-input member-member-form-name-input"
        />
      </div>
      <div className="member-member-form-field member-member-form-age-container">
        <label className="member-member-form-label">Age *</label>
        <input
          type="number"
          value={age}
          onChange={(e) => {
            handleAgeChange(e);
            handleInputChange();
          }}
          className="member-member-form-input member-member-form-age-input"
        />
      </div>
      <div className="member-member-form-gender-container">
        <label className="member-member-form-label">Gender</label>
        <div className="member-member-form-radio-group">
          <label className="member-member-form-radio-label">
            <input
              type="radio"
              checked={gender === "Male"}
              onChange={() => {
                setGender("Male");
                handleInputChange();
              }}
              className="member-member-form-radio-input"
            />
            Male
          </label>
          <label className="member-member-form-radio-label">
            <input
              type="radio"
              checked={gender === "Female"}
              onChange={() => {
                setGender("Female");
                handleInputChange();
              }}
              className="member-member-form-radio-input"
            />
            Female
          </label>
        </div>
      </div>
      {/* <div className="member-member-form-button-container">
        <button
          className="member-member-form-add-address-button"
          onClick={handleOpenAddressPopup}
        >
          Select Address
        </button>
      </div> */}
      <div className="member-member-form-address-container">
        {selectedAddress ? (
          <div className="member-member-form-selected-address">
            <p>
              {" "}
              <strong>Address:</strong>
              {selectedAddress.door_no}, {selectedAddress.street},{" "}
              {selectedAddress.village}, {selectedAddress.mandal},{" "}
              {selectedAddress.district}, {selectedAddress.state},{" "}
              {selectedAddress.country}, {selectedAddress.pincode}
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
                >
                  <p onClick={() => handleAddressSelect(address)}>
                    {address.address_id}, {address.door_no}, {address.street},{" "}
                    {address.village}, {address.mandal}, {address.district},{" "}
                    {address.state}, {address.country}, {address.pincode},{" "}
                    {address.created_at}, {address.updated_at}
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
