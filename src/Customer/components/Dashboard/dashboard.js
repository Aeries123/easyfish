import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import "./dashboard.css";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";
const activeOrders = [
  {
    orderId: "ORD001",
    healthCheckupType: "Blood Test",
    status: "Active",
    slotDate: "2025-01-20T10:00:00",
  },
  {
    orderId: "ORD002",
    healthCheckupType: "X-Ray",
    status: "Active",
    slotDate: "2025-01-19T14:00:00",
  },
  {
    orderId: "ORD003",
    healthCheckupType: "ECG Test",
    status: "Active",
    slotDate: "2025-01-21T09:30:00",
  },
  {
    orderId: "ORD004",
    healthCheckupType: "MRI Scan",
    status: "Active",
    slotDate: "2025-01-18T11:00:00",
  },
  {
    orderId: "ORD005",
    healthCheckupType: "Ultrasound",
    status: "Active",
    slotDate: "2025-01-22T13:30:00",
  },
  {
    orderId: "ORD006",
    healthCheckupType: "Blood Pressure Test",
    status: "Active",
    slotDate: "2025-01-19T16:00:00",
  },
  {
    orderId: "ORD007",
    healthCheckupType: "Chest X-Ray",
    status: "Active",
    slotDate: "2025-01-20T14:30:00",
  },
  {
    orderId: "ORD008",
    healthCheckupType: "CT Scan",
    status: "Active",
    slotDate: "2025-01-21T10:15:00",
  },
  {
    orderId: "ORD009",
    healthCheckupType: "Blood Sugar Test",
    status: "Active",
    slotDate: "2025-01-23T12:00:00",
  },
  {
    orderId: "ORD010",
    healthCheckupType: "ECG Test",
    status: "Active",
    slotDate: "2025-01-25T09:00:00",
  },
];
const pastOrders = [
  {
    orderId: "ORD011",
    healthCheckupType: "MRI Scan",
    status: "Completed",
    slotDate: "2025-01-10T11:00:00",
  },
  {
    orderId: "ORD012",
    healthCheckupType: "Ultrasound",
    status: "Completed",
    slotDate: "2025-01-05T15:00:00",
  },
  {
    orderId: "ORD013",
    healthCheckupType: "X-Ray",
    status: "Completed",
    slotDate: "2025-01-08T10:30:00",
  },
  {
    orderId: "ORD014",
    healthCheckupType: "Blood Test",
    status: "Completed",
    slotDate: "2025-01-07T14:00:00",
  },
  {
    orderId: "ORD015",
    healthCheckupType: "ECG Test",
    status: "Completed",
    slotDate: "2025-01-11T16:00:00",
  },
  {
    orderId: "ORD016",
    healthCheckupType: "Chest X-Ray",
    status: "Completed",
    slotDate: "2025-01-04T08:00:00",
  },
  {
    orderId: "ORD017",
    healthCheckupType: "Blood Pressure Test",
    status: "Completed",
    slotDate: "2025-01-02T10:00:00",
  },
  {
    orderId: "ORD018",
    healthCheckupType: "CT Scan",
    status: "Completed",
    slotDate: "2025-01-06T09:00:00",
  },
  {
    orderId: "ORD019",
    healthCheckupType: "MRI Scan",
    status: "Completed",
    slotDate: "2025-01-03T14:30:00",
  },
  {
    orderId: "ORD020",
    healthCheckupType: "Blood Sugar Test",
    status: "Completed",
    slotDate: "2025-01-09T12:00:00",
  },
];
const cancelled = [
  {
    orderId: "ORD021",
    healthCheckupType: "Blood Pressure Test",
    status: "Cancelled",
    slotDate: "2025-01-12T08:00:00",
  },
  {
    orderId: "ORD022",
    healthCheckupType: "CT Scan",
    status: "Cancelled",
    slotDate: "2025-01-14T13:00:00",
  },
  {
    orderId: "ORD023",
    healthCheckupType: "MRI Scan",
    status: "Cancelled",
    slotDate: "2025-01-16T14:30:00",
  },
  {
    orderId: "ORD024",
    healthCheckupType: "X-Ray",
    status: "Cancelled",
    slotDate: "2025-01-13T11:15:00",
  },
  {
    orderId: "ORD025",
    healthCheckupType: "Blood Test",
    status: "Cancelled",
    slotDate: "2025-01-15T09:00:00",
  },
  {
    orderId: "ORD026",
    healthCheckupType: "Ultrasound",
    status: "Cancelled",
    slotDate: "2025-01-17T10:00:00",
  },
  {
    orderId: "ORD027",
    healthCheckupType: "Blood Pressure Test",
    status: "Cancelled",
    slotDate: "2025-01-18T11:30:00",
  },
  {
    orderId: "ORD028",
    healthCheckupType: "ECG Test",
    status: "Cancelled",
    slotDate: "2025-01-19T08:45:00",
  },
  {
    orderId: "ORD029",
    healthCheckupType: "CT Scan",
    status: "Cancelled",
    slotDate: "2025-01-20T16:00:00",
  },
  {
    orderId: "ORD030",
    healthCheckupType: "MRI Scan",
    status: "Cancelled",
    slotDate: "2025-01-21T13:00:00",
  },
];

