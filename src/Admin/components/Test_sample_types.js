// src/components/Test_sample_types.js
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const TestSampleTypes = () => {
  const [formData, setFormData] = useState({
    test_id: "",
    sample_type: "",
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

  // Handle form submission to add a new test sample type
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.test_id || !formData.sample_type) {
      setError("Both test_id and sample_type are required.");
      return;
    }

    try {
      const response = await fetch("/api/test-sample-types", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess("Test sample type added successfully!");
        setFormData({ test_id: "", sample_type: "" }); // Clear the form
      } else {
        setError("Failed to add test sample type. Please try again.");
      }
    } catch (error) {
      console.error("Error adding test sample type:", error);
      setError("Error connecting to server. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Test Sample Type</h2>

      {/* Display error or success messages */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Form to add a new test sample type */}
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
          <label htmlFor="sample_type">Sample Type</label>
          <input
            type="text"
            id="sample_type"
            name="sample_type"
            className="form-control"
            value={formData.sample_type}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group col-md-12 text-center mt-4">
            <button type="submit" className="btn btn-primary" style={{ width: '100px' }}>Submit</button>
          </div> 
      </form>
    </div>
  );
};

export default TestSampleTypes;
