import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ManageAddress.css";


const ManageAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [alertMessage, setAlertMessage] = useState(""); // Alert message state
  const rowsPerPage = 5;

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/addresses`);
      const data = await response.json();

      if (response.ok) {
        setAddresses(data.addresses || []);
      } else {
        console.error('Error fetching addresses:', data.error);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleDelete = async (address_id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    try {
      const response = await fetch(`${BASE_URL}/api/addresses/${address_id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        setAlertMessage(result.message);
        fetchAddresses(); // Refresh addresses list
      } else {
        setAlertMessage("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }

    setTimeout(() => setAlertMessage(""), 3000);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredAddresses = addresses.filter((address) =>
    Object.values(address).some(
      (value) =>
        value !== null &&
        value !== undefined &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastAddress = currentPage * rowsPerPage;
  const indexOfFirstAddress = indexOfLastAddress - rowsPerPage;
  const currentAddresses = filteredAddresses.slice(indexOfFirstAddress, indexOfLastAddress);
  const totalPages = Math.ceil(filteredAddresses.length / rowsPerPage);

  return (
    <div className="container-fluid mt-4">
      <h2>Manage Addresses</h2>
      {/* <Link to="/admin/add-address">
        <button className="btn btn-primary mb-3">Add Address</button>
      </Link> */}

      {/* Search Input */}
      <input
        type="text"
        className="form-control"
        placeholder="Search addresses..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Alert Message */}
      {alertMessage && (
        <div className="alert alert-info mt-3">{alertMessage}</div>
      )}

      <table className="table table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Address ID</th>
            <th>Customer Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Address Type</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAddresses.length > 0 ? (
            currentAddresses.map((address) => (
              <tr key={address.address_id}>
                <td>{address.address_id}</td>
                <td>{address.customer_name}</td>
                <td>{address.address}</td>
                <td>{address.city}</td>
                <td>{address.state}</td>
                <td>{address.zip_code}</td>
                <td>{address.address_type}</td>
                <td>{address.created_at}</td>
                <td>
                  {/* <Link to={`/admin/edit-address/${address.address_id}`}>
                    <button className="btn btn-warning btn-sm mx-1">Edit</button>
                  </Link> */}

{/* 
                  <Link to={`/admin/view-address/${address.address_id}`}>
                    <button className="btn btn-warning btn-sm mx-1">View</button>
                  </Link> */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(address.address_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No addresses available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <nav className="mt-3">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage((prev) => prev - 1)}>
              Previous
            </button>
          </li>
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage((prev) => prev + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ManageAddress;
