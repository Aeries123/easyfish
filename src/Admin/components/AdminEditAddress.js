import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminViewAddress = () => {
  const { addressId } = useParams(); // Extract addressId from the URL params
  const [address, setAddress] = useState(null); // State to store address details
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        console.log(`Fetching address with ID: ${addressId}`); // Log addressId
        const response = await fetch(`${BASE_URL}/api/addresses/${addressId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
          },
        });
        const data = await response.json();
  
        if (response.ok) {
          setAddress(data); // Set the address data in state
        } else {
          console.error("API error:", data.error); // Log API errors
          setError(data.error || "Error fetching address details");
        }
      } catch (err) {
        console.error("Fetch error:", err); // Log fetch errors
        setError("Error fetching address details");
      } finally {
        setLoading(false);
      }
    };
  
    fetchAddress();
  }, [addressId]); // Dependency array includes addressId to refetch when it changes

  if (loading) {
    return <div>Loading...</div>; // Display a loading message
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>; // Display error message
  }

  return (
    <div className="container mt-4">
      <h2>Address Details</h2>
   
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Address ID</th>
            <td>{address.address_id}</td>
          </tr>
          <tr>
            <th>Door No</th>
            <td>{address.door_no}</td>
          </tr>
          <tr>
            <th>Street</th>
            <td>{address.street}</td>
          </tr>
          <tr>
            <th>Village</th>
            <td>{address.village}</td>
          </tr>
          <tr>
            <th>Mandal</th>
            <td>{address.mandal}</td>
          </tr>
          <tr>
            <th>District</th>
            <td>{address.district}</td>
          </tr>
          <tr>
            <th>State</th>
            <td>{address.state}</td>
          </tr>
          <tr>
            <th>Country</th>
            <td>{address.country}</td>
          </tr>
          <tr>
            <th>Pincode</th>
            <td>{address.pincode}</td>
          </tr>
          <tr>
            <th>Created At</th>
            <td>{address.created_at}</td>
          </tr>
          <tr>
            <th>Updated At</th>
            <td>{address.updated_at}</td>
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
