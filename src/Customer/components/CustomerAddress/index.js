import React, { useState } from "react";
import "./index.css";

const CustomerAddress = ({ onClose }) => {
  const [address, setAddress] = useState({
    houseNo: "",
    street: "",
    village: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("New address added:", address);
    onClose();
  };

  return (
    <div className="customer-address-container">
      <h3 className="customer-address-heading">Add New Address</h3>

      <div className="customer-address-inputs">
        <input
          className="customer-address-input"
          type="text"
          name="houseNo"
          value={address.houseNo}
          onChange={handleInputChange}
          placeholder="House No."
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
          name="city"
          value={address.city}
          onChange={handleInputChange}
          placeholder="City"
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
