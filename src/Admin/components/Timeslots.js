import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Timeslots = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  // Slot data for each card
  const slotsData = {
    today: ["8:00 AM to 9:00 AM", "9:00 AM to 10:00 AM", "10:00 AM to 11:00 AM"],
    tomorrow: ["9:00 AM to 10:00 AM", "10:00 AM to 11:00 AM"],
    sun19: ["11:00 AM to 12:00 PM", "12:00 PM to 1:00 PM"],
    mon20: ["8:00 AM to 9:00 AM", "1:00 PM to 2:00 PM", "2:00 PM to 3:00 PM"],
  };

  const cardStyle = {
    width: "18rem",
    backgroundColor: "#f5f5f5", // Light smoky color
    borderRadius: "10px", // Slightly rounded corners
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth animation
    cursor: "pointer",
  };

  const cardHoverStyle = {
    transform: "scale(1.05)", // Slightly bigger on hover
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)", // Deeper shadow on hover
  };

  const slotCardStyle = {
    ...cardStyle,
    border: "2px solid orange", // Purple border for slot cards
    width: "12rem", // Reduced width for slot cards
    height: "6rem",
    color:"purple", // Reduced height for slot cards
  };

  // Handle card click to toggle slot display
  const handleCardClick = (cardName) => {
    setSelectedCard(selectedCard === cardName ? null : cardName); // Toggle selection
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Time Slot Cards</h1>
      <div className="row" style={{ background: "linear-gradient(to right, #fff5e8, #ffe6cc)", padding: "20px", borderRadius: "10px" }}>
        {/* Card 1 - Today */}
        <div className="col-12 col-md-3 mb-4">
          <div
            className="card"
            style={{
              ...cardStyle,
              ...(selectedCard === "today" ? { backgroundColor: "purple", color: "white" } : {}),
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = cardHoverStyle.transform)}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={() => handleCardClick("today")}
          >
            <div className="card-body text-center">
              <h5 className="card-title">Today</h5>
              <h6 className="card-subtitle mb-2">
                {selectedCard === "today" ? "Slots available:" : "8 slots available"}
              </h6>
            </div>
          </div>
        </div>

        {/* Card 2 - Tomorrow */}
        <div className="col-12 col-md-3 mb-4">
          <div
            className="card"
            style={{
              ...cardStyle,
              ...(selectedCard === "tomorrow" ? { backgroundColor: "purple", color: "white" } : {}),
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = cardHoverStyle.transform)}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={() => handleCardClick("tomorrow")}
          >
            <div className="card-body text-center">
              <h5 className="card-title">Tomorrow</h5>
              <h6 className="card-subtitle mb-2">
                {selectedCard === "tomorrow" ? "Slots available:" : "7 slots available"}
              </h6>
            </div>
          </div>
        </div>

        {/* Card 3 - Sun 19 */}
        <div className="col-12 col-md-3 mb-4">
          <div
            className="card"
            style={{
              ...cardStyle,
              ...(selectedCard === "sun19" ? { backgroundColor: "purple", color: "white" } : {}),
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = cardHoverStyle.transform)}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={() => handleCardClick("sun19")}
          >
            <div className="card-body text-center">
              <h5 className="card-title">Sun 19</h5>
              <h6 className="card-subtitle mb-2">
                {selectedCard === "sun19" ? "Slots available:" : "9 slots available"}
              </h6>
            </div>
          </div>
        </div>

        {/* Card 4 - Mon 20 */}
        <div className="col-12 col-md-3 mb-4">
          <div
            className="card"
            style={{
              ...cardStyle,
              ...(selectedCard === "mon20" ? { backgroundColor: "purple", color: "white" } : {}),
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = cardHoverStyle.transform)}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={() => handleCardClick("mon20")}
          >
            <div className="card-body text-center">
              <h5 className="card-title">Mon 20</h5>
              <h6 className="card-subtitle mb-2">
                {selectedCard === "mon20" ? "Slots available:" : "9 slots available"}
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/* Display slots dynamically in separate cards */}
      {selectedCard && (
        <div className="row mt-4">
          {slotsData[selectedCard].map((slot, index) => (
            <div className="col-12 col-md-3 mb-4" key={index}>
              <div className="card" style={slotCardStyle}>
                <div className="card-body text-center">
                  <h5 className="card-title">Slot</h5>
                  <p>{slot}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Timeslots;
