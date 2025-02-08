import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { PaymentSummary } from "../PaymentSummary/payment";
import Popup from "../PopUp/Popup";
import { MdDelete } from "react-icons/md";
import { IoCart } from "react-icons/io5";
import "./index.css";

const PopupCart = (props) => {
  const { cartData, setCartData, clickedIds, setClickedIds } = props;
  const [testsData, setTestsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const jwtToken = Cookies.get("jwtToken");

  const onClickProceed = () => {
    if (jwtToken === undefined) {
      navigate("/customer/login");
    } else {
      alert("Successfully");
    }
  };

  const handleAddMoreTests = () => {
    setIsPopupOpened(true);
  };

  const onClickClosePopup = () => {
    setIsPopupOpened(false);
  };

  useEffect(() => {
    const endpoint = "http://127.0.0.1:5000/api/tests";
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
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
  };

  let totalPrice = 0;
  for (let i of cartData) {
    totalPrice += parseInt(i.price);
  }

  return (
    <div className="popup-cart-cart-container">
      <h1>Cart</h1>
      {/* <h2 style={{ display: cartData.length !== 0 ? "block" : "none" }}>
        Tests Added
      </h2> */}
      {cartData.length > 0 && (
        <button
          onClick={handleAddMoreTests}
          className="popup-cart-add-tests-button"
        >
          Add more tests
        </button>
      )}

      <div>
        {cartData.length > 0 ? (
          cartData.map((each) => (
            <>
              <div key={each.test_id} className="popup-cart-each-item-cart">
                <div>
                  <h3 className="popup-cart-card-title">{each.test_name}</h3>
                  <h4 className="popup-cart-card-subtitle">{each.price}</h4>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <button
                    className="popup-cart-remove-button"
                    onClick={() => onClickRemove(each.test_id)}
                  >
                    <MdDelete className="popup-popup-cart-cart-delete-icon" />
                  </button>
                </div>
              </div>
            </>
          ))
        ) : (
          <div className="popup-cart-empty-cart-container">
            <img
              src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736576711/empty-cart-shopping-commerce-3d-illustration_66255-2017_ziedxe.avif"
              alt="empty cart"
              className="popup-cart-empty-cart-image"
            />
            <div className="popup-cart-empty-cart-cardcontainer">
              <h2 className="popup-cart-empty-cart-heading">
                Your Cart is Empty
              </h2>
              <p className="popup-cart-empty-cart-description">
                Looks like you haven’t added any tests / health packages to your
                cart
              </p>
              <button
                onClick={handleAddMoreTests}
                className="popup-cart-empty-cart-button"
              >
                Add Tests
              </button>
            </div>
          </div>
        )}
      </div>

      {cartData.length > 0 && (
        <div className="popup-cart-payment-main-container">
          <div className="popup-cart-payment-icon-container">
            <IoCart className="popup-cart-icon" />
            <div className="popup-cart-payment-card-container">
              <p className="popup-cart-total-amount">₹ {totalPrice}</p>
              <p className="popup-cart-summary-description">
                1 Test & 1 Checkup
              </p>
            </div>
          </div>
          <button
            onClick={onClickProceed}
            className="popup-cart-payment-button"
          >
            <Link className="popup-cart-proceed-button-link" to="/orders/page">
              Proceed
            </Link>
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
      />
    </div>
  );
};

export default PopupCart;