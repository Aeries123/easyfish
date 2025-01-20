import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ManageTestSampleTypes = () => {
  const [data, setData] = useState([
    { id: 1, test_id: 101, sample_type: "Blood" },
    { id: 2, test_id: 102, sample_type: "Urine" },
    { id: 3, test_id: 103, sample_type: "Saliva" },
    { id: 4, test_id: 104, sample_type: "Tissue" },
    { id: 5, test_id: 105, sample_type: "Sputum" },
    { id: 6, test_id: 106, sample_type: "Feces" },
    { id: 7, test_id: 107, sample_type: "Sweat" },
    { id: 8, test_id: 108, sample_type: "Cerebrospinal Fluid" },
    { id: 9, test_id: 109, sample_type: "Bone Marrow" },
    { id: 10, test_id: 110, sample_type: "Amniotic Fluid" }
  ]); // Hardcoded rough data for testing

  const [totalPages, setTotalPages] = useState(1); // Total number of pages, hardcoded for now
  const [currentPage, setCurrentPage] = useState(1); // Current page

  // Fetch data from the PHP backend (this will be simulated here)
  const fetchData = async (page = 1) => {
    try {
      // Simulating fetching data (you can replace this with the actual fetch to your PHP backend)
      const mockData = [
        { id: 1, test_id: 101, sample_type: "Blood" },
        { id: 2, test_id: 102, sample_type: "Urine" },
        { id: 3, test_id: 103, sample_type: "Saliva" },
        { id: 4, test_id: 104, sample_type: "Tissue" },
        { id: 5, test_id: 105, sample_type: "Sputum" },
        { id: 6, test_id: 106, sample_type: "Feces" },
        { id: 7, test_id: 107, sample_type: "Sweat" },
        { id: 8, test_id: 108, sample_type: "Cerebrospinal Fluid" },
        { id: 9, test_id: 109, sample_type: "Bone Marrow" },
        { id: 10, test_id: 110, sample_type: "Amniotic Fluid" }
      ];
      const totalPages = 2; // Just for demonstration, assuming 2 pages
      setData(mockData); // Set the mock data
      setTotalPages(totalPages); // Set the total number of pages
      setCurrentPage(page); // Update current page
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data on initial load and page change
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Test Sample Types</h2>
      
      {/* Table for displaying data */}
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Test ID</th>
            <th>Sample Type</th>
            <th>Actions</th> {/* Actions column */}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.test_id}</td>
              <td>{row.sample_type}</td>
              <td>
                {/* Action buttons (Edit/Delete for example) */}
                <button className="btn btn-warning btn-sm mx-1">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination justify-content-center mt-4">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`btn btn-outline-primary mx-1 ${currentPage === 1 ? 'disabled' : ''}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`btn btn-outline-primary mx-1 ${currentPage === totalPages ? 'disabled' : ''}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageTestSampleTypes;
