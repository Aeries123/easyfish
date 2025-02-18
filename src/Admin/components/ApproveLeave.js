import { useEffect, useState } from "react";
import axios from "axios";
 
const ApproveLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
 
  useEffect(() => {
    fetchLeaves();
  }, []);
 
  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/technician/leaves"
      );
      const formattedLeaves = response.data.map((leave) => ({
        ...leave,
        status: leave.status || "Pending", // Default to "Pending"
      }));
      setLeaves(formattedLeaves);
    } catch (err) {
      console.error("Failed to fetch leaves:", err);
    }
  };
 
  const handleStatusChange = (leaveId, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [leaveId]: status,
    }));
  };
 
  const updateLeaveStatus = async (leaveId, technicianId) => {
    const newStatus = selectedStatus[leaveId] || "Pending";
 
    if (
      !window.confirm(
        `Are you sure you want to update the status to '${newStatus}'?`
      )
    ) {
      return;
    }
 
    try {
      await axios.put(
        `http://127.0.0.1:5000/api/admin/approve-leave/${leaveId}`,
        {
          technician_id: technicianId,
          status: newStatus,
        }
      );
 
      fetchLeaves();
    } catch (err) {
      console.error("Failed to update leave status:", err);
    }
  };
 
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Technician Leave Requests</h2>
 
      {leaves.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Technician ID</th>
              <th className="border p-2">Leave Date</th>
              <th className="border p-2">Reason</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => {
              const status = selectedStatus[leave.leave_id] || leave.status;
              let buttonColor = "bg-red-500 hover:bg-red-600"; // Default to red for Pending
 
              if (status === "Approved") {
                buttonColor = "bg-green-500 hover:bg-green-600"; // Green if Approved
              } else if (status === "Rejected") {
                buttonColor = "bg-yellow-500 hover:bg-yellow-600"; // Yellow if Rejected
              }
 
              return (
                <tr key={leave.leave_id} className="text-center">
                  <td className="border p-2">{leave.technician_id}</td>
                  <td className="border p-2">{leave.leave_date}</td>
                  <td className="border p-2">{leave.reason}</td>
                  <td className="border p-2">
                    <select
                      className="p-2 border rounded"
                      value={selectedStatus[leave.leave_id] || leave.status}
                      onChange={(e) =>
                        handleStatusChange(leave.leave_id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
 
                    <button
                      className={`update-btn px-4 py-2 text-white rounded transition-all duration-300 ${buttonColor}`}
                      onClick={() =>
                        updateLeaveStatus(leave.leave_id, leave.technician_id)
                      }
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No leave records found.</p>
      )}
    </div>
  );
};
 
export default ApproveLeave;