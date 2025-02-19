import { useState, useEffect } from "react";
import {useParams} from "react-router-dom"
import "./ParticularTest.css"; // Import CSS file

export const ParticularTest = () => {
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {test_id}=useParams()

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const getDataDetails = async () => {
      try {
        const getDetails = `${BASE_URL}/api/tests/${test_id}`; // Correct test_id
        const fetchDetails = await fetch(getDetails, { method: "GET" });

        if (fetchDetails.ok) {
          const response = await fetchDetails.json();
          console.log(response);
          setGetData(response.data);
        } else {
          setError("No Data Found");
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    getDataDetails();
  }, [test_id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!getData.length) return <p className="no-data">No Data Available</p>;

  return (
    <div className="test-container">
      <h2 className="test-title">Test Details</h2>
      <div className="test-details">
        <p><strong>Test Name:</strong> {getData[0]?.test_name}</p>
        <p><strong>Duration:</strong> {getData[0]?.duration}</p>
        <p><strong>Parameters:</strong> {getData[0]?.parameters}</p>
        <p><strong>Instructions:</strong> {getData[0]?.preparation_instructions}</p>
        <p><strong>Sample Type:</strong> {getData[0]?.sample_type}</p>
        <p><strong>Speciality:</strong> {getData[0]?.speciality}</p>
        <p className="price"><strong>Price:</strong> ₹{getData[0]?.price}</p>
      </div>
    </div>
  );
};