const orderTypeButtons = ["Active", "Past", "Cancelled"];
function Dashboard() {
  const [activeCard, setActiveCard] = useState(null);
  const [activeOrderType, setActiveOrderType] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [activeArray, setActiveArray] = useState([]);
  const [pastArray, setPastArray] = useState([]);
  const [cancelledArray, setCancelledArray] = useState([]);

  const [userDetails, setUserDetails] = useState({
    userName: "",
    userPhoneNumber: "",
  });
  const jwtToken = Cookies.get("jwtToken");
  useEffect(() => {
    const getBookingDetails = async () => {
      const bookingDetailsUrl = "http://127.0.0.1:5000/api/mybookings";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(bookingDetailsUrl, options);
      const currentDate = new Date();
      try {
        if (response.ok) {
          const fetchedBookDetails = await response.json();
          console.log(fetchedBookDetails);
          fetchedBookDetails.bookings.forEach((each) => {
            const convertedDate = new Date(each.slot_date);
            if (convertedDate > currentDate && each.status !== "cancelled") {
              setActiveArray((prev) => [...prev, each]);
            } else if (
              convertedDate < currentDate &&
              each.status !== "cancelled"
            ) {
              setPastArray((prev) => [...prev, each]);
            } else {
              setCancelledArray((prev) => [...prev, each]);
            }
          });
        }
      } catch (e) {
        console.log(e.message);
      }
      // const currentDate=new Date()
    };
    getBookingDetails();
  }, []);
  useEffect(() => {
    const getProfileDetails = async () => {
      const getUrl = "http://127.0.0.1:5000/api/get/profile";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(getUrl, options);
      try {
        if (response.ok) {
          const fetchDetails = await response.json();
          setUserDetails({
            userName: fetchDetails.profile.customer_name,
            userPhoneNumber: fetchDetails.profile.phone,
          });
        } else {
          console.log("user not found");
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    getProfileDetails();
  });

  const handleCardClick = (cardIndex) => {
    setActiveCard(cardIndex);
  };
  const onClickOrder = (e) => {
    setOrderType(e.target.value);
  };
  const generatePDF = (each, index) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("GeneretedPdf", 16, 20);
    let y = 40;
    if (userDetails) {
      doc.text(`Name:${userDetails.userName || "Not Provided"}`, 20, y);
      y += 20;
      doc.text(
        `phonNumber:${userDetails.userPhoneNumber || "Not Provided"} `,
        20,
        y
      );
      y += 20;
    }
    doc.text(`testNotes:${each.notes}`, 20, y);
    y += 20;
    // doc.text(`Status:${each.status}`,20,y)

    doc.text(`SlotDate:${each.slot_date}`, 20, y);
    doc.save(`usertestdetails.${index + 1}.pdf`);
  };
  //   const generatePDF = (each, index) => {
  //     const doc = new jsPDF();
  //     doc.setFontSize(16);
  //     doc.text('Generated PDF', 16, 20);

  //     let yPosition = 40; // Start at y = 40

  //     // Ensure userDetails is defined and available
  //     if (userDetails) {
  //         // Add Name and Phone Number, check if userDetails values exist
  //         doc.text(`Name: ${userDetails.userName || "Not Provided"}`, 20, yPosition);
  //         yPosition += 10; // Move down 10 units for the next line

  //         doc.text(`Phone Number: ${userDetails.userPhoneNumber || "Not Provided"}`, 20, yPosition);
  //         yPosition += 10; // Move down 10 units for the next line
  //     }

  //     // Ensure each.healthCheckupType exists and is a string
  //     if (each.healthCheckupType) {
  //         doc.text(`Test Name: ${each.healthCheckupType}`, 20, yPosition);
  //         yPosition += 10; // Move down 10 units for the next line
  //     }

  //     // Ensure each.status exists and is a string
  //     if (each.status) {
  //         doc.text(`Status: ${each.status}`, 20, yPosition);
  //         yPosition += 10; // Move down 10 units for the next line
  //     }

  //     // Ensure each.slotDate exists and is a valid string that can be split
  //     if (each.slotDate && typeof each.slotDate === 'string') {
  //         doc.text(`Slot Date: ${each.slotDate.split("T")[0]}`, 20, yPosition);
  //     } else {
  //         // If slotDate is invalid, we can fallback to "Not Provided"
  //         doc.text(`Slot Date: Not Provided`, 20, yPosition);
  //     }

  //     // Save the PDF with a dynamic filename based on the index
  //     doc.save(`usertestdetails.${index + 1}.pdf`);
  // }
  console.log(activeArray);
  console.log(pastArray);
  console.log(cancelledArray);

  return (
    <div className="dashboard-container">
      {/* Dashboard Heading */}
      <h1 className="dashboard-heading">MY DASHBOARD</h1>

      {/* Overall Content Column */}
      <div className="dashboard-content">
        {/* Cards Row */}
        <div className="card-row">
          {/* Profile Card */}
          <div
            className={`card-container ${
              activeCard === 0 ? "active-card" : ""
            }`}
            onClick={() => handleCardClick(0)}
          >
            <div className="profile-card">
              <img
                src="https://res.cloudinary.com/dkujcnlcs/image/upload/v1736413298/avatar_q2ud5d.png"
                alt="Profile"
                className="profile-img"
              />
              <div className="profile-info">
                <h5 className="profile-name">{userDetails.userName}</h5>
                {/* <p className="profile-email">karthik@gmail.com</p> */}
                <p className="profile-phone">{userDetails.userPhoneNumber}</p>
                <Link to="/myprofile">
                  <button className="edit-profile-btn">Edit Profile</button>
                </Link>
              </div>
            </div>
          </div>

          {/* My Bookings Card */}
          <div
            className={`card-container ${
              activeCard === 1 ? "active-card" : ""
            }`}
            onClick={() => handleCardClick(1)}
          >
            <div className="small-card">
              <img
                src="https://res.cloudinary.com/dkujcnlcs/image/upload/v1736413290/ic-mybooking_p2aqjk.webp"
                alt="Bookings"
                className="card-img"
              />
              <h5 className="card-title">My Bookings</h5>
            </div>
          </div>

          {/* My Sample Tracking Card */}
          <div
            className={`card-container ${
              activeCard === 2 ? "active-card" : ""
            }`}
            onClick={() => handleCardClick(2)}
          >
            <div className="small-card">
              <img
                src="https://res.cloudinary.com/dkujcnlcs/image/upload/v1736413277/ic-sample-track_yoygzo.webp"
                alt="Sample Tracking"
                className="card-img"
              />
              <h5 className="card-title">My Sample Tracking</h5>
            </div>
          </div>

          {/* My Reports Card */}
          <div
            className={`card-container ${
              activeCard === 3 ? "active-card" : ""
            }`}
            onClick={() => handleCardClick(3)}
          >
            <div className="small-card">
              <img
                src="https://res.cloudinary.com/dkujcnlcs/image/upload/v1736413080/qba7a4rmntgraaukkced.webp"
                alt="Reports"
                className="card-img"
              />
              <h5 className="card-title">My Reports</h5>
            </div>
          </div>
        </div>

        {/* Conditional Rendering of Additional Cards */}
        {activeCard === 1 && (
          <div className="order-history-card">
            <h3 className="order-history-title">Order History</h3>
            <input
              type="text"
              className="search-input"
              placeholder="Search Orders"
            />
            <hr style={{ border: "1px solid black", width: "100%" }} />
            <div className="order-type-section">
              <div className="order-buttons-container">
                {orderTypeButtons.map((eachItem) => (
                  <button
                    className="order-button"
                    value={eachItem}
                    onClick={onClickOrder}
                  >
                    {eachItem}
                  </button>
                ))}
              </div>

              <table style={{ width: "100%", border: "1px solid black" }}>
                <thead style={{ border: "1px solid black" }}>
                  <tr style={{ border: "1px solid black" }}>
                    <th
                      style={{ border: "1px solid black" }}
                      className="text-center"
                    >
                      S.No
                    </th>
                    <th
                      style={{ border: "1px solid black" }}
                      className="text-center"
                    >
                      Notes
                    </th>

                    <th
                      style={{ border: "1px solid black" }}
                      className="text-center"
                    >
                      Date
                    </th>
                    <th
                      style={{ border: "1px solid black" }}
                      className="text-center"
                    >
                      Download
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderType === "Active" &&
                    activeArray.map((each, index) => {
                      const isoDate = new Date(each.slot_date);
                      const convertedisoDate = isoDate.toISOString();

                      return (
                        <tr style={{ border: "1px solid black" }}>
                          <td
                            style={{ border: "1px solid black" }}
                            className="text-center"
                          >
                            {index + 1}
                          </td>
                          <td
                            style={{ border: "1px solid black" }}
                            className="text-center"
                          >
                            {each.notes}
                          </td>
                          {/* <td style={{border:"1px solid black"}} className='text-center'>{each.status}</td> */}
                          <td
                            style={{ border: "1px solid black" }}
                            className="text-center"
                          >
                            {convertedisoDate.split("T")[0]}
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              width: "100px",
                              borderWidth: "0px",
                              borderRadius: "10px",
                            }}
                            className="m-3"
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                              }}
                              className="btn btn-danger m-3"
                              onClick={() => generatePDF(each, index)}
                            >
                              Download
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  {orderType === "Past" &&
                    pastArray.map((each, index) => {
                      const isoDate = new Date(each.slot_date);
                      const convertedisoDate = isoDate.toISOString();
                      return (
                        <tr style={{ border: "1px solid black" }}>
                          <td
                            style={{ border: "1px solid black" }}
                            className="text-center"
                          >
                            {index + 1}
                          </td>
                          {/* <td style={{border:"1px solid black"}} className='text-center'>{each.healthCheckupType}</td> */}
                          <td
                            style={{ border: "1px solid black" }}
                            className="text-center"
                          >
                            {each.notes}
                          </td>
                          <td
                            style={{ border: "1px solid black" }}
                            className="text-center"
                          >
                            {convertedisoDate.split("T")[0]}
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              width: "100px",
                              borderWidth: "0px",
                              borderRadius: "10px",
                            }}
                            className="m-3"
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                              }}
                              className="btn btn-danger m-3"
                              onClick={() => generatePDF(each, index)}
                            >
                              Download
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  {orderType === "Cancelled" &&
                    cancelledArray.map((each, index) => {
                      const isoDate = new Date(each.slot_date);
                      const convertedisoDate = isoDate.toISOString();

                      return (
                        <tr style={{ border: "1px solid black" }}>
                          <td
                            style={{ border: "1px solid black" }}
                            className="text-center"
                          >
                            {index + 1}
                          </td>
                          <td
                            style={{ border: "1px solid black" }}
                            className="text-center"
                          >
                            {each.notes}
                          </td>
                          {/* <td style={{border:"1px solid black"}} className='text-center'>{each.status}</td> */}
                          <td
                            style={{ border: "1px solid black" }}
                            className="text-center"
                          >
                            {convertedisoDate.split("T")[0]}
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              width: "100px",
                              borderWidth: "0px",
                              borderRadius: "10px",
                            }}
                            className="m-3"
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                              }}
                              className="btn btn-danger m-3"
                              onClick={() => generatePDF(each, index)}
                            >
                              Download
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div></div>
            </div>
            {activeOrderType && (
              <p className="order-details">
                Details of your {activeOrderType} orders.
              </p>
            )}
          </div>
        )}

        {activeCard === 2 && (
          <div className="tracking-card">
            <h3 className="tracking-title">Tracking</h3>
            <p className="tracking-message">No orders in progress...</p>
          </div>
        )}

        {activeCard === 3 && (
          <div className="reports-card order-history-card">
            <h3 className="order-history-title">My Reports</h3>
            <h6 className="patient-name">Kartheek</h6>
            <table className="reports-table">
              <thead>
                <tr style={{ marginLeft: "20px" }}>
                  <th style={{ marginLeft: "20px" }}>Registration ID</th>
                  <th style={{ marginLeft: "20px" }}>Date</th>
                  <th style={{ marginLeft: "20px" }}>Download Report</th>
                </tr>
              </thead>

              <hr style={{ border: "1px solid black", width: "250%" }} />

              {/* <hr style={{border:"1px solid black",width:"100%"}}/> */}
              <tbody>
                <tr>
                  <td colSpan="3" className="text-center">
                    No reports available
                  </td>
                </tr>
              </tbody>
            </table>
            <hr style={{ border: "1px solid black", width: "100%" }} />
            <div className="note">
              <small>Note: Only Lab reports are available online</small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
