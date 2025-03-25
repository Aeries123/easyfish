import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./AdminViewBookingForm.css";

const AdminViewBookingForm = () => {
  const { order_id } = useParams();
  const [order, setOrder] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/orders/${order_id}`);
      const data = await response.json();
      if (response.ok) {
        setOrder(data);
      } else {
        console.error("Error fetching order details:", data.error);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  if (!order) {
    return <p className="loading">Loading booking details...</p>;
  }

  return (
    <div className="container">
      <h2 className="title">Booking Details</h2>

      {/* Booking Details Table */}
      <div className="booking-details">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{order.order_id}</td>
              <td>{order.customer_name}</td>
              <td>{order.email || "N/A"}</td>
              <td>{order.phone || "N/A"}</td>
              <td>{new Date(order.order_date).toLocaleDateString()}</td>
              <td>{order.status}</td>
              <td>₹{Number(order.total_price).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Order Items Section */}
      {order.order_items && order.order_items.length > 0 && (
        <div className="order-items">
          <h3>Order Items</h3>
          <table>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Variant ID</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.order_items.map((item) => (
                <tr key={item.order_item_id}>
                  <td>{item.order_item_id}</td>
                  <td>{item.variant_id}</td>
                  <td>{item.quantity}</td>
                  <td>₹{Number(item.price).toFixed(2)}</td>
                  <td>₹{Number(item.total).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="actions">
        <Link to="/admin/manage-booking">
          <button className="btn">Back to Bookings</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminViewBookingForm;
