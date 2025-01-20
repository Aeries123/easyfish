// src/components/ManageAddress.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageAddress = () => {
  // State for managing addresses and pagination
  const [addresses, setAddresses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [addressesPerPage] = useState(5); // Number of addresses per page
  const [totalAddresses, setTotalAddresses] = useState(0); // Total number of addresses

  // Sample address data
  const sampleData = [
    { address_id: 1, user_id: 101, door_no: '123', street: 'Main St', village: 'Green Valley', district: 'District 1', state: 'State A', country: 'Country X', pincode: '123456', is_primary: 1 },
    { address_id: 2, user_id: 102, door_no: '456', street: 'Elm St', village: 'Blue Hills', district: 'District 2', state: 'State B', country: 'Country Y', pincode: '654321', is_primary: 0 },
    { address_id: 3, user_id: 103, door_no: '789', street: 'Pine Rd', village: 'Sunnydale', district: 'District 3', state: 'State C', country: 'Country Z', pincode: '112233', is_primary: 1 },
    { address_id: 4, user_id: 104, door_no: '101', street: 'Oak Ln', village: 'Riverbend', district: 'District 4', state: 'State D', country: 'Country W', pincode: '334455', is_primary: 0 },
    { address_id: 5, user_id: 105, door_no: '202', street: 'Cedar Blvd', village: 'Mountainview', district: 'District 5', state: 'State E', country: 'Country V', pincode: '998877', is_primary: 1 },
    { address_id: 6, user_id: 106, door_no: '303', street: 'Maple Ave', village: 'Springfield', district: 'District 6', state: 'State F', country: 'Country U', pincode: '665544', is_primary: 0 },
    { address_id: 7, user_id: 107, door_no: '404', street: 'Birch Dr', village: 'Westwood', district: 'District 7', state: 'State G', country: 'Country T', pincode: '443322', is_primary: 1 },
    { address_id: 8, user_id: 108, door_no: '505', street: 'Willow Way', village: 'Eastside', district: 'District 8', state: 'State H', country: 'Country S', pincode: '778899', is_primary: 0 },
    { address_id: 9, user_id: 109, door_no: '606', street: 'Cherry Cir', village: 'Lakeview', district: 'District 9', state: 'State I', country: 'Country R', pincode: '223344', is_primary: 1 },
    { address_id: 10, user_id: 110, door_no: '707', street: 'Aspen Rd', village: 'Hilltop', district: 'District 10', state: 'State J', country: 'Country Q', pincode: '556677', is_primary: 0 },
  ];

  // Fetch addresses from the API (simulated for now)
  const fetchAddresses = async (page) => {
    // Simulate API pagination
    const startIndex = (page - 1) * addressesPerPage;
    const endIndex = page * addressesPerPage;
    const paginatedAddresses = sampleData.slice(startIndex, endIndex);
    
    setAddresses(paginatedAddresses);
    setTotalAddresses(sampleData.length); // Total addresses for pagination
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(totalAddresses / addressesPerPage)) {
      setCurrentPage(page);
      fetchAddresses(page);
    }
  };

  useEffect(() => {
    fetchAddresses(currentPage); // Fetch addresses when component mounts or page changes
  }, [currentPage]);

  // Calculate pagination details
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalAddresses / addressesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Manage Addresses</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Address ID</th>
            <th>User ID</th>
            <th>Door No</th>
            <th>Street</th>
            <th>Village</th>
            <th>District</th>
            <th>State</th>
            <th>Country</th>
            <th>Pincode</th>
            <th>Primary Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {addresses.length === 0 ? (
            <tr>
              <td colSpan="11" className="text-center">No addresses found</td>
            </tr>
          ) : (
            addresses.map((address) => (
              <tr key={address.address_id}>
                <td>{address.address_id}</td>
                <td>{address.user_id}</td>
                <td>{address.door_no}</td>
                <td>{address.street}</td>
                <td>{address.village}</td>
                <td>{address.district}</td>
                <td>{address.state}</td>
                <td>{address.country}</td>
                <td>{address.pincode}</td>
                <td>{address.is_primary === 1 ? 'Yes' : 'No'}</td>
                <td>
                  <button className="btn btn-warning btn-sm">Edit</button>
                  <button className="btn btn-danger btn-sm ml-2">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <div>
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`btn btn-outline-primary btn-sm mx-1 ${
                number === currentPage ? 'active' : ''
              }`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          ))}
        </div>
        <button
          className="btn btn-secondary"
          disabled={currentPage === Math.ceil(totalAddresses / addressesPerPage)}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageAddress;
