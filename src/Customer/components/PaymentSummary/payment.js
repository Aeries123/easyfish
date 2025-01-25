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
  selectedAddress,
}) => {
  const navigate = useNavigate();
  console.log(cartData);
  console.log(userDetails, "payments");

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
        const response = await fetch("http://127.0.0.1:5000/api/book-and-pay", {
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
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          alert("Successfully Completed");
          // You can use the result from the backend if needed
          navigate("/booking-details", {
            state: {
              bookingDetails: {
                appointment_id: result.appointment_id,
                transaction_id: result.transaction_id,
                total_price: result.total_price,
                payment_method: result.payment_method,
                appointment_date: selectedDate,
                slot_date: selectedSlot,
                appointment_status: "Confirmed",
                payment_status: "Completed",
                tracking_status: "Shipped",
                test_details: cartData, // Passing cart data as test details
                patient_info: {
                  name: userDetails.name, // Example data
                  contact: "1234567890", // Example data
                  notes: "N/A", // Example data
                },
              },
            },
          });
          navigate("/booking-details");
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
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
