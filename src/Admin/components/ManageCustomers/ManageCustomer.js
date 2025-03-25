import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ManageCustomer.css";

const ManageCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(5);

  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/customers`);
        const data = await response.json();
        
        if (response.ok) {
          setCustomers(data); // The API returns an array, so we set it directly
        } else {
          console.error("Error fetching customers:", data.error);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  // Search handler to filter customers
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Filter customers based on the search term
  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="container-fluid mt-5">
      <h2>Manage Customers</h2>
      {/* <Link to="/admin/customer">
        <button className="btn btn-success">Add Customer</button>
      </Link> */}

      <div className="form-group mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by customer name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Customers Table */}
      <h3 className="mt-5">Customers List</h3>
      <table className="customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Email</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {currentCustomers.length > 0 ? (
            currentCustomers.map((customer) => (
              <tr key={customer.customer_id}>
                <td>{customer.customer_id}</td>
                <td>{customer.name}</td>
                <td>
                  {customer.phone}
                  <a
                    href={`https://wa.me/${customer.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-icon ms-2"
                  >
                    <FaWhatsapp size={20} color="green" />
                  </a>
                  <a href={`tel:${customer.phone}`} className="phone-icon ms-2">
                    <FaPhone size={20} color="blue" />
                  </a>
                </td>
                <td>{customer.email}</td>
                <td>
                  {/* <Link to={`/admin/edit-customer/${customer.customer_id}`}>
                    <button className="btn btn-primary btn-sm me-2 ">Edit</button>
                  </Link>
                  <Link to={`/admin/view-customer/${customer.customer_id}`}>
                    <button className="btn btn-secondary btn-sm me-2">View</button>
                  </Link> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary"
          disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageCustomer;