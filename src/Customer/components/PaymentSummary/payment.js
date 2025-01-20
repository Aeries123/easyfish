import "./payment.css";

export const PaymentSummary = (props) => {
    const {totalPrice}=props

    const onClickBooking=()=> {
        alert("Booked successfully")
    }
    return (
        <div className="payment-card">
            <div className="summary-item">
                <span className="label">Sub Total</span>
                <span className="value">₹{totalPrice}.00</span>
            </div>
            <div className="summary-item">
                <span className="label">Total</span>
                <span className="value">₹{totalPrice}.00</span>
            </div>
            <div className="summary-item">
                <span className="label">Net Payable Amount</span>
                <span className="value">₹{totalPrice}.00</span>
            </div>
            <button className="proceed-button" onClick={onClickBooking}>Proceed / Add patient</button>
        </div>
    );
};


