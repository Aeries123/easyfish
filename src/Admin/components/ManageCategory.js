import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9;
  const BASE_URL = "http://127.0.0.1:5000";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/categories`);
      const data = await response.json();
      if (response.ok) {
        setCategories(data.categories || []);
      } else {
        console.error("Error fetching categories:", data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleUpdate = async (categoryId, newCategoryName) => {
    if (!newCategoryName.trim()) return;

    try {
      const response = await fetch(`${BASE_URL}/api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name: newCategoryName }),
      });

      const result = await response.json();
      if (response.ok) {
        fetchCategories();
        alert("Category updated successfully.");
      } else {
        console.error("Update error:", result.message);
        alert("Failed to update the category.");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update the category.");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(`${BASE_URL}/api/categories/${categoryId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          setCategories(categories.filter((category) => category.category_id !== categoryId));
          alert("Category deleted successfully.");
        } else {
          const errorData = await response.json();
          console.error("Error deleting category:", errorData.message);
          alert("Failed to delete the category.");
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete the category.");
      }
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCategory = currentPage * rowsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - rowsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);

  return (
    <div className="container-fluid mt-4">
      <h2>Manage Categories</h2>
      <Link to="/admin/category">
        <button className="btn btn-primary mb-3">Add Category</button>
      </Link>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Category ID</th>
            <th>Category Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.length > 0 ? (
            currentCategories.map((category) => (
              <tr key={category.category_id}>
                <td>{category.category_id}</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={category.category_name}
                    onBlur={(e) => handleUpdate(category.category_id, e.target.value)}
                  />
                </td>
                <td>
                  {category.image ? (
                    <img src={category.image} alt="Category" width="50" height="50" />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  <button className="btn btn-danger btn-sm me-2" onClick={() => handleDeleteCategory(category.category_id)}>
                    Delete
                  </button>

                   <Link to={`/admin/edit-category/${category.category_id}`}>
                                      <button className="btn btn-primary btn-sm me-2">Edit</button>
                                    </Link>
                  <Link to={`/admin/view-category/${category.category_id}`}>
                    <button className="btn btn-secondary btn-sm">View</button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No categories available.</td>
            </tr>
          )}
        </tbody>
      </table>
      <nav className="mt-3">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage((prev) => prev - 1)}>Previous</button>
          </li>
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ManageCategory;
