import React, { useEffect, useState } from "react";
import "./DeliveryDashboard.css";
import { FaTruck, FaCheckCircle, FaUserCircle } from "react-icons/fa";

const DeliveryDashboard = () => {
  const [assignedOrders, setAssignedOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [agentName, setAgentName] = useState("Delivery Agent");

  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("DeliveryJwtToke"); // or however you're storing it
  
        const response = await fetch(`${BASE_URL}/api/delivery_dashboard`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
  
        const data = await response.json();
  
        if (data.success) {
          setAgentName(data.name || "Delivery Agent");
          setAssignedOrders(data.assigned_orders || 0);
          setDeliveredOrders(data.delivered_orders || 0);
        } else {
          console.error("API Error:", data.message);
        }
  
      } catch (error) {
        console.error("Failed to load delivery dashboard data:", error);
      }
    };
  
    fetchData();
  }, []);


  return (
    <div className="delivery-dashboard">
      <h2 className="dashboard-title">Welcome, {agentName}</h2>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <FaTruck className="dashboard-icon assigned" />
          <h4>Assigned Orders</h4>
          <p>{assignedOrders}</p>
        </div>

        <div className="dashboard-card">
          <FaCheckCircle className="dashboard-icon delivered" />
          <h4>Delivered Orders</h4>
          <p>{deliveredOrders}</p>
        </div>

        <div className="dashboard-card">
          <FaUserCircle className="dashboard-icon profile" />
          <h4>Profile</h4>
          <p>{agentName}</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
