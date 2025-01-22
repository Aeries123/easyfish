import React from "react";
import { ImCross } from "react-icons/im";
import { FiMinusCircle } from "react-icons/fi";
import { MdAddCircleOutline } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Popup = ({
  isPopupOpened,
  onClickClosePopup,
  filteredData,
  handleButtonClick,
  clickedIds,
  cartData,
  totalPrice,
  name,
  onChangeInput,
  onClickProceed,
}) => {
  return (
    isPopupOpened && (
      <div className="popup-container">
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <input
            type="search"
            value={name}
            onChange={onChangeInput}
            style={{ width: "100%" }}
          />
          <ImCross
            style={{ fontSize: "30px", marginLeft: "10px" }}
            onClick={onClickClosePopup}
          />
        </div>

        <div className="individual-cards-container-1">
          {filteredData.length !== 0 ? (
            filteredData.map((test) => (
              <div className="individual-card" key={test.test_id}>
                <div className="test-card-heading-container">
                  <h4 className="package-heading">{test.test_name}</h4>
                  <h5 className="card-price-heading">₹{test.price}</h5>
                </div>

                <div className="info-container">
                  <img
                    src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png"
                    className="info-img"
                    alt="info"
                  />
                  <p className="info-container-paragraph">
                    <strong className="strong">
                      {test.preparation_instructions}
                    </strong>
                  </p>
                </div>
                <div className="info-container">
                  <img
                    src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png"
                    className="info-img"
                    alt="info"
                  />
                  <p className="info-container-paragraph">
                    <strong className="strong">
                      Report available in {test.duration}
                    </strong>
                  </p>
                </div>
                <div className="info-container">
                  <img
                    src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png"
                    className="info-img"
                    alt="info"
                  />
                  <p className="info-container-paragraph">
                    <strong className="strong">{test.parameters}</strong>
                  </p>
                </div>

                <div className="home-types-booking-container">
                  <ul className="home-types-list">
                    {test.visit_type.split(", ").map((type, index) => (
                      <li key={index} className="home-type-item">
                        {type}
                      </li>
                    ))}
                  </ul>
                  <div className="button-container">
                    <button
                      className="buttton"
                      onClick={() => handleButtonClick(test)}
                    >
                      {clickedIds.includes(test.test_id) ? (
                        <FiMinusCircle className="cart-add-remove-icons" />
                      ) : (
                        <MdAddCircleOutline className="cart-add-remove-icons" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <img
              src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736591529/notfound_nyzkyi.jpg"
              height="100%"
              width="100%"
              alt="Not Found"
            />
          )}
          {clickedIds.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                backgroundColor: "#D3D3D3",
                alignItems: "center",
                padding: "10px",
              }}
            >
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
                className="btn btn-primary align-self-end"
                onClick={onClickProceed}
              >
                Proceed
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Popup;
