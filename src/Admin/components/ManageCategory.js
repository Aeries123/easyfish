import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5); // Number of categories per page
  const [editCategoryId, setEditCategoryId] = useState(null); // For edit functionality
  const [editCategoryName, setEditCategoryName] = useState("");

  // Sample data (you can replace this with actual data from the API)
  const sampleCategories = [
    { id: 1, category_name: "Category 1" },
    { id: 2, category_name: "Category 2" },
    { id: 3, category_name: "Category 3" },
    { id: 4, category_name: "Category 4" },
    { id: 5, category_name: "Category 5" },
    { id: 6, category_name: "Category 6" },
    { id: 7, category_name: "Category 7" },
    { id: 8, category_name: "Category 8" },
    { id: 9, category_name: "Category 9" },
    { id: 10, category_name: "Category 10" },
  ];

  // Fetch categories from the backend when the component mounts
  useEffect(() => {
    // Simulate fetching categories
    setCategories(sampleCategories);
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current categories for the current page
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  // Handle Previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle Next page
  const handleNext = () => {
    if (currentPage < Math.ceil(filteredCategories.length / categoriesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Delete a category
  const handleDelete = async (categoryId) => {
    try {
      // Replace with actual API call to delete category
      const response = true; // Simulate successful delete

      if (response) {
        setSuccess("Category deleted successfully!");
        setCategories(categories.filter((category) => category.id !== categoryId));
      } else {
        setError("Failed to delete category.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      setError("Error connecting to server. Please try again.");
    }
  };

  // Handle editing a category
  const handleEdit = (categoryId, categoryName) => {
    setEditCategoryId(categoryId);
    setEditCategoryName(categoryName);
  };

  // Handle saving the edited category
  const handleSaveEdit = () => {
    if (editCategoryId !== null && editCategoryName.trim() !== "") {
      // Simulate saving edited category
      setCategories(
        categories.map((category) =>
          category.id === editCategoryId
            ? { ...category, category_name: editCategoryName }
            : category
        )
      );
      setSuccess("Category updated successfully!");
      setEditCategoryId(null); // Close the edit form
    } else {
      setError("Category name cannot be empty.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Categories</h2>

      {/* Display error or success messages */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Categories Table */}
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Row</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.length > 0 ? (
            currentCategories.map((category, index) => (
              <tr key={category.id}>
                <td>{index + 1}</td> {/* Display row number */}
                <td>{category.category_name}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(category.id, category.category_name)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Category Modal */}
      {editCategoryId && (
        <div className="modal" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Category</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditCategoryId(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditCategoryId(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveEdit}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="d-flex justify-content-between">
        {/* Previous Button */}
        <button
          className="btn btn-secondary"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* Next Button */}
        <button
          className="btn btn-secondary"
          onClick={handleNext}
          disabled={currentPage === Math.ceil(filteredCategories.length / categoriesPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageCategory;
