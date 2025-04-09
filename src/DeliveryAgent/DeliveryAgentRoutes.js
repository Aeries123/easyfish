import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import DeliveryDashboard from "./components/DeliveryDashboard/DeliveryDashboard";
// import DeliveryProfile from "./components/DeliveryProfile";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import Orders from "./components/Orders/Orders";
import DeliveryLogin from "./components/DeliveryLogin/DeliveryLogin";
import DeliveryFooter from "./components/DeliveryFooter/DeliveryFooter";
import DeliveryHeader from "./components/DeliveryHeader/DeliveryHeader";
import DeliverySidebar from "./components/DeliverySidebar/DeliverySidebar";
import "./DeliveryAgentRoutes.css";

const DeliveryRoutes = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/delivery/login";

  return (
    <div>
      <div className="delivery-route-app-container">
        {!isLoginPage && (
          <div>
            <DeliverySidebar className="delivery-route-sidebar" />
            <DeliveryHeader />
          </div>
        )}
        <div
          className="delivery-route-content-container"
          style={{
            alignSelf: "flex-start",
            marginTop: isLoginPage ? "0px" : "80px",
          }}
        >
          <Routes>
            <Route path="/delivery/" element={<DeliveryDashboard />} />
            <Route path="/delivery/login" element={<DeliveryLogin />} />
            <Route path="/delivery/orders" element={<Orders />} />
            {/* <Route path="/delivery/profile" element={<DeliveryProfile />} /> */}
            <Route path="/delivery/order/:orderId" element={<OrderDetails />} />
          </Routes>
        </div>
      </div>
      <DeliveryFooter />
    </div>
  );
};

export default DeliveryRoutes;
