import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminEditBookingForm = () => {
  const { id } = useParams(); // Extract the appointmentId from the route params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patient_name: "",
    patient_contact: "",
    test_names: [], // Updated to handle test names as an array
    appointment_date: "",
    slot_date: "",
    total_price: "",
    notes: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        // Make the request without using the token
        const response = await fetch(
          `http://127.0.0.1:5000/api/get_userbookings/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("Booking Data:", data);

        if (response.ok) {
          const formatDateTime = (dateTime) => {
            const date = new Date(dateTime);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            return `${year}-${month}-${day}T${hours}:${minutes}`; // Format for datetime-local
          };

          const formattedData = {
            ...data.booking,
            appointment_date: formatDateTime(data.booking.appointment_date),
            slot_date: formatDateTime(data.booking.slot_date),
          };

          setFormData(formattedData);
        } else {
          console.error("Error fetching booking details:", data.message);
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Submit the form data without using the token
      const response = await fetch(
        `http://127.0.0.1:5000/api/book-test/edit/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setMessage("Appointment updated successfully!");
        navigate("/admin/manage-booking"); // Navigate to ManageBooking page
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Booking</h2>
      {message && (
        <div
          className={`alert ${
            message.includes("Error") ? "alert-danger" : "alert-success"
          }`}
          role="alert"
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient Name</label>
          <input
            type="text"
            className="form-control"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Patient Contact</label>
          <input
            type="text"
            className="form-control"
            name="patient_contact"
            value={formData.patient_contact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Test Names</label>
          <input
            type="text"
            className="form-control"
            name="test_names"
            value={formData.test_names.join(", ")} // Display as a comma-separated string
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Appointment Date</label>
          <input
            type="datetime-local"
            className="form-control"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Slot Date</label>
          <input
            type="datetime-local"
            className="form-control"
            name="slot_date"
            value={formData.slot_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Total Price</label>
          <input
            type="number"
            className="form-control"
            name="total_price"
            value={formData.total_price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Notes</label>
          <textarea
            className="form-control"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group text-center mt-4">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary mt-3 ms-2"
      >
        Cancel
      </button>
    </div>
  );
};

export default AdminEditBookingForm;
