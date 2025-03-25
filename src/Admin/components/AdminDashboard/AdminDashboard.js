import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import Header from "../AdminHeader/Header";
import ManageBooking from "../ManageBooking";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

const AdminDashboard = () => {
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [uploadedAppointments, setUploadedAppointments] = useState(0);
  const [pendingAppointments, setPendingAppointments] = useState(0);
  const [bookings, setBookings] = useState([]); // Store bookings data
  const [enquiries, setEnquiries] = useState([]); // Store enquiries data
  const [fromDate, setFromDate] = useState(""); // Start date
  const [toDate, setToDate] = useState(""); // End date
 
  const [payments, setPayments] = useState([]);


  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFromDate(today);
    setToDate(today);
  }, []);

  useEffect(() => {
    if (fromDate && toDate) {
      fetchAppointmentCounts();
      fetchOrders(fromDate, toDate);
      fetchPayments(fromDate, toDate);
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    if (fromDate && toDate) {
      fetchAppointmentCounts();
    }
  }, [fromDate, toDate]); // Ensure it runs when fromDate and toDate are updated

  // Fetch appointment counts
  const fetchAppointmentCounts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/book-an-orders`);
      const data = await response.json();

      if (response.ok) {
        setTotalAppointments(data.total_appointments);
        setUploadedAppointments(data.uploaded_appointments);
        setPendingAppointments(data.pending_appointments);
      } else {
        console.error("Failed to fetch appointment counts:", data.error);
      }
    } catch (error) {
      console.error("Error fetching appointment counts:", error);
    }
  };

  // Helper function to format date as dd/mm/yyyy
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const fetchOrders = async (start = "", end = "") => {
    try {
      console.log("Fetching bookings from:", start, "to:", end); // Debugging log
      const url = `http://127.0.0.1:5000/api/book-a-orders?fromDate=${start}&toDate=${end}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setBookings(data);
      } else {
        console.error("Failed to fetch bookings and enquiries:", data.error);
      }
    } catch (error) {
      console.error("Error fetching bookings and enquiries:", error);
    }
  };




  const fetchPayments = async (start, end) => {
    try {
      const url = `${BASE_URL}/api/payments/date?from_date=${start}&to_date=${end}`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setPayments(data);
      } else {
        console.error("Failed to fetch payments:", data.error);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };




  // Handle filter button click
  const handleFilter = () => {
    fetchOrders(fromDate, toDate);
  };

  return (
    <div className="admin-dashboard-container">
      {/* Header */}
      <Header />

      {/* Date Filter */}
      <div className="admin-dashboard-date-filter-section">
        <h3 className="admin-dashboard-date-filter-title">
          <strong>Date Filter:</strong>
        </h3>
        <div className="admin-dashboard-date-filter">
          <input
            type="date"
            className="admin-dashboard-date-input"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="admin-dashboard-date-input"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <button
            className="admin-dashboard-filter-button"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
      </div>

      {/* Appointment Stats */}
      <div className="admin-dashboard-stats-grid">
        <div className="admin-dashboard-stat-card">
          <p className="admin-dashboard-stat-number">{uploadedAppointments}</p>
          <p className="admin-dashboard-stat-label">Number Of Orders Done</p>
        </div>
        <div className="admin-dashboard-stat-card">
          <p className="admin-dashboard-stat-number">{pendingAppointments}</p>
          <p className="admin-dashboard-stat-label">Number Of Orders Pending</p>
        </div>
        <div className="admin-dashboard-stat-card">
          <p className="admin-dashboard-stat-number">{totalAppointments}</p>
          <p className="admin-dashboard-stat-label">Total Orders</p>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="admin-dashboard-bookings-section">
        <h2 className="admin-dashboard-section-title">ORDERS</h2>
        <div className="admin-dashboard-section-content">
          {bookings.length > 0 ? (
            <table className="admin-dashboard-table">
              <thead>
                <tr>
                  <th className="admin-dashboard-table-header">
                    Customer Name
                  </th>
                  <th className="admin-dashboard-table-header">
                    Customer Phone
                  </th>
                  <th className="admin-dashboard-table-header">Order Date</th>
                  {/* <th className="admin-dashboard-table-header">Test Names</th> */}

                  <th className="admin-dashboard-table-header">Status</th>
                  <th className="admin-dashboard-table-header">Total Price</th>
                 
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.customer_name}</td>
                    <td>
                      {booking.customer_contact}
                      <a
                        href={`https://wa.me/${booking.customer_contact}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaWhatsapp size={20} color="green" />
                      </a>
                      <a href={`tel:${booking.customer_contact}`}>
                        <FaPhone size={20} color="blue" />
                      </a>
                    </td>
                    {/* <td>{booking.test_names.join(", ")}</td> */}

                    <td>{formatDate(booking.order_date)}</td>
                    <td>{booking.status}</td>
                    <td>{booking.total_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="admin-dashboard-no-data">No Orders available</p>
          )}
        </div>
      </div>

      {/* Enquiries Section */}
      <div className="admin-dashboard-enquiries-section">
        <h2 className="admin-dashboard-section-title">Payments</h2>
        <div className="admin-dashboard-section-content">
        {payments.length > 0 ? (
            <table className="admin-dashboard-table">
              <thead>
              <tr> 
                <th className="admin-dashboard-table-header"> Name</th>
                <th className="admin-dashboard-table-header">Transaction ID</th>
                <th className="admin-dashboard-table-header">Order ID</th>
                <th className="admin-dashboard-table-header">Payment ID</th>


                <th className="admin-dashboard-table-header">Payment Method</th>
                <th className="admin-dashboard-table-header">Total Amount</th>
                <th className="admin-dashboard-table-header">Status</th>
                <th className="admin-dashboard-table-header">Created At</th>
              </tr>

              </thead>
              <tbody>
      {payments.length > 0 ? (
        payments.map((payment) => (
          <tr key={payment.payment_id}>
            <td>{payment.payment_id}</td>
            <td>{payment.order_id}</td>
            <td>{payment.customer_name}</td>
            <td>{payment.amount}</td>
            <td>{payment.payment_method}</td>
            <td>{payment.transaction_id}</td>
            <td>{payment.status}</td>
            <td>{formatDate(payment.created_at)}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="8">No payments found for the selected date range.</td>
        </tr>
      )}
    </tbody>
            </table>
          ) : (
            <p className="admin-dashboard-no-data">No enquiries available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
