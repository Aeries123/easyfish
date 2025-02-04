import React, { useEffect, useState } from "react";

import "./index.css"

const ManageEnquiry = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch draft appointments from the backend
  useEffect(() => {
    const fetchDraftAppointments = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/draft_appointments"
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
                User ID
              </th>
              <th className="manage-manage__appointments-table__header-cell">
                Patient ID
              </th>
              <th className="manage-manage__appointments-table__header-cell">
                Test IDs
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
                  {appointment.user_id}
                </td>
                <td className="manage-manage__appointments-table__cell">
                  {appointment.patient_id}
                </td>
                <td className="manage-manage__appointments-table__cell">
                  {appointment.test_ids}
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
                <td className="manage-manage__appointments-table__cell">
                  {appointment.phone_number}
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
