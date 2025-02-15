// src/components/ApplyLeave.js
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ApplyLeave = () => {
  const [leaveDate, setLeaveDate] = useState("");
  const [reason, setReason] = useState("");

  const applyLeave = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming user is logged in
      const response = await axios.post(
        "http://localhost:5000/api/technician/apply-leave",
        { leave_date: leaveDate, reason },
        { headers: { Authorization: token } }
      );

      toast.success("Leave applied successfully!");
      setLeaveDate("");
      setReason("");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error applying leave");
    }
  };

  return (
    <div className="leave-form">
      <h2>Apply for Leave</h2>
      <label>Leave Date:</label>
      <input type="date" value={leaveDate} onChange={(e) => setLeaveDate(e.target.value)} />

      <label>Reason:</label>
      <textarea value={reason} onChange={(e) => setReason(e.target.value)} />

      <button onClick={applyLeave}>Submit Leave</button>
    </div>
  );
};

export default ApplyLeave;
