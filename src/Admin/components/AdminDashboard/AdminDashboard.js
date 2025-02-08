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

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // Set today's date as default for both fromDate and toDate
    setFromDate(today);
    setToDate(today);

    fetchAppointmentCounts();
    // Pass today's date explicitly to fetch bookings & enquiries
    fetchBookingsAndEnquiries(today, today);
  }, [today]);

  // Helper function to format date as dd/mm/yyyy
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Fetch appointment counts
  const fetchAppointmentCounts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/appointments/counts"
      );
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

  // Fetch bookings and enquiries using the provided start and end dates
  const fetchBookingsAndEnquiries = async (start = "", end = "") => {
    try {
      const url = `http://localhost:5000/api/bookings?from=${start}&to=${end}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setBookings(data.bookings);
        setEnquiries(data.enquiries);
      } else {
        console.error("Failed to fetch bookings and enquiries:", data.error);
      }
    } catch (error) {
      console.error("Error fetching bookings and enquiries:", error);
    }
  };

  // Handle filter button click
  const handleFilter = () => {
    fetchBookingsAndEnquiries(fromDate, toDate);
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
          <p className="admin-dashboard-stat-label">Number Of Tests Done</p>
        </div>
        <div className="admin-dashboard-stat-card">
          <p className="admin-dashboard-stat-number">{pendingAppointments}</p>
          <p className="admin-dashboard-stat-label">Number Of Tests Pending</p>
        </div>
        <div className="admin-dashboard-stat-card">
          <p className="admin-dashboard-stat-number">{totalAppointments}</p>
          <p className="admin-dashboard-stat-label">Total Tests</p>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="admin-dashboard-bookings-section">
        <h2 className="admin-dashboard-section-title">Bookings</h2>
        <div className="admin-dashboard-section-content">
          {bookings.length > 0 ? (
            <table className="admin-dashboard-table">
              <thead>
                <tr>
                  <th className="admin-dashboard-table-header">User Name</th>
                  <th className="admin-dashboard-table-header">Contact</th>
                  {/* <th className="admin-dashboard-table-header">Test Names</th> */}

                  <th className="admin-dashboard-table-header">
                    Appointment Date
                  </th>
                  <th className="admin-dashboard-table-header">Slot Date</th>
                  <th className="admin-dashboard-table-header">
                    Patient Count
                  </th>
                  <th className="admin-dashboard-table-header">
                    Assigned Technician
                  </th>
                  <th className="admin-dashboard-table-header">
                    Sample Collection
                  </th>
                  <th className="admin-dashboard-table-header">
                    Payment Status
                  </th>
                  <th className="admin-dashboard-table-header">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.patient_name}</td>
                    <td>
                      {booking.patient_contact}
                      <a
                        href={`https://wa.me/${booking.patient_contact}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaWhatsapp size={20} color="green" />
                      </a>
                      <a href={`tel:${booking.patient_contact}`}>
                        <FaPhone size={20} color="blue" />
                      </a>
                    </td>
                    {/* <td>{booking.test_names.join(", ")}</td> */}

                    <td>{formatDate(booking.appointment_date)}</td>
                    <td>{booking.slot_date}</td>
                    <td>{booking.patient_count || 1}</td>
                    <td>{booking.assign}</td>
                    <td>{booking.sample_collection}</td>
                    <td>{booking.payment_status}</td>
                    <td>{booking.total_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="admin-dashboard-no-data">No bookings available</p>
          )}
        </div>
      </div>

      {/* Enquiries Section */}
      <div className="admin-dashboard-enquiries-section">
        <h2 className="admin-dashboard-section-title">Enquiries</h2>
        <div className="admin-dashboard-section-content">
          {enquiries.length > 0 ? (
            <table className="admin-dashboard-table">
              <thead>
                <tr>
                  <th className="admin-dashboard-table-header">Patient Name</th>
                  <th className="admin-dashboard-table-header">Phone</th>
                  {/* <th className="admin-dashboard-table-header">Created At</th> */}
                  <th className="admin-dashboard-table-header">Test Name</th>
                  <th className="admin-dashboard-table-header">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enquiry, index) => (
                  <tr key={index} className="admin-dashboard-table-row">
                    <td>{enquiry.user_name}</td>
                    <td>
                      {enquiry.user_phone}
                      <a
                        href={`https://wa.me/${enquiry.user_phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-icon"
                      >
                        <FaWhatsapp
                          size={20}
                          color="green"
                          style={{ marginLeft: 8 }}
                        />
                      </a>
                      <a
                        href={`tel:${enquiry.user_phone}`}
                        className="phone-icon"
                      >
                        <FaPhone
                          size={20}
                          color="blue"
                          style={{ marginLeft: 8 }}
                        />
                      </a>
                    </td>
                    {/* <td>{formatDate(enquiry.created_at)}</td> */}
                    <td>{enquiry.test_name}</td>
                    <td>{enquiry.total_price}</td>
                  </tr>
                ))}
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

// import React, { useState, useEffect } from "react";
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { format, parse, startOfWeek, getDay } from "date-fns";
// import Cookies from "js-cookie";
// import './AdminDashboard.css'

// const locales = {
//   en: require("date-fns/locale/en-US"),
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// const AdminDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const fetchBookings = async () => {
//   //     try {
//   //       const jwtToken = Cookies.get("token");
//   //       const response = await fetch("http://192.168.81.66:3000/venue/bookings", {
//   //         method: "GET",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           Authorization: `Bearer ${jwtToken}`,
//   //         },
//   //       });

//   //       if (!response.ok) throw new Error("Failed to fetch bookings");

//   //       const data = await response.json();
//   //       setBookings(data);
//   //       setEvents(
//   //         data.map((booking) => ({
//   //           title: booking.hall_name,
//   //           start: new Date(booking.event_date),
//   //           end: new Date(booking.event_date), // Adjust for multi-day events
//   //         }))
//   //       );
//   //       setLoading(false);
//   //     } catch (err) {
//   //       setError(err.message);
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchBookings();
//   // }, []);

//   // if (loading) {
//   //   return <p>Loading bookings...</p>;
//   // }

//   // if (error) {
//   //   return <p style={{ color: "red" }}>{error}</p>;
//   // }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Dashboard Calendar</h1>
//       <p>Manage your bookings and view upcoming events.</p>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500, margin: "20px 0" }}
//         popup
//       />
//     </div>
//   );
// };

// export default AdminDashboard;

// // import React, { useState, useEffect } from "react";
// // import Calendar from "react-calendar";
// // import "react-calendar/dist/Calendar.css";
// // import "./AdminDashboard.css"; // Custom CSS for additional styling

// // const AdminDashboard = () => {
// //   const [selectedDate, setSelectedDate] = useState(new Date());
// //   const [bookings, setBookings] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   // Fetch bookings when the selected date changes
// //   useEffect(() => {
// //     const fetchBookings = async () => {
// //       setLoading(true);
// //       setError(""); // Clear previous error
// //       try {
// //         const formattedDate = selectedDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
// //         const response = await fetch(
// //           `http://localhost:5000/api/bookings?date=${formattedDate}`
// //         );
// //         const data = await response.json();
// //         if (!response.ok) {
// //           throw new Error(data.error || "Failed to fetch bookings.");
// //         }
// //         setBookings(data); // Assuming `data` is an array of bookings
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchBookings();
// //   }, [selectedDate]);

// //   return (
// //     <div className="admin-dashboard">
// //       <h1>Dashboard</h1>
// //       <div className="calendar-container">
// //         <Calendar
// //           value={selectedDate}
// //           onChange={(date) => setSelectedDate(date)} // Update selected date
// //         />
// //       </div>
// //       <div className="booking-info">
// //         <h2>Bookings for {selectedDate.toDateString()}</h2>
// //         {loading && <p>Loading bookings...</p>}
// //         {error && <p className="error">{error}</p>}
// //         {!loading && !error && bookings.length === 0 && <p>No bookings found.</p>}
// //         {!loading && !error && bookings.length > 0 && (
// //           <ul>
// //             {bookings.map((booking, index) => (
// //               <li key={index}>
// //                 {booking.name} - {booking.time}
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;
