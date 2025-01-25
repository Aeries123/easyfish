import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerSignup from "./components/customersignup/customersignup";
import CustomerLogin from "./components/customerlogin/customerlogin";
import Home from "./components/Homepage/home";
import VerifyOTP from "./components/VerifyOtp/VerifyOtp";
import { Header } from "./components/Header/header";
import { Footer } from "./components/Footer/footer";
import AboutUs from "./components/AboutUs/AboutUs";
import ServiceDetail from "./components/ServiceDetails/ServiceDetails";
import Tests from "./components/BookTests/Tests";
import Dashboard from "./components/Dashboard/dashboard";
import { AllTestsPage } from "./components/AllTests/alltests";
import Samplecollection from "./components/SampleCollection/sample_collection";
import Cart from "./components/Cart/cart";
import Prescription from "./components/Presciption/Prescption";
import TestReports from "./components/DownloadReport/download";
import Test from "./components/Test/Test";
import { AuthProvider } from "./components/Context/AuthContext";
import MyProfile from "./components/MyProfile/MyProfile";
import OrderDetailsPage from "./components/OrderDetailsPage";
import Banner from "./components/Banner/Banner";
import CustomerAddress from "./components/CustomerAddress";
import ScrollTest from "./components/ScrollTest";
import UserBookingDetails from "./components/BookingDetails";
import { useState } from "react";

function CustomerRoutes() {
  const [cartData, setCartData] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);

  return (
    <>
      <AuthProvider>
        <Header />
        <div className="customer-route-app-container">
          <Routes>
            <Route path="/customer/login" element={<CustomerLogin />} />
            <Route path="/customer/register" element={<CustomerSignup />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route
              path="/"
              element={
                <Home
                  cartData={cartData}
                  setCartData={setCartData}
                  clickedIds={clickedIds}
                  setClickedIds={setClickedIds}
                />
              }
            />
            <Route
              path="/book-test"
              element={
                <Tests
                  cartData={cartData}
                  setCartData={setCartData}
                  clickedIds={clickedIds}
                  setClickedIds={setClickedIds}
                />
              }
            />

            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/service/:serviceId" element={<ServiceDetail />} />
            <Route path="/my-dashboard" element={<Dashboard />} />
            <Route path="/test/menu" element={<AllTestsPage />} />
            <Route path="/sample" element={<Samplecollection />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cartData={cartData}
                  setCartData={setCartData}
                  clickedIds={clickedIds}
                  setClickedIds={setClickedIds}
                />
              }
            />
            {/* <Route path="/prescption" element={<Prescription />} /> */}
            <Route path="/reports" element={<TestReports />} />
            <Route path="/test" element={<Test />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route
              path="/orders/page"
              element={
                <OrderDetailsPage
                  cartData={cartData}
                  setCartData={setCartData}
                  clickedIds={clickedIds}
                  setClickedIds={setClickedIds}
                />
              }
            />
            <Route path="/add-address" element={<CustomerAddress />} />
            <Route path="/scroll-test" element={<ScrollTest />} />
            <Route path="/booking-details" element={<UserBookingDetails />} />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default CustomerRoutes;
