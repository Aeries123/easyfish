import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
 
const AdminManageTechnician = () => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
 
  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/technicians");
 
        if (!response.ok) {
          throw new Error("Failed to fetch technicians");
        }
 
        const data = await response.json();
        console.log(data, "uytfvbnkjh");
        setTechnicians(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
 
    fetchTechnicians();
  }, []);
 
  // Search Filter Function (Search by Technician Name)
  // Search Filter Function (Search by Technician Name)
  const filteredTechnicians = technicians.filter(
    (technician) =>
      typeof technician.name === "string" &&
      technician.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(filteredTechnicians, "uytfvbnkjh");
 
  return (
    <div className="container mt-4">
      <h2>Technicians</h2>
      <Link to="/admin/technician-form">
        <button className="btn btn-success mb-3">Add Technician</button>
      </Link>
 
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
        <div>Loading technicians...</div>
      ) : filteredTechnicians.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Technician ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Expertise</th>
              <th>Status</th>
              <th>Role</th> {/* Display Role */}
            </tr>
          </thead>
          <tbody>
            {filteredTechnicians.map((technician) => (
              <tr key={technician.technician_id}>
                <td>{technician.technician_id}</td>
                <td>{technician.name || "N/A"}</td>
                <td>
                  {technician.phone || "N/A"}
                  {technician.phone && (
                    <>
                      <a
                        href={`https://wa.me/${technician.phone}`}
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
                        href={`tel:${technician.phone}`}
                        className="phone-icon"
                      >
                        <FaPhone
                          size={20}
                          color="blue"
                          style={{ marginLeft: 8 }}
                        />
                      </a>
                    </>
                  )}
                </td>
                <td>{technician.email || "N/A"}</td>
                <td>{technician.expertise || "N/A"}</td>
                <td>{technician.available ? "Available" : "Not Available"}</td>
                <td>{technician.role || "N/A"}</td> {/* Display Role */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No technicians found.</div>
      )}
    </div>
  );
};
 
export default AdminManageTechnician;