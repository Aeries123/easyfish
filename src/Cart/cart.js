import "./cart.css";
import { PaymentSummary } from "../PaymentSummary/payment";
const Cart = (props) => {
    const { cartData = [], setCartData } = props;

    // Function to remove an item from the cart
    const onClickRemove = (id) => {
        const newCartData = cartData.filter((each) => each.id !== id);
        
        console.log(newCartData)
        setCartData(newCartData);
    };
let totalPrice=0
for (let i of cartData){
    totalPrice+=parseInt(i.cardTestPrice)
}
    return (
        <div className="cart-container">
            <h2>Test Added</h2>
            <div>
                {cartData.length > 0 ? (
                    cartData.map((each) => (
                        <div key={each.id} className="each-item-cart">
                            <div>
                                <h3 className="card-title">{each.cardName}</h3>
                                <h4 className="card-subtitle">{each.cardPara3}</h4>
                                <p className="card-description">No special preparation required</p>
                            </div>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <b className="card-price">₹{each.cardTestPrice}.00</b>
                                <button
                                    className="cart-remove-button"
                                    onClick={() => onClickRemove(each.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2>Cart is Empty</h2>
                )}
            </div>
            <div>

            </div>
            {cartData.length>0&&(
            <PaymentSummary totalPrice={totalPrice}/>)
}
        </div>
    );
};

export default Cart;
