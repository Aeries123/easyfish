import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './dashboard.css';


function Dashboard() {
  // Define the state for active card and active order type
  const [activeCard, setActiveCard] = useState(null);
  const [activeOrderType, setActiveOrderType] = useState(null); // Initialize activeOrderType state

  const handleCardClick = (cardIndex) => {
      setActiveCard(cardIndex);
  };

    return (
        <div className="container mt-5">
            {/* Dashboard Heading */}
            <div className="row">
                <h1 className="head text-center text-purple underline">MY DASHBOARD</h1>
            </div>

            {/* Cards Row */}
            <div className="row mt-4">
                {/* Profile Card */}
                <div
                    className={`col-md-3 card-container ${activeCard === 0 ? "active-card" : ""}`}
                    onClick={() => handleCardClick(0)}
                >
                    <div className="card p-3 d-flex flex-row align-items-center card-profile border-0 shadow-sm">
                        {/* Profile Image on the Left */}
                        <img
                            src="https://res.cloudinary.com/dkujcnlcs/image/upload/v1736413298/avatar_q2ud5d.png"
                            alt="Profile"
                            className="rounded-circle mb-3 card-img"
                            style={{ width: "80px", height: "80px" }} // Adjusting image size
                        />

                        {/* Text Content on the Right */}
                        <div className="ms-3 text-center">
                            <h5 className="card-title mb-1">Kartheek</h5>
                            <p className="card-text mb-0">karthik@gmail.com</p>
                            <p className="card-text mb-0">9347111897</p>

                            {/* Edit Profile Button */}
                            <button className="btn btn-purple mt-3" style={{ backgroundColor: "purple", color: "white" }}>
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* My Bookings Card */}
                <div
                    className={`col-md-3 card-container ${activeCard === 1 ? "active-card" : ""}`}
                    onClick={() => handleCardClick(1)}
                >
                    <div className="card text-center border-0 shadow-sm card-small">
                        <img
                            src="https://res.cloudinary.com/dkujcnlcs/image/upload/v1736413290/ic-mybooking_p2aqjk.webp"
                            alt="Bookings"
                            className="card-img-top card-img mx-auto mt-3 img-small"
                        />
                        <div className="card-body">
                            <h5 className="card-text">My Bookings</h5>
                        </div>
                    </div>
                </div>

                {/* My Sample Tracking Card */}
                <div
                    className={`col-md-3 card-container ${activeCard === 2 ? "active-card" : ""}`}
                    onClick={() => handleCardClick(2)}
                >
                    <div className="card text-center border-0 shadow-sm card-small">
                        <img
                            src="https://res.cloudinary.com/dkujcnlcs/image/upload/v1736413277/ic-sample-track_yoygzo.webp"
                            alt="Sample Tracking"
                            className="card-img-top card-img mx-auto mt-3 img-small"
                        />
                        <div className="card-body">
                            <h5 className="card-text">My Sample Tracking</h5>
                        </div>
                    </div>
                </div>

                {/* My Reports Card */}
                <div
                    className={`col-md-3 card-container ${activeCard === 3 ? "active-card" : ""}`}
                    onClick={() => handleCardClick(3)}
                >
                    <div className="card text-center border-0 shadow-sm card-small">
                        <img
                            src="https://res.cloudinary.com/dkujcnlcs/image/upload/v1736413080/qba7a4rmntgraaukkced.webp"
                            alt="Reports"
                            className="card-img-top card-img mx-auto mt-3 img-small"
                        />
                        <div className="card-body">
                            <h5 className="card-text">My Reports</h5>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conditional Rendering of Additional Cards */}

            {/* Order History Card (only visible when My Bookings is selected) */}
           {/* Order History Card (only visible when My Bookings is selected) */}
{activeCard === 1 && (
    <div className="card mt-4 shadow shadow" style={{ width: "auto", margin: "0 auto" }}>
        <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
                {/* <h2 className="card-title">Order History</h2> */}
                <h3 className="head text-center text-purple">Order History</h3>
                {/* Search Field on the Right */}
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Search Orders"
                    style={{ maxWidth: "200px" }}
                />
            </div>

            <hr />

            {/* Active, Past, and Cancelled Orders Section in a Single Row */}
            <div className="d-flex justify-content-between">
                {/* Active Orders Section */}
                <div className="w-30">
                    <p
                        className="cursor-pointer"
                        onClick={() => setActiveOrderType("active")}
                        style={{ fontWeight: "bold" }}
                    >
                        Active Orders
                    </p>
                    {activeOrderType === "active" && (
                        <div>
                            <hr />
                            <p>Details of your active orders will be displayed here.</p>
                        </div>
                    )}
                </div>

                {/* Past Orders Section */}
                <div className="w-30">
                    <p
                        className="cursor-pointer"
                        onClick={() => setActiveOrderType("past")}
                        style={{ fontWeight: "bold" }}
                    >
                        Past Orders
                    </p>
                    {activeOrderType === "past" && (
                        <div>
                            <hr />
                            <p>Details of your past orders will be displayed here.</p>
                        </div>
                    )}
                </div>

                {/* Cancelled Orders Section */}
                <div className="w-30">
                    <p
                        className="cursor-pointer"
                        onClick={() => setActiveOrderType("cancelled")}
                        style={{ fontWeight: "bold" }}
                    >
                        Cancelled Orders
                    </p>
                    {activeOrderType === "cancelled" && (
                        <div>
                            <hr />
                            <p>Details of your cancelled orders will be displayed here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
)}

            {/* Tracking Card (only visible when My Sample Tracking is selected) */}
            {activeCard === 2 && (
              <div className="card mt-4 shadow" style={{ width: "auto", margin: "0 auto" }}>
              <div className="card-body " style={{ height: "auto" }}>
              <h3 className="card-title text-purple">Tracking</h3>
                  <p className="card-text d-flex justify-content-center align-items-center">No orders in progress...</p>
              </div>
          </div>
          
            )}

            {/* Reports Card (only visible when My Reports is selected) */}
            {activeCard === 3 && (
                <div className="card mt-4 shadow" style={{ width: "auto", margin: "0 auto" }}>
                <div className="card-body">
                    <h3 className="card-title text-purple">My Reports</h3>
                    
                    {/* Patient Name */}
                    <div>
                        <h6 className="patient-name mt-4">Kartheek</h6>
                    </div>
                    
                    {/* Table for Reports */}
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th scope="col">Registration ID</th>
                                <th scope="col">Date</th>
                                <th scope="col">Download Report</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="3" className="text-center">No reports available</td>
                            </tr>
                        </tbody>
                    </table>
            
                    {/* Note below the table */}
                    <div className="note mt-3">
                        <small>Note: Only Lab reports are available online</small>
                    </div>
                </div>
            </div>
            
            )}
        </div>
    );
}

export default Dashboard;
