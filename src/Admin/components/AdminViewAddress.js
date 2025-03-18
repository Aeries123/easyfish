import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminViewAddress = () => {
  const { addressId } = useParams();
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zip_code: "",
    address_type: "home",
  });
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/addresses/${addressId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setAddress(data);
          setFormData({
            address: data.address,
            city: data.city,
            state: data.state,
            zip_code: data.zip_code,
            address_type: data.address_type || "home",
          });
        } else {
          setError(data.error || "Error fetching address details");
        }
      } catch (err) {
        setError("Error fetching address details");
      } finally {
        setLoading(false);
      }
    };
    fetchAddress();
  }, [addressId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/addresses/${addressId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Address updated successfully");
        navigate(-1);
      } else {
        setError(data.error || "Error updating address");
      }
    } catch (err) {
      setError("Error updating address");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Address Details</h2>
      <form onSubmit={handleUpdate}>
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
        <button type="submit" className="btn btn-primary me-2">
          Update Address
        </button>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          Go Back
        </button>
      </form>
    </div>
  );
};

export default AdminViewAddress;
