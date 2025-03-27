import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Review from "./components/Review";
import ManageCategory from "./components/ManageCategory";
import LabTechnicianForm from "./components/LabTechnicianForm";
import Payment from "./components/Payment";
import Notification from "./components/Notification";
import TestParameters from "./components/TestParameters";
import TestSampleTypes from "./components/Test_sample_types";
import Customer from "./components/Customer";
import Sidebar from "./components/SideBar/Sidebar";
import ManageCustomer from "./components/ManageCustomers/ManageCustomer";
import Footer from "./components/AdminFooter/Footer";
import Header from "./components/AdminHeader/Header";
import ManageAppointment from "./components/ManageAppointments/ManageAppointment";
// import ManageTimeSlots from "./components/ManageTimeSlots/ManageTimeSlots";
import TestsForm from "./components/Tests/tests";
import Addresses from "./components/addresses";
import AdminForm from "./components/Adminform";
import Booking from "./components/Appointment";
import AppointmentSummary from "./components/AppointmentSummary";
import BookingsForm from "./components/Bookings";
import Category from "./components/Category";
import ManageBooking from "./components/ManageBooking";
import ManageNotification from "./components/ManageNotification";
import ManageAdmin from "./components/ManageAdmin";
import ManageAddress from "./components/ManageAddress";
import ManageReview from "./components/ManageReview";
import ManagePayment from "./components/ManagePayment";
import ManageTests from "./components/ManageTests";
import ManageUsers from "./components/manageUsers";
import ManageTestParameters from "./components/ManageTestParameters";
import ManageTestSampleTypes from "./components/ManageTestSampleTypes";
import ManageTestVisitTypes from "./components/manageTestVisitTypes";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";

import AdminEditBookingsForm from "./components/AdminEditBookingsForm";
import AdminViewBookingForm from "./components/AdminViewBookingForm";
import AdminEditCategory from "./components/AdminEditCategory";
import AdminViewCategory from "./components/AdminViewCategory";
import AdminEditTests from "./components/AdminEditTests";
import AdminViewTests from "./components/AdminViewTests";
import AdminEditCustomer from "./components/AdminEditCustomer";
import AdminViewCustomer from "./components/AdminViewCustomer";
import AdminViewAddress from "./components/AdminViewAddress";
import AdminEditAddress from "./components/AdminEditAddress";
import AdminViewPayment from "./components/AdminViewPayment";
import Technician from "./components/Technician";
import ManageTechnician from "./components/ManageTechnician";
import ManagePackages from "./components/ManagePackages";
import AdminManageTechnician from "./components/AdminManageTechnician";
import ApproveLeave from "./components/ApproveLeave";
import AdminEditProduct from "./components/AdminEditProduct/AdminEditProduct";
import AdminViewProduct from "./components/AdminViewProduct/AdminViewProduct";
import "./AdminRoutes.css";
// import ManageEnquiry from "../Customer/components/ManageEnquiry";
import UserPrescriptions from "./components/UserPrescriptions";
import Packages from "./components/Packages";
import ManagePayments from "./components/ManagePayments/ManagePayments";
import ManageAdminPayment from "./components/ManageAdminPayment/ManageAdminPayment";
import ManageReviews from "./components/ManageReviews/ManajeReviews";
import AdminAddProduct from "./components/AdminAddProduct/AdminAddProduct";
import ManageBestSeller from "./components/AdminEditProduct/ManageBestSeller/ManageBestSeller";

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
            <Route path="/admin/review" element={<Review />} />

            <Route path="/admin/login" element={<AdminLogin />} />

            <Route path="/admin/manage-category" element={<ManageCategory />} />
            <Route
              path="/admin/manage-technician"
              element={<ManageTechnician />}
            />
            <Route path="/admin/manage-reviews" element={<ManageReviews />} />
            <Route path="/admin/technician" element={<LabTechnicianForm />} />
            <Route
              path="/admin/admin-manage-technician"
              element={<AdminManageTechnician />}
            />

            <Route
              path="/admin/lab-technician-form"
              element={<LabTechnicianForm />}
            />
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
            <Route path="/admin/payment" element={<Payment />} />
           
           
            <Route path="/admin/customer" element={<Customer />} />
            <Route path="/admin/manage-customer" element={<ManageCustomer />} />
            <Route
              path="/admin/manage-appointment"
              element={<ManageAppointment />}
            />
            {/* <Route
              path="/admin/manage-time-slots"
              element={<ManageTimeSlots />}
            /> */}
            <Route path="/admin/tests-form" element={<TestsForm />} />
            <Route
              path="/admin/prescriptions"
              element={<UserPrescriptions />}
            />

            <Route path="/admin/technician-form" element={<Technician />} />

            <Route path="/admin/addresses" element={<Addresses />} />
            <Route path="/admin/admin-form" element={<AdminForm />} />
            <Route path="/admin/booking" element={<Booking />} />
            <Route
              path="/admin/appointment-summary"
              element={<AppointmentSummary />}
            />
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




          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminRoutes;
