import React, { useState, useEffect } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminViewAddress = () => {
  const { customerId } = useParams(); // Extract customerId from the URL params
  const [customer, setCustomer] = useState(null); // State to store customer details
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        console.log(`Fetching customer with ID: ${customerId}`); // Log customerId
        const response = await fetch(`http://127.0.0.1:5000/api/customers/${customerId}`);
        const data = await response.json();
  
        if (response.ok) {
          setCustomer(data.customer);
        } else {
          console.error("API error:", data.message); // Log API errors
          setError(data.message || "Error fetching customer details");
        }
      } catch (err) {
        console.error("Fetch error:", err); // Log fetch errors
        setError("Error fetching customer details");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCustomer();
  }, [customerId]);
  // Dependency array includes customerId to refetch when it changes

  if (loading) {
    return <div>Loading...</div>; // Display a loading message
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>; // Display error message
  }

  return (
    <div className="container mt-4">
      <h2>Customer Details</h2>
   
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Customer ID</th>
              <td>{customer.id}</td>
            </tr>
            <tr>
              <th>Customer Name</th>
              <td>{customer.customer_name}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{customer.phone}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{customer.gender}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
        Go Back
      </button>
        
        
     
    </div>
  );
};

export default AdminViewAddress;
