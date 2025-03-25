import React, { useState, useEffect } from "react";
import "./ManageBestSeller.css";

const ManageBestSeller = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/best_selling_products`);
      const data = await response.json();
      if (response.ok) {
        setBestSellers(data);
      } else {
        console.error("Error fetching best sellers:", data.error);
      }
    } catch (error) {
      console.error("Error fetching best sellers:", error);
    }
  };

  return (
    <div className="manage-bestsellers-container">
      <h2 className="title">Best Selling Products</h2>

      <div className="table-container">
        <table className="bestsellers-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Total Sales</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {bestSellers.length > 0 ? (
              bestSellers.map((product) => (
                <tr key={product.product_id} className="bestseller-row">
                  <td>{product.product_id}</td>
                  <td>{product.product_name}</td>
                  <td>{product.total_sales}</td>
                  <td>
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.product_name} className="product-image" />
                    ) : (
                      "No Image"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No best-selling products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBestSeller;