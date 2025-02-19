import React, { useEffect, useState } from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import "./index.css"

const ManageEnquiry = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Fetch draft appointments from the backend
  useEffect(() => {
    const fetchDraftAppointments = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/draft_appointments`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch draft appointments");
        }
        const data = await response.json();
        setAppointments(data.draft_appointments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDraftAppointments();
  }, []);

  // Display loading, error or appointment details
  if (loading) {
    return <div className="manage-manage__loading">Loading...</div>;
  }

  if (error) {
    return <div className="manage-manage__error">Error: {error}</div>;
  }

  return (
    <div className="manage-manage__manage-enquiry">
      <h1 className="manage-manage__title">Draft Appointments</h1>
      {appointments.length === 0 ? (
        <p className="manage-manage__no-appointments">
          No draft appointments available.
        </p>
      ) : (
        <table className="manage-manage__appointments-table">
          <thead className="manage-manage__appointments-table__header">
            <tr>
              <th className="manage-manage__appointments-table__header-cell">
                Appointment ID
              </th>
              <th className="manage-manage__appointments-table__header-cell">
                User Name
              </th>
              {/* <th className="manage-manage__appointments-table__header-cell">
                Patient ID
              </th> */}
              <th className="manage-manage__appointments-table__header-cell">
                Test Names
              </th>
              <th className="manage-manage__appointments-table__header-cell">
                Total Price
              </th>
              <th className="manage-manage__appointments-table__header-cell">
                Status
              </th>
              <th className="manage-manage__appointments-table__header-cell">
                Created At
              </th>
              <th className="manage-manage__appointments-table__header-cell">
                Patient Name
              </th>
              <th className="manage-manage__appointments-table__header-cell">
                Phone Number
              </th>
              <th className="manage-manage__appointments-table__header-cell">
                Age
              </th>
              <th className="manage-manage__appointments-table__header-cell">
                Gender
              </th>
            </tr>
          </thead>
          <tbody className="manage-manage__appointments-table__body">
            {appointments.map((appointment, index) => (
              <tr
                key={index}
                className="manage-manage__appointments-table__row"
              >
                <td className="manage-manage__appointments-table__cell">
                  {appointment.appointment_id}
                </td>
                <td className="manage-manage__appointments-table__cell">
                  {appointment.user_name}
                </td>
                {/* <td className="manage-manage__appointments-table__cell">
                  {appointment.patient_id}
                </td> */}
               <td className="manage-manage_appointments-table_cell">
                  {/* {Array.isArray(appointment.test_names)
                    ? appointment.test_names.join(", ")
                    : "No Tests"} */}
                    {appointment.test_names}
                </td>
                <td className="manage-manage__appointments-table__cell">
                  {appointment.total_price}
                </td>
                <td className="manage-manage__appointments-table__cell">
                  {appointment.status}
                </td>
                <td className="manage-manage__appointments-table__cell">
                  {appointment.created_at}
                </td>
                <td className="manage-manage__appointments-table__cell">
                  {appointment.patient_name}
                </td>
                <td className="manage-manage_appointments-table_cell">
                  {appointment.phone_number}
                  <a
                    href={`https://wa.me/${appointment.phone_number}`}
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
                    href={`tel:${appointment.phone_number}`}
                    className="phone-icon"
                  >
                    <FaPhone size={20} color="blue" style={{ marginLeft: 8 }} />
                  </a>
                </td>
                <td className="manage-manage__appointments-table__cell">
                  {appointment.age}
                </td>
                <td className="manage-manage__appointments-table__cell">
                  {appointment.gender}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageEnquiry;
