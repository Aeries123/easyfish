import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManagePayment = () => {
  // State for managing payments, pagination, and search
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(5);
  const [totalPayments, setTotalPayments] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample payment data (simulating an API)
  const samplePayments = [
    { appointment_id: 1, payment_method: 'credit_card', payment_status: 'completed', amount: 100 },
    { appointment_id: 2, payment_method: 'debit_card', payment_status: 'pending', amount: 150 },
    { appointment_id: 3, payment_method: 'cash', payment_status: 'completed', amount: 200 },
    { appointment_id: 4, payment_method: 'online', payment_status: 'failed', amount: 50 },
    { appointment_id: 5, payment_method: 'credit_card', payment_status: 'completed', amount: 120 },
    { appointment_id: 6, payment_method: 'debit_card', payment_status: 'pending', amount: 180 },
    { appointment_id: 7, payment_method: 'cash', payment_status: 'failed', amount: 75 },
    { appointment_id: 8, payment_method: 'online', payment_status: 'completed', amount: 250 },
    { appointment_id: 9, payment_method: 'credit_card', payment_status: 'completed', amount: 300 },
    { appointment_id: 10, payment_method: 'debit_card', payment_status: 'pending', amount: 90 },
  ];

  // Fetch payments with pagination and search
  const fetchPayments = () => {
    let filteredPayments = samplePayments;

    // Filter by search query (appointment_id)
    if (searchQuery) {
      filteredPayments = samplePayments.filter((payment) =>
        payment.appointment_id.toString().includes(searchQuery)
      );
    }

    // Paginate the filtered payments
    const startIndex = (currentPage - 1) * paymentsPerPage;
    const endIndex = currentPage * paymentsPerPage;
    const paginatedPayments = filteredPayments.slice(startIndex, endIndex);

    setPayments(paginatedPayments);
    setTotalPayments(filteredPayments.length);
  };

  // Handle page change (previous/next buttons)
  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(totalPayments / paymentsPerPage)) {
      setCurrentPage(page);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Fetch payments when component mounts or search/query/page changes
  useEffect(() => {
    fetchPayments();
  }, [currentPage, searchQuery]);

  // Calculate pagination details
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPayments / paymentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mt-5">
      <h2>Manage Payments</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Appointment ID"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Payment Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Payment Method</th>
            <th>Payment Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No payments found</td>
            </tr>
          ) : (
            payments.map((payment) => (
              <tr key={payment.appointment_id}>
                <td>{payment.appointment_id}</td>
                <td>{payment.payment_method}</td>
                <td>{payment.payment_status}</td>
                <td>{payment.amount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <div>
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`btn btn-outline-primary btn-sm mx-1 ${number === currentPage ? 'active' : ''}`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          ))}
        </div>
        <button
          className="btn btn-secondary"
          disabled={currentPage === Math.ceil(totalPayments / paymentsPerPage)}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManagePayment;
