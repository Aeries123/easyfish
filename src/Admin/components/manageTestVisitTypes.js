import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ManageTestVisitTypes = () => {
  const [data, setData] = useState([]); // To store the test visit types data
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [editVisitType, setEditVisitType] = useState(null); // To store the visit type currently being edited
  const [editedVisitType, setEditedVisitType] = useState({}); // Edited visit type data

  const itemsPerPage = 10; // Set number of items per page to 10

  // Fetch data from the backend (Replace with actual API call)
  const fetchData = async () => {
    try {
      const mockData = [
        { id: 1, test_id: 101, visit_type: 'Routine Checkup' },
        { id: 2, test_id: 102, visit_type: 'Follow-up' },
        { id: 3, test_id: 103, visit_type: 'Emergency' },
        { id: 4, test_id: 104, visit_type: 'Preventive' },
        { id: 5, test_id: 105, visit_type: 'Post-Operation' },
        { id: 6, test_id: 106, visit_type: 'Checkup' },
        { id: 7, test_id: 107, visit_type: 'Rehabilitation' },
        { id: 8, test_id: 108, visit_type: 'Initial Consultation' },
        { id: 9, test_id: 109, visit_type: 'Blood Test' },
        { id: 10, test_id: 110, visit_type: 'Vaccination' },
        { id: 11, test_id: 111, visit_type: 'X-ray' },
        { id: 12, test_id: 112, visit_type: 'Ultrasound' },
        { id: 13, test_id: 113, visit_type: 'MRI Scan' },
        { id: 14, test_id: 114, visit_type: 'CT Scan' }
      ];

      setData(mockData); // Set the mock data (replace this with actual API data)

      // Calculate total pages for pagination
      setTotalPages(Math.ceil(mockData.length / itemsPerPage));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Handle deleting a visit type
  const handleDeleteVisitType = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData); // Remove the selected item from the table
    setTotalPages(Math.ceil(updatedData.length / itemsPerPage)); // Update total pages
  };

  // Handle editing a visit type
  const handleEditVisitType = (visitType) => {
    setEditVisitType(visitType); // Set the visit type to be edited
    setEditedVisitType(visitType); // Set initial value for editing
  };

  // Handle saving the edited visit type
  const handleSaveEdit = () => {
    const updatedData = data.map((item) =>
      item.id === editedVisitType.id ? editedVisitType : item
    );
    setData(updatedData);
    setEditVisitType(null); // Close the edit mode
  };

  // Handle input changes during edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVisitType({ ...editedVisitType, [name]: value });
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get the data for the current page
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Test Visit Types</h2>

      {/* Table for displaying data */}
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Test ID</th>
            <th>Visit Type</th>
            <th>Actions</th> {/* Action buttons */}
          </tr>
        </thead>
        <tbody>
          {getCurrentPageData().map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.test_id}</td>
              <td>
                {editVisitType && editVisitType.id === row.id ? (
                  <input
                    type="text"
                    name="visit_type"
                    value={editedVisitType.visit_type}
                    onChange={handleInputChange}
                  />
                ) : (
                  row.visit_type
                )}
              </td>
              <td>
                {editVisitType && editVisitType.id === row.id ? (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEditVisitType(row)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm ml-2"
                      onClick={() => handleDeleteVisitType(row.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
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

export default ManageTestVisitTypes;
