import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminViewPayment = () => {
  const { appointment_id } = useParams(); // Extract appointment ID from route params
  const navigate = useNavigate();

  const [paymentDetails, setPaymentDetails] = useState(null); // State to store payment details
  const [errorMessage, setErrorMessage] = useState(null); // State for error messages

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchPaymentDetails = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/get-payments/${appointment_id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          const data = await response.json();
          console.log("API Response:", data);  // Debugging
      
          if (response.ok) {
            setPaymentDetails(data);
          } else {
            setErrorMessage(data.error || "Error fetching payment details.");
          }
        } catch (error) {
          console.error("Fetch error:", error);
          setErrorMessage("Error fetching payment details.");
        }
      };
      

    fetchPaymentDetails();
  }, [appointment_id]);

  return (
    <div className="container mt-4">
      <h2>Payment Details</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {paymentDetails ? (
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Appointment ID</th>
              <td>{paymentDetails.appointment_id}</td>
            </tr>
            <tr>
              <th>Patient Name</th>
              <td>{paymentDetails.patient_name}</td>
            </tr>
            <tr>
              <th>Payment ID</th>
              <td>{paymentDetails.payment_details.payment_id}</td>
            </tr>
            <tr>
              <th>Payment Date</th>
              <td>{paymentDetails.payment_details.payment_date}</td>
            </tr>
            <tr>
              <th>Payment Method</th>
              <td>{paymentDetails.payment_details.payment_method}</td>
            </tr>
            <tr>
              <th>Payment Status</th>
              <td>{paymentDetails.payment_details.payment_status}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{paymentDetails.payment_details.amount}</td>
            </tr>
            <tr>
              <th>Transaction ID</th>
              <td>{paymentDetails.payment_details.transaction_id}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>Loading...</div>
      )}
      <button onClick={() => navigate(-1)} className="btn btn-secondary">
        Go Back
      </button>
    </div>
  );
};

export default AdminViewPayment;
