import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
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
import CustomerAddress from "./components/CustomerAddress";
import UserBookingDetails from "./components/BookingDetails";
import ForgotPassword from "./components/CustomerForgotPassword";
import { ViewBookings } from "./components/ViewBooking/view_Booking";
import { ParticularTest } from "./components/ParticularTest/ParticularTest";
import { ParticularPackage } from "./components/ParticularPackage/ParticularPackage";
import Cookies from "js-cookie"; // Import js-cookie

function CustomerRoutes() {
  // const [cartData, setCartData] = useState([]);
  // const [clickedIds, setClickedIds] = useState([]);
  // const [cartData, setCartData] = useState([]);
  // const [clickedIds, setClickedIds] = useState([]);
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cartData")) || []
  );
  const [clickedIds, setClickedIds] = useState(
    JSON.parse(localStorage.getItem("clickedIds")) || []
  );
  const [healthPackages, setHealthPackages] = useState([]);
  const [packagesClickedIds, setPackagesClickedIds] = useState(
    JSON.parse(localStorage.getItem("packagesClickedIds")) || []
  );
  console.log(packagesClickedIds, "packagesIds");
  console.log(healthPackages, "healthPackages");

  console.log(cartData, "lkujhyv fjkbhb");
  const token = Cookies.get("jwtToken"); // Get token from cookies

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
    // updateCartInBackend();
  }, [cartData]);
  useEffect(() => {
    localStorage.setItem(
      "packagesClickedIds",
      JSON.stringify(packagesClickedIds)
    );
  }, [packagesClickedIds]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/packages");
        const data = await response.json();
        setHealthPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    localStorage.setItem("clickedIds", JSON.stringify(clickedIds));
  }, [clickedIds]);

  const updateCartInBackend = async () => {
    if (cartData.length === 0) return; // Avoid sending empty updates

    const testIds = cartData.map((item) => item.test_id); // Extract test IDs

    try {
      const response = await axios.post(
        "http://localhost:5000/api/add-to-cart",
        { test_ids: testIds, total_price: cartTotal },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        console.log("Cart data updated successfully in the backend");
      }
    } catch (error) {
      console.error("Error updating cart data:", error);
    }
  };

  // useEffect(() => {
  //   const fetchCartData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/get-cart", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       // const data = await response.json();
  //       console.log(response.data, "uyvwfgbiubhkj");
  //       setCartData(response.data.test_details || []);
  //       setClickedIds(response.data.cartData.map((item) => item.id) || []);
  //     } catch (error) {
  //       console.error("Error fetching cart data:", error);
  //     }
  //   };

  //   fetchCartData();
  // }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const total = cartData.reduce(
        (sum, item) => sum + Number(item.price || 0),
        0
      );
      setCartTotal(total);
    };
    calculateTotal();
  }, [cartData]);

  const addToCart = async (testItem) => {
    try {
      console.log("clicked2");
      const response = await axios.post(
        "http://localhost:5000/api/add-to-cart",
        {
          test_ids: testItem.test_id,
          total_price: cartTotal, // Sending total price
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setCartData((prev) => [...prev, testItem]);
        setClickedIds((prev) => [...prev, testItem.id]);
      }
    } catch (error) {
      console.error("Error adding test to cart:", error);
    }
  };

  return (
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
                addToCart={addToCart} // Pass addToCart function
                healthPackages={healthPackages}
                setPackagesClickedIds={setPackagesClickedIds}
                packagesClickedIds={packagesClickedIds}
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
                // addToCart={addToCart} // Pass addToCart function
              />
            }
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/service/:serviceId" element={<ServiceDetail />} />
          <Route
            path="/particular/package/:package_id"
            element={<ParticularPackage />}
          />
          <Route
            path="/my-dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
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
                packagesClickedIds={packagesClickedIds}
                setPackagesClickedIds={setPackagesClickedIds}
                healthPackages={healthPackages}
              />
            }
          />
          <Route path="/reports" element={<TestReports />} />
          <Route path="/test" element={<Test />} />
          <Route
            path="/particular/test/:test_id"
            element={<ParticularTest />}
          />
          <Route
            path="/myprofile"
            element={<ProtectedRoute element={<MyProfile />} />}
          />
          <Route
            path="/orders/page"
            element={
              <ProtectedRoute
                element={
                  <OrderDetailsPage
                    cartData={cartData}
                    setCartData={setCartData}
                    clickedIds={clickedIds}
                    setClickedIds={setClickedIds}
                    healthPackages={healthPackages}
                    setPackagesClickedIds={setPackagesClickedIds}
                    packagesClickedIds={packagesClickedIds}
                  />
                }
              />
            }
          />
          <Route
            path="/add-address"
            element={<ProtectedRoute element={<CustomerAddress />} />}
          />
          <Route
            path="/booking-details"
            element={<ProtectedRoute element={<UserBookingDetails />} />}
          />
          <Route
            path="/view/bookings/:appointment_id"
            element={<ProtectedRoute element={<ViewBookings />} />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default CustomerRoutes;
