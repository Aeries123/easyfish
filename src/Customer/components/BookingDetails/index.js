import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

import "./index.css"

const UserBookingDetails = () => {
  const location = useLocation();
  const { bookingDetails } = location.state || {};
  console.log(location)
  // console.log(bookingDetails)

  if (!bookingDetails) {
    return (
      <p className="booking-details-no-booking-message">
        No booking details available.
      </p>
    );
  }

  const {
    appointment_id,
    transaction_id,
    total_price,
    payment_method,
    appointment_date,
    slot_date,
    appointment_status,
    payment_status,
    tracking_status,
    test_details,
    patient_info,
  } = bookingDetails;

  const handleDownloadReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Booking Confirmation Report", 14, 20);

    doc.setFontSize(12);
    doc.text("Booking Details:", 14, 30);
    doc.text(`Appointment ID: ${appointment_id}`, 14, 40);
    doc.text(`Transaction ID: ${transaction_id || "N/A"}`, 14, 45);
    doc.text(`Total Price: ₹${total_price}`, 14, 50);
    doc.text(`Payment Method: ${payment_method}`, 14, 55);
    doc.text(`Appointment Date: ${appointment_date}`, 14, 60);
    doc.text(`Slot Date: ${slot_date}`, 14, 65);
    doc.text(`Appointment Status: ${appointment_status}`, 14, 70);
    doc.text(`Payment Status: ${payment_status}`, 14, 75);
    doc.text(`Tracking Status: ${tracking_status}`, 14, 80);

    doc.text("Patient Information:", 14, 90);
    doc.text(`Name: ${patient_info.name}`, 14, 100);
    doc.text(`Contact: ${patient_info.contact}`, 14, 105);
    doc.text(`Notes: ${patient_info.notes}`, 14, 110);

    const testHeaders = ["Test Name", "Description", "Duration", "Price"];
    const testRows = test_details.map((test) => [
      test.test_name,
      test.description,
      test.duration,
      `₹${test.price}`,
    ]);

    doc.autoTable({
      startY: 120,
      head: [testHeaders],
      body: testRows,
    });

    doc.save(`Booking_Report_${appointment_id}.pdf`);
  };

  return (
    <div className="booking-details-container">
      <h2 className="booking-details-title">Booking Confirmation</h2>

      <h3 className="booking-details-section-title">Patient Information</h3>
      <div className="booking-details-patient-info">
        <p><strong>Name:</strong> {patient_info.name}</p>
        <p><strong>Contact:</strong> {patient_info.contact}</p>
        <p><strong>Notes:</strong> {patient_info.notes}</p>
      </div>

      <h3 className="booking-details-section-title">Booking Details</h3>
      <div className="booking-details-details">
        <p><strong>Appointment ID:</strong> {appointment_id}</p>
        <p><strong>Transaction ID:</strong> {transaction_id || "N/A"}</p>
        <p><strong>Total Price:</strong> ₹{total_price}</p>
        <p><strong>Payment Method:</strong> {payment_method}</p>
        <p><strong>Appointment Date:</strong> {appointment_date}</p>
        <p><strong>Slot Date:</strong> {slot_date}</p>
        <p><strong>Appointment Status:</strong> {appointment_status}</p>
        <p><strong>Payment Status:</strong> {payment_status}</p>
        <p><strong>Tracking Status:</strong> {tracking_status}</p>
      </div>

      <h3 className="booking-details-section-title">Test Details</h3>
      <table className="booking-details-test-details">
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {test_details.map((test) => (
            <tr key={test.test_id}>
              <td>{test.test_name}</td>
              <td>{test.description}</td>
              <td>{test.duration}</td>
              <td>₹{test.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleDownloadReport} className="booking-details-download-button">
        Download Report
      </button>
    </div>
  );
};

export default UserBookingDetails;
