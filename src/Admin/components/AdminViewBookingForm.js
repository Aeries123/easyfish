import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./AdminViewBookingForm.css";

const AdminViewBookingForm = () => {
  const { order_id } = useParams();
  const [order, setOrder] = useState(null);
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

  useEffect(() => {
    fetchDeliveryBoys();
  }, []);

  useEffect(() => {
    if (deliveryBoys.length > 0) {
      fetchOrderDetails();
    }
  }, [deliveryBoys]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/orders/${order_id}`);
      const data = await response.json();
      if (response.ok) {
        setOrder(data);
        setSelectedDeliveryBoy(data.delivery_boy_id || "");
      } else {
        console.error("Error fetching order details:", data.error);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const fetchDeliveryBoys = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/delivery_boys`);
      const data = await response.json();
      if (response.ok) {
        setDeliveryBoys(data.delivery_boys || []);
      } else {
        console.error("Failed to fetch delivery boys:", data.error);
      }
    } catch (error) {
      console.error("Error fetching delivery boys:", error);
    }
  };

  const handleAssignDeliveryBoy = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/orders/${order_id}/assign`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ delivery_boy_id: selectedDeliveryBoy }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Delivery boy assigned successfully.");
        fetchOrderDetails();
      } else {
        alert(`Failed to assign: ${result.error}`);
      }
    } catch (error) {
      console.error("Assignment error:", error);
      alert("An error occurred while assigning delivery boy.");
    }
  };

  if (!order) {
    return <p className="loading">Loading booking details...</p>;
  }

  return (
    <div className="container">
      <h2 className="title">Booking Details</h2>

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

      <div className="form-group mt-3">
        <label htmlFor="deliveryBoySelect">
          <strong>Assign Delivery Boy</strong>
        </label>
        <select
          id="deliveryBoySelect"
          className="form-control"
          value={selectedDeliveryBoy}
          onChange={(e) => setSelectedDeliveryBoy(e.target.value)}
        >
          <option value="">-- Select Delivery Boy --</option>
          {deliveryBoys.map((boy) => (
            <option key={boy.delivery_boy_id} value={boy.delivery_boy_id}>
              {boy.name}
            </option>
          ))}
        </select>

        <button
          className="btn btn-primary mt-2"
          onClick={handleAssignDeliveryBoy}
          disabled={!selectedDeliveryBoy}
        >
          Assign
        </button>
      </div>

      {order.order_items && order.order_items.length > 0 && (
        <div className="order-items mt-4">
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

      <div className="actions mt-4">
        <Link to="/admin/manage-booking">
          <button className="btn">Back to Bookings</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminViewBookingForm;
