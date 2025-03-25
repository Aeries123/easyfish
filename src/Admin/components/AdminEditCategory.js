import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminEditCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: "", image: null });
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/categories/${categoryId}`
        );
        const data = await response.json();

        if (response.ok) {
          setCategory({ name: data.data.category_name });
          setPreviewImage(data.data.image); // Load existing image preview
        } else {
          setError(data.message || "Category not found.");
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

  const handleInputChange = (e) => {
    setCategory({ ...category, name: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategory({ ...category, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.name) {
      setError("Category name is required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", category.name);
      if (category.image) {
        formData.append("image", category.image);
      }

      const response = await fetch(
        `http://127.0.0.1:5000/api/categories/${categoryId}`,
        {
          method: "PUT",
          body: formData, // Send as form-data
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Category updated successfully!");
        setError("");
      } else {
        setError(data.error || "Error updating category.");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      setError("Error updating category. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Edit Category</h2>

      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Category Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={category.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="image">Category Image</label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg, image/gif"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Category"
              className="img-thumbnail mt-2"
              style={{ width: "150px", height: "150px" }}
            />
          )}
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Save Changes
        </button>

        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary mt-3 ms-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AdminEditCategory;
