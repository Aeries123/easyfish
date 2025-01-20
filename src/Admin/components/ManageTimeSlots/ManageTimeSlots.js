import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ManageTimeSlots = () => {
  const [data, setData] = useState([]); // To store the time slots data
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  const itemsPerPage = 10; // Set number of items per page to 10

  // Fetch data from the backend (Replace with actual API call)
  const fetchData = async () => {
    try {
      const mockData = [
        { slot_id: 1, test_id: 101, slot_date: '2025-01-19 09:00:00', is_available: 1 },
        { slot_id: 2, test_id: 102, slot_date: '2025-01-19 09:30:00', is_available: 1 },
        { slot_id: 3, test_id: 103, slot_date: '2025-01-19 10:00:00', is_available: 0 },
        { slot_id: 4, test_id: 104, slot_date: '2025-01-19 10:30:00', is_available: 1 },
        { slot_id: 5, test_id: 105, slot_date: '2025-01-19 11:00:00', is_available: 1 },
        { slot_id: 6, test_id: 106, slot_date: '2025-01-19 11:30:00', is_available: 1 },
        { slot_id: 7, test_id: 107, slot_date: '2025-01-19 12:00:00', is_available: 0 },
        { slot_id: 8, test_id: 108, slot_date: '2025-01-19 12:30:00', is_available: 1 },
        { slot_id: 9, test_id: 109, slot_date: '2025-01-19 13:00:00', is_available: 1 },
        { slot_id: 10, test_id: 110, slot_date: '2025-01-19 13:30:00', is_available: 0 },
        { slot_id: 11, test_id: 111, slot_date: '2025-01-19 14:00:00', is_available: 1 },
        { slot_id: 12, test_id: 112, slot_date: '2025-01-19 14:30:00', is_available: 1 },
        { slot_id: 13, test_id: 113, slot_date: '2025-01-19 15:00:00', is_available: 1 },
        { slot_id: 14, test_id: 114, slot_date: '2025-01-19 15:30:00', is_available: 0 },
        { slot_id: 15, test_id: 115, slot_date: '2025-01-19 16:00:00', is_available: 1 },
        { slot_id: 16, test_id: 116, slot_date: '2025-01-19 16:30:00', is_available: 1 }
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

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get the data for the current page
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  // Handle Edit action
  const handleEdit = (slot_id) => {
    console.log('Edit slot:', slot_id);
    // Add your logic for editing the slot
  };

  // Handle Delete action
  const handleDelete = (slot_id) => {
    console.log('Delete slot:', slot_id);
    // Add your logic for deleting the slot
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Time Slots</h2>

      {/* Table for displaying data */}
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Slot ID</th>
            <th>Test ID</th>
            <th>Slot Date</th>
            <th>Availability</th> {/* Availability status */}
            <th>Action</th> {/* Action column */}
          </tr>
        </thead>
        <tbody>
          {getCurrentPageData().map((row) => (
            <tr key={row.slot_id}>
              <td>{row.slot_id}</td>
              <td>{row.test_id}</td>
              <td>{row.slot_date}</td>
              <td>{row.is_available ? 'Available' : 'Not Available'}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mx-1"
                  onClick={() => handleEdit(row.slot_id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm mx-1"
                  onClick={() => handleDelete(row.slot_id)}
                >
                  Delete
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

export default ManageTimeSlots;
