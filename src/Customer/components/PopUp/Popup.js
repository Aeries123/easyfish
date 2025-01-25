import React, { useState } from "react";
import { SlClose } from "react-icons/sl";
import { FiMinusCircle } from "react-icons/fi";
import { MdAddCircleOutline } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

import "./Popup.css";

const Popup = ({
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
  const onClickButton = (test) => {
    let testId = test.test_id;
    if (clickedIds.includes(testId)) {
      setClickedIds((prev) => prev.filter((each) => each !== testId));
      setCartData((prev) => prev.filter((each) => each.test_id !== testId));
    } else {
      setClickedIds((prev) => [...prev, testId]);
      setCartData((prev) => [...prev, test]);
    }
  };

  return (
    isPopupOpened && (
      <div className="popup-popup-overlay">
        <div className="popup-popup-container">
          <div className="popup-popup-close-button-container">
            <SlClose
              onClick={onClickClosePopup}
              className="popup-popup-close-icon"
            />
          </div>
          <div className="popup-popup-input-container">
            <input
              type="search"
              placeholder="Search Tests and Health Packages"
              value={name}
              onChange={onChangeInput}
              className="popup-popup-input"
            />
          </div>

          <div className="popup-popup-individual-cards-container-1">
            {filteredData.length !== 0 ? (
              filteredData.map((test) => (
                <div className="popup-popup-individual-card" key={test.test_id}>
                  <div className="popup-popup-test-card-heading-container">
                    <h4 className="popup-popup-package-heading">
                      {test.test_name}
                    </h4>
                    <h5 className="popup-popup-card-price-heading">
                      ₹{test.price}
                    </h5>
                  </div>

                  <div className="popup-popup-info-container">
                    <img
                      src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png"
                      className="popup-popup-info-img"
                      alt="info"
                    />
                    <p className="popup-popup-info-container-paragraph">
                      <strong className="popup-popup-strong">
                        {test.preparation_instructions}
                      </strong>
                    </p>
                  </div>
                  <div className="popup-popup-info-container">
                    <img
                      src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png"
                      className="popup-popup-info-img"
                      alt="info"
                    />
                    <p className="popup-popup-info-container-paragraph">
                      <strong className="popup-popup-strong">
                        Report available in {test.duration}
                      </strong>
                    </p>
                  </div>
                  <div className="popup-popup-info-container">
                    <img
                      src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png"
                      className="popup-popup-info-img"
                      alt="info"
                    />
                    <p className="popup-popup-info-container-paragraph">
                      <strong className="popup-popup-strong">
                        {test.parameters}
                      </strong>
                    </p>
                  </div>

                  <div className="popup-popup-home-types-booking-container">
                    <ul className="popup-popup-home-types-list">
                      {test.visit_type.split(", ").map((type, index) => (
                        <li key={index} className="popup-popup-home-type-item">
                          {type}
                        </li>
                      ))}
                    </ul>
                    <div className="popup-popup-button-container">
                      <button
                        className="popup-popup-buttton"
                        onClick={() => onClickButton(test)}
                      >
                        {clickedIds.includes(test.test_id) ? (
                          <FiMinusCircle className="popup-popup-cart-add-remove-icons" />
                        ) : (
                          <MdAddCircleOutline className="popup-popup-cart-add-remove-icons" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="popup-popup-not-found-container">
                <img
                  src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736591529/notfound_nyzkyi.jpg"
                  height="100%"
                  width="100%"
                  alt="Not Found"
                />
              </div>
            )}
            {clickedIds.length > 0 && (
              <div className="popup-popup-bottom-cart-card">
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
                  className="popup-popup-btn popup-popup-btn-primary align-self-end"
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

export default Popup;
