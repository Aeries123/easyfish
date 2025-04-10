import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import DeliveryDashboard from "./components/DeliveryDashboard/DeliveryDashboard";
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
    <div className="delivery-route-app-container">
      {!isLoginPage ? (
        <>
          <DeliveryHeader />
          <div className="delivery-main-container">
            <DeliverySidebar className="delivery-route-sidebar" />
            <div className="delivery-route-content-container">
              <Routes>
                <Route path="/delivery" element={<DeliveryDashboard />} />
                <Route path="/delivery/orders" element={<Orders />} />
                <Route
                  path="/delivery/order/:orderId"
                  element={<OrderDetails />}
                />
              </Routes>
            </div>
          </div>
          <DeliveryFooter />
        </>
      ) : (
        <>
          <Routes>
            <Route path="/delivery/login" element={<DeliveryLogin />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default DeliveryRoutes;
