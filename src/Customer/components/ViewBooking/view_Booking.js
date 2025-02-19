import { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import Cookies from "js-cookie";
import "./View_Booking.css"; // Import the CSS file

const jwtToken = Cookies.get("jwtToken");

export const ViewBookings = () => {
    const [patientData, setPatientData] = useState([]);
    const {appointment_id}=useParams()
    console.log(appointment_id,"view id")

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const patientsDetails = async () => {
            const patientsDataApi = `${BASE_URL}/api/get-appointments_details/${appointment_id}`;
            const options = {
                method: "GET",
                
            };
            const response = await fetch(patientsDataApi, options);
            if (response.ok) {
                const fetchedData = await response.json();
                console.log("fetchedData.patients",fetchedData.patients);
                setPatientData(fetchedData.patients);
            }
        };
        patientsDetails();
    }, []);

    return (
        <div className="container">
            <h2 className="title">Patient Bookings</h2>
            <div className="table-container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Patient Name</th>
                            <th>Booked Tests</th>
                            <th>Total Test Prices</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientData.length > 0 ? (
                            patientData.map((each, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{each.name}</td>
                                    <td>
                                        <strong>{each.test_names.map((test) => test).join(", ")}</strong>
                                    </td>
                                    <td>
                                        <strong>{each.total_price}</strong>
                                    </td>
                                </tr>
                                
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="no-data">No bookings found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
