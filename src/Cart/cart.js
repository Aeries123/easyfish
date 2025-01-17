import {useEffect} from 'react'
import "./cart.css";
import { PaymentSummary } from "../PaymentSummary/payment";
const Cart = (props) => {
  const { cartData = [], setCartData } = props;
  console.log(cartData)

  // Function to remove an item from the cart
  const onClickRemove = (test_id) => {
    const newCartData = cartData.filter((each) => each.test_id !== test_id);
    console.log(newCartData);
    setCartData(newCartData);
    console.log(cartData)
  };

  useEffect(() => {
    console.log("Updated cartData:", cartData);
  }, [cartData]);

  let totalPrice = 0;
  for (let i of cartData) {
    totalPrice += parseInt(i.price);
  }
  return (
    <div className="cart-container">
      <h2 style={{ display: cartData.length !== 0 ? "block" : "none" }}>
        Test Added
      </h2>
      <div>
        {cartData.length > 0 ? (
          cartData.map((each) => (
            <div key={each.test_id} className="each-item-cart">
              <div>
                <h3 className="card-title">{each.test_name}</h3>
                <h4 className="card-subtitle">{each.cardPara3}</h4>
                <p className="card-description">
                  <strong>Patient Preparation:</strong> {each.preparation_instructions}
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <img
              src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736576711/empty-cart-shopping-commerce-3d-illustration_66255-2017_ziedxe.avif"
              width="100%"
            />
            <h2>Cart is Empty</h2>
          </div>
        )}
      </div>
      <div></div>
      {cartData.length > 0 && <PaymentSummary totalPrice={totalPrice} />}
    </div>
  );
};

export default Cart;
