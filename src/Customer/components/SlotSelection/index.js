import React, { useState,useEffect } from "react";
import dayjs from "dayjs";
import "./index.css";

const slotDetails = [
  "9AM",
  "10AM",
  "11AM",
  "12PM",
  "1PM",
  "2PM",
  "3PM",
  "6PM",
  "7PM",
  "8PM",
];
const availableDateSlots = Array.from({ length: 8 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return {
    date: date.toISOString().split("T")[0],
    slotDetails,
  };
});

export const SlotSelection = (props) => {
  const {
    selectedDate,
    selectedSlot,
    handleDateSelection,
    handleSlotSelection,
    setIsSlotBooked,
    setSelectedDate,
    setSelectedSlot,
  } = props;
  

  return (
    <div className="slot-slot-booking-container">
      {/* Step Indicators */}
      {/* <div className="slot-slot-step-indicators"> */}
      {/* <div > */}
      {/* <span>1</span> */}
      {/* <p className="slot-slot-step completed">Select Date</p> */}
      {/* </div> */}
      {/* <div > */}
      {/* <p className={`slot-slot-step ${selectedDate ? "completed" : ""}`}>Select Slot</p> */}
      {/* </div> */}
      {/* <div className={`slot-slot-step ${selectedSlot ? "completed" : ""}`}> */}
      {/* <p className={`slot-slot-step ${selectedDate ? "completed" : ""}`}>Confirm</p> */}
      {/* </div> */}
      {/* </div> */}

      {/* Date Selection */}
      <div className="slot-slot-date-selector">
        {availableDateSlots.map(({ date }) => (
          <div
            key={date}
            className={`slot-slot-date ${
              selectedDate === date ? "selected" : ""
            }`}
            onClick={() => handleDateSelection(date)}
          >
            {dayjs(date).format("DD-MMM-YYYY")}
          </div>
        ))}
      </div>

      {/* Slot Selection */}
      <div className="slot-slot-slot-selector">
        {selectedDate ? (
          availableDateSlots
            .find(({ date }) => date === selectedDate)
            ?.slotDetails.map((slot) => (
              <button
                key={slot}
                className={`slot-slot-slot ${
                  selectedSlot === slot ? "selected" : ""
                }`}
                onClick={() => handleSlotSelection(slot)}
              >
                {slot}
              </button>
            ))
        ) : (
          <p className="slot-slot-no-slots-message">
            Please select a date to view slots.
          </p>
        )}
      </div>
    </div>
  );
};
