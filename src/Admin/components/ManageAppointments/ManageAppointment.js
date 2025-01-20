// ManageAppointment.js (React)

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageAppointment = () => {
  const [appointments, setAppointments] = useState([
    { appointment_id: 1, test_id: 101 },
    { appointment_id: 2, test_id: 102 },
    { appointment_id: 3, test_id: 103 },
    { appointment_id: 4, test_id: 104 },
    { appointment_id: 5, test_id: 105 },
    { appointment_id: 6, test_id: 106 },
    { appointment_id: 7, test_id: 107 },
    { appointment_id: 8, test_id: 108 },
    { appointment_id: 9, test_id: 109 },
    { appointment_id: 10, test_id: 110 },
  ]);
  
  const [formData, setFormData] = useState({
    appointment_id: '',
    test_id: '',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // You can adjust this value

  // Get current appointments based on the page
  const indexOfLastAppointment = currentPage * itemsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - itemsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = 'http://localhost:5000/addappointmenttest'; // Backend URL

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Appointment test added successfully.') {
          alert('Test added to appointment successfully!');
          setFormData({
            appointment_id: '',
            test_id: '',
          });
        } else {
          alert('Failed to add test.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred.');
      });
  };

  // Delete Appointment
  const handleDelete = (appointment_id) => {
    const apiUrl = `http://localhost:5000/deleteappointment/${appointment_id}`;

    fetch(apiUrl, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Appointment deleted successfully.') {
          alert('Appointment deleted successfully!');
          setAppointments(appointments.filter(app => app.appointment_id !== appointment_id));
        } else {
          alert('Failed to delete appointment.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred.');
      });
  };

  // Pagination logic
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Manage Appointment</h2>

      {/* Appointment List */}
      <h4>Appointments</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Test ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments.map((appointment) => (
            <tr key={appointment.appointment_id}>
              <td>{appointment.appointment_id}</td>
              <td>{appointment.test_id}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(appointment.appointment_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ManageAppointment;
