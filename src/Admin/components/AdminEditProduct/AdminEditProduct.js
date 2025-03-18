import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminEditProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL; // Ensure your .env file has this value

  const [formData, setFormData] = useState({
    category_id: "",
    product_name: "",
    description: "",
    added_by: "",
  });

  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products/${id}`);
        const data = await response.json();

        if (response.ok) {
          setFormData({
            category_id: data.category_id || "",
            product_name: data.product_name || "",
            description: data.description || "",
            added_by: data.added_by || "",
          });
        } else {
          setErrorMessage(data.message || "Error fetching product details.");
        }
      } catch (error) {
        setErrorMessage("Error fetching product details.");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/test_category`);
        const data = await response.json();

        if (response.ok && Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          setErrorMessage("Error fetching categories.");
        }
      } catch (error) {
        setErrorMessage("Error fetching categories.");
      }
    };

    fetchProductDetails();
    fetchCategories();
  }, [id]);

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Product updated successfully!");
        setTimeout(() => navigate("/admin/products"), 2000);
      } else {
        setErrorMessage(result.error || "Failed to update product.");
      }
    } catch (error) {
      setErrorMessage("Error updating product.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Product</h2>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category:</label>
          <select
            className="form-control"
            name="category_id"
            value={formData.category_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            className="form-control"
            name="product_name"
            value={formData.product_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

       

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>

      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
        Go Back
      </button>
    </div>
  );
};

export default AdminEditProduct;
