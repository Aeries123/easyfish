import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";

const orderTypeButtons = ["Active", "Past", "Cancelled"];
function Dashboard() {
  const [activeCard, setActiveCard] = useState(null);
  const [activeOrderType, setActiveOrderType] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [activeArray, setActiveArray] = useState([]);
  const [pastArray, setPastArray] = useState([]);
  const [cancelledArray, setCancelledArray] = useState([]);
  const technicianDetails = {
    technician: {
      id: 1,
      name: "John Doe",
      phone: "+1 555-1234",
      location: "New York, NY",
      status: "On the way",
      current_latitude: 40.7128,
      current_longitude: -74.006,
      assigned_task: {
        task_id: 101,
        task_type: "Home Sample Collection",
        appointment_id: 1001,
        patient_name: "Alice Smith",
        patient_phone: "+1 555-9876",
        patient_address: "123 Maple St, New York, NY",
        status: "In Progress",
        scheduled_time: "2025-01-25 10:00",
        sample_type: "Blood",
        delivery_time: "2025-01-25 11:00",
      },
    },
  };

  console.log("active", activeArray);
  console.log("past", pastArray);
  console.log("cancelled", cancelledArray);
  console.log("orderType", orderType);
  const registrations = [
    { registeredId: 1001, date: "2025-01-10", reportLink: "#" },
    { registeredId: 1002, date: "2025-01-12", reportLink: "#" },
    { registeredId: 1003, date: "2025-01-15", reportLink: "#" },
    { registeredId: 1004, date: "2025-01-18", reportLink: "#" },
    { registeredId: 1005, date: "2025-01-20", reportLink: "#" },
  ];

  const [userDetails, setUserDetails] = useState({
    userName: "",
    userPhoneNumber: "",
  });
  const active = [];
  const past = [];
  const cancel = [];
  const jwtToken = Cookies.get("jwtToken");

  useEffect(() => {
    const getBookingDetails = async () => {
      const BookingUrl = "http://127.0.0.1:5000/api/get-appointments";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const fetchDetails = await fetch(BookingUrl, options);

      if (fetchDetails.ok) {
        const getDetails = await fetchDetails.json();
        console.log("getDetails", getDetails);
        getDetails.forEach((each) => {
          const convertedDate = new Date(each.slot_date);
          const currentDate = new Date();
          if (convertedDate >= currentDate && each.status !== "cancelled") {
            active.push(each);
          } else if (
            convertedDate < currentDate &&
            each.status !== "cancelled"
          ) {
            past.push(each);
          } else if (each.status === "cancelled") {
            cancel.push(each);
          }
        });
      }
      setActiveArray(active);
      setPastArray(past);
      setCancelledArray(cancel);
    };
    getBookingDetails();
  }, []);

  // useEffect(() => {
  //   const getProfileDetails = async () => {
  //     const getUrl = "http://127.0.0.1:5000/api/get/profile";
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${jwtToken}`,
  //       },
  //     };
  //     const response = await fetch(getUrl, options);
  //     try {
  //       if (response.ok) {
  //         const fetchDetails = await response.json();
  //         setUserDetails({
  //           userName: fetchDetails.profile.customer_name,
  //           userPhoneNumber: fetchDetails.profile.phone,
  //         });
  //       } else {
  //         console.log("user not found");
  //       }
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   };
  //   getProfileDetails();
  // });

  const handleCardClick = (cardIndex) => {
    setActiveCard(cardIndex);
  };
  const onClickOrder = (e) => {
    setOrderType(e.target.value);
  };
  console.log("userDetails", userDetails);

  const generatePDF = (each, index) => {
    console.log(each, each);
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setTextColor("blue");
    // Full page (A4 size)

    let y = 20;

    doc.text("GeneratedPdf", 16, y);
    y += 20;

    if (userDetails) {
      doc.text(`Name: ${userDetails.userName}`, 16, y);
      y += 20;

      doc.text(`phoneNumber: ${userDetails.userPhoneNumber}`, 16, y);
    }
    y += 20;
    if (each) {
      doc.text(`Test Name: `, 16, y);
      each.test_names.forEach((each) => {
        y += 20;

        doc.text(`.${each}`, 16, y);
      });

      y += 20;
      doc.text(`Date: ${each.slot_date}`, 16, y);
      y += 20;

      doc.text(`Price: ${each.total_price}/-`, 16, y);
      y += 20;

      doc.text("Thank You and Visit again", 16, y);
      y += 20;

      doc.save(`userDetails. ${index + 1}.pdf`);
    }
  };

  console.log(activeArray);
  console.log(pastArray);
  console.log(cancelledArray);

  return (
    <div className="customer-dashboard-container">
      {/* Dashboard Heading */}
      <h1 className="customer-dashboard-heading">MY DASHBOARD</h1>

      {/* Overall Content Column */}
      <div className="customer-dashboard-content">
        {/* Cards Row */}
        <div className="customer-dashboard-card-row">
          {/* Profile Card */}
          <div
            className={`customer-dashboard-card-container ${
              activeCard === 0 ? "customer-dashboard-active-card" : ""
            }`}
            onClick={() => handleCardClick(0)}
          >
            <div
              className="customer-dashboard-profile-card"
              style={{ width: "300px" }}
            >
              <img
                src="https://res.cloudinary.com/dkujcnlcs/image/upload/v1736413298/avatar_q2ud5d.png"
                alt="Profile"
                className="customer-dashboard-profile-img"
              />
              <div className="customer-dashboard-profile-info">
                <h5 className="customer-dashboard-profile-name">
                  {userDetails.userName}
                </h5>
                <p className="customer-dashboard-profile-phone">
                  {userDetails.userPhoneNumber}
                </p>
                <Link to="/myprofile">
                  <button className="customer-dashboard-edit-profile-btn">
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* My Bookings Card */}
          <div
            className={`${
              activeCard === 1 ? "customer-dashboard-active-card" : ""
            }`}
            onClick={() => handleCardClick(1)}
          >
            <div
              className="customer-dashboard-small-card"
              style={{ width: "300px" }}
            >
              <img
                src="https://res.cloudinary.com/dkujcnlcs/image/upload/v1736413290/ic-mybooking_p2aqjk.webp"
                alt="Bookings"
                className="customer-dashboard-card-img"
                style={{ width: "90%" }}
              />
              <h5 className="customer-dashboard-card-title">My Bookings</h5>
            </div>
          </div>

          {/* My Sample Tracking Card */}
          <div
            className={` ${
              activeCard === 2 ? "customer-dashboard-active-card" : ""
            }`}
            onClick={() => handleCardClick(2)}
          >
            <div
              className="customer-dashboard-small-card"
              style={{ width: "300px" }}
            >
              <img
                src="https://res.cloudinary.com/dkujcnlcs/image/upload/v1736413277/ic-sample-track_yoygzo.webp"
                alt="Sample Tracking"
                className="customer-dashboard-card-img"
              />
              <h5 className="customer-dashboard-card-title">
                My Sample Tracking
              </h5>
            </div>
          </div>

          <div
            className={` ${
              activeCard === 3 ? "customer-dashboard-active-card" : ""
            }`}
            onClick={() => handleCardClick(3)}
          >
            <div
              className="customer-dashboard-small-card"
              style={{ width: "300px" }}
            >
              <img
                src="https://res.cloudinary.com/dkujcnlcs/image/upload/v1736413080/qba7a4rmntgraaukkced.webp"
                alt="Reports"
                className="customer-dashboard-card-img"
                style={{ width: "90%" }}
              />
              <h5 className="customer-dashboard-card-title">My Reports</h5>
            </div>
          </div>
        </div>

        {/* Conditional Rendering of Additional Cards */}
        {activeCard === 1 && (
          <div className="customer-dashboard-order-history-card">
            <h3 className="customer-dashboard-order-history-title">
              Order History
            </h3>
            <input
              type="text"
              className="customer-dashboard-search-input"
              placeholder="Search Orders"
            />
            <hr style={{ border: "1px solid black", width: "100%" }} />
            <div className="customer-dashboard-order-type-section">
              <div className="customer-dashboard-order-buttons-container">
                {orderTypeButtons.map((eachItem) => (
                  <button
                    className="customer-dashboard-order-button"
                    value={eachItem}
                    onClick={onClickOrder}
                  >
                    {eachItem}
                  </button>
                ))}
              </div>

              <table>
                <thead style={{ border: "1px solid black" }}>
                  <tr
                    style={{ border: "1px solid black" }}
                    className="customer-data"
                  >
                    <th
                      style={{ border: "1px solid black" }}
                      className="customer-dashboard-text-center text-center customer-data"
                    >
                      S.No
                    </th>
                    <th
                      style={{ border: "1px solid black" }}
                      className="customer-dashboard-text-center text-center customer-data"
                    >
                      Test Name
                    </th>

                    <th
                      style={{ border: "1px solid black" }}
                      className="customer-dashboard-text-center text-center customer-data"
                    >
                      Date
                    </th>
                    {/* <th style={{ border: "1px solid black" }}
                      className="customer-dashboard-text-center text-center">
                      Time
                    </th>*/}
                    <th
                      style={{ border: "1px solid black" }}
                      className="customer-dashboard-text-center text-center customer-data"
                    >
                      Price
                    </th>
                    <th
                      style={{ border: "1px solid black" }}
                      className="customer-dashboard-text-center text-center customer-data"
                    >
                      Download
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderType === "Active" &&
                    activeArray.map((each, index) => {
                      return (
                        <tr style={{ border: "1px solid black" }}>
                          <td
                            style={{ border: "1px solid black" }}
                            className="customer-dashboard-text-center text-center customer-data"
                          >
                            {index + 1}
                          </td>
                          <td
                            style={{ border: "1px solid black" }}
                            className="customer-dashboard-text-center text-center customer-data"
                          >
                            {each.test_names.map((each) => (
                              <strong className="customer-data">{each}</strong>
                            ))}
                          </td>
                          <td
                            style={{ border: "1px solid black" }}
                            className="customer-dashboard-text-center text-center customer-data"
                          >
                            {each.slot_date}
                          </td>
                          {/* <td style={{ border: "1px solid black" }}
                            className="customer-dashboard-text-center text-center">
                              {each.time}

                          </td> */}
                          <td
                            style={{ border: "1px solid black" }}
                            className="customer-dashboard-text-center text-center customer-data"
                          >
                            {each.total_price}/-
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              width: "100px",
                              borderWidth: "0px",
                              borderRadius: "10px",
                            }}
                            className="m-3 text-center customer-data"
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                              }}
                              className="btn btn-danger m-3 customer-data btn-font-size"
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
                      // const isoDate = new Date(each.slot_date);
                      // const convertedisoDate = isoDate.toISOString();

                      return (
                        <tr style={{ border: "1px solid black" }}>
                          <td
                            style={{ border: "1px solid black" }}
                            className="customer-dashboard-text-center text-center customer-data"
                          >
                            {index + 1}
                          </td>
                          <td
                            style={{ border: "1px solid black" }}
                            className="customer-dashboard-text-center text-center customer-data"
                          >
                            {each.test_names.map((each) => (
                              <strong className="customer-data">{each}</strong>
                            ))}
                          </td>
                          <td
                            style={{ border: "1px solid black" }}
                            className="customer-dashboard-text-center text-center customer-data"
                          >
                            {each.slot_date}
                          </td>
                          {/* <td style={{ border: "1px solid black" }}
                            className="customer-dashboard-text-center text-center">
                              {each.time}

                          </td> */}
                          <td
                            style={{ border: "1px solid black" }}
                            className="customer-dashboard-text-center text-center customer-data"
                          >
                            {each.total_price}/-
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              width: "100px",
                              borderWidth: "0px",
                              borderRadius: "10px",
                            }}
                            className="m-3 text-center customer-data"
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                              }}
                              className="btn btn-danger m-3 customer-data btn-font-size"
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
                      // const isoDate = new Date(each.slot_date);
                      // const convertedisoDate = isoDate.toISOString();

                      return (
                        <tr style={{ border: "1px solid black" }}>
                          <td
                            style={{ border: "1px solid black" }}
                            className="customer-dashboard-text-center text-center customer-data"
                          >
                            {index + 1}
                          </td>
                          <td
                            style={{ border: "1px solid black" }}
                            className="customer-dashboard-text-center text-center customer-data"
                          >
                            {each.test_names.map((each) => (
                              <strong className="customer-data">{each}</strong>
                            ))}
                          </td>
                          <td
                            style={{ border: "1px solid black" }}
                            className="customer-dashboard-text-center text-center customer-data"
                          >
                            {each.slot_date}
                          </td>
                          {/* <td style={{ border: "1px solid black" }}
                            className="customer-dashboard-text-center text-center">
                              {each.time}

                          </td> */}
                          <td
                            style={{ border: "1px solid black" }}
                            className="customer-dashboard-text-center text-center customer-data"
                          >
                            {each.total_price}/-
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              width: "100px",
                              borderWidth: "0px",
                              borderRadius: "10px",
                            }}
                            className="m-3 text-center btn-font-size"
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                              }}
                              className="btn btn-danger m-3 btn-font-size"
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
            </div>
          </div>
        )}

        {/* More cards with same updates */}
      </div>
      {activeCard === 2 && (
        <div className="customer-dashboard-tracking-card">
          <table className="tableStyle">
            <thead>
              <tr className="headerRow">
                <th className="cellStyle">S.No</th>
                <th className="cellStyle">Technician Name</th>
                <th className="cellStyle">Phone Number</th>
                <th className="cellStyle">Status</th>
                <th className="cellStyle">Sample Type</th>
                <th className="cellStyle">Sample Collection Status</th>
                <th className="cellStyle">Delivery Time</th>
              </tr>
            </thead>
            <tbody>
              <tr className="dataRow">
                <td className="cellStyle">1</td>
                <td className="cellStyle">
                  {technicianDetails.technician.name}
                </td>
                <td className="cellStyle">
                  {technicianDetails.technician.phone}
                </td>
                <td className="cellStyle">
                  {technicianDetails.technician.status}
                </td>
                <td className="cellStyle">
                  {technicianDetails.technician.assigned_task.sample_type}
                </td>
                <td className="cellStyle">
                  {technicianDetails.technician.assigned_task.status}
                </td>
                <td className="cellStyle">
                  {technicianDetails.technician.assigned_task.delivery_time}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {activeCard === 3 && (
        <div className="customer-dashboard-reports-card order-history-card">
          <h3 className="customer-dashboard-order-history-title">My Reports</h3>
          <h6 className="customer-dashboard-patient-name">
            {userDetails.userName}
          </h6>
          <table border="1" cellPadding="10">
            <thead>
              <tr className="headerRow">
                <th className="cellStyle">Registered ID</th>
                <th className="cellStyle">Date</th>
                <th className="cellStyle">Download Report</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((registration, index) => (
                <tr key={index} className="dataRow">
                  <td className="cellStyle">{registration.registeredId}</td>
                  <td className="cellStyle">{registration.date}</td>
                  <td className="cellStyle">
                    <a
                      href={registration.reportLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr style={{ border: "1px solid black", width: "100%" }} />
          <div className="customer-dashboard-note">
            <small>Note: Only Lab reports are available online</small>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
