import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ManageTestParameters = () => {
  // Mock data for demonstration
  const mockParameters = [
    { id: 1, test_id: 101, parameter: "Glucose Level" },
    { id: 2, test_id: 102, parameter: "Hemoglobin" },
    { id: 3, test_id: 103, parameter: "Cholesterol" },
    { id: 4, test_id: 104, parameter: "Blood Pressure" },
    { id: 5, test_id: 105, parameter: "Vitamin D" },
    { id: 6, test_id: 106, parameter: "Thyroid Panel" },
    { id: 7, test_id: 107, parameter: "Electrolytes" },
    { id: 8, test_id: 108, parameter: "Liver Function Test" },
    { id: 9, test_id: 109, parameter: "Kidney Function Test" },
    { id: 10, test_id: 110, parameter: "C-Reactive Protein" },
    { id: 11, test_id: 111, parameter: "Calcium" },
    { id: 12, test_id: 112, parameter: "Iron Studies" },
    { id: 13, test_id: 113, parameter: "Prostate-Specific Antigen" },
    { id: 14, test_id: 114, parameter: "Uric Acid" },
    { id: 15, test_id: 115, parameter: "Complete Blood Count" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Updated to display 10 rows per page

  // Pagination logic
  const totalPages = Math.ceil(mockParameters.length / itemsPerPage);
  const currentData = mockParameters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (id) => {
    alert(`Edit parameter with ID: ${id}`);
    // Implement edit functionality here
  };

  const handleDelete = (id) => {
    alert(`Delete parameter with ID: ${id}`);
    // Implement delete functionality here
  };

  return (
    <div className="container mt-4">
      <h3>Manage Test Parameters</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Test ID</th>
            <th>Parameter</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((param, index) => (
              <tr key={param.id}>
                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td>{param.test_id}</td>
                <td>{param.parameter}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(param.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(param.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-secondary"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-secondary"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageTestParameters;
