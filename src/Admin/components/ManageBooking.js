import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaWhatsapp, FaPhone } from "react-icons/fa"; // Import icons

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/get-appointments`);
        const data = await response.json();

        console.log("Fetched appointments data:", data);

        if (response.ok) {
          setBookings(data || []);
        } else {
          console.error("Failed to fetch appointments:", data.error || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const filteredBookings = bookings.filter((booking) =>
    Object.values(booking).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastBooking = currentPage * rowsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - rowsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const totalPages = Math.ceil(filteredBookings.length / rowsPerPage);

  const handlePrevious = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/book-test/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setBookings(bookings.filter((b) => b.appointment_id !== id));
      } else {
        console.error("Failed to delete booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Bookings</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search bookings..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient Name</th>
            <th>Contact</th>
            <th>Test Names</th>
            <th>Appointment Date</th>
            <th>Slot Date</th>
            <th>Status</th>
            <th>Total Price</th>
            <th>Patient Count</th>
            <th>Assigned Technician</th>
            <th>Sample Collection</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBookings.length > 0 ? (
            currentBookings.map((booking) => (
              <tr key={booking.appointment_id}>
                <td>{booking.appointment_id}</td>
                <td>{booking.patient_name}</td>
                <td>
                  {booking.patient_contact} {" "}
                  <a
                    href={`https://wa.me/${booking.patient_contact}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-success me-2"
                  >
                    <FaWhatsapp size={20} />
                  </a>
                  <a href={`tel:${booking.patient_contact}`} className="text-primary">
                    <FaPhone size={20} />
                  </a>
                </td>
                <td>{booking.test_names.join(", ")}</td>
                <td>{new Date(booking.appointment_date).toLocaleDateString()}</td>
                <td>{new Date(booking.slot_date).toLocaleDateString()}</td>
                <td>{booking.status}</td>
                <td>{booking.total_price}</td>
                <td>{booking.patient_count || 1}</td>
                <td>{booking.assign}</td>
                <td>{booking.sample_collection}</td>
                <td>{booking.payment_status}</td>
                <td>
                  <Link to={`/admin/view-booking/${booking.appointment_id}`}>
                    <button className="btn btn-primary btn-sm me-2">View</button>
                  </Link>
                  {/* <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(booking.appointment_id)}
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="text-center">
                No bookings found.
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

export default ManageBooking;