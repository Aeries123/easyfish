import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminEditBookingForm = () => {
  const { id } = useParams(); // Extract the appointmentId from the route params
  const navigate = useNavigate();

  const [bookingDetails, setBookingDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // State to handle success message
  const [testOptions, setTestOptions] = useState([]); // State for available tests

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/get_userbookings/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log(data)

        if (response.ok) {
          setBookingDetails(data.booking);
        } else {
          setErrorMessage(data.message || "Error fetching booking details.");
        }
      } catch (error) {
        setErrorMessage("Error fetching booking details.");
      }
    };

    const fetchTests = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/tests`);
        const data = await response.json();
        if (response.ok) {
          setTestOptions(data.tests); // Assuming the API returns the list of tests
        } else {
          setErrorMessage(data.message || "Error fetching test names.");
        }
      } catch (error) {
        setErrorMessage("Error fetching test names.");
      }
    };

    fetchBookingDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${BASE_URL}/api/book-test/edit/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingDetails),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Booking updated successfully!");
        navigate(`/admin/bookings/${id}`); // Optionally navigate to the booking details page
      } else {
        setErrorMessage(data.error || "Failed to update booking.");
      }
    } catch (error) {
      setErrorMessage("Error updating booking.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Booking Details</h2>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      {bookingDetails ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="patient_name">Patient Name</label>
            <input
              type="text"
              id="patient_name"
              name="patient_name"
              className="form-control"
              value={bookingDetails.patient_name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="patient_contact">Patient Contact</label>
            <input
              type="text"
              id="patient_contact"
              name="patient_contact"
              className="form-control"
              value={bookingDetails.patient_contact}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              className="form-control"
              value={bookingDetails.notes}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="test_names">Test Names</label>
            <select
              value={bookingDetails.test_names}
              onChange={(e) => {
                const selectedTests = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setBookingDetails({
                  ...bookingDetails,
                  test_names: selectedTests,
                });
              }}
              multiple
              className="form-control"
              required
            >
              <option value="" disabled>
                Select Tests
              </option>
              {testOptions.map((test) => (
                <option key={test.test_id} value={test.test_name}>
                  {test.test_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="appointment_date">Appointment Date</label>
            <input
              type="date"
              id="appointment_date"
              name="appointment_date"
              className="form-control"
              value={bookingDetails.appointment_date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="slot_date">Slot Date</label>
            <input
              type="date"
              id="slot_date"
              name="slot_date"
              className="form-control"
              value={bookingDetails.slot_date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="total_price">Total Price</label>
            <input
              type="number"
              id="total_price"
              name="total_price"
              className="form-control"
              value={bookingDetails.total_price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              id="status"
              name="status"
              className="form-control"
              value={bookingDetails.status}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      ) : (
        <div>Loading...</div>
      )}

      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
        Go Back
      </button>
    </div>
  );
};

export default AdminEditBookingForm;
