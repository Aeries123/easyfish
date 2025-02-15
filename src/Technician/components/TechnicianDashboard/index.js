import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const TechnicianDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState({});

  useEffect(() => {
    const token = Cookies.get("techToken");
    if (!token) {
      setError("No token found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/get-technician-appointmentss",
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
        console.log(data, "Fetched Appointments");
        setAppointments(data);
      } catch (err) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleSampleCollectionChange = (appointmentId, newStatus) => {
    setUpdatedStatus((prevState) => ({
      ...prevState,
      [appointmentId]: newStatus,
    }));
  };

  const handleUpdateSampleCollection = async (appointmentId) => {
    const newStatus = updatedStatus[appointmentId];
    if (!newStatus) {
      alert("Please select a status before updating.");
      return;
    }
    const token = Cookies.get("techToken");
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/update-sample-collection",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appointment_id: appointmentId,
            sample_collection: newStatus,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        alert("Sample collection status updated successfully.");
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.appointment_id === appointmentId
              ? {
                  ...appointment,
                  appointment_details: {
                    ...appointment.appointment_details,
                    sample_collection: newStatus,
                  },
                }
              : appointment
          )
        );
      } else {
        alert(data.message || "Error updating sample collection status.");
      }
    } catch (error) {
      alert("Error updating sample collection status.");
    }
  };

  const handleViewTechnician = (appointmentId) => {
    navigate(`/technician-details/${appointmentId}`);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Technician Dashboard</h2>
      {loading && <p className="loading-text">Loading appointments...</p>}
      {error && <p className="error-text">Error: {error}</p>}
      <div className="appointments-container">
        <h3 className="appointments-heading">Appointments</h3>
        {appointments.length === 0 ? (
          <p className="no-appointments-text">No appointments found.</p>
        ) : (
          <table className="appointments-table">
            <thead>
              <tr className="table-header">
                <th>Appointment ID</th>
                <th>Patient Name</th>
                <th>Patient Contact</th>
                <th>Status</th>
                <th>Sample Collection</th>
                <th>Payment Status</th>
                <th>Total Price</th>
                <th>Address</th>
                <th>Actions</th>
                <th>Patient Count</th>
                <th>Technician</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.appointment_id} className="table-row">
                  <td>{appointment.appointment_id}</td>
                  <td>{appointment.patient_name}</td>
                  <td>{appointment.patient_contact}</td>
                  <td>{appointment.appointment_details.status}</td>
                  <td>
                    <select
                      value={
                        updatedStatus[appointment.appointment_id] ||
                        appointment.appointment_details.sample_collection
                      }
                      onChange={(e) =>
                        handleSampleCollectionChange(
                          appointment.appointment_id,
                          e.target.value
                        )
                      }
                    >
                      <option value="not_collected">Not Collected</option>
                      <option value="Collected">Collected</option>
                    </select>
                  </td>
                  <td>{appointment.appointment_details.payment_status}</td>
                  <td>₹{appointment.appointment_details.total_price}</td>
                  <td>
                    <p>
                      {appointment.address.door_no} {appointment.address.street}
                    </p>
                    <p>
                      {appointment.address.village},{" "}
                      {appointment.address.mandal}
                    </p>
                    <p>
                      {appointment.address.district},{" "}
                      {appointment.address.state}
                    </p>
                    <p>
                      {appointment.address.country},{" "}
                      {appointment.address.pincode}
                    </p>
                  </td>
                  <td>
                    <button
                      className="update-btn"
                      onClick={() =>
                        handleUpdateSampleCollection(appointment.appointment_id)
                      }
                    >
                      Update
                    </button>
                  </td>
                  <td>{appointment.appointment_details.patient_count}</td>
                  <td>
                    <button
                      className="view-technician"
                      onClick={() =>
                        handleViewTechnician(appointment.appointment_id)
                      }
                    >
                      View Technician
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TechnicianDashboard;
