import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/packages");
        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }

        const data = await response.json();
        console.log("Fetched packages:", data); // Debugging

        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setErrorMessage("Failed to fetch packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Search Filter Function
  const filteredPackages = packages.filter((pkg) =>
    pkg.package_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Admin Packages</h2>
      <Link to="/admin/package">
        <button className="btn btn-success mb-3">Add Package</button>
      </Link>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by package name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div>Loading packages...</div>
      ) : filteredPackages.length > 0 ? (
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Package ID</th>
              <th>Package Name</th>
              <th>No. of Tests</th>
              <th>Test Names</th>
              <th>Total Price Before Discount</th>
              <th>Discount (%)</th>
              <th>Final Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredPackages.map((pkg) => (
              <tr key={pkg.package_id}>
                <td>{pkg.package_id}</td>
                <td>{pkg.package_name}</td>
                <td>{pkg.no_of_tests}</td>
                <td>{pkg.test_names.join(", ")}</td>
                <td>₹{pkg.total_price_before_discount}</td>
                <td>{pkg.discount}%</td>
                <td>₹{pkg.final_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No packages found.</div>
      )}
    </div>
  );
};

export default ManagePackages;