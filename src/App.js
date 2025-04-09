import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import Header from "./Header/header";
// import Footer from "./Footer/footer";
// import CustomerRoutes from "./customer/CustomerRoutes";
import AdminRoutes from "./Admin/AdminRoutes";
import DeliveryAgentRoutes from "./DeliveryAgent/DeliveryAgentRoutes";

function App() {
  const [cartData, setCartData] = useState([]);

  const path = window.location.pathname;

  return (
    // <AuthProvider>
    <Router>
      {/* <Header /> */}
      <div className="app-container">
        {/* Conditional rendering based on path */}
        {path.startsWith("/admin") && <AdminRoutes />}
        {path.startsWith("/delivery") && <DeliveryAgentRoutes />}
        {/* You can add more routes like:
            {path.startsWith("/customer") && <CustomerRoutes />} */}
      </div>
      {/* <Footer /> */}
    </Router>
    // </AuthProvider>
  );
}

export default App;
