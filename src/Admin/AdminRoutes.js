import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
const AdminRoutes = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="main">
        <Routes>
          <Route path="/admin/" element={<AdminDashboard />} />
          <Route path="/admin/review" element={<Review />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin/manage-category" element={<ManageCategory />} />
          <Route
            path="/admin/lab-technician-form"
            element={<LabTechnicianForm />}
          />
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
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default AdminRoutes;
