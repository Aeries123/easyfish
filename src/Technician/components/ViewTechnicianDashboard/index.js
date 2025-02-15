import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const ViewTechnicianDashboard = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams(); // Get appointmentId from URL
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(appointment, "appointment view data");

  useEffect(() => {
    const token = Cookies.get("techToken");
    if (!token) {
      setError("No token found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchAppointmentDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/get-technician-appointments/${appointmentId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        const data = await response.json();
        // Assuming the data is an array and we're getting the first item
        setAppointment(data[0]); // Assuming the data is an array, get the first item
      } catch (err) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [appointmentId]);

  if (loading) {
    return <p>Loading appointment details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!appointment) {
    return <p>No appointment details found.</p>;
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Appointment Details</h2>
      <div className="appointment-details-container">
        <h3>Appointment ID: {appointment.appointment_id}</h3>
        <h4>Patient Information</h4>
        <p>Name: {appointment.patient.name}</p>
        <p>Age: {appointment.patient.age}</p>
        <p>Gender: {appointment.patient.gender}</p>
        <p>Phone: {appointment.patient.phone}</p>
        <p>Tests: {appointment.patient.test_names.join(", ")}</p>
        <h4>Technician Information</h4>
        <p>Name: {appointment.user.name}</p>
        <p>Email: {appointment.user.email}</p>
        <p>Phone: {appointment.user.phone}</p>
        <h4>Appointment Details</h4>
        <p>Status: {appointment.appointment_details.status}</p>
        <p>Appointment Date: {appointment.appointment_details.appointment_date}</p>
        <p>Slot Date: {appointment.appointment_details.slot_date}</p>
        <p>Total Price: ₹{appointment.appointment_details.total_price}</p>
        <p>Sample Collection: {appointment.appointment_details.sample_collection}</p>
        <p>Payment Status: {appointment.appointment_details.payment_status}</p>
        <h4>Address</h4>
        <p>
          {appointment.address.door_no} {appointment.address.street}, {appointment.address.village}
          <br />
          {appointment.address.mandal}, {appointment.address.district}, {appointment.address.state}
          <br />
          {appointment.address.country}, {appointment.address.pincode}
        </p>
        <button className="back-btn" onClick={() => navigate("/technician-dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ViewTechnicianDashboard;