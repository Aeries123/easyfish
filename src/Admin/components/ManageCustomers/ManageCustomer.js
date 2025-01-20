// src/components/ManageCustomer.js
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(5);

  // Sample customer data for initial loading (Replace with actual API data)
  const sampleCustomers = [
    { id: 1, customer_name: 'John Doe', phone: '1234567890', gender: 'Male' },
    { id: 2, customer_name: 'Jane Smith', phone: '0987654321', gender: 'Female' },
    { id: 3, customer_name: 'James Brown', phone: '1122334455', gender: 'Male' },
    { id: 4, customer_name: 'Emily Johnson', phone: '5566778899', gender: 'Female' },
    { id: 5, customer_name: 'Michael Davis', phone: '6677889900', gender: 'Male' },
    { id: 6, customer_name: 'Sarah Wilson', phone: '7788991122', gender: 'Female' },
    { id: 7, customer_name: 'David Lee', phone: '8899002233', gender: 'Male' },
    { id: 8, customer_name: 'Laura Taylor', phone: '9900113344', gender: 'Female' },
    { id: 9, customer_name: 'Robert Harris', phone: '1012345678', gender: 'Male' },
    { id: 10, customer_name: 'Linda Clark', phone: '2023456789', gender: 'Female' },
  ];

  useEffect(() => {
    // Fetch customers from an API or database (using sample data here)
    setCustomers(sampleCustomers);
  }, []);

  const handleEdit = (customer) => {
    console.log("Edit customer:", customer);
    // Implement the logic to edit customer details here
  };

  const handleDelete = (customerId) => {
    setCustomers(customers.filter(customer => customer.id !== customerId));
  };

  // Search customers based on name
  const filteredCustomers = customers.filter((customer) =>
    customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current customers based on pagination
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNext = () => {
    if (currentPage < Math.ceil(filteredCustomers.length / customersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Manage Customers</h2>

      {/* Search Box */}
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search by customer name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          <td>{customer.id}</td> {/* Added ID column */}
          <td>{customer.customer_name}</td>
          <td>{customer.phone}</td>
          <td>{customer.gender}</td>
          <td>
            <button
              className="btn btn-warning mr-2"
              onClick={() => handleEdit(customer)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(customer.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="5" className="text-center"> {/* Adjusted colSpan to 5 */}
          No customers found.
        </td>
      </tr>
    )}
  </tbody>
</table>


      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handlePrevious}>
              Previous
            </button>
          </li>
          <li className={`page-item ${currentPage === Math.ceil(filteredCustomers.length / customersPerPage) ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handleNext}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ManageCustomer;
