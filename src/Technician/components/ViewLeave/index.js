import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./index.css"; // Add CSS for styling

import axios from "axios";

const ViewLeave = () => {
    const [leaves, setLeaves] = useState([]);
    const [error, setError] = useState("");
    const BASE_URL = process.env.REACT_APP_BASE_URL;


    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        setError("");
        const token = Cookies.get("techToken"); // Retrieve token from local storage

        if (!token) {
            setError("Unauthorized: Please login again.");
            return;
        }

        try {
            const response = await axios.get(`${BASE_URL}/api/technician/leaves`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setLeaves(response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to fetch leaves.");
        }
    };

    return (
        <div className="view-leave-container max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="view-leave-title text-2xl font-bold mb-4">View Applied Leaves</h2>

            {error && (
                <div className="view-leave-error p-3 mb-3 text-red-600 bg-red-100 border border-red-500 rounded">
                    {error}
                </div>
            )}

            {leaves.length > 0 ? (
                <table className="view-leave-table w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="view-leave-header bg-gray-200">
                            <th className="view-leave-th border p-2">Leave Date</th>
                            <th className="view-leave-th border p-2">Reason</th>
                            <th className="view-leave-th border p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map((leave) => (
                            <tr key={leave.leave_id} className="view-leave-row text-center">
                                <td className="view-leave-td border p-2">{leave.leave_date}</td>
                                <td className="view-leave-td border p-2">{leave.reason}</td>
                                <td className="view-leave-td border p-2">{leave.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="view-leave-no-records text-gray-600">No leave records found.</p>
            )}
        </div>
    );
};

export default ViewLeave;
