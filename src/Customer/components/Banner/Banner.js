import React, { useContext, useEffect, useState } from "react";
import "./Banner.css";
import { MdAddCircleOutline } from "react-icons/md";
import { FiMinusCircle } from "react-icons/fi";
import { FaCartArrowDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Banner = (props) => {
  const navigate = useNavigate();
  const { testData, setCartData, cartData } = props;
  console.log("Banner data:",testData)
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  const [clickedIds, setClickedIds] = useState([]);
  const [name, setTestName] = useState("");
  // const navigate=useNavigate()
  const onChangeInput = (e) => {
    setTestName(e.target.value);
  };
  const jwtToken = Cookies.get("jwtToken");
  // const path=jwtToken?"/":"/customer/login"
  // const onSuccess=()=>{
  //   console.log("Proceed button clicked");
  //   navigate("/")
  // }
  console.log(jwtToken);
  const onClickProceed = () => {
    if (jwtToken) {
      navigate("/");
    } else {
      navigate("/customer/login");
    }
  };

  const onClickInput = () => {
    if (!isPopupOpened) {
      setIsPopupOpened(true);
    }
    // else{
    //   setIsPopupOpened(false)
    // }
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
  let totalPrice = 0;
  if (cartData.length > 0) {
    for (let i of cartData) {
      totalPrice += parseInt(i.price);
    }
  }
  useEffect(() => {
    console.log(isPopupOpened);
  }, [isPopupOpened]);
  const filteredData = testData.filter((each) =>
    each.test_name.toLowerCase().startsWith(name)
  );
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
          <button className="banner-button">Upload Prescption</button>
        </div>
      </div>
      {isPopupOpened && (
        <div
          style={{
            backgroundFilter: "rgba(255,255,255,0)",
            zIndex: "1000",
            height: "100%",
            width: "100%",
          }}
        ></div>
      )}
      {isPopupOpened && (
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

                  {/* <hr /> */}
                  <div className="info-container">
                    <img
                      src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png"
                      className="info-img"
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
                          <p>
                            <MdAddCircleOutline className="cart-add-remove-icons" />
                          </p>
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
              />
            )}
            {clickedIds.length > 0 ? (
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
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
