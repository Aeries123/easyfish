import React, { useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import "./index.css";

const CustomerAddress = ({ onClose }) => {
  const [address, setAddress] = useState({
    door_no: "",
    street: "",
    village: "",
    mandal: "",
    district: "",
    state: "",
    country: "India", // Default country
    pincode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const token = Cookies.get("jwtToken"); // Get token from cookies

    if (!token) {
      alert("Authentication required. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000//api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
        body: JSON.stringify(address),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Address added successfully!");
        onClose();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error adding address:", error);
      // alert("Failed to add address. Please try again.");
    }
  };

  return (
    <div className="customer-address-container">
      <h3 className="customer-address-heading">Add New Address</h3>

      <div className="customer-address-inputs">
        <input
          className="customer-address-input"
          type="text"
          name="door_no"
          value={address.door_no}
          onChange={handleInputChange}
          placeholder="Door No."
        />
        <input
          className="customer-address-input"
          type="text"
          name="street"
          value={address.street}
          onChange={handleInputChange}
          placeholder="Street"
        />
        <input
          className="customer-address-input"
          type="text"
          name="village"
          value={address.village}
          onChange={handleInputChange}
          placeholder="Village"
        />
        <input
          className="customer-address-input"
          type="text"
          name="mandal"
          value={address.mandal}
          onChange={handleInputChange}
          placeholder="Mandal"
        />
        <input
          className="customer-address-input"
          type="text"
          name="district"
          value={address.district}
          onChange={handleInputChange}
          placeholder="District"
        />
        <input
          className="customer-address-input"
          type="text"
          name="state"
          value={address.state}
          onChange={handleInputChange}
          placeholder="State"
        />
        <input
          className="customer-address-input"
          type="text"
          name="pincode"
          value={address.pincode}
          onChange={handleInputChange}
          placeholder="Pincode"
        />
      </div>

      <button className="customer-address-button" onClick={handleSubmit}>
        Add Address
      </button>
      <button className="customer-address-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default CustomerAddress;
