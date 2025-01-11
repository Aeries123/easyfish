import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerSignup from "./customersignup/customersignup";
import CustomerLogin from "./customerlogin/customerlogin";
import Home from "./Homepage/home";
import VerifyOTP from "./VerifyOtp/VerifyOtp";
import { Header } from "./Header/header";
import { Footer } from "./Footer/footer";
import AboutUs from "./AboutUs/AboutUs";
import ServiceDetail from "./ServiceDetails/ServiceDetails";
import Tests from "./Tests/Tests";
import Dashboard from "./Dashboard/dashboard";
import "./App.css";
import { AllTestsPage } from "./AllTests/alltests";
import Samplecollection from "./SampleCollection/sample_collection";
import Cart from "./Cart/cart";
import Prescription from "./Presciption/Prescption";
import TestReports from "./DownloadReport/download";

import { useState } from "react";


function App() {
  const [cartData,setCartData] =useState([])

  return (
    <>
      <Router>
        <Header />
        <div className="app-container">
          <Routes>
            <Route path="/customer/login" element={<CustomerLogin />} />
            <Route path="/customer/register" element={<CustomerSignup />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/" element={<Home setCartData={setCartData} />} />
            <Route path="/book-test" element={<Tests />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/service/:serviceId" element={<ServiceDetail />} />
            <Route path="/my-dashboard" element={<Dashboard />} />
            <Route path="/test/menu" element={<AllTestsPage />} />
            <Route path="/sample" element={<Samplecollection />} />
            <Route path="/cart" element={<Cart cartData={cartData} setCartData={setCartData} />} />
            <Route path="/prescption" element={<Prescription />} />
            <Route path="/reports" element={<TestReports />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
