import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ManagePayment = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/get-payments");
        const data = await response.json();

        console.log("Fetched payments data:", data);

        if (response.ok) {
          setPayments(data.payments || []);
        } else {
          console.error("Failed to fetch payments:", data.error || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((payment) =>
    Object.values(payment).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastPayment = currentPage * rowsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - rowsPerPage;
  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  const totalPages = Math.ceil(filteredPayments.length / rowsPerPage);

  const handlePrevious = () =>
    currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((prev) => prev + 1);

  return (
    <div className="container mt-4">
      <h2>Manage Payments</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search payments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient Name</th>
            <th>Payment ID</th>
            <th>Payment Date</th>
            <th>Payment Method</th>
            <th>Payment Status</th>
            <th>Amount</th>
            <th>Transaction ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentPayments.length > 0 ? (
            currentPayments.map((payment) => (
              <tr key={payment.payment_details.payment_id}>
                <td>{payment.appointment_id}</td>
                <td>{payment.patient_name}</td>
                <td>{payment.payment_details.payment_id}</td>
                <td>{new Date(payment.payment_details.payment_date).toLocaleDateString()}</td>
                <td>{payment.payment_details.payment_method}</td>
                <td>{payment.payment_details.payment_status}</td>
                <td>{payment.payment_details.amount}</td>
                <td>{payment.payment_details.transaction_id}</td>
                <td>
                  <Link to={`/admin/view-booking/${payment.appointment_id}`}>
                                      <button className="btn btn-primary btn-sm me-2">View</button>
                                    </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No payments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary"
          disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManagePayment;
