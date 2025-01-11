import "./payment.css";

export const PaymentSummary = (props) => {
    const {totalPrice}=props
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
            <button className="proceed-button">Proceed / Add patient</button>
        </div>
    );
};


