import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {AuthProvider} from './Customer/components/Context/AuthContext'
// import Header from "./Header/header";
// import Footer from "./Footer/footer";
import CustomerRoutes from "./Customer/CustomerRoutes";
import AdminRoutes from "./Admin/AdminRoutes";

function App() {
  const [cartData, setCartData] = useState([]);

  return (
    <AuthProvider>
      <Router>
        {/* <Header /> */}
        <div className="app-container">
          {/* Conditional rendering based on path */}
          {window.location.pathname.startsWith("/admin") ? (
            <AdminRoutes />
          ) : (
            <CustomerRoutes setCartData={setCartData} cartData={cartData} />
          )}
        </div>
        {/* <Footer /> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
