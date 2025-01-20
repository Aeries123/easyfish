
// import Header from "./Header"
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import Dashboard from "./Dashboard/dashboard"
// import Samplecollection from "./Samplecollection/sample_collection";
// import Uploadprofile from "./Uploadprofile/upload_profile";


// import Tests from "./tests"
// function App(){
//     return(
//       <div className="app">
//       <Header />
//       <div className="main">
//         <Sidebar />
//         <div className="content">
//           <h2>Welcome to My Website</h2>
//           <p>Click on the links in the sidebar to navigate.</p>
//         </div>
//       </div>
//     </div>
      
//     )
// }
// {/* <App/>//TAG notation */}






// export default App

import React from "react";
import Review from "./Review";
import Dashboard from "./Dashboard/dashboard";
import ManageAppointment from "./ManageAppointment";
import ManageCategory from "./ManageCategory";
import ManageCustomer from "./ManageCustomer";
// import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Appointment from "./Appointment"; // Import the Appointment component
import Header from "./Header"; // Import the Header component
// import TestsForm from "./tests"; // Import the TestsForm component
import Adminform from "./Adminform"; // Import the Adminform component
import Bookings from "./Bookings"; // Import the Bookings component
import LabTechnicianForm from "./LabTechnicianForm"; 
import Payment from "./Payment"; 
import Addresses from "./addresses";
import Notification from "./Notification";
import Testresults from "./Testresults";
import TestParameters from "./TestParameters";
import TestSampleTypes from "./Test_sample_types";
import TimeSlots from "./Time_slots";
import Users from "./Users";
import Category from "./Category"; // Corrected import for Testresults
// import Customer from "./Customer"; // Import the Customer component
import Sidebar from "./Sidebar"; // Uncomment if you want to use Sidebar
import Footer from "./Footer"; // Uncomment if you want to use Footer
import "./App.css"; // Import styles
import ManageBooking from './ManageBooking';
import ManageNotification from "./ManageNotification";
import ManageAdmin from "./ManageAdmin";
import ManageAddress from "./ManageAddress";
import ManageReview from "./ManageReview";
import ManagePayment from "./ManagePayment";
import ManageTestResults from "./ManageTestResults";
import ManageTests from "./ManageTests";
import Timeslots from "./Timeslots";
import AppointmentSummary from "./AppointmentSummary";
import ManageTestParameters from "./ManageTestParameters";
import ManageTestSampleTypes from "./ManageTestSampleTypes";
import ManageTestVisitTypes from "./manageTestVisitTypes";
import ManageTimeSlots from "./ManageTimeSlots"; 
import ManageUsers from "./manageUsers"; 

const App = () => {
  return (
    <div className="app">
      {/* <Header /> Display the Header component */}
      <div className="main">
        {/* <ManageCategory/> */}
        {/* <ManageTestSampleTypes/> */}
        {/* <ManageTestVisitTypes/> */}
        {/* <ManageTimeSlots/> */}
        {/* <ManageUsers/> */}
        {/* <ManageTestParameters/> */}
        {/* <Timeslots/> */}
        {/* <AppointmentSummary/> */}
        <Header/>
        <Sidebar/>
        {/* <Footer/>  */}
        {/* <ManageTests/> */}
        {/* <Appointment/> */}
        {/* <Category/> */}
        {/* <Adminform/>
        <ManageAdmin/> */}
        {/* <Bookings/> */}
        {/* <ManageBooking/> */}
        {/* <Appointment/> */}
        {/* <ManageAppointment/> */}
        {/* <Bookings/>
        <ManageBooking/> */}
        {/* Uncomment Sidebar if needed */}
        {/* <Sidebar /> */}
        {/* Uncomment components below as required */}
        {/* <Appointment /> */}
        {/* <TestsForm /> */}
        {/* <Bookings /> Display the Bookings component */}
        {/* <Customer /> */}
        {/* <Notification/> */}
        {/* <Payment/> */}
        {/* <Category/> */}
        {/* <TestParameters/> */}
        {/* <TestSampleTypes/> */}
        {/* <TimeSlots/> */}
        {/* <Users/> */}
        {/* <Testresults /> Display the Testresults component */}
        {/* <LabTechnicianForm/> */}
        {/* Display the Customer component */}
      </div>
      {/* Uncomment Footer if needed */}
      {/* <Footer /> */}
    </div>
  );
};

export default App;




