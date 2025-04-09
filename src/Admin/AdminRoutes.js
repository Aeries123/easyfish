import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ManageCategory from "./components/ManageCategory";

import Sidebar from "./components/SideBar/Sidebar";
import ManageCustomer from "./components/ManageCustomers/ManageCustomer";
import Footer from "./components/AdminFooter/Footer";
import Header from "./components/AdminHeader/Header";
import BookingsForm from "./components/Bookings";
import Category from "./components/Category";
import ManageBooking from "./components/ManageBooking";
import ManageNotification from "./components/ManageNotification";
import ManageAdmin from "./components/ManageAdmin";
import ManageAddress from "./components/ManageAddress";
import ManageReview from "./components/ManageReview";
import ManagePayment from "./components/ManagePayment";

import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";

import AdminEditBookingsForm from "./components/AdminEditBookingsForm";
import AdminViewBookingForm from "./components/AdminViewBookingForm";
import AdminEditCategory from "./components/AdminEditCategory";
import AdminViewCategory from "./components/AdminViewCategory";

import ManagePackages from "./components/ManagePackages";
import AdminEditProduct from "./components/AdminEditProduct/AdminEditProduct";
import AdminViewProduct from "./components/AdminViewProduct/AdminViewProduct";
import "./AdminRoutes.css";
// import ManageEnquiry from "../Customer/components/ManageEnquiry";
import Packages from "./components/Packages";
import ManagePayments from "./components/ManagePayments/ManagePayments";
import ManageAdminPayment from "./components/ManageAdminPayment/ManageAdminPayment";
import ManageReviews from "./components/ManageReviews/ManajeReviews";
import AdminAddProduct from "./components/AdminAddProduct/AdminAddProduct";
import ManageBestSeller from "./components/AdminEditProduct/ManageBestSeller/ManageBestSeller";
import AdminAddDeliverboy from "./components/AdminAddDeliverboy/AdminAddDeliverboy";
import AdminAssignedDeliveryboy from "./components/AdminAssignedDeliveryboy/AdminAssignedDeliveryboy";

const AdminRoutes = () => {
  const location = useLocation(); // Get the current location

  // Check if the current route is the login page
  const isLoginPage = location.pathname === "/admin/login";
  return (
    <div>
      {/* <Header /> */}
      {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
      <div className="admin-route-app-container">
        {!isLoginPage && (
          <div>
            <Sidebar className="admin-route-admin-route-sidebar" />
            <Header />
          </div>
        )}{" "}
        <div
          className="admin-route-admin-route-card-container"
          style={{ alignSelf: "flex-start" ,marginTop: isLoginPage ? "0px" : "80px",}}        >
          <Routes>
            <Route path="/admin/" element={<AdminDashboard />} />

            <Route path="/admin/login" element={<AdminLogin />} />

            <Route path="/admin/manage-category" element={<ManageCategory />} />
           
            <Route path="/admin/manage-reviews" element={<ManageReviews />} />
           

           
            <Route path="/admin/manage-payments" element={<ManagePayments />} />
            <Route
              path="/admin/manage-payments/:id"
              element={<ManageAdminPayment />}
            />
            <Route path="/admin/manage-packages" element={<ManagePackages />} />

            <Route
              path="/admin/edit-product/:id"
              element={<AdminEditProduct />}
            />
            <Route
              path="/admin/view-product/:id"
              element={<AdminViewProduct />}
            />

            <Route path="/admin/package" element={<Packages />} />
           
           
            <Route path="/admin/manage-customer" element={<ManageCustomer />} />
           
          
           


            
           
            <Route path="/admin/bookings-form" element={<BookingsForm />} />
            <Route path="/admin/category" element={<Category />} />
            <Route path="/admin/manage-booking" element={<ManageBooking />} />
            <Route
              path="/admin/manage-notification"
              element={<ManageNotification />}
            />
            <Route path="/admin/manage-admin" element={<ManageAdmin />} />

            <Route path="/admin/manage-address" element={<ManageAddress />} />
            <Route path="/admin/manage-review" element={<ManageReview />} />
            <Route path="/admin/manage-payment" element={<ManagePayment />} />

            <Route path="/admin/delivery_boy" element={<AdminAddDeliverboy />} />

           
          
           
          
            <Route
              path="/admin/edit-booking/:id"
              element={<AdminEditBookingsForm />}
            />
            <Route
              path="/admin/view-booking/:order_id"
              element={<AdminViewBookingForm />}
            />

            <Route
              path="/admin/view-category/:categoryId"
              element={<AdminViewCategory />}
            />

            <Route
              path="/admin/edit-category/:categoryId"
              element={<AdminEditCategory />}
            />
          
           
           


            <Route path="/admin/add-product" element={<AdminAddProduct />} />

            <Route
              path="/admin/view-payment/:paymentId"
              element={<ManageAdminPayment />}
            />
                        <Route path="/admin/manage-bestseller" element={<ManageBestSeller />} />
                        <Route path="/admin/manage-assigned" element={<AdminAssignedDeliveryboy />} />




          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminRoutes;
