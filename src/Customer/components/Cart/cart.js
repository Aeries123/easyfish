import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import { PaymentSummary } from "../PaymentSummary/payment";
import Popup from "../PopUp/Popup";

const Cart = (props) => {
  const { cartData = [], setCartData } = props;
  const [testsData, setTestsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [clickedIds, setClickedIds] = useState([]);
  const navigate = useNavigate();

  const jwtToken = Cookies.get("jwtToken");

  const onClickProceed = () => {
    if (!jwtToken) {
      navigate("/");
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
        setTestsData(data);
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
  };

  let totalPrice = 0;
  for (let i of cartData) {
    totalPrice += parseInt(i.price);
  }

  return (
    <div className="cart-container">
      <h2 style={{ display: cartData.length !== 0 ? "block" : "none" }}>
        Test Added
      </h2>
      {cartData.length > 0 && (
        <button onClick={handleAddMoreTests} className="add-tests-button">
          Add more tests
        </button>
      )}

      <div>
        {cartData.length > 0 ? (
          cartData.map((each) => (
            <div key={each.test_id} className="each-item-cart">
              <div>
                <h3 className="card-title">{each.test_name}</h3>
                <h4 className="card-subtitle">{each.cardPara3}</h4>
                <p className="card-description">
                  <strong>Patient Preparation:</strong>{" "}
                  {each.preparation_instructions}
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <b className="card-price">₹{each.price}</b>
                <button
                  className="cart-remove-button"
                  onClick={() => onClickRemove(each.test_id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-cart-container">
            <img
              src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736576711/empty-cart-shopping-commerce-3d-illustration_66255-2017_ziedxe.avif"
              alt="empty cart"
              className="empty-cart-image"
            />
            <div className="empty-cart-cardcontainer">
              <h2 className="empty-cart-heading">Your Cart is Empty</h2>
              <p className="empty-cart-description">
                Looks like you haven’t added any tests / health packages to your
                cart
              </p>
              <button onClick={handleAddMoreTests} className="empty-cart-button">
                Add Tests
              </button>
            </div>
          </div>
        )}
      </div>

      {cartData.length > 0 && <PaymentSummary totalPrice={totalPrice} />}

      {/* Popup Component Integration */}
      <Popup
        isPopupOpened={isPopupOpened}
        onClickClosePopup={onClickClosePopup}
        filteredData={filteredData}
        handleButtonClick={handleAddTestToCart}
        clickedIds={clickedIds}
        cartData={cartData}
        totalPrice={totalPrice}
        name={searchInput}
        onChangeInput={(e) => setSearchInput(e.target.value)}
        onClickProceed={onClickProceed}
      />
    </div>
  );
};

export default Cart;
