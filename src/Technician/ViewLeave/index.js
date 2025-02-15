// src/components/ViewLeaves.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/technician/leaves",
        {
          headers: { Authorization: token },
        }
      );

      setLeaves(response.data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  return (
    <div className="leave-list">
      <h2>Your Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.leave_id}>
              <td>{leave.leave_date}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewLeaves;
