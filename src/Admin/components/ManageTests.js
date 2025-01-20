import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TestsForm = () => {
  const [testName, setTestName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [preparationInstructions, setPreparationInstructions] = useState("");
  const [testCode, setTestCode] = useState("");
  const [sampleType, setSampleType] = useState("");
  const [visitType, setVisitType] = useState("");
  const [parameters, setParameters] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const testData = {
      testName,
      description,
      price,
      preparationInstructions,
      testCode,
      sampleType,
      visitType,
      parameters,
      duration,
      status,
      speciality,
      categoryId,
      createdAt,
      updatedAt,
    };
    console.log(testData);
    // Add logic to handle form submission (e.g., send data to server)
  };

  return (
    <div className="container mt-4">
      <h3>Create a New Test</h3>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="testName" className="form-label">Test Name</label>
              <input
                type="text"
                className="form-control"
                id="testName"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                required
              />
              <div className="invalid-feedback">Please provide a test name.</div>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <div className="invalid-feedback">Please provide a price.</div>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="testCode" className="form-label">Test Code</label>
              <input
                type="number"
                className="form-control"
                id="testCode"
                value={testCode}
                onChange={(e) => setTestCode(e.target.value)}
                required
              />
              <div className="invalid-feedback">Please provide a test code.</div>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="sampleType" className="form-label">Sample Type</label>
              <input
                type="text"
                className="form-control"
                id="sampleType"
                value={sampleType}
                onChange={(e) => setSampleType(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="visitType" className="form-label">Visit Type</label>
              <input
                type="text"
                className="form-control"
                id="visitType"
                value={visitType}
                onChange={(e) => setVisitType(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="parameters" className="form-label">Parameters</label>
              <textarea
                className="form-control"
                id="parameters"
                rows="3"
                value={parameters}
                onChange={(e) => setParameters(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="duration" className="form-label">Duration</label>
              <input
                type="text"
                className="form-control"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
              <div className="invalid-feedback">Please provide a description.</div>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="preparationInstructions" className="form-label">Preparation Instructions</label>
              <textarea
                className="form-control"
                id="preparationInstructions"
                rows="3"
                value={preparationInstructions}
                onChange={(e) => setPreparationInstructions(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <input
                type="text"
                className="form-control"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              />
              <div className="invalid-feedback">Please provide a status.</div>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="speciality" className="form-label">Speciality</label>
              <input
                type="text"
                className="form-control"
                id="speciality"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="categoryId" className="form-label">Category ID</label>
              <input
                type="number"
                className="form-control"
                id="categoryId"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="createdAt" className="form-label">Created At</label>
              <input
                type="datetime-local"
                className="form-control"
                id="createdAt"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="updatedAt" className="form-label">Updated At</label>
              <input
                type="datetime-local"
                className="form-control"
                id="updatedAt"
                value={updatedAt}
                onChange={(e) => setUpdatedAt(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Add Test</button>
      </form>
    </div>
  );
};

export default TestsForm;
