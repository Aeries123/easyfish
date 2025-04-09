import React from "react";
import { Link } from "react-router-dom";

const DeliveryDashboard = () => {
  return (
    <div>
      <h2>Delivery Dashboard</h2>
      <ul>
        <li>
          <Link to="/delivery/orders">View Orders</Link>
        </li>
        <li>
          <Link to="/delivery/profile">My Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default DeliveryDashboard;
