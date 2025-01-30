import React, { useState } from "react";

import Cart from "../Cart/cart";
import Popup from "../PopUp/Popup";
import "./Banner.css";
import { MdAddCircleOutline } from "react-icons/md";
import { FiMinusCircle } from "react-icons/fi";
import { FaCartArrowDown } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import PopupCart from "../PopupCart";
import Prescription from "../Presciption/Prescption";

const Banner = (props) => {
  const navigate = useNavigate();
  const { testData, setCartData, cartData, clickedIds, setClickedIds } = props;
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [name, setTestName] = useState("");
  const [isFileUploadPopupOpen, setIsFileUploadPopupOpen] = useState(false);

  const jwtToken = Cookies.get("jwtToken");

  const onChangeInput = (e) => {
    setTestName(e.target.value);
  };

  const onClickProceed = () => {
    navigate(jwtToken ? "/" : "/customer/login");
  };

  const onClickInput = () => {
    setIsPopupOpened(true);
  };

  const onClickClosePopup = () => {
    setIsPopupOpened(false);
  };

  const handleButtonClick = (test) => {
    const test_id = test.test_id;
    if (clickedIds.includes(test_id)) {
      setClickedIds((prev) =>
        prev.filter((clickedId) => clickedId !== test_id)
      );
      setCartData((prev) =>
        prev.filter((cartItem) => cartItem.test_id !== test_id)
      );
    } else {
      setClickedIds((prev) => [...prev, test_id]);
      setCartData((prev) => [...prev, test]);
    }
  };

  const filteredData = testData.filter((each) =>
    each.test_name.toLowerCase().startsWith(name)
  );

  let totalPrice = cartData.reduce(
    (sum, item) => sum + parseInt(item.price),
    0
  );

  // Function to handle file upload
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload-prescription", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  const onClickUploadPrescription = () => {
    console.log("Clicked");
    setIsFileUploadPopupOpen(true);
  };

  const onCloseFileUploadPopup = () => {
    setIsFileUploadPopupOpen(false);
  };

  return (
    <>
      <div className="banner-container">
        <div className="banner-text">
          <h1 className="banner-heading">
            This Year, Get <span className="highlight">Pain Free</span> Health
            Checkups
          </h1>
          <h2>Expert eMedics: 99.94% painless collections</h2>
        </div>
      </div>
      <div className="banner-card-container">
        <div className="search-container">
          <input
            type="text"
            className="search-container-bar"
            placeholder="Search for tests..."
            onClick={onClickInput}
          />
        </div>
        <div className="banner-buttons">
          <button className="banner-button primary">Download Report</button>
          <button className="banner-button" onClick={onClickUploadPrescription}>
            Upload Prescription
          </button>
        </div>
      </div>

      {/* File Upload Popup */}
      <Prescription
        isOpen={isFileUploadPopupOpen}
        onClose={onCloseFileUploadPopup}
        onFileUpload={handleFileUpload}
      />

      <Popup
        isPopupOpened={isPopupOpened}
        onClickClosePopup={onClickClosePopup}
        filteredData={filteredData}
        handleButtonClick={handleButtonClick}
        clickedIds={clickedIds}
        setClickedIds={setClickedIds}
        setCartData={setCartData}
        cartData={cartData}
        totalPrice={totalPrice}
        name={name}
        onChangeInput={onChangeInput}
        onClickProceed={onClickProceed}
      />

      <div className="banner-banner-cart-container">
        {cartData.length > 0 && (
          <div>
            <Cart
              cartData={cartData}
              setCartData={setCartData}
              setClickedIds={setClickedIds}
              clickedIds={clickedIds}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Banner;
