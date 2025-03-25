import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ManageAdminPayment.css";

const ManageAdminPayment = () => {
  const { paymentId } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/payments/${paymentId}`);
        const data = await response.json();
        if (response.ok) {
          setPayment(data);
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
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Payment ID</strong></td>
            <td>{payment.payment_id}</td>
          </tr>
          <tr>
            <td><strong>Order ID</strong></td>
            <td>{payment.order_id}</td>
          </tr>
          <tr>
            <td><strong>Amount</strong></td>
            <td>₹{payment.amount}</td>
          </tr>
          <tr>
            <td><strong>Method</strong></td>
            <td>{payment.payment_method}</td>
          </tr>
          <tr>
            <td><strong>Transaction ID</strong></td>
            <td>{payment.transaction_id}</td>
          </tr>
          <tr>
            <td><strong>Status</strong></td>
            <td>{payment.status}</td>
          </tr>
          <tr>
            <td><strong>Payment Date</strong></td>
            <td>{new Date(payment.created_at).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      <h3>Customer Details</h3>
      <table>
        <tbody>
          <tr>
            <td><strong>Name</strong></td>
            <td>{payment.name}</td>
          </tr>
          <tr>
            <td><strong>Email</strong></td>
            <td>{payment.email}</td>
          </tr>
          <tr>
            <td><strong>Phone</strong></td>
            <td>{payment.phone}</td>
          </tr>
        </tbody>
      </table>

      <h3>Order Details</h3>
      <table>
        <tbody>
          <tr>
            <td><strong>Order Date</strong></td>
            <td>{new Date(payment.order_date).toLocaleString()}</td>
          </tr>
          <tr>
            <td><strong>Total Amount</strong></td>
            <td>₹{payment.total_price}</td>
          </tr>
          <tr>
            <td><strong>Order Status</strong></td>
            <td>{payment.status}</td>
          </tr>
        </tbody>
      </table>

      <Link to="/admin/manage-payments" className="back-btn">
        Back to Payments
      </Link>
    </div>
  );
};

export default ManageAdminPayment;
