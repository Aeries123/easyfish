// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const AdminViewBookingForm = () => {
//   const { id } = useParams(); // Extract the appointmentId from the route params
//   const navigate = useNavigate();

//   const [bookingDetails, setBookingDetails] = useState(null); // State to store booking details
//   const [errorMessage, setErrorMessage] = useState(null); // State for error messages

//   console.log(bookingDetails);

//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       try {
//         // Fetch request to the API
//         const response = await fetch(`http://127.0.0.1:5000/api/get-appointments_details/${id}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         const data = await response.json();
//         console.log("API Response:", data);

//         if (response.ok) {
//           setBookingDetails(data);
//         } else {
//           console.error("Error fetching booking details:", data.message);
//           setErrorMessage(data.message || "Error fetching booking details.");
//         }
//       } catch (error) {
//         console.error("Error fetching booking details:", error);
//         setErrorMessage("Error fetching booking details.");
//       }
//     };

//     fetchBookingDetails();
//   }, [id]); // Fetch data when the component mounts or when id changes

//   return (
//     <div className="container mt-4">
//       <h2>Booking Details</h2>
//       {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
//       {bookingDetails ? (
//         <>
//           <table className="table table-bordered">
//             <tbody>
//               <tr>
//                 <th>Appointment ID</th>
//                 <td>{bookingDetails.appointment_id}</td>
//               </tr>
//               <tr>
//                 <th>Patient Name</th>
//                 <td>{bookingDetails.patient_name}</td>
//               </tr>
//               <tr>
//                 <th>Patient Contact</th>
//                 <td>{bookingDetails.patient_contact}</td>
//               </tr>

//               <tr>
//                 <th>Test Names</th>
//                 <td>{bookingDetails.test_names.join(", ")}</td>
//               </tr>
//               <tr>
//                 <th>Appointment Date</th>
//                 <td>{bookingDetails.appointment_date}</td>
//               </tr>
//               <tr>
//                 <th>Slot Date</th>
//                 <td>{bookingDetails.slot_date}</td>
//               </tr>
//               <tr>
//                 <th>Status</th>
//                 <td>{bookingDetails.status}</td>
//               </tr>
//               <tr>
//                 <th>Total Price</th>
//                 <td>{bookingDetails.total_price}</td>
//               </tr>
//             </tbody>
//           </table>

//           {/* Patients List */}
//           {bookingDetails.patients && bookingDetails.patients.length > 0 ? (
//             <div>
//               <h3>Patients Details</h3>
//               <table className="table table-bordered">
//                 <thead>
//                   <tr>
//                     <th>Patient ID</th>
//                     <th>Name</th>
//                     <th>Age</th>
//                     <th>Phone</th>
//                     <th>Gender</th>
//                     <th>Test Names</th>
//                     <th>Total Price</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {bookingDetails.patients.map((patient, index) => (
//                     <tr key={index}>
//                       <td>{patient.patient_id}</td>
//                       <td>{patient.name}</td>
//                       <td>{patient.age}</td>
//                       <td>{patient.phone}</td>
//                       <td>{patient.gender}</td>
//                       <td>{patient.test_names.join(", ")}</td>
//                       <td>{patient.total_price}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p>No patients found for this appointment.</p>
//           )}
//         </>
//       ) : (
//         <div>Loading...</div>
//       )}
//       <button onClick={() => navigate(-1)} className="btn btn-secondary">
//         Go Back
//       </button>
//     </div>
//   );
// };

// export default AdminViewBookingForm;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Cookies from "js-cookie"; // Import js-cookie

