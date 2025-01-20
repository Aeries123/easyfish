// src/components/ManageAdmin.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [adminsPerPage] = useState(5); // Number of admins to display per page
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  // Mock Data - Example admin records
  const mockAdmins = [
    { admin_id: 1, user_id: 101, permissions: "Read, Write" },
    { admin_id: 2, user_id: 102, permissions: "Read" },
    { admin_id: 3, user_id: 103, permissions: "Write" },
    { admin_id: 4, user_id: 104, permissions: "Read, Write, Execute" },
    { admin_id: 5, user_id: 105, permissions: "Read" },
    { admin_id: 6, user_id: 106, permissions: "Write" },
    { admin_id: 7, user_id: 107, permissions: "Read, Execute" },
    { admin_id: 8, user_id: 108, permissions: "Read, Write" },
  ];

  // Simulate fetching data from an API
  useEffect(() => {
    setTimeout(() => {
      setAdmins(mockAdmins); // Set the mock data after a delay
      setLoading(false);
    }, 1000); // Simulate a 1-second delay for fetching
  }, []);

  // Filter admins based on search query
  const filteredAdmins = admins.filter((admin) =>
    admin.user_id.toString().includes(searchQuery) ||
    admin.permissions.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate admins
  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = filteredAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Search change handler
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Manage Admins</h2>
      
      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by User ID or Permissions"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Admins Table */}
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Admin ID</th>
                <th>User ID</th>
                <th>Permissions</th>
              </tr>
            </thead>
            <tbody>
              {currentAdmins.map((admin) => (
                <tr key={admin.admin_id}>
                  <td>{admin.admin_id}</td>
                  <td>{admin.user_id}</td>
                  <td>{admin.permissions}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage * adminsPerPage >= filteredAdmins.length}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageAdmin;
