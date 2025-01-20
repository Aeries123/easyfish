import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './MyProfile.css';


function MyProfile() {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (cardIndex) => {
    setActiveCard(cardIndex);
  };

  // Updated card data with specific content
  const cardData = [
    {
        id: 1,
        title: "",
        content: (
          <div className="text-center">
            <img
              src="https://res.cloudinary.com/dkujcnlcs/image/upload/v1736413298/avatar_q2ud5d.png"
              alt="Profile"
              className="rounded-circle mb-3 card-img"
              style={{ width: "80px", height: "80px" }} // Adjusting image size
            />
            <h5 className="text-[1.8rem] text-secondary font-semibold py-2 uppercase">
              MR. Kartheek
            </h5>
            <p className="text-base font-semibold">26 years, Male</p>
          </div>
        ),
        titleStyle: "text-center", // Add a custom style for the title
      },
      
    {
      id: 2,
      title: "Contact Information",
      content: (
        <div>
          <p class="text-base font-semibold num "> 9347111897</p>
          <p class="text-base font-semibold"> karthik@gmail.com</p>
        </div>
      ),
    },
    {
        id: 3,
        title: "Residential Address",
        content: (
          <div className="d-flex align-items-center">
            <p className="text-base font-semibold mb-0 me-2">Add Residential Address</p>
            <button className="btn btn-primary btn-sm">
              <i className="bi bi-plus"></i> {/* Bootstrap icon for "+" */}
            </button>
          </div>
        ),
      },
      
    {
      id: 4,
      title: "Office Address",
      content: <p class="text-base font-semibold">Add Office Address
...</p>,
    },
  ];

  return (
    <div className="container mt-5">
      {/* Dashboard Heading */}
     

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
    </div>
  );
}

export default MyProfile;
