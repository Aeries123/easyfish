import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ManageBookings.css";

const ManageBooking = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/orders`);
      const data = await response.json();
      if (response.ok) {
        setOrders(data || []);
      } else {
        console.error("Failed to fetch orders:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const response = await fetch(`${BASE_URL}/api/orders/${orderId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setOrders(orders.filter((order) => order.order_id !== orderId));
        alert("Order deleted successfully!");
      } else {
        const data = await response.json();
        alert("Error: " + (data.error || "Could not delete order"));
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order. Please try again.");
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastOrder = currentPage * rowsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - rowsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

  return (
    <div className="container-fluid">
      <h2 className="title">Manage Orders</h2>
      <input
        type="text"
        className="form-control"
        placeholder="Search by customer name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Delivery Boy status</th>
            <th>Delivery Boy Name</th>
            <th>Status</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.customer.name}</td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>{order.assign || "Not Assigned"}</td>
                <td>{order.delivery_boy_name || "N/A"}</td>
                <td>{order.status}</td>
                <td>₹{order.total_price}</td>
                <td>
                  <Link to={`/admin/view-booking/${order.order_id}`}>
                    <button className="btn">View</button>
                  </Link>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDelete(order.order_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-data">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <button
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageBooking;
