import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";

const ManageTechnician = () => {
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
        setTechnicians(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  // Search Filter Function
  console.log(technicians,"tect")
  const filteredTechnicians = technicians.filter((technician) =>
    technician.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Manage Technicians</h2>
      <Link to="/admin/technician-form">
        <button className="btn btn-success mb-3">Add Technician</button>
      </Link>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
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
              <th>User ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Assigned Area</th>
              <th>Assigned Task</th>
              <th>Sample Collection</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredTechnicians.map((technician) => (
              <tr key={technician.technician_id}>
                <td>{technician.technician_id}</td>
                <td>{technician.user_id}</td>
                <td>{technician.name}</td>
                <td>{technician.phone}</td>
                <td>{technician.assigned_area}</td>
                <td>{technician.assign}</td>
                <td>{technician.sample_collection}</td>
                <td>{technician.status}</td>
                <td>{technician.created_at}</td>
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

export default ManageTechnician;
