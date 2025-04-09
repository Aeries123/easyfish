import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminAssignedDeliveryboy = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");
  const rowsPerPage = 5;

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchAssignedOrders();
  }, []);

  const fetchAssignedOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/orders/assigned`);
      const data = await response.json();

      if (response.ok) {
        setOrders(data);
      } else {
        setAlertMessage("Error fetching orders: " + data.error);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setAlertMessage("Error connecting to server.");
    }

    setTimeout(() => setAlertMessage(""), 3000);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredOrders = orders.filter((order) =>
    Object.values(order).some(
      (value) =>
        value !== null &&
        value !== undefined &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastOrder = currentPage * rowsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - rowsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

  return (
    <div className="container-fluid mt-4">
      <h2>Assigned Orders</h2>

      <input
        type="text"
        className="form-control"
        placeholder="Search orders..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {alertMessage && (
        <div className="alert alert-info mt-3">{alertMessage}</div>
      )}

      <table className="table table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Delivery Boy</th>
            <th>Status</th>
            <th>Total Price</th>
            <th>Assignment Status</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.customer?.name || 'N/A'}</td>
                <td>{new Date(order.order_date).toLocaleString()}</td>
                <td>{order.delivery_boy_name || 'Unassigned'}</td>
                <td>{order.status}</td>
                <td>₹{order.total_price.toFixed(2)}</td>
                <td>{order.assign}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No assigned orders available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <nav className="mt-3">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage((prev) => prev - 1)}>
              Previous
            </button>
          </li>
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage((prev) => prev + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminAssignedDeliveryboy;
