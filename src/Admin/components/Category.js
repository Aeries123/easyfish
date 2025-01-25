import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Category = () => {
  const [formData, setFormData] = useState({
    category_name: "",
    image: null,
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

  // Handle file input change (image upload)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  // Handle form submission to add a new category
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category_name) {
      setError("Category name is required.");
      return;
    }
    if (!formData.image) {
      setError("Image file is required.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("category_name", formData.category_name);
    formDataToSend.append("image", formData.image);

    try {
      const response = await fetch("http://localhost:5000/api/test_category", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message);
        setError("");  // Clear any previous error messages
        setFormData({ category_name: "", image: null }); // Clear the form data after successful submission
        
        // Clear the file input after successful submission
        document.getElementById("image").value = ""; // Manually clear the file input
      } else {
        const errorResult = await response.json();
        setError(errorResult.error);
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

      <form onSubmit={handleSubmit} className="mb-4" encType="multipart/form-data">
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

        <div className="form-group">
          <label htmlFor="image">Category Image</label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control"
            onChange={handleFileChange}
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
