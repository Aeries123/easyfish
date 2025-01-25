import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminEditTests = () => {
  const { testId } = useParams(); // Extract testId from route params
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    test_name: "",
    description: "",
    price: "",
    preparation_instructions: "",
    test_code: "",
    category_id: "",
    duration: "",
    status: "Available",
    sample_type: "",
    speciality: "",
    visit_type: "",
    parameters: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/tests/${testId}`);
        const data = await response.json();

        if (response.ok) {
          const testData = data.data[0];
          setFormData({
            test_name: testData.test_name || "",
            description: testData.description || "",
            price: testData.price || "",
            preparation_instructions: testData.preparation_instructions || "",
            test_code: testData.test_code || "",
            category_id: testData.category_id || "",
            duration: testData.duration || "",
            status: testData.status || "Available",
            sample_type: testData.sample_type || "",
            speciality: testData.speciality || "",
            visit_type: testData.visit_type || "",
            parameters: testData.parameters || "",
          });
        } else {
          console.error("Error fetching test details:", data.error);
        }
      } catch (error) {
        console.error("Error fetching test details:", error);
      }
    };

    fetchTestDetails();
  }, [testId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = ["test_name", "price", "test_code", "category_id", "sample_type", "status"];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setErrorMessage(`${field.replace(/_/g, " ")} is required.`);
        return false;
      }
    }

    if (isNaN(formData.price) || Number(formData.price) <= 0) {
      setErrorMessage("Price must be a valid positive number.");
      return false;
    }

    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Prevent form submission if validation fails
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/tests/${testId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Test updated successfully!");
        navigate(-1); // Navigate back to the previous page
      } else {
        setErrorMessage(data.error || "Failed to update the test.");
      }
    } catch (error) {
      console.error("Error updating the test:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Test</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleFormSubmit}>
        {Object.keys(formData).map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">
              {field.replace(/_/g, " ").toUpperCase()}
            </label>
            <input
              type={field === "price" ? "number" : "text"}
              className="form-control"
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              required={["test_name", "price", "test_code", "category_id", "sample_type", "status"].includes(field)}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Update Test
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AdminEditTests;
