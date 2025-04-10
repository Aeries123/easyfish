import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminAddDeliverboy.css";
import AdminRegisterDeliveryAgent from "../AdminRegisterDeliveryAgent/AdminRegisterDeliveryAgent";

const AdminAddDeliverboy = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

  useEffect(() => {
    const fetchDeliveryBoys = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/delivery_boys`);
        const data = await response.json();
        if (response.ok) {
          setDeliveryBoys(data.delivery_boys || []);
        } else {
          console.error("Error fetching delivery boys:", data.error);
        }
      } catch (error) {
        console.error("Error fetching delivery boys:", error);
      }
    };

    fetchDeliveryBoys();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredDeliveryBoys = deliveryBoys.filter((boy) =>
    Object.values(boy).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDeliveryBoys = filteredDeliveryBoys.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredDeliveryBoys.length / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="admin-delivery-container container-fluid mt-5">
      <h2 className="admin-delivery-title">Manage Delivery Boys</h2>

      <button
        className="btn btn-primary admin-add-button my-3"
        onClick={() => setShowRegisterForm(true)}
      >
        Add Delivery Agent
      </button>

      {showRegisterForm && (
        <div className="admin-register-form my-4">
          <AdminRegisterDeliveryAgent
            onClose={() => setShowRegisterForm(false)}
          />
        </div>
      )}

      <div className="admin-search-box form-group mt-3">
        <input
          type="text"
          className="form-control admin-search-input"
          placeholder="Search delivery boys"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <h3 className="admin-list-title mt-5">Delivery Boys List</h3>
      <table className="admin-delivery-table">
        <thead>
          <tr>
            <th className="admin-table-header">ID</th>
            <th className="admin-table-header">Name</th>
            <th className="admin-table-header">Phone</th>
          </tr>
        </thead>
        <tbody>
          {currentDeliveryBoys.length > 0 ? (
            currentDeliveryBoys.map((boy) => (
              <tr key={boy.delivery_boy_id} className="admin-table-row">
                <td className="admin-table-cell">{boy.delivery_boy_id}</td>
                <td className="admin-table-cell">{boy.name}</td>
                <td className="admin-table-cell">
                  {boy.phone}
                  <a
                    href={`https://wa.me/${boy.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-icon whatsapp-icon ms-2"
                  >
                    <FaWhatsapp size={20} />
                  </a>
                  <a
                    href={`tel:${boy.phone}`}
                    className="admin-icon phone-icon ms-2"
                  >
                    <FaPhone size={20} />
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="admin-no-data text-center">
                No delivery boys found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="admin-pagination d-flex justify-content-between mt-3">
        <button
          className="btn btn-secondary admin-pagination-btn"
          disabled={currentPage === 1}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary admin-pagination-btn"
          disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminAddDeliverboy;
