import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminEditAddress = () => {
  const { addressId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zip_code: "",
    address_type: "home",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const BASE_URL = "http://127.0.0.1:5000";

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/addresses/${addressId}`);
      const data = await response.json();
      console.log(data,"data")

      if (response.ok) {
        setFormData({
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          zip_code: data.zip_code || "",
          address_type: data.address_type || "home",
        });
      } else {
        setError("Error fetching address details");
      }
    } catch (error) {
      setError("Error fetching address details");
      console.error("Fetch error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    try {
      const response = await fetch(`${BASE_URL}/api/addresses/${addressId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Address updated successfully");
        setTimeout(() => navigate("/admin/manage-address"), 2000);
      } else {
        setError(result.error || "Failed to update address");
      }
    } catch (error) {
      setError("Error updating address");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Address</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Zip Code</label>
          <input
            type="text"
            className="form-control"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address Type</label>
          <select
            className="form-control"
            name="address_type"
            value={formData.address_type}
            onChange={handleChange}
          >
            <option value="home">Home</option>
            <option value="work">Work</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Update Address</button>
      </form>
    </div>
  );
};

export default AdminEditAddress;