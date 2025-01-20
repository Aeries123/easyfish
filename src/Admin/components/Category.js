// src/components/Category.js
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Category = () => {
  const [formData, setFormData] = useState({
    category_name: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission to add a new category
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category_name) {
      setError("Category name is required.");
      return;
    }

    try {
      const response = await fetch("/api/test-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess("Category added successfully!");
        setFormData({ category_name: "" }); // Clear the form
      } else {
        setError("Failed to add category. Please try again.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      setError("Error connecting to server. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Test Category</h2>

      {/* Display error or success messages */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="category_name">Category Name</label>
          <input
            type="text"
            id="category_name"
            name="category_name"
            className="form-control"
            value={formData.category_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default Category;
