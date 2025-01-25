import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminViewCategory = () => {
  const { categoryId } = useParams(); // Extract categoryId from URL parameters
  const navigate = useNavigate();
  const [category, setCategory] = useState(null); // State to store category details
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/test_category/${categoryId}`);
        const data = await response.json();
        
        if (response.ok) {
          setCategory(data.data); // Assuming response has "data" as the category info
        } else {
          console.error("Error fetching category:", data.message);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false); // Stop loading when fetch is complete
      }
    };

    fetchCategory();
  }, [categoryId]); // Re-fetch if categoryId changes

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (!category) {
    return <div>Category not found!</div>; // Show error message if category not found
  }

  return (
    <div className="container mt-4">
      <h2>Category Details</h2>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Category ID</th>
            <td>{category.category_id}</td>
          </tr>
          <tr>
            <th>Category Name</th>
            <td>{category.category_name}</td>
          </tr>
          <tr>
            <th>Image</th>
            <td>
              {category.image_url ? (
                <img src={category.image_url} alt={category.category_name} width="200" />
              ) : (
                <p>No image available</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <button onClick={() => navigate(-1)} className="btn btn-secondary">
        Go Back
      </button>
    </div>
  );
};

export default AdminViewCategory;