const AdminViewBookingForm = () => {
  const { id } = useParams(); // Extract the appointmentId from the route params
  const navigate = useNavigate();

  const [bookingDetails, setBookingDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [technicians, setTechnicians] = useState([]);
  const [selectedTechnician, setSelectedTechnician] = useState("");
  const [assignStatus, setAssignStatus] = useState(""); // Track status of the button
  const [selectedFiles, setSelectedFiles] = useState({});

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/get-appointments_details/${id}`
        );
        const data = await response.json();
        if (response.ok) {
          setBookingDetails(data);
          setAssignStatus(data.assign || "Assign");
        } else {
          setErrorMessage(data.message || "Error fetching booking details.");
        }
      } catch (error) {
        setErrorMessage("Error fetching booking details.");
      }
    };

    const fetchTechnicians = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/technicians");
        const data = await response.json();
        if (response.ok) {
          setTechnicians(data);
        } else {
          setErrorMessage(data.message || "Error fetching technicians.");
        }
      } catch (error) {
        setErrorMessage("Error fetching technicians.");
      }
    };

    fetchBookingDetails();
    fetchTechnicians();
  }, [id]);

  const handleAssign = async () => {
    if (!selectedTechnician) {
      alert("Please select a technician first.");
      return;
    }

    const assignmentData = {
      appointment_id: id,
      technician_id: selectedTechnician,
      status: "Assigned", // New status after assignment
    };

    const token = Cookies.get("token"); // Get the token from cookies

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/assign-technician",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in the request header
          },
          body: JSON.stringify(assignmentData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAssignStatus("Assigned"); // Update the button text
      } else {
        setErrorMessage(data.message || "Error assigning technician.");
      }
    } catch (error) {
      setErrorMessage("Error assigning technician.");
    }
  };

  // const handleReassign = () => {
  //   // Reset the technician assignment status and allow the user to choose a new technician
  //   setAssignStatus("Assign");
  //   setSelectedTechnician(""); // Clear the selected technician
  // };

  // Handle updating sample collection status
  const handleSampleCollection = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/update-sample-collection",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ appointment_id: id }), // Send the appointment ID
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Sample collection status updated successfully.");
        setBookingDetails((prevDetails) => ({
          ...prevDetails,
          sample_collection: "Collected", // Update UI immediately
        }));
      } else {
        alert(data.message || "Error updating sample collection status.");
      }
    } catch (error) {
      alert("Error updating sample collection status.");
    }
  };

  const handleReassign = async () => {
    try {
      // Ensure appointment_id, technician_id, and status are set
      if (!id || !selectedTechnician || !assignStatus) {
        alert("Please select a technician and status to proceed.");
        return;
      }

      // Prepare data for the reassign request
      const data = {
        appointment_id: id,
        technician_id: selectedTechnician,
        status: assignStatus,
      };
      console.log(data);

      // Make a POST request to reassign the technician using fetch
      const response = await fetch(
        "http://127.0.0.1:5000/api/delete-assignment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      // Parse the JSON response
      const result = await response.json();

      // Handle the success response
      if (response.ok) {
        // alert(result.message); // Show success message
        setAssignStatus("Assign");
        setSelectedTechnician("");
      } else {
        alert(result.message); // Show error message if any
      }
    } catch (error) {
      console.error("Error reassigning technician:", error);
      alert("Error reassigning technician. Please try again later.");
    }
  };

  const handleReportUpload = (event, patientId) => {
    const file = event.target.files[0];
    setSelectedFiles((prevFiles) => ({
      ...prevFiles,
      [patientId]: file,
    }));
  };

  // Upload Report File
  const handleSendReport = async (patientId) => {
    const file = selectedFiles[patientId];

    if (!file) {
      alert("Please select a file before sending the report.");
      return;
    }

    const formData = new FormData();
    formData.append("report", file);

    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/api/update-report/${patientId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        alert("Report uploaded successfully!");
        setBookingDetails((prevDetails) => ({
          ...prevDetails,
          patients: prevDetails.patients.map((patient) =>
            patient.patient_id === patientId
              ? { ...patient, report_url: response.data.report_url }
              : patient
          ),
        }));
      } else {
        alert("Failed to upload report.");
      }
    } catch (error) {
      console.error("Error uploading report:", error);
      alert("An error occurred while uploading the report.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Booking Details</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {bookingDetails ? (
        <>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Appointment ID</th>
                <td>{bookingDetails.appointment_id}</td>
              </tr>
              <tr>
                <th>Patient Name</th>
                <td>{bookingDetails.patient_name}</td>
              </tr>
              <tr>
                <th>Patient Contact</th>
                <td>{bookingDetails.patient_contact}</td>
              </tr>
              <tr>
                <th>Test Names</th>
                <td>{bookingDetails.test_names.join(", ")}</td>
              </tr>
              <tr>
                <th>Appointment Date</th>
                <td>{bookingDetails.appointment_date}</td>
              </tr>
              <tr>
                <th>Slot Date</th>
                <td>{bookingDetails.slot_date}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{bookingDetails.status}</td>
              </tr>
              <tr>
                <th>Total Price</th>
                <td>{bookingDetails.total_price}</td>
              </tr>
            </tbody>
          </table>

          {/* Technician Selection */}
          <h3>Assign Technician</h3>
          <select
            className="form-select"
            value={selectedTechnician}
            onChange={(e) => setSelectedTechnician(e.target.value)}
          >
            <option value="">Select a Technician</option>
            {technicians.map((tech) => (
              <option key={tech.technician_id} value={tech.technician_id}>
                {tech.name}
              </option>
            ))}
          </select>

          {/* Assign Button */}
          <button
            onClick={handleAssign}
            className="btn btn-primary mt-3"
            disabled={assignStatus === "Assigned"} // Disable button if already assigned
          >
            {assignStatus === "Assigned" ? "Assigned" : "Assign"}{" "}
          </button>

          {/* Reassign Button */}
          {assignStatus === "Assigned" && (
            <button onClick={handleReassign} className="btn btn-warning mt-3">
              Reassign Technician
            </button>
          )}

          {/* Button to update sample collection status */}
          {bookingDetails.sample_collection === "Collected" ? (
            <button className="btn btn-success mt-3">Sample Collected</button>
          ) : (
            <button
              onClick={handleSampleCollection}
              className="btn btn-success mt-3"
            >
              Mark Sample as Collected
            </button>
          )}

          {/* Patients List */}
          {bookingDetails.patients && bookingDetails.patients.length > 0 ? (
            <div>
              <h3>Patients Details</h3>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Test Names</th>
                    <th>Total Price</th>
                    <th>Reports</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingDetails.patients.map((patient, index) => (
                    <tr key={index}>
                      <td>{patient.patient_id}</td>
                      <td>{patient.name}</td>
                      <td>{patient.age}</td>
                      <td>{patient.phone}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.test_names.join(", ")}</td>
                      <td>{patient.total_price}</td>
                      <td>
                        {patient.report_url ? (
                          <a
                            href={patient.report_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Report
                          </a>
                        ) : (
                          <input
                            type="file"
                            onChange={(e) =>
                              handleReportUpload(e, patient.patient_id)
                            }
                          />
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => handleSendReport(patient.patient_id)}
                        >
                          Send Report
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No patients found for this appointment.</p>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
      <button onClick={() => navigate(-1)} className="btn btn-secondary">
        Go Back
      </button>
    </div>
  );
};

export default AdminViewBookingForm;
