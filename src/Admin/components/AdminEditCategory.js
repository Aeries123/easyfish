import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminEditCategory = () => {
  const { categoryId } = useParams(); // Get categoryId from URL parameters
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    category_name: "",
    image: null,
  });
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(""); // Error handling state
  const [success, setSuccess] = useState(""); // Success handling state

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    // Fetch the category data
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/test_category/${categoryId}`);
        const data = await response.json();
        console.log(data,"category_image")
        
        if (response.ok) {
          setCategory({
            category_name: data.data.category_name,
            image: data.data.image_url, // We will keep image as null until the user selects a new one
          });
        } else {
          console.error("Error fetching category:", data.message);
          setError("Category not found.");
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        setError("Error fetching category details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  // Handle file input change (image upload)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCategory((prevCategory) => ({
      ...prevCategory,
      image: file,
    }));
  };

  // Handle form submission to update category
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.category_name) {
      setError("Category name is required.");
      return;
    }

    const formData = new FormData();
    formData.append("category_name", category.category_name);
    if (category.image) {
      formData.append("image", category.image);
    }

    try {
      const response = await fetch(`${BASE_URL}/api/test_category/${categoryId}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setSuccess("Category updated successfully!");
        setError(""); // Clear any previous errors
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error updating category:", error);
      setError("Error updating category. Please try again.");
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
      <h2>Edit Category</h2>

      {/* Display success message */}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="category_name">Category Name</label>
          <input
            type="text"
            id="category_name"
            name="category_name"
            className="form-control"
            value={category.category_name}
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
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Save Changes
        </button>
      </form>

      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary mt-3 ms-2"
      >
        Cancel
      </button>
    </div>
  );
};

export default AdminEditCategory;
