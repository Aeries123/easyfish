import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const ManageTests = () => {
  const [tests, setTests] = useState([]);  // Store fetched tests
  const [searchTerm, setSearchTerm] = useState("");  // For search functionality
  const [currentPage, setCurrentPage] = useState(1);  // Pagination
  const rowsPerPage = 9;  // Rows per page for pagination

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/tests');
        const data = await response.json();
        console.log("fetching tests",data);

        if (response.ok) {
          setTests(data.tests || []);  // Set the fetched tests
        } else {
          console.error('Error fetching tests:', data.message);
        }
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchTests();  // Fetch tests on component mount
  }, []);

  // Search handler to filter tests
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);  // Reset to the first page when a new search is performed
  };

  // Filter tests based on the search term
  const filteredTests = tests.filter((test) =>
    Object.values(test).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastTest = currentPage * rowsPerPage;
  const indexOfFirstTest = indexOfLastTest - rowsPerPage;
  const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);
  const totalPages = Math.ceil(filteredTests.length / rowsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  // Delete handler for deleting a test
  const handleDeleteTest = async (testId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this test?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/tests/${testId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Pass JWT token for authentication
          },
        });

        if (response.ok) {
          setTests(tests.filter(test => test.test_id !== testId));  // Remove the test from the state
          alert("Test deleted successfully.");
        } else {
          const errorData = await response.json();
          console.error("Error deleting test:", errorData.message);
          alert("Failed to delete the test.");
        }
      } catch (error) {
        console.error("Error deleting test:", error);
        alert("Failed to delete the test.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Tests</h2>
      <Link to="/admin/tests-form">
        <button>Add Test</button>
      </Link>

      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search tests..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Tests Table */}
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Test ID</th>
            <th>Test Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Preparation Instructions</th>
            <th>Test Code</th>
            <th>Sample Type</th>
            <th>Visit Type</th>
            <th>Parameters</th>
            <th>Speciality</th>
            <th>Status</th>
            <th>Duration</th> {/* Added Duration column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTests.length > 0 ? (
            currentTests.map((test) => (
              <tr key={test.test_id}>
                <td>{test.test_id}</td>
                <td>{test.test_name}</td>
                <td>{test.description}</td>
                <td>${test.price}</td>
                <td>{test.preparation_instructions}</td>
                <td>{test.test_code}</td>
                <td>{test.sample_type}</td>
                <td>{test.visit_type}</td>
                <td>{test.parameters}</td>
                <td>{test.speciality}</td>
                <td>{test.status}</td>
                <td>{test.duration}</td> {/* Display duration */}
                <td>
                  {/* View Button */}
                  <Link to={`/admin/view-tests/${test.test_id}`}>
                    <button className="btn btn-sm btn-info me-2">View</button>
                  </Link>

                  {/* Edit Button */}
                  <Link to={`/admin/edit-tests/${test.test_id}`}>
                    <button className="btn btn-sm btn-primary me-2">Edit</button>
                  </Link>

                  {/* Delete Button */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteTest(test.test_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13" className="text-center">No tests available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <nav className="mt-3">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handlePrevious} disabled={currentPage === 1}>
              Previous
            </button>
          </li>
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ManageTests;
