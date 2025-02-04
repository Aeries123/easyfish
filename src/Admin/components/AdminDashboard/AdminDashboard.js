import React from "react";
import "./AdminDashboard.css";
import Header from "../AdminHeader/Header";
import ManageBooking from "../ManageBooking";

const AdminDashboard = () => {
  return (
    <div className="admin-admin-dashboard">
      {/* Date Filter */}
      <h3>
        <strong>Date Filter:</strong>
      </h3>
      <div className="admin-admin-date-filter">
        <input type="date" className="admin-admin-date-input" />
        <input type="date" className="admin-admin-date-input" />
        <button className="admin-admin-filter-button">Filter</button>
      </div>

      {/* Test Stats */}
      <div className="admin-admin-stats-grid">
        <div className="admin-admin-stat-card">
          <p className="admin-admin-stat-number">6</p>
          <p className="admin-admin-stat-label">Total no. of Test</p>
        </div>
        <div className="admin-admin-stat-card">
          <p className="admin-admin-stat-number">4</p>
          <p className="admin-admin-stat-label">No. of Pending Test</p>
        </div>
        <div className="admin-admin-stat-card">
          <p className="admin-admin-stat-number">12</p>
          <p className="admin-admin-stat-label">Test Collections</p>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="admin-admin-section">
        <h2 className="admin-admin-section-title">Bookings (Data Table)</h2>
        <div className="admin-admin-section-content">
          <ManageBooking />
        </div>
      </div>

      {/* Enquiries Section */}
      <div className="admin-admin-section">
        <h2 className="admin-admin-section-title">Enquiries</h2>
        <div className="admin-admin-section-content"></div>
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
