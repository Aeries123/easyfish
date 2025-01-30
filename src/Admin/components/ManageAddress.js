import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [alertMessage, setAlertMessage] = useState(""); // State for alert message
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/addresses', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
          },
        });
        const data = await response.json();

        if (response.ok) {
          setAddresses(data || []);
        } else {
          console.error('Error fetching addresses:', data.message);
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredAddresses = addresses.filter((address) =>
    Object.values(address).some(
      (value) =>
        value !== null &&
        value !== undefined &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastAddress = currentPage * rowsPerPage;
  const indexOfFirstAddress = indexOfLastAddress - rowsPerPage;
  const currentAddresses = filteredAddresses.slice(
    indexOfFirstAddress,
    indexOfLastAddress
  );

  const totalPages = Math.ceil(filteredAddresses.length / rowsPerPage);

  const handlePrevious = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);

  const handleDeleteAddress = async (addressId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this address?');
    if (!confirmDelete) return;

    // Optimistically update the UI: set the `isDeleting` flag for the specific address
    const updatedAddresses = addresses.map((address) =>
      address.address_id === addressId ? { ...address, isDeleting: true } : address
    );
    setAddresses(updatedAddresses);

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/admin/addresses/${addressId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
        },
      });

      if (response.ok) {
        setAddresses(addresses.filter((address) => address.address_id !== addressId));
        setAlertMessage("Address deleted successfully!");
      } else {
        setAlertMessage("Failed to delete address.");
      }
    } catch (error) {
      setAlertMessage("Error deleting address.");
      console.error('Error deleting address:', error);
    }

    // Hide alert after 3 seconds
    setTimeout(() => setAlertMessage(""), 3000);
  };

  return (
    <div className="container mt-4">
      <h2>Manage Addresses</h2>
      <Link to="/admin/add-address">
        <button>Add Address</button>
      </Link>

      {/* Search Input */}
      <input
        type="text"
        className="form-control"
        placeholder="Search addresses..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Alert Message */}
      {alertMessage && (
        <div className="alert alert-info mt-3">
          {alertMessage}
        </div>
      )}

      <table className="table table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Address ID</th>
            <th>Door No</th>
            <th>Street</th>
            <th>Village</th>
            <th>Mandal</th>
            <th>District</th>
            <th>State</th>
            <th>Country</th>
            <th>Pincode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAddresses.length > 0 ? (
            currentAddresses.map((address) => (
              <tr key={address.address_id}>
                <td>{address.address_id}</td>
                <td>{address.door_no}</td>
                <td>{address.street}</td>
                <td>{address.village}</td>
                <td>{address.mandal}</td>
                <td>{address.district}</td>
                <td>{address.state}</td>
                <td>{address.country}</td>
                <td>{address.pincode}</td>
                <td>
                  <Link to={`/admin/view-address/${address.address_id}`}>
                    <button className="btn btn-sm btn-info me-2">View</button>
                  </Link>

                  <Link to={`/admin/edit-address/${address.address_id}`}>
                    <button className="btn btn-sm btn-primary me-2">Edit</button>
                  </Link>

                  {/* Delete Button */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteAddress(address.address_id)}
                    disabled={address.isDeleting} // Disable delete for this specific address
                  >
                    {address.isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">
                No addresses available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <nav className="mt-3">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handlePrevious}>
              Previous
            </button>
          </li>
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handleNext}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ManageAddress;
