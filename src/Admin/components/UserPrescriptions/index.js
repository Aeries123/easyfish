import React, { useState, useEffect } from "react";
import axios from "axios";

const UserPrescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [error, setError] = useState("");

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const fetchPrescriptions = async () => {
        try {

            const response = await axios.get(`${BASE_URL}/get-prescriptions`, {
            
            });

            if (response.data.data.length > 0) {
                setPrescriptions(response.data.data);
            } else { 
                setError("No prescriptions found!");
            }
        } catch (error) {
            console.error("Error fetching prescriptions:", error);
            setError("Failed to load prescriptions. Please try again.");
        }
    };

    return (
        <div className="container">
            <h2>My Prescriptions</h2>
            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User Name</th>
                            <th>Prescription</th>
                            <th>Collection Method</th>
                            <th>Uploaded At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prescriptions.map((prescription) => (
                            <tr key={prescription.id}>
                                <td>{prescription.id}</td>
                                <td>{prescription.user_name}</td>
                                <td>
                                    <a href={prescription.file_url} target="_blank" rel="noopener noreferrer">
                                        View Prescription
                                    </a>
                                </td>
                                <td>{prescription.collection_method}</td>
                                <td>{new Date(prescription.uploaded_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserPrescriptions;
