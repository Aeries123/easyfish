import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false); // To track deletion state
  const rowsPerPage = 9;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/test_category");
        const data = await response.json();
        console.log("Fetched categories data:", data);

        if (response.ok) {
          setCategories(data.data || []);
        } else {
          console.error("Error fetching categories:", data.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredCategories = categories.filter((category) =>
    Object.values(category).some(
      (value) =>
        value !== null &&
        value !== undefined &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastCategory = currentPage * rowsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - rowsPerPage;
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);

  const handlePrevious = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);

  const handleDeleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;
  
    const updatedCategories = categories.map((category) =>
      category.category_id === categoryId ? { ...category, isDeleting: true } : category
    );
    setCategories(updatedCategories);
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/test_category/${categoryId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setCategories(categories.filter((category) => category.category_id !== categoryId));
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  
  

  return (
    <div className="container mt-4">
      <h2>Manage Categories</h2>
       <Link to="/admin/category">
              <button>Add Categories</button>
            </Link>

      {/* Search Input */}
      
        <input
          type="text"
          className="form-control"
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
                <td>{category.category_name}</td>
                <td>
                  {category.image_url ? (
                    <img
                      src={category.image_url}
                      alt={category.category_name}
                      width="50"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  <Link to={`/admin/view-category/${category.category_id}`}>
                    <button className="btn btn-sm btn-info me-2">View</button>
                  </Link>

                  <Link to={`/admin/edit-category/${category.category_id}`}>
                    <button className="btn btn-sm btn-primary me-2">
                      Edit
                    </button>
                  </Link>

                  {/* Delete Button */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteCategory(category.category_id)}
                    disabled={isDeleting} // Disable delete while deleting
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No categories available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <nav className="mt-3">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={handlePrevious}>
              Previous
            </button>
          </li>
          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
          >
            <button className="page-link" onClick={handleNext}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ManageCategory;
