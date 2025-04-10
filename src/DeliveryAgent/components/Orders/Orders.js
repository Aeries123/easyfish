import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("DeliveryJwtToke");
      const response = await fetch(`${BASE_URL}/api/delivery_orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      } else {
        console.error("Failed to fetch orders:", data.message);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCardClick = (orderId) => {
    navigate(`/delivery/order/${orderId}`);
  };

  if (loading) return <p className="orders-loading">Loading orders...</p>;

  return (
    <div className="orders-container">
      <h2 className="orders-title">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="orders-empty">No orders found.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className={`order-card ${
                order.status === "Delivered" ? "delivered" : "assigned"
              }`}
              onClick={() => handleCardClick(order.order_id)}
              style={{ cursor: "pointer" }}
            >
              <h3>Order #{order.order_id}</h3>
              <p>
                <strong>Customer:</strong> {order.customer_name}
              </p>
              <p>
                <strong>Address:</strong> {order.delivery_address}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.total_price}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
