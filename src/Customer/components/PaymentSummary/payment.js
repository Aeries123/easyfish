import { Link } from "react-router-dom";
import "./payment.css";

// export const PaymentSummary = (props) => {
//   const { totalPrice } = props;

//   const onClickBooking = () => {
//     alert("Booked successfully");
//   };
//   return (
//     <div className="payment-card">
//       <div className="summary-item">
//         <span className="label">Sub Total</span>
//         <span className="value">₹{totalPrice}.00</span>
//       </div>
//       <div className="summary-item">
//         <span className="label">Total</span>
//         <span className="value">₹{totalPrice}.00</span>
//       </div>
//       <div className="summary-item">
//         <span className="label">Net Payable Amount</span>
//         <span className="value">₹{totalPrice}.00</span>
//       </div>
//       <Link to="/orders/page">
//         <button className="proceed-button" onClick={onClickBooking}>
//           Proceed
//         </button>
//       </Link>
//     </div>
//   );
// };

import "./payment.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const PaymentSummary = (props) => {
  const { totalPrice } = props;
  const navigate = useNavigate();

  // const onClickBooking=()=> {
  //     alert("Booked successfully")
  // }
  const jwtToken = Cookies.get("jwtToken");
  const onClickProceed = () => {
    if (jwtToken === undefined) {
      navigate("/customer/login");
    } 
    // else {
    //   alert("Successfully Booked");
    // }
  };
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
      <button onClick={onClickProceed} className="proceed-button">
        <Link className="proceed-button-link" to="/orders/page">Proceed</Link>
      </button>
    </div>
  );
};
