import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ManageUsers = () => {
  const [users, setUsers] = useState([]); // To store the users data
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  const itemsPerPage = 5; // Set number of items per page to 5

  // Mock data for users (this should be replaced by actual data from your database)
  const mockData = [
    { user_id: 1, name: 'Alice', password: 'password123', role: 'Admin', phone: '1234567890', created_at: '2025-01-01 12:00:00' },
    { user_id: 2, name: 'Bob', password: 'password456', role: 'User', phone: '2345678901', created_at: '2025-01-02 13:00:00' },
    { user_id: 3, name: 'Charlie', password: 'password789', role: 'Admin', phone: '3456789012', created_at: '2025-01-03 14:00:00' },
    { user_id: 4, name: 'David', password: 'password000', role: 'User', phone: '4567890123', created_at: '2025-01-04 15:00:00' },
    { user_id: 5, name: 'Eve', password: 'password111', role: 'Admin', phone: '5678901234', created_at: '2025-01-05 16:00:00' },
    { user_id: 6, name: 'Frank', password: 'password222', role: 'User', phone: '6789012345', created_at: '2025-01-06 17:00:00' },
    { user_id: 7, name: 'Grace', password: 'password333', role: 'Admin', phone: '7890123456', created_at: '2025-01-07 18:00:00' },
    { user_id: 8, name: 'Hannah', password: 'password444', role: 'User', phone: '8901234567', created_at: '2025-01-08 19:00:00' },
    { user_id: 9, name: 'Ian', password: 'password555', role: 'Admin', phone: '9012345678', created_at: '2025-01-09 20:00:00' },
    { user_id: 10, name: 'Jack', password: 'password666', role: 'User', phone: '0123456789', created_at: '2025-01-10 21:00:00' },
  ];

  useEffect(() => {
    // Simulate fetching data (replace this with actual API call)
    setUsers(mockData);

    // Calculate total pages for pagination
    setTotalPages(Math.ceil(mockData.length / itemsPerPage));
  }, []);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get the data for the current page
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return users.slice(startIndex, startIndex + itemsPerPage);
  };

  // Handle action (Edit/Delete/View)
  const handleAction = (user_id, action) => {
    switch (action) {
      case 'edit':
        console.log(`Editing user with ID: ${user_id}`);
        // Add logic for editing the user
        break;
      case 'delete':
        console.log(`Deleting user with ID: ${user_id}`);
        // Add logic for deleting the user
        break;
      case 'view':
        console.log(`Viewing details of user with ID: ${user_id}`);
        // Add logic for viewing user details
        break;
      default:
        break;
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Users</h2>

      {/* Table for displaying user data */}
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Created At</th>
            <th>Actions</th> {/* Added Action column */}
          </tr>
        </thead>
        <tbody>
          {getCurrentPageData().map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.phone}</td>
              <td>{user.created_at}</td>
              <td>
                {/* Action buttons for each user */}
                <button
                  className="btn btn-warning mx-1"
                  onClick={() => handleAction(user.user_id, 'edit')}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger mx-1"
                  onClick={() => handleAction(user.user_id, 'delete')}
                >
                  Delete
                </button>
                <button
                  className="btn btn-info mx-1"
                  onClick={() => handleAction(user.user_id, 'view')}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination justify-content-center mt-4">
        <button
          className="btn btn-outline-primary mx-1"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-outline-primary mx-1"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageUsers;
