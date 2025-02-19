import React, { useState } from "react";
import axios from "axios";

const Packages = () => {
  const [packageName, setPackageName] = useState("");
  const [testIds, setTestIds] = useState([]);
  const [discount, setDiscount] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const [error, setError] = useState(null);
  const [duplicateTests, setDuplicateTests] = useState([]);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponseMessage(null);
    setDuplicateTests([]);
  
    const payload = {
      package_name: packageName,
      test_ids: testIds.map(id => parseInt(id.trim(), 10)),  // ✅ Convert to integers
      discount: parseInt(discount, 10),  // ✅ Ensure discount is also a number
    };
  
    try {
      const response = await axios.post(`${BASE_URL}/api/packages`, payload, {
        headers: { "Content-Type": "application/json" },
      });
  
      setResponseMessage(response.data.message);
      setPackageName("");
      setTestIds([]);
      setDiscount("");
      setDuplicateTests(response.data.duplicate_entries || []);
  
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "An error occurred.");
        setDuplicateTests(err.response.data.duplicate_entries || []);
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };
  

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Create Package</h2>
      {responseMessage && <p style={{ color: "green" }}>{responseMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {duplicateTests.length > 0 && (
        <div style={{ color: "orange" }}>
          <strong>Duplicate Tests Found:</strong>
          <ul>{duplicateTests.map((test, index) => <li key={index}>{test}</li>)}</ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>Package Name:</label>
        <input type="text" value={packageName} onChange={(e) => setPackageName(e.target.value)} required />

        <label>Test IDs (comma-separated):</label>
        <input type="text" value={testIds.join(", ")} 
               onChange={(e) => setTestIds(e.target.value.split(","))} required />

        <label>Discount (%):</label>
        <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} required />

        <button type="submit" style={{ marginTop: "10px" }}>Create Package</button>
      </form>
    </div>
  );
};

export default Packages;