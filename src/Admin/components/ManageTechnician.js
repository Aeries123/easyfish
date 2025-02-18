import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';  
import "bootstrap/dist/css/bootstrap.min.css";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
 
const ManageTechnician = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
 
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/get-assigned-appointments");
 
        if (!response.ok) {
          throw new Error("Failed to fetch assigned appointments");
        }
 
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
 
    fetchAppointments();
  }, []);
 
  // Search Filter Function (Search by Technician Name)
  const filteredAppointments = appointments.filter((appointment) =>
    appointment.technician_details?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  return (
    <div className="container mt-4">
      <h2>Assigned Technicians</h2>
      {/* <Link to="/admin/technician-form">
        <button className="btn btn-success mb-3">Add Technician</button>
      </Link> */}
 
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
 
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by technician name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
 
      {loading ? (
        <div>Loading assigned appointments...</div>
      ) : filteredAppointments.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Technician ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Expertise</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.appointment_id}>
                <td>{appointment.appointment_id}</td>
                <td>{appointment.technician_id}</td>
                <td>{appointment.technician_details?.name || "N/A"}</td>
                <td>
                  {appointment.technician_details?.phone || "N/A"}
                  {appointment.technician_details?.phone && (
                    <>
                      <a
                        href={`https://wa.me/${appointment.technician_details.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-icon"
                      >
                        <FaWhatsapp size={20} color="green" style={{ marginLeft: 8 }} />
                      </a>
                      <a href={`tel:${appointment.technician_details.phone}`} className="phone-icon">
                        <FaPhone size={20} color="blue" style={{ marginLeft: 8 }} />
                      </a>
                    </>
                  )}
                </td>
                <td>{appointment.technician_details?.email || "N/A"}</td>
                <td>{appointment.technician_details?.expertise || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No assigned appointments found.</div>
      )}
    </div>
  );
};
 
export default ManageTechnician;