import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ManageCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(5);

  console.log("manage customers", customers);

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/customers");
        const data = await response.json();
        console.log("API Response:", data); // Log the response to ensure it's correct
        if (response.ok) {
          setCustomers(data.customers || []); // Set the customers data from the API
        } else {
          console.error("Error fetching customers:", data.message);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers(); // Fetch customers on component mount
  }, []);

  // Search handler to filter customers
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when a new search is performed
  };

  // Filter customers based on the search term
  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
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

  // Delete handler for deleting a customer
  const handleDeleteCustomer = async (customerId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/customers/delete/${customerId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              // Remove or adjust this line if `Authorization` is not needed
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          setCustomers(
            customers.filter((customer) => customer.id !== customerId)
          ); // Adjust `customer.id` to `customer.customer_id` if needed
          alert("Customer deleted successfully.");
        } else {
          const errorData = await response.json();
          console.error("Error deleting customer:", errorData.error);
          alert(errorData.error || "Failed to delete the customer.");
        }
      } catch (error) {
        console.error("Error deleting customer:", error);
        alert("Failed to delete the customer.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Customers</h2>
      <Link to="/admin/customer">
        <button>Add Customer</button>
      </Link>

      <div className="form-group">
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
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.length > 0 ? (
            currentCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.customer_name}</td>
                <td>{customer.phone}</td>
                <td>{customer.gender}</td>
                <td>
                  <Link to={`/admin/edit-customer/${customer.id}`}>
                    <button className="btn btn-primary btn-sm me-2">
                      Edit
                    </button>
                  </Link>
                  <Link to={`/admin/view-customer/${customer.id}`}>
                    <button className="btn btn-primary btn-sm me-2">
                      View
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteCustomer(customer.id)}
                  >
                    Delete
                  </button>
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
