import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ManagePayments.css";

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(5);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/payments`);
        const data = await response.json();
        if (response.ok) {
          setPayments(data);
        } else {
          console.error("Error fetching payments:", data.error);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDateFilterChange = () => {
    setCurrentPage(1);
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = Object.values(payment).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paymentDate = new Date(payment.created_at);
    const isWithinDateRange =
      (!startDate || paymentDate >= new Date(startDate)) &&
      (!endDate || paymentDate <= new Date(endDate));

    return matchesSearch && isWithinDateRange;
  });

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="container-fluid">
      <h2 className="payment-header">Manage Payments</h2>
      {/* <Link to="/admin/payment" className="add-payment-btn">
        Add Payment
      </Link> */}

      {/* <input
        type="text"
        className="search-box"
        placeholder="Search payments"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="date-filters">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleDateFilterChange}>Filter</button>
      </div> */}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Payment Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.length > 0 ? (
              currentPayments.map((payment) => (
                <tr key={payment.payment_id}>
                  <td>{payment.payment_id}</td>
                  <td>{payment.order_id}</td>
                  <td>{payment.name}</td>{" "}
                  {/* Replace customer_id with customer_name */}
                  <td>₹{payment.amount}</td>
                  <td>{payment.payment_method}</td>
                  <td>{payment.transaction_id}</td>
                  <td>{payment.status}</td>
                  <td>{new Date(payment.created_at).toLocaleDateString()}</td>
                  <td className="actions">
                    <Link to={`/admin/view-payment/${payment.payment_id}`}>
                      <button className="view-btn">View</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={handlePrevious}>
          Previous
        </button>
        <button disabled={currentPage === totalPages} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ManagePayments;
