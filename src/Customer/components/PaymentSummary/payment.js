import "./payment.css";
import Cookies from "js-cookie";
import {
  FiDollarSign,
  FiArrowRightCircle,
  FiTag,
  FiTruck,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const PaymentSummary = ({
  cartData,
  selectedDate,
  selectedSlot,
  userDetails,
  totalPrice,
  isSlotBooked,
  isAbled,
  members,
  selectedAddress,
}) => {
  const navigate = useNavigate();
  console.log(cartData);
  console.log(userDetails, "payments");
  console.log(members, "abcd");

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // const onClickProceed = () => {
  //   if (isSlotBooked && !isAbled) {
  //     alert("Successfully Completed");
  //   } else {
  //     alert("Please fill in all required fields");
  //   }
  // };

  const onClickProceed = async () => {
    if (isSlotBooked && !isAbled) {
      // setLoading(true);

      // Retrieve the JWT token from cookies
      const jwtToken = Cookies.get("jwtToken");

      if (!jwtToken) {
        alert("User is not authenticated");
        // setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/book-and-pay`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            test_ids: cartData.map((item) => item.test_id),
            appointment_date: selectedDate,
            slot_date: `${selectedDate} ${selectedSlot}`,
            total_price: totalPrice,
            payment_method: "Credit Card",
            members,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          console.error("Payment API Error:", result);
          alert(`Error: ${result.error || "Something went wrong"}`);
          return;
        }

        console.log("Payment Success:", result);
        alert("Successfully Completed");
        navigate("/my-dashboard");

        // navigate("/booking-details", {
        //   state: {
        //     bookingDetails: {
        //       appointment_id: result.appointment_id,
        //       transaction_id: result.transaction_id,
        //       total_price: result.total_price,
        //       payment_method: result.payment_method,
        //       appointment_date: selectedDate,
        //       slot_date: selectedSlot,
        //       appointment_status: "Confirmed",
        //       payment_status: "Completed",
        //       tracking_status: "Shipped",
        //       test_details: cartData,
        //       // patient_info: {
        //       //   name: userDetails.name,
        //       //   contact: userDetails.phone || "Not Provided",
        //       //   notes: "N/A",
        //       // },
        //     },
        //   },
        // });
      } catch (error) {
        console.error("Payment Request Failed:", error);
        alert("Error processing payment. Please try again.");
      } finally {
        // setLoading(false);
      }
    } else {
      alert("Please fill in all required fields");
    }
  };

  return (
    <div className="payment-payment-summary-container">
      <h2 className="payment-payment-heading">Payment Summary</h2>
      <div className="payment-payment-summary-item">
        {/* <FiDollarSign className="payment-payment-icon" /> */}
        <span className="payment-payment-label">Total Price</span>
        <span className="payment-payment-value">₹{totalPrice}.00</span>
      </div>
      <div className="payment-payment-summary-item">
        <FiTag className="payment-payment-icon" />
        <span className="payment-payment-label">Discount on MRP</span>
        <span className="payment-payment-value">₹{totalPrice}.00</span>
      </div>
      <div className="payment-payment-summary-item">
        <FiTruck className="payment-payment-icon" />
        <span className="payment-payment-label">Collection Charges</span>
        <span className="payment-payment-value">₹{totalPrice}.00</span>
      </div>
      <div className="payment-payment-summary-item">
        <FiDollarSign className="payment-payment-icon" />
        <span className="payment-payment-label">Net Payable Amount</span>
        <span className="payment-payment-value">₹{totalPrice}.00</span>
      </div>
      <button className="payment-payment-proceed-btn" onClick={onClickProceed}>
        Proceed <FiArrowRightCircle className="payment-payment-proceed-icon" />
      </button>
    </div>
  );
};
