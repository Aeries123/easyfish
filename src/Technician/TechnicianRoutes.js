import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import TechnicianDashboard from "./components/TechnicianDashboard";
import TechnicianSidebar from "./TechnicianSidebar";
import TechnicianHeader from "./TechnicianHeader";
import TechnicianLogin from "./components/TechnicianLogin";
import TechnicianVerifyOTP from "./components/TechnicianVerifyOtp";
import TechnicianRegistration from "./components/TechnicianRegistration";
import ManageAssignedTechnician from "./components/ManageAssignedTechnician";
import TechnicianPasswordLogin from "./components/TechnicianPasswordLogin";
import ViewTechnicianDashboard from "./components/ViewTechnicianDashboard";
import ApplyLeave from "./components/ApplyLeave";
import ViewLeaves from "./ViewLeave";
import "./TechnicianRoutes.css";

const TechnicianRoutes = () => {
  const location = useLocation(); // Get the current location
  const isLoginPage = location.pathname === "/technician/login";

  return (
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
          <Route path="/technician/send-otp" element={<TechnicianLogin />} />
          <Route
            path="/technician/login"
            element={<TechnicianPasswordLogin />}
          />
          <Route
            path="/technician/verify-otp"
            element={<TechnicianVerifyOTP />}
          />
          <Route
            path="/technician/register"
            element={<TechnicianRegistration />}
          />
          <Route
            path="/admin/manage-asssigned-technician"
            element={<ManageAssignedTechnician />}
          />
          <Route
            path="/technician-details/:appointmentId"
            element={<ViewTechnicianDashboard />}
          />
          <Route
            path="/technician/apply-leave"
            element={<ApplyLeave />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default TechnicianRoutes;
