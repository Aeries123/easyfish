import React, { useState } from "react";
import Cookies from "js-cookie";

const TechnicianLeave = () => {
  const [leaveDate, setLeaveDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("techToken");

    if (!token) {
      setMessage("You must be logged in to apply for leave.");
      return;
    }

    const response = await fetch("http://127.0.0.1:5000/api/technician-leave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ leave_date: leaveDate, reason }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Leave request submitted successfully!");
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  return (
    <div>
      <h2>Apply for Leave</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Select Date:
          <input
            type="date"
            value={leaveDate}
            onChange={(e) => setLeaveDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Reason:
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Apply for Leave</button>
      </form>
    </div>
  );
};

export default TechnicianLeave;
