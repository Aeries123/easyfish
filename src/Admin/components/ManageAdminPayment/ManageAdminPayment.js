import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ManageAdminPayment.css";

const ManageAdminPayment = () => {
  const { paymentId } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

  console.log(payment, "payment");

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/payments/${paymentId}`);
        const data = await response.json();
        if (response.ok) {
          setPayment(data);
          console.log("abcd")
        } else {
          console.error("Error fetching payment:", data.error);
        }
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
      setLoading(false);
    };

    fetchPaymentDetails();
  }, [paymentId]);

  if (loading) return <div className="loading">Loading...</div>;

  if (!payment) return <div className="error">Payment details not found.</div>;

  return (
    <div className="view-payment-container">
      <h2>Payment Details</h2>

      <div className="payment-info">
        <h3>Transaction Details</h3>
        <p>
          <strong>Payment ID:</strong> {payment.payment_id}
        </p>
        <p>
          <strong>Order ID:</strong> {payment.order_id}
        </p>
        <p>
          <strong>Amount:</strong> ${payment.amount}
        </p>
        <p>
          <strong>Method:</strong> {payment.payment_method}
        </p>
        <p>
          <strong>Transaction ID:</strong> {payment.transaction_id}
        </p>
        <p>
          <strong>Status:</strong> {payment.status}
        </p>
        <p>
          <strong>Payment Date:</strong>{" "}
          {new Date(payment.created_at).toLocaleString()}
        </p>
      </div>

      <div className="customer-info">
        <h3>Customer Details</h3>
        <p>
          <strong>Name:</strong> {payment.customer_name}
        </p>
        <p>
          <strong>Email:</strong> {payment.customer_email}
        </p>
        <p>
          <strong>Phone:</strong> {payment.customer_phone}
        </p>
      </div>

      <div className="order-info">
        <h3>Order Details</h3>
        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(payment.order_date).toLocaleString()}
        </p>
        <p>
          <strong>Total Amount:</strong> ${payment.total_amount}
        </p>
        <p>
          <strong>Order Status:</strong> {payment.order_status}
        </p>
      </div>

      <Link to="/admin/manage-payments" className="back-btn">
        Back to Payments
      </Link>
    </div>
  );
};

export default ManageAdminPayment;
