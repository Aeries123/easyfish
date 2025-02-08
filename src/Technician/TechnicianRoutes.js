import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import TechnicianDashboard from "./components/TechnicianDashboard";
// import ManageSamples from "./components/ManageSamples";
// import TestAssignments from "./components/TestAssignments";
// import TechnicianProfile from "./components/TechnicianProfile";
import TechnicianSidebar from "./TechnicianSidebar";
// import Footer from "./components/Footer";
import TechnicianHeader from "./TechnicianHeader";
import TechnicianLogin from "./components/TechnicianLogin";
import TechnicianRegistration from "./components/TechnicianRegistration";
// import TechnicianReports from "./components/TechnicianReports";
import "./TechnicianRoutes.css";

const TechnicianRoutes = () => {
  const location = useLocation(); // Get the current location
  
  // Check if the current route is the login page
  const isLoginPage = location.pathname === "/technician/login";

  return (
    <div>
      <div className="technician-route-app-container">
        {!isLoginPage && (
          <div>
            <TechnicianSidebar className="technician-route-sidebar" />
            <TechnicianHeader />
          </div>
        )}
        <div
          className="technician-route-card-container"
          style={{ alignSelf: "flex-start" }}
        >
          <Routes>
            <Route path="/technician/" element={<TechnicianDashboard />} />
            <Route path="/technician/login" element={<TechnicianLogin />} />
            {/* <Route path="/technician/manage-samples" element={<ManageSamples />} /> */}
            {/* <Route path="/technician/test-assignments" element={<TestAssignments />} /> */}
            {/* <Route path="/technician/profile" element={<TechnicianProfile />} /> */}
            {/* <Route path="/technician/reports" element={<TechnicianReports />} /> */}
          </Routes>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default TechnicianRoutes;
