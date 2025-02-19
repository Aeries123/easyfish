import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const AssignedTasks = () => {
  const navigate = useNavigate();
  

  // Dummy data for assigned tasks
  const dummyTasks = [
    {
      id: 1,
      customer_name: "John Doe",
      location: "New York",
      service_type: "AC Repair",
      assigned_date: "2024-08-10",
      status: "Pending",
    },
    {
      id: 2,
      customer_name: "Alice Smith",
      location: "Los Angeles",
      service_type: "Washing Machine Service",
      assigned_date: "2024-08-08",
      status: "In Progress",
    },
    {
      id: 3,
      customer_name: "Michael Brown",
      location: "Chicago",
      service_type: "Refrigerator Maintenance",
      assigned_date: "2024-08-07",
      status: "Completed",
    },
  ];

  const [tasks, setTasks] = useState(dummyTasks);

  return (
    <div className="assigned-tasks-container">
      <h2 className="assigned-tasks-heading">Assigned Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks assigned yet.</p>
      ) : (
        <table className="assigned-tasks-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Location</th>
              <th>Service Type</th>
              <th>Assigned Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.customer_name}</td>
                <td>{task.location}</td>
                <td>{task.service_type}</td>
                <td>{task.assigned_date}</td>
                <td className={`status ${task.status.toLowerCase()}`}>
                  {task.status}
                </td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/technician/task/${task.id}`)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssignedTasks;

// import React, { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaWhatsapp, FaPhone } from "react-icons/fa";

// const ManageAssignedTechnician = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:5000/api/get-assigned-appointments");

//         if (!response.ok) {
//           throw new Error("Failed to fetch assigned appointments");
//         }

//         const data = await response.json();
//         setAppointments(data);
//       } catch (error) {
//         setErrorMessage(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   // Search Filter Function (Search by Technician Name)
//   const filteredAppointments = appointments.filter((appointment) =>
//     appointment.technician_details?.name?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="container mt-4">
//       <h2>Assigned Technicians</h2>
//       {/* <Link to="/admin/technician-form">
//         <button className="btn btn-success mb-3">Add Technician</button>
//       </Link> */}

//       {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

//       <div className="mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by technician name..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {loading ? (
//         <div>Loading assigned appointments...</div>
//       ) : filteredAppointments.length > 0 ? (
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Appointment ID</th>
//               <th>Technician ID</th>
//               <th>Name</th>
//               <th>Phone</th>
//               <th>Email</th>
//               <th>Expertise</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAppointments.map((appointment) => (
//               <tr key={appointment.appointment_id}>
//                 <td>{appointment.appointment_id}</td>
//                 <td>{appointment.technician_id}</td>
//                 <td>{appointment.technician_details?.name || "N/A"}</td>
//                 <td>
//                   {appointment.technician_details?.phone || "N/A"}
//                   {appointment.technician_details?.phone && (
//                     <>
//                       <a
//                         href={`https://wa.me/${appointment.technician_details.phone}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="whatsapp-icon"
//                       >
//                         <FaWhatsapp size={20} color="green" style={{ marginLeft: 8 }} />
//                       </a>
//                       <a href={`tel:${appointment.technician_details.phone}`} className="phone-icon">
//                         <FaPhone size={20} color="blue" style={{ marginLeft: 8 }} />
//                       </a>
//                     </>
//                   )}
//                 </td>
//                 <td>{appointment.technician_details?.email || "N/A"}</td>
//                 <td>{appointment.technician_details?.expertise || "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div>No assigned appointments found.</div>
//       )}
//     </div>
//   );
// };

// export default ManageAssignedTechnician;
