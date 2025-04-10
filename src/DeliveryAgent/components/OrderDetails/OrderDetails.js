import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OrderDetails.css";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("DeliveryJwtToke");
        const response = await fetch(
          `${BASE_URL}/api/order_details/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setOrder(data.order);
          setItems(data.items);
        } else {
          setError(data.message || "Failed to fetch order details");
        }
      } catch (err) {
        setError("Error fetching order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div className="order-loading">Loading...</div>;
  if (error) return <div className="order-error">{error}</div>;

  return (
    <div className="order-details-container">
      <h2 className="order-heading">Order Details - #{orderId}</h2>

      <div className="order-summary">
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Total Price:</strong> ₹{order.total_price}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(order.order_date).toLocaleString()}
        </p>
        <p>
          <strong>Assigned:</strong> {order.assign}
        </p>
      </div>

      <div className="customer-info">
        <h3 className="section-title">Customer Info</h3>
        <p>
          <strong>Name:</strong> {order.customer_name}
        </p>
        <p>
          <strong>Email:</strong> {order.customer_email}
        </p>
        <p>
          <strong>Phone:</strong> {order.customer_phone}
        </p>
      </div>

      <div className="order-items">
        <h3 className="section-title">Order Items</h3>
        <table className="items-table">
          <thead>
            <tr>
              <th>Variant ID</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.variant_id}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
                <td>₹{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
