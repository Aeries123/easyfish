import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminViewBookingForm = () => {
  const { id } = useParams(); // Extract the appointmentId from the route params
  const navigate = useNavigate();

  const [bookingDetails, setBookingDetails] = useState(null); // State to store booking details
  const [errorMessage, setErrorMessage] = useState(null); // State for error messages

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        // Make the fetch request without the Authorization header
        const response = await fetch(`http://127.0.0.1:5000/api/get_userbookings/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setBookingDetails(data.booking); // Assuming the API returns booking as an object
        } else {
          console.error("Error fetching booking details:", data.message);
          setErrorMessage(data.message || "Error fetching booking details.");
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
        setErrorMessage("Error fetching booking details.");
      }
    };

    fetchBookingDetails();
  }, [id]); // Dependency on appointmentId to re-fetch if it changes

  return (
    <div className="container mt-4">
      <h2>Booking Details</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {bookingDetails ? (
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Appointment ID</th>
              <td>{bookingDetails.appointment_id}</td>
            </tr>
            <tr>
              <th>Patient Name</th>
              <td>{bookingDetails.patient_name}</td>
            </tr>
            <tr>
              <th>Patient Contact</th>
              <td>{bookingDetails.patient_contact}</td>
            </tr>
            <tr>
              <th>Notes</th>
              <td>{bookingDetails.notes}</td>
            </tr>
            <tr>
              <th>Test Names</th>
              <td>{bookingDetails.test_names.join(", ")}</td> {/* Join test names with a comma */}
            </tr>
            <tr>
              <th>Appointment Date</th>
              <td>{bookingDetails.appointment_date}</td>
            </tr>
            <tr>
              <th>Slot Date</th>
              <td>{bookingDetails.slot_date}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{bookingDetails.status}</td>
            </tr>
            <tr>
              <th>Total Price</th>
              <td>{bookingDetails.total_price}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>Loading...</div>
      )}
      <button onClick={() => navigate(-1)} className="btn btn-secondary">
        Go Back
      </button>
    </div>
  );
};

export default AdminViewBookingForm;
