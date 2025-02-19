import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TestsForm = () => {
  const [formData, setFormData] = useState({
    test_name: "",
    description: "",
    price: "",
    preparation_instructions: "",
    test_code: "",
    sample_type: "",
    visit_type: "",
    parameters: "",
    duration: "",
    status: "",
    speciality: "",
    category_name: "",
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  console.log(categories);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // console.log("categories_name", categories.data[0].category_name);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/test_category`);
        if (response.ok) {
          const data = await response.json();
          console.log("Categories:", data.data);
          data.data.forEach((category) => {
            console.log("Category Name:", category.category_name);
          });
          setCategories(data);
        } else {
          setMessage("Failed to load categories.");
        }
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/register/tests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Test added successfully!");
        setFormData({
          test_name: "",
          description: "",
          price: "",
          preparation_instructions: "",
          test_code: "",
          sample_type: "",
          visit_type: "",
          parameters: "",
          duration: "",
          status: "",
          speciality: "",
          category_name: "",
        });
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Create Test</h2>
      {message && (
        <div
          className={`alert ${
            message.includes("Error") ? "alert-danger" : "alert-success"
          }`}
          role="alert"
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Test Name</label>
              <input
                type="text"
                className="form-control"
                name="test_name"
                value={formData.test_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                name="category_name"
                value={formData.category_name}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {Array.isArray(categories.data) &&
                  categories.data.map((category) => (
                    <option
                      key={category.category_id}
                      value={category.category_name}
                    >
                      {category.category_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label>Test Code</label>
              <input
                type="number"
                className="form-control"
                name="test_code"
                value={formData.test_code}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                className="form-control"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                className="form-control"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Preparation Instructions</label>
              <textarea
                className="form-control"
                name="preparation_instructions"
                value={formData.preparation_instructions}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Sample Type</label>
              <textarea
                className="form-control"
                name="sample_type"
                value={formData.sample_type}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Visit Type</label>
              <textarea
                className="form-control"
                name="visit_type"
                value={formData.visit_type}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Parameters</label>
              <textarea
                className="form-control"
                name="parameters"
                value={formData.parameters}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="form-group col-md-12 text-center mt-4">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestsForm;
