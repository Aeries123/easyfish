import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminEditCustomer = () => {
  const { customerId } = useParams(); // Extract customerId from the URL params
  const navigate = useNavigate(); // Hook to navigate after update
  const [formData, setFormData] = useState({
    customer_name: "",
    password: "",
    phone: "",
    gender: "",
  }); // State for form data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for errors
  const [success, setSuccess] = useState(null); // State for success message

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/customers/${customerId}`);
        const data = await response.json();

        if (response.ok) {
          setFormData({
            customer_name: data.customer.customer_name || "",
            phone: data.customer.phone || "",
            gender: data.customer.gender || "",
            password: "", // Keep password field empty for security reasons
          });
        } else {
          setError(data.message || "Error fetching customer details");
        }
      } catch (err) {
        setError("Error fetching customer details");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/customers/update/${customerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Customer updated successfully.");
        setTimeout(() => {
          navigate(`/admin/view-customer/${customerId}`); // Redirect after success
        }, 2000);
      } else {
        setError(data.error || "Error updating customer");
      }
    } catch (err) {
      setError("Error updating customer");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Edit Customer</h2>
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="customer_name" className="form-label">Customer Name</label>
          <input
            type="text"
            id="customer_name"
            name="customer_name"
            className="form-control"
            value={formData.customer_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select
            id="gender"
            name="gender"
            className="form-control"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Leave blank to keep current password"
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Customer</button>
      </form>
    </div>
  );
};

export default AdminEditCustomer;
