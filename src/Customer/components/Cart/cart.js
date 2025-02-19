import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import { PaymentSummary } from "../PaymentSummary/payment";
import Popup from "../PopUp/Popup";
import { IoCart } from "react-icons/io5";

const Cart = (props) => {
  const { cartData, setCartData, clickedIds, setClickedIds, packagesClickedIds, healthPackages, setPackagesClickedIds } = props;
  const [testsData, setTestsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const jwtToken = Cookies.get("jwtToken");
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const onClickProceed = () => {
    if (jwtToken === undefined) {
      navigate("/customer/login");
    } else {
      navigate("/orders/page");
    }
  };

  

  const handleAddMoreTests = () => {
    setIsPopupOpened(true);
  };

  const onClickClosePopup = () => {
    setIsPopupOpened(false);
  };

  useEffect(() => {
    const endpoint = `${BASE_URL}/api/tests`;
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data,"abcd")
        setTestsData(data.tests);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredData = testsData.filter((test) =>
    test.test_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleAddTestToCart = (test) => {
    if (!cartData.some((item) => item.test_id === test.test_id)) {
      setCartData((prev) => [...prev, test]);
    }
    setClickedIds((prev) =>
      prev.includes(test.test_id)
        ? prev.filter((id) => id !== test.test_id)
        : [...prev, test.test_id]
    );
  };

  const onClickRemove = (test_id) => {
    const newCartData = cartData.filter((each) => each.test_id !== test_id);
    setCartData(newCartData);
    
    const newClickedIds = clickedIds.filter((id) => id !== test_id);
    setClickedIds(newClickedIds);

    // const newPackagesClickedIds = packagesClickedIds.filter((id) => id !== test_id);
    // setPackagesClickedIds(newPackagesClickedIds);
  };
  

  let totalPrice = 0;
  for (let i of cartData) {
    totalPrice += parseInt(i.price);
  }

  return (
    <div className="cart-cart-container">
      <h2 style={{ display: cartData.length !== 0 ? "block" : "none" }}>
        Tests Added
      </h2>
      {cartData.length > 0 && (
        <button
          onClick={handleAddMoreTests}
          className="cart-cart-add-tests-button"
        >
          Add more tests
        </button>
      )}

      <div>
        {cartData.length > 0 ? (
          cartData.map((each) => (
            <>
              <div key={each.test_id} className="cart-cart-each-item-cart">
                <div>
                  <h3 className="cart-cart-card-title">{each.test_name}</h3>
                  <h4 className="cart-cart-card-subtitle">{each.cardPara3}</h4>
                  <p className="cart-cart-card-description">
                    <strong>Patient Preparation:</strong>{" "}
                    {each.preparation_instructions}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <b className="cart-cart-card-price">₹{each.price}</b>
                  <button
                    className="cart-cart-remove-button"
                    onClick={() => onClickRemove(each.test_id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </>
          ))
        ) : (
          <div className="cart-cart-empty-cart-container">
            <img
              src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736576711/empty-cart-shopping-commerce-3d-illustration_66255-2017_ziedxe.avif"
              alt="empty cart"
              className="cart-cart-empty-cart-image"
            />
            <div className="cart-cart-empty-cart-cardcontainer">
              <h2 className="cart-cart-empty-cart-heading">
                Your Cart is Empty
              </h2>
              <p className="cart-cart-empty-cart-description">
                Looks like you haven’t added any tests / health packages to your
                cart
              </p>
              <button
                onClick={handleAddMoreTests}
                className="cart-cart-empty-cart-button"
              >
                Add Tests
              </button>
            </div>
          </div>
        )}
      </div>

      {cartData.length > 0 && (
        <div className="cart-cart-payment-main-container">
          <div className="cart-cart-payment-icon-container">
            <IoCart className="cart-icon" />
            <div className="cart-cart-payment-card-container">
              <p className="cart-cart-total-amount">₹ {totalPrice}</p>
              <p className="cart-cart-summary-description">
                1 Test & 1 Checkup
              </p>
            </div>
          </div>
          <button
            onClick={onClickProceed}
            className="cart-cart-payment-button"
          >
            {/* <Link className="proceed-button-link" to="/orders/page"> */}
              Proceed
            {/* </Link> */}
          </button>
        </div>
      )}

      {/* Popup Component Integration */}
      <Popup
        isPopupOpened={isPopupOpened}
        onClickClosePopup={onClickClosePopup}
        filteredData={filteredData}
        handleButtonClick={handleAddTestToCart}
        clickedIds={clickedIds}
        setCartData={setCartData}
        cartData={cartData}
        totalPrice={totalPrice}
        name={searchInput}
        onChangeInput={(e) => setSearchInput(e.target.value)}
        onClickProceed={onClickProceed}
        setClickedIds={setClickedIds}
        healthPackages={healthPackages}
      />
    </div>
  );
};

export default Cart;
