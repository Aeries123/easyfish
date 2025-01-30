import React, { useState } from "react";
import { SlClose } from "react-icons/sl";
import { FiMinusCircle } from "react-icons/fi";
import { MdAddCircleOutline } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

import "./index.css";

const SeperatePopup = ({
  isPopupOpened,
  onClickClosePopup,
  filteredData,
  handleButtonClick,
  clickedIds,
  setClickedIds,
  setCartData,
  cartData,
  totalPrice,
  name,
  onChangeInput,
  onClickProceed,
}) => {
  // const onClickButton = (test) => {
  //   console.log("Test Clicked",test)
  //   let testId = test.test_id;

  //   if (clickedIds.includes(testId)) {
  //     console.log("if")

  //     setClickedIds((prev) => prev.filter((each) => each !== testId));
  //     setCartData((prev) => prev.filter((each) => each.test_id !== testId));
  //   } else {
  //     console.log("elses")
  //     setClickedIds((prev) => [...prev, testId]);
  //     setCartData((prev) => [...prev, test]);
  //   }
  // };
  // console.log("member card:",cartData)

  return (
    isPopupOpened && (
      <div className="separate-separate-popup-popup-overlay">
        <div className="separate-separate-popup-popup-container">
          <div className="separate-separate-popup-popup-close-button-container">
            <SlClose
              onClick={onClickClosePopup}
              className="separate-separate-popup-popup-close-icon"
            />
          </div>
          <div className="separate-separate-popup-popup-input-container">
            <input
              type="search"
              placeholder="Search Tests and Health Packages"
              value={name}
              onChange={onChangeInput}
              className="separate-separate-popup-popup-input"
            />
          </div>

          <div className="separate-separate-popup-popup-individual-cards-container-1">
            {filteredData.length !== 0 ? (
              filteredData.map((test) => (
                <div
                  className="separate-separate-popup-popup-individual-card"
                  key={test.test_id}
                >
                  <div className="separate-separate-popup-popup-test-card-heading-container">
                    <h4 className="separate-separate-popup-popup-package-heading">
                      {test.test_name}
                    </h4>
                    <h5 className="separate-separate-popup-popup-card-price-heading">
                      ₹{test.price}
                    </h5>
                  </div>

                  <div className="separate-separate-popup-popup-info-container">
                    <img
                      src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png"
                      className="separate-separate-popup-popup-info-img"
                      alt="info"
                    />
                    <p className="separate-separate-popup-popup-info-container-paragraph">
                      <strong className="separate-separate-popup-popup-strong">
                        {test.preparation_instructions}
                      </strong>
                    </p>
                  </div>
                  <div className="separate-separate-popup-popup-info-container">
                    <img
                      src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png"
                      className="separate-separate-popup-popup-info-img"
                      alt="info"
                    />
                    <p className="separate-separate-popup-popup-info-container-paragraph">
                      <strong className="separate-separate-popup-popup-strong">
                        Report available in {test.duration}
                      </strong>
                    </p>
                  </div>
                  <div className="separate-separate-popup-popup-info-container">
                    <img
                      src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png"
                      className="separate-separate-popup-popup-info-img"
                      alt="info"
                    />
                    <p className="separate-separate-popup-popup-info-container-paragraph">
                      <strong className="separate-separate-popup-popup-strong">
                        {test.parameters}
                      </strong>
                    </p>
                  </div>

                  <div className="separate-separate-popup-popup-home-types-booking-container">
                    <ul className="separate-separate-popup-popup-home-types-list">
                      {test.visit_type.split(", ").map((type, index) => (
                        <li
                          key={index}
                          className="separate-separate-popup-popup-home-type-item"
                        >
                          {type}
                        </li>
                      ))}
                    </ul>
                    <div className="separate-separate-popup-popup-button-container">
                      <button
                        className="separate-separate-popup-popup-buttton"
                        onClick={() => handleButtonClick(test)}
                      >
                        {clickedIds.includes(test.test_id) ? (
                          <FiMinusCircle className="separate-separate-popup-popup-cart-add-remove-icons" />
                        ) : (
                          <MdAddCircleOutline className="separate-separate-popup-popup-cart-add-remove-icons" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="separate-separate-popup-popup-not-found-container">
                <img
                  src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736591529/notfound_nyzkyi.jpg"
                  height="100%"
                  width="100%"
                  alt="Not Found"
                />
              </div>
            )}
            {clickedIds.length > 0 && (
              <div className="separate-separate-popup-popup-bottom-cart-card">
                <div>
                  <h3>
                    <strong>₹{totalPrice}.00</strong>
                  </h3>
                </div>
                <Link to="/cart">
                  <div>
                    <FaCartArrowDown style={{ fontSize: "50px" }} />
                  </div>
                </Link>
                <button
                  className="separate-separate-popup-popup-btn separate-separate-popup-popup-btn-primary align-self-end"
                  onClick={onClickProceed}
                >
                  Proceed
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default SeperatePopup;
