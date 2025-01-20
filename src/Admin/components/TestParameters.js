// src/components/TestParameters.js
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const TestParameters = () => {
  const [formData, setFormData] = useState({
    test_id: "",
    parameter: "",
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

  // Handle form submission to add a new test parameter
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.test_id || !formData.parameter) {
      setError("Both test_id and parameter are required.");
      return;
    }

    try {
      const response = await fetch("/api/test-parameters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess("Test parameter added successfully!");
        setFormData({ test_id: "", parameter: "" }); // Clear the form
      } else {
        setError("Failed to add test parameter. Please try again.");
      }
    } catch (error) {
      console.error("Error adding test parameter:", error);
      setError("Error connecting to server. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Test Parameter</h2>

      {/* Display error or success messages */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Form to add a new test parameter */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="test_id">Test ID</label>
          <input
            type="number"
            id="test_id"
            name="test_id"
            className="form-control"
            value={formData.test_id}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="parameter">Parameter</label>
          <input
            type="text"
            id="parameter"
            name="parameter"
            className="form-control"
            value={formData.parameter}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Add Test Parameter
        </button>
      </form>
    </div>
  );
};

export default TestParameters;
