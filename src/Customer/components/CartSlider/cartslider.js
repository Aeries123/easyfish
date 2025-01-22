import "./cartslider.css";
import { PaymentSummary } from "../PaymentSummary/payment";

export const CartSlider = (props) => {
  const { cartData, setCartData,setClickedIds,clickedIds } = props;

  // Function to remove item from cart
  const onClickRemove = (test_id) => {
    const newCartData = cartData.filter((each) => each.test_id !== test_id);
    const newClickedIds=clickedIds.filter((each)=>each!==test_id)
    setClickedIds(newClickedIds)
    console.log("Updated Cart Data:", newCartData);
    setCartData(newCartData);
  };
console.log("updatedClickedIds",clickedIds)
  // Calculate total price
  let totalPrice = 0;
  cartData.forEach((item) => {
    const price = Number(item.price); // Safer conversion
    if (!isNaN(price)) {
      totalPrice += price;
    } else {
      console.error(`Invalid price for item: ${item.test_name}`, item.price);
    }
  });

  // Log cartData and prices for debugging
  console.log("Cart Data:", cartData);
  console.log("Total Price:", totalPrice);

  return (
    <div className="cart-slider-container">
      {cartData.map((each) => {
        console.log("Item card:", each.cardPara3);
        console.log("Item Price:", each.price); // Debug
        // individual prices
        return (
          <div key={each.test_id} className="each-item-cart-1">
            <div>

            {/* {cartData.length > 0 && <PaymentSummary totalPrice={totalPrice} />}  */}
              <h3 className="card-title">{each.test_name}</h3>
              <h4 className="card-subtitle">{each.cardPara3}</h4>
              <p className="card-description">
                <strong>Patient Preparation:</strong>{" "}
                {each.preparation_instructions}
              </p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h1 className="card-price">₹{each.price}</h1>
                <button
                  className="cart-remove-button"
                  onClick={() => onClickRemove(each.test_id)}
                >
                  Remove
                </button>
              </div>
            </div>
            
          </div>
        );
      })}
      {cartData.length > 0 && (<PaymentSummary totalPrice={totalPrice} />)}
    </div>
  );
};
