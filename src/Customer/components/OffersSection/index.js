import React, { useState } from "react";
import {Link} from 'react-router-dom'
import "./index.css";
import CustomerAddress from "../CustomerAddress";

const OffersSection = ({ onApplyCoupon }) => {
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [isCustomerAddressOpened, setIsCustomerAddressOpened] = useState(false);
  const [addresses, setAddresses] = useState([
    // Sample addresses for demonstration
    { id: 1, address: "123 Street, City, State, 12345" },
    { id: 2, address: "456 Avenue, City, State, 67890" },
  ]);
  
  const handleOpenAddressPopup = () => {
    setIsPopupOpened(true);
  };

  const handleCloseAddressPopup = () => {
    setIsPopupOpened(false);
  };

  const handleAddAddressClick = () => {
    setIsCustomerAddressOpened(true);
    setIsPopupOpened(false); // Close the address popup
  };

  const handleCloseCustomerAddress = () => {
    setIsCustomerAddressOpened(false); // Close the customer address form
  };

  return (
    <div className="offers-address-main-container">
      <div className="offers-address-card-container-1">
        <h1 className="offers-address-heading">1 member added</h1>
        <button className="offers-address-add-button" onClick={handleOpenAddressPopup}>
          Select Address
        </button>
      </div>
      <div className="offersaddress-card-container-2">
        <h4 className="offers-address-heading">Offers</h4>
        <input className="offers-address-input" type="text" placeholder="Enter coupon code" />
        <button className="offers-address-apply-button" onClick={onApplyCoupon}>Apply</button>
      </div>

      {/* Address Popup */}
      {isPopupOpened && (
        <div className="address-popup-container">
        <div className="address-popup-header">
          <h4>Choose your address</h4>
          <button onClick={handleCloseAddressPopup} className="address-popup-close-button">
            Close
          </button>
        </div>
        <div className="address-popup-body">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div key={address.id} className="address-item">
                <p>{address.address}</p>
              </div>
            ))
          ) : (
            <p>No addresses found. Please add a new address.</p>
          )}

          <Link to="/add-address">
            <button className="address-add-address-button">
              Add Address
            </button>
          </Link>
          {/* <button className="address-add-address-button" onClick={handleAddAddressClick}>
            Add Address
          </button> */}
        </div>
      </div>
      
      )}

      {/* Customer Address Form */}
      {/* {isCustomerAddressOpened && (
        <CustomerAddress onClose={handleCloseCustomerAddress} />
      )} */}
    </div>
  );
};

export default OffersSection;
