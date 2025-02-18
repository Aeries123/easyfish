import { useState } from "react";
import Cookies from 'js-cookie'
import axios from "axios";
import "./index.css"; // Import the external CSS file

const ApplyLeave = () => {
    const [leaveDate, setLeaveDate] = useState("");
    const [reason, setReason] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        const token = Cookies.get("techToken"); // Retrieve token from cookies

        if (!token) {
            setError("Unauthorized: Please login again.");
            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/api/technician/apply-leave",
                {
                    leave_date: leaveDate,
                    reason: reason,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setMessage(response.data.message);
            setLeaveDate("");
            setReason("");
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong.");
        }
    };

    return (
        <div className="apply-leave-container">
            <h2 className="apply-leave-heading">Apply for Leave</h2>
            
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="apply-leave-label">Leave Date:</label>
                    <input
                        type="date"
                        className="apply-leave-input"
                        value={leaveDate}
                        onChange={(e) => setLeaveDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="apply-leave-label">Reason:</label>
                    <textarea
                        className="apply-leave-textarea"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows="3"
                    ></textarea>
                </div>

                <button type="submit" className="apply-leave-button">
                    Apply Leave
                </button>
            </form>
        </div>
    );
};

export default ApplyLeave;
