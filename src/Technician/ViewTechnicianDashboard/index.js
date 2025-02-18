import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css"; // External CSS

const ViewTechnicianDashboard = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setAppointment(data[0]); // Assuming the data is an array, get the first item
      } catch (err) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [appointmentId]);

  if (loading) return <p>Loading appointment details...</p>;
  if (error) return <p>{error}</p>;
  if (!appointment) return <p>No appointment details found.</p>;

  return (
    <div className="ViewTechnicianDashboard-container">
      <h2 className="ViewTechnicianDashboard-heading">Appointment Details</h2>

      {/* Patient Information Table */}
      <div className="ViewTechnicianDashboard-card">
        <h4>Patient Information</h4>
        <table>
          <tbody>
            <tr><th>Name</th><td>{appointment.patient.name}</td></tr>
            <tr><th>Age</th><td>{appointment.patient.age}</td></tr>
            <tr><th>Gender</th><td>{appointment.patient.gender}</td></tr>
            <tr><th>Phone</th><td>{appointment.patient.phone}</td></tr>
            <tr><th>Tests</th><td>{appointment.patient.test_names.join(", ")}</td></tr>
          </tbody>
        </table>
      </div>

      {/* Technician Information Table */}
      {/* <div className="ViewTechnicianDashboard-card">
        <h4>Technician Information</h4>
        <table>
          <tbody>
            <tr><th>Name</th><td>{appointment.user.name}</td></tr>
            <tr><th>Email</th><td>{appointment.user.email}</td></tr>
            <tr><th>Phone</th><td>{appointment.user.phone}</td></tr>
          </tbody>
        </table>
      </div> */}

      {/* Appointment Details Table */}
      <div className="ViewTechnicianDashboard-card">
        <h4>Appointment Details</h4>
        <table>
          <tbody>
            <tr><th>Status</th><td>{appointment.appointment_details.status}</td></tr>
            <tr><th>Appointment Date</th><td>{appointment.appointment_details.appointment_date}</td></tr>
            <tr><th>Slot Date</th><td>{appointment.appointment_details.slot_date}</td></tr>
            <tr><th>Total Price</th><td>₹{appointment.appointment_details.total_price}</td></tr>
            <tr><th>Sample Collection</th><td>{appointment.appointment_details.sample_collection}</td></tr>
            <tr><th>Payment Status</th><td>{appointment.appointment_details.payment_status}</td></tr>
          </tbody>
        </table>
      </div>

      {/* Address Table */}
      <div className="ViewTechnicianDashboard-card">
        <h4>Address</h4>
        <table>
          <tbody>
            <tr><th>Door No</th><td>{appointment.address.door_no}</td></tr>
            <tr><th>Street</th><td>{appointment.address.street}</td></tr>
            <tr><th>Village</th><td>{appointment.address.village}</td></tr>
            <tr><th>Mandal</th><td>{appointment.address.mandal}</td></tr>
            <tr><th>District</th><td>{appointment.address.district}</td></tr>
            <tr><th>State</th><td>{appointment.address.state}</td></tr>
            <tr><th>Country</th><td>{appointment.address.country}</td></tr>
            <tr><th>Pincode</th><td>{appointment.address.pincode}</td></tr>
          </tbody>
        </table>
      </div>

      <button className="ViewTechnicianDashboard-back-btn" onClick={() => navigate("/technician-dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default ViewTechnicianDashboard;
