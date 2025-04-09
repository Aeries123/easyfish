import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminAddDeliverboy.css"; // You can keep or rename this to ManageDeliveryBoys.css if needed

const AdminAddDeliverboy = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

  // Fetch delivery boys from API
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

  // Search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredDeliveryBoys = deliveryBoys.filter((boy) =>
    Object.values(boy).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
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
    <div className="container-fluid mt-5">
      <h2>Manage Delivery Boys</h2>

      <div className="form-group mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search delivery boys"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <h3 className="mt-5">Delivery Boys List</h3>
      <table className="customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {currentDeliveryBoys.length > 0 ? (
            currentDeliveryBoys.map((boy) => (
              <tr key={boy.delivery_boy_id}>
                <td>{boy.delivery_boy_id}</td>
                <td>{boy.name}</td>
                <td>
                  {boy.phone}
                  <a
                    href={`https://wa.me/${boy.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-icon ms-2"
                  >
                    <FaWhatsapp size={20} color="green" />
                  </a>
                  <a href={`tel:${boy.phone}`} className="phone-icon ms-2">
                    <FaPhone size={20} color="blue" />
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No delivery boys found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary"
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
