import React, { useState } from "react";
import "./Prescption.css";

const Prescription = () => {
  const [files, setFiles] = useState([]);
  const [collectionMethod, setCollectionMethod] = useState("home");

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = [...e.dataTransfer.files];
    if (droppedFiles.length > 3) {
      alert("Maximum 3 files can be uploaded at a time");
      return;
    }

    const validFiles = droppedFiles.filter((file) =>
      ["image/jpeg", "image/png", "application/pdf"].includes(file.type)
    );

    if (validFiles.length !== droppedFiles.length) {
      alert("Only PDF, JPG & PNG formats supported");
    }

    setFiles(validFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = [...e.target.files];
    if (selectedFiles.length > 3) {
      alert("Maximum 3 files can be uploaded at a time");
      return;
    }
    setFiles(selectedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Files:", files);
    console.log("Collection Method:", collectionMethod);
  };

  return (
    <div className="container">
      <div className="card-container">
        <div className="small-container">
          <div className="text-center">
            <h1 className="text-element">Upload Prescriptions</h1>
            <p className="para">
              Not sure which tests to take? Share your prescription with us and
              our team will call you to book tests for you.
            </p>
          </div>

          <div
            className="border-dashed"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="mb-2">
              <svg
                className="mx-auto text-teal-500"
                style={{ width: "26px", height: "66px" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div className="custom-text-color">
              <p>
                Drag & drop files here,{" "}
                <span className="spanelement">browse files</span> to upload.
              </p>
            </div>

            <label className="text-sm text-teal-500 cursor-pointer hover:text-teal-600">
              <input
                type="file"
                className="hidden"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileInput}
              />
            </label>
            <div className="text-xs text-gray-400 mt-1">
              .pdf, .jpg & .png formats supported. Upto three files can be
              uploaded at a time.
            </div>
          </div>

          {files.length > 0 && (
            <div className="label">
              Selected files: {files.map((file) => file.name).join(", ")}
            </div>
          )}

          <div className="radio-container">
            <label className="radio-label">
              <input
                type="radio"
                name="collectionMethod"
                value="home"
                checked={collectionMethod === "home"}
                onChange={(e) => setCollectionMethod(e.target.value)}
                className="radio-input"
              />
              Home Collection
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="collectionMethod"
                value="walk-in"
                checked={collectionMethod === "walk-in"}
                onChange={(e) => setCollectionMethod(e.target.value)}
                className="radio-input"
              />
              Walk-In
            </label>
          </div>

          <button onClick={handleSubmit} className="presciption-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
