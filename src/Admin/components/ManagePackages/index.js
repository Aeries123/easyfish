import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("name"); // Default filter

  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setErrorMessage("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle Delete
  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      setErrorMessage("Failed to delete product");
    }
  };

  // Search Filter Function
  const filteredProducts = products.filter((product) =>
    product[filterBy]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-center">Manage Products</h2>

      {/* Add Product Button */}
      <div className="d-flex justify-content-center mb-3">
        <Link to="/admin/add-product">
          <button className="btn btn-success">Add Product</button>
        </Link>
      </div>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* Search and Filter */}
      <div className="mb-3 d-flex gap-2">
        <select className="form-control" value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
          <option value="name">Product Name</option>
          <option value="category">Category Name</option>
        </select>
        <input
          type="text"
          className="form-control"
          placeholder={`Search by ${filterBy.replace("_", " ")}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center">Loading products...</div>
      ) : filteredProducts.length > 0 ? (
        <div className="table-container">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Product ID</th>
                <th>Image</th>
                <th>Category Name</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Weight</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    {product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt="Product"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{product.category || "N/A"}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.stock}</td>
                  <td>${product.defaultPrice?.toFixed(2)}</td>
                  <td>{product.defaultWeight}g</td>
                  <td>
                    <Link to={`/admin/edit-product/${product.id}`} className="btn btn-warning btn-sm mx-1">
                      Edit
                    </Link>

                    <Link to={`/admin/view-product/${product.id}`} className="btn btn-warning btn-sm mx-1">
                      View
                    </Link>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No products found.</div>
      )}
    </div>
  );
};

export default ManageProducts;
