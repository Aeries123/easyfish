import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageTestResults = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(5); // Number of results per page

  // Simulated API Call to Fetch Test Results (using mock data)
  const fetchTestResults = async () => {
    setLoading(true);
    try {
      // Simulated data for testing purposes
      const data = [
        { appointment_id: 101, test_id: 1001, result_text: 'Positive', status: 'completed', date: '2025-01-01' },
        { appointment_id: 102, test_id: 1002, result_text: 'Negative', status: 'completed', date: '2025-01-02' },
        { appointment_id: 103, test_id: 1003, result_text: 'Pending', status: 'pending', date: '2025-01-03' },
        { appointment_id: 104, test_id: 1004, result_text: 'Negative', status: 'completed', date: '2025-01-04' },
        { appointment_id: 105, test_id: 1005, result_text: 'Positive', status: 'completed', date: '2025-01-05' },
        { appointment_id: 106, test_id: 1006, result_text: 'Pending', status: 'pending', date: '2025-01-06' },
        { appointment_id: 107, test_id: 1007, result_text: 'Negative', status: 'completed', date: '2025-01-07' },
        { appointment_id: 108, test_id: 1008, result_text: 'Positive', status: 'completed', date: '2025-01-08' },
        { appointment_id: 109, test_id: 1009, result_text: 'Negative', status: 'completed', date: '2025-01-09' },
        { appointment_id: 110, test_id: 1010, result_text: 'Pending', status: 'pending', date: '2025-01-10' },
        { appointment_id: 111, test_id: 1011, result_text: 'Positive', status: 'completed', date: '2025-01-11' },
        { appointment_id: 112, test_id: 1012, result_text: 'Negative', status: 'completed', date: '2025-01-12' },
      ];

      // Simulate setting data
      setTestResults(data);
    } catch (error) {
      console.error('Error fetching test results:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestResults();
  }, []);

  // Calculate the index range for the current page
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = testResults.slice(indexOfFirstResult, indexOfLastResult);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(testResults.length / resultsPerPage);

  return (
    <div className="container mt-5">
      <h2>Manage Test Results</h2>

      {/* Table displaying test results */}
      {loading ? (
        <div>Loading test results...</div>
      ) : (
        <>
          <table className="table table-bordered table-striped mt-3">
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Test ID</th>
                <th>Result Text</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentResults.length > 0 ? (
                currentResults.map((result) => (
                  <tr key={result.appointment_id}>
                    <td>{result.appointment_id}</td>
                    <td>{result.test_id}</td>
                    <td>{result.result_text}</td>
                    <td>{result.status}</td>
                    <td>{new Date(result.date).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No test results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <nav>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                  Previous
                </button>
              </li>

              {[...Array(totalPages).keys()].map((page) => (
                <li key={page} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                    {page + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default ManageTestResults;
