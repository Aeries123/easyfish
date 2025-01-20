import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);  // Store fetched bookings
  const [searchTerm, setSearchTerm] = useState("");  // For search functionality
  const [currentPage, setCurrentPage] = useState(1);  // Pagination
  const rowsPerPage = 9;  // Rows per page for pagination

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/getbookings', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Pass JWT token for authentication
          },
        });
        const data = await response.json();
        console.log(data)

        if (response.ok && data.bookings) {
          setBookings(data.bookings);  // Set the fetched bookings
        } else {
          console.error('Error fetching bookings:', data.message);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();  // Fetch bookings on component mount
  }, []);

  // Search handler to filter bookings
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);  // Reset to the first page when a new search is performed
  };

  // Filter bookings based on the search term
  const filteredBookings = bookings.filter((booking) =>
    Object.values(booking).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastBooking = currentPage * rowsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - rowsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(filteredBookings.length / rowsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  // Handle booking deletion
  const handleDeleteBooking = async (appointment_id) => {
    try {
      const response = await fetch(`/api/booktest/${appointment_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Pass JWT token for authentication
        },
      });

      if (response.ok) {
        // If the deletion is successful, remove the booking from the state
        setBookings(bookings.filter(booking => booking.appointment_id !== appointment_id));
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete booking.");
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Error deleting booking.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Bookings</h2>

      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Bookings Table */}
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Appointment ID</th>
            <th>Technician ID</th>
            <th>Patient Name</th>
            <th>Patient Contact</th>
            <th>Notes</th>
            <th>Test IDs</th>
            <th>Appointment Date</th>
            <th>Slot Date</th>
            <th>Status</th>
            <th>Total Price</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBookings.length > 0 ? (
            currentBookings.map((booking) => (
              <tr key={booking.appointment_id}>
                <td>{booking.appointment_id}</td>
                <td>{booking.technician_id}</td>
                <td>{booking.patient_name}</td>
                <td>{booking.patient_contact}</td>
                <td>{booking.notes}</td>
                <td>{booking.test_ids}</td>
                <td>{new Date(booking.appointment_date).toLocaleString()}</td>
                <td>{new Date(booking.slot_date).toLocaleString()}</td>
                <td>{booking.status}</td>
                <td>${booking.total_price}</td>
                <td>{booking.user_id}</td>
                <td>
                  {/* View Button */}
                  <Link to={`/admin/bookings-view/${booking.appointment_id}`}>
                    <button className="btn btn-sm btn-info me-2">View</button>
                  </Link>
                  
                  {/* Edit Button */}
                  <Link to={`/admin/bookings-form/${booking.appointment_id}`}>
                    <button className="btn btn-sm btn-primary me-2">Edit</button>
                  </Link>
                  
                  {/* Delete Button */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteBooking(booking.appointment_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="text-center">No bookings available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <nav className="mt-3">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handlePrevious} disabled={currentPage === 1}>
              Previous
            </button>
          </li>
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ManageBooking;
