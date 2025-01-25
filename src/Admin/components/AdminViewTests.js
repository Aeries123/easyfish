import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";

const AdminViewTests = () => {
  const { testId } = useParams(); // Extract the testId from the route params
  const [testDetails, setTestDetails] = useState(null); // State to store test details
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/tests/${testId}`);
        const data = await response.json();

        if (response.ok) {
          setTestDetails(data.data[0]); // Assuming the API returns data as an array
        } else {
          console.error("Error fetching test details:", data.error);
        }
      } catch (error) {
        console.error("Error fetching test details:", error);
      }
    };

    fetchTestDetails();
  }, [testId]); // Dependency on testId to re-fetch if it changes

  if (!testDetails) {
    return <div>Loading...</div>; // Display a loading message until data is fetched
  }

  return (
    <div className="container mt-4">
      <h2>Test Details</h2>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Test ID</th>
            <td>{testDetails.test_id}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{testDetails.test_name}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{testDetails.description}</td>
          </tr>
          <tr>
            <th>Price</th>
            <td>{testDetails.price}</td>
          </tr>
          <tr>
            <th>Preparation Instructions</th>
            <td>{testDetails.preparation_instructions}</td>
          </tr>
          <tr>
            <th>Sample Type</th>
            <td>{testDetails.sample_type}</td>
          </tr>
          <tr>
            <th>Visit Type</th>
            <td>{testDetails.visit_type}</td>
          </tr>
          <tr>
            <th>Parameters</th>
            <td>{testDetails.parameters}</td>
          </tr>
          <tr>
            <th>Duration</th>
            <td>{testDetails.duration}</td>
          </tr>
          <tr>
            <th>Speciality</th>
            <td>{testDetails.speciality}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{testDetails.status}</td>
          </tr>
          <tr>
            <th>Category ID</th>
            <td>{testDetails.category_id}</td>
          </tr>
          <tr>
            <th>Created At</th>
            <td>{testDetails.created_at}</td>
          </tr>
          <tr>
            <th>Updated At</th>
            <td>{testDetails.updated_at}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => navigate(-1)} className="btn btn-secondary">
        Go Back
      </button>
    </div>
  );
};

export default AdminViewTests;
