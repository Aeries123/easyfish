import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function AppointmentSummary() {
  const [activeCard, setActiveCard] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (cardIndex) => {
    setActiveCard(cardIndex);
  };

  const handleProceedToPayment = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Updated card data with specific content
  const cardData = [
    {
      id: 1,
      title: "Appointment Summary",
      content: (
        <div className="text-center">
          <h5 className="text-secondary font-semibold py-2">Appointment Date & Time</h5>
          <p className="text-base">25th January 2025, 10:00 AM</p>
          <h5 className="text-secondary font-semibold py-2">Center Details</h5>
          <p className="text-base">ABC Health Center, Downtown</p>
        </div>
      ),
    },
    {
      id: 2,
      title: "Diagnostic Tests",
      content: (
        <div>
          <p className="text-base font-semibold">Test Name: Full Body Checkup</p>
          <p className="text-base font-semibold">Price: $150</p>
        </div>
      ),
    },
    {
      id: 3,
      title: "Coupons & Offers",
      content: (
        <div className="d-flex align-items-center">
          <p className="text-base font-semibold mb-0 me-2">Coupon Code: SAVE20</p>
          <button className="btn btn-success btn-sm">Apply</button>
        </div>
      ),
    },
    {
      id: 4,
      title: "Payment Information",
      content: (
        <div>
          <p className="text-base font-semibold">Total Amount: $150</p>
          <p className="text-base font-semibold">Total Tests: 1</p>
          <p className="text-base font-semibold">Total Amount Payable: $150</p>
        </div>
      ),
    },
    {
      id: 5,
      title: "Proceed to Payment",
      content: (
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleProceedToPayment}>
            Proceed to Payment
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      {/* Dashboard Heading */}
      <h1 className="text-center mb-4">Appointment Summary</h1>

      {/* Cards */}
      {cardData.map((card, index) => (
        <div
          key={card.id}
          className={`card mt-4 shadow ${activeCard === index ? "border-primary" : ""}`}
          style={{ width: "auto", margin: "0 auto", cursor: "pointer" }}
          onClick={() => handleCardClick(index)}
        >
          <div className="card-body" style={{ height: "auto" }}>
            <h3 className="card-title text-purple">{card.title}</h3>
            <div className="card-text">{card.content}</div>
          </div>
        </div>
      ))}

      {/* Modal Popup for Payment Confirmation */}
      {showModal && (
        <div
          className="modal show"
          style={{ display: 'block', zIndex: 1050 }}
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Confirm Payment
                </h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to proceed with the payment of $150 for the Full Body Checkup?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentSummary;
