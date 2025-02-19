import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";

const ManageTests = () => {
  const [tests, setTests] = useState([]);  // Store fetched tests
  const [searchTerm, setSearchTerm] = useState("");  // For search functionality
  const [currentPage, setCurrentPage] = useState(1);  // Pagination
  const [file, setFile] = useState(null);  // For file input during import
  const rowsPerPage = 9;  // Rows per page for pagination
  const navigate = useNavigate();  // useNavigate for redirection
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/tests`);
        const data = await response.json();
        console.log("fetching tests", data);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);  // Reset to the first page when a new search is performed
  };

  const filteredTests = tests.filter((test) =>
    Object.values(test).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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

  const handleDeleteTest = async (testId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this test?");
    if (confirmDelete) {
      try {
        const response = await fetch(`${BASE_URL}/api/tests/${testId}`, {
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

  // Handle file input change for import
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Import tests via API and redirect to ManageTests page after success
  const handleImportTests = async () => {
    if (!file) {
        alert('Please select a file to import.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`${BASE_URL}/api/tests/import`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log('API Response:', data);

        if (response.ok) {
            alert(data.message);
            setFile(null);  // Reset file input
            
            // Ensure the newly imported tests are added
            const newlyImportedTests = data.tests || [];  // Get imported tests from the response
            setTests((prevTests) => [...prevTests, ...newlyImportedTests]);  // Add to existing tests
        } else {
            alert(data.error || 'Failed to import tests');
        }
    } catch (error) {
        console.error('Error importing tests:', error);
        alert('An error occurred during import. Please try again.');
    }
};


  // Export tests via API
  const handleExportTests = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/tests/export`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Pass JWT token for authentication
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'tests.xlsx';
        link.click();
      } else {
        alert('Failed to export tests');
      }
    } catch (error) {
      console.error('Error exporting tests:', error);
      alert('An error occurred during export');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Tests</h2>
      <Link to="/admin/tests-form">
        <button className="btn btn-success mb-3">Add Test</button>
      </Link>

      {/* Import Button */}
      <input
        type="file"
        className="form-control mb-3"
        accept=".csv,.xlsx"
        onChange={handleFileChange}
      />
      <button className="btn btn-primary mb-3" onClick={handleImportTests}>Import Tests</button>

      {/* Export Button */}
      <button className="btn btn-warning mb-3" onClick={handleExportTests}>Export Tests</button>

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
            {/* <th>Description</th> */}
            <th>Price</th>
            <th>Preparation Instructions</th>
            <th>Test Code</th>
            <th>Sample Type</th>
            <th>Visit Type</th>
            <th>Parameters</th>
            <th>Speciality</th>
            <th>Status</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTests.length > 0 ? (
            currentTests.map((test) => (
              <tr key={test.test_id}>
                <td>{test.test_id}</td>
                <td>{test.test_name}</td>
                {/* <td>{test.description}</td> */}
                <td>{test.price}</td>
                <td>{test.preparation_instructions}</td>
                <td>{test.test_code}</td>
                <td>{test.sample_type}</td>
                <td>{test.visit_type}</td>
                <td>{test.parameters}</td>
                <td>{test.speciality}</td>
                <td>{test.status}</td>
                <td>{test.duration}</td>
                <td>
  <div className="d-flex">
    <Link to={`/admin/view-tests/${test.test_id}`}>
      <button className="btn btn-sm btn-info me-2" style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}>
        View
      </button>
    </Link>

    <Link to={`/admin/edit-tests/${test.test_id}`}>
      <button className="btn btn-sm btn-primary me-2" style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}>
        Edit
      </button>
    </Link>

    <button
      className="btn btn-sm btn-danger"
      onClick={() => handleDeleteTest(test.test_id)}
      style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}
    >
      Delete
    </button>
  </div>
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
          <li className="page-item">
            <button className="page-link" onClick={handlePrevious} disabled={currentPage === 1}>
              Previous
            </button>
          </li>
          {[...Array(totalPages).keys()].map((page) => (
            <li
              key={page + 1}
              className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}
            >
              <button className="page-link" onClick={() => setCurrentPage(page + 1)}>
                {page + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
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
