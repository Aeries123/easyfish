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
import Testresults from "./components/Testresults";
import TestParameters from "./components/TestParameters";
import TestSampleTypes from "./components/Test_sample_types";
import Customer from "./components/Customer";
import Sidebar from "./components/SideBar/Sidebar";
import ManageCustomer from "./components/ManageCustomers/ManageCustomer";
import Footer from "./components/AdminFooter/Footer";
import Header from "./components/AdminHeader/Header";
import ManageAppointment from "./components/ManageAppointments/ManageAppointment";
import ManageTimeSlots from "./components/ManageTimeSlots/ManageTimeSlots";
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
import ManageTestResults from "./components/ManageTestResults";
import ManageTests from "./components/ManageTests";
import ManageUsers from "./components/manageUsers";
import TimeSlots from "./components/Timeslots";
import Users from "./components/Users";
import ManageTestParameters from "./components/ManageTestParameters";
import ManageTestSampleTypes from "./components/ManageTestSampleTypes";
import ManageTestVisitTypes from "./components/manageTestVisitTypes";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";

import AdminEditBookingsForm from "./components/AdminEditBookingsForm";
import AdminViewBookingsForm from "./components/AdminViewBookingForm";
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

import "./AdminRoutes.css";
import ManageEnquiry from "../Customer/components/ManageEnquiry";
import UserPrescriptions from "./components/UserPrescriptions";
import Packages from "./components/Packages";
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
          style={{ alignSelf: "flex-start" }}
        >
          <Routes>
            <Route path="/admin/" element={<AdminDashboard />} />
            <Route path="/admin/review" element={<Review />} />

            <Route path="/admin/login" element={<AdminLogin />} />

            <Route path="/admin/manage-category" element={<ManageCategory />} />
            <Route
              path="/admin/manage-technician"
              element={<ManageTechnician />}
            />
            <Route path="/admin/technician" element={<LabTechnicianForm />} />
            <Route
              path="/admin/admin-manage-technician"
              element={<AdminManageTechnician />}
            />

            <Route
              path="/admin/lab-technician-form"
              element={<LabTechnicianForm />}
            />
            <Route path="/admin/manage-packages" element={<ManagePackages />} />
            <Route path="/admin/package" element={<Packages />} />
            <Route path="/admin/payment" element={<Payment />} />
            <Route path="/admin/notification" element={<Notification />} />
            <Route path="/admin/test-results" element={<Testresults />} />
            <Route path="/admin/test-parameters" element={<TestParameters />} />
            <Route
              path="/admin/test-sample-types"
              element={<TestSampleTypes />}
            />
            <Route path="/admin/customer" element={<Customer />} />
            <Route path="/admin/manage-customer" element={<ManageCustomer />} />
            <Route
              path="/admin/manage-appointment"
              element={<ManageAppointment />}
            />
            <Route
              path="/admin/manage-time-slots"
              element={<ManageTimeSlots />}
            />
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
            <Route path="/admin/approve-leave" element={<ApproveLeave />} />
            <Route path="/admin/category" element={<Category />} />
            <Route path="/admin/manage-booking" element={<ManageBooking />} />
            <Route
              path="/admin/manage-notification"
              element={<ManageNotification />}
            />
            <Route path="/admin/manage-admin" element={<ManageAdmin />} />
            <Route path="/admin/manage-enquiry" element={<ManageEnquiry />} />

            <Route path="/admin/manage-address" element={<ManageAddress />} />
            <Route path="/admin/manage-review" element={<ManageReview />} />
            <Route path="/admin/manage-payment" element={<ManagePayment />} />
            <Route
              path="/admin/manage-test-results"
              element={<ManageTestResults />}
            />
            <Route path="/admin/manage-tests" element={<ManageTests />} />
            <Route path="/admin/manage-users" element={<ManageUsers />} />
            <Route path="/admin/time-slots" element={<TimeSlots />} />
            <Route path="/admin/users" element={<Users />} />
            <Route
              path="/admin/manage-test-parameters"
              element={<ManageTestParameters />}
            />
            <Route
              path="/admin/manage-test-sample-types"
              element={<ManageTestSampleTypes />}
            />
            <Route
              path="/admin/manage-test-visit-types"
              element={<ManageTestVisitTypes />}
            />
            <Route
              path="/admin/edit-booking/:id"
              element={<AdminEditBookingsForm />}
            />
            <Route
              path="/admin/view-booking/:id"
              element={<AdminViewBookingsForm />}
            />
            <Route
              path="/admin/view-category/:categoryId"
              element={<AdminViewCategory />}
            />

            <Route
              path="/admin/edit-category/:categoryId"
              element={<AdminEditCategory />}
            />
            <Route
              path="/admin/edit-tests/:testId"
              element={<AdminEditTests />}
            />
            <Route
              path="/admin/view-tests/:testId"
              element={<AdminViewTests />}
            />

            <Route
              path="/admin/view-customer/:customerId"
              element={<AdminViewCustomer />}
            />
            <Route
              path="/admin/edit-customer/:customerId"
              element={<AdminEditCustomer />}
            />

            <Route
              path="/admin/view-address/:customerId"
              element={<AdminViewCustomer />}
            />
            <Route
              path="/admin/edit-address/:customerId"
              element={<AdminEditCustomer />}
            />
            <Route
              path="/admin/view-payment/:AppointmentId"
              element={<AdminViewPayment />}
            />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminRoutes;
