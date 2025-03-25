import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const ManageReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(9); // Number of reviews per page
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Fetch reviews from the backend
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BASE_URL}/review`);
        setReviews(response.data);
      } catch (err) {
        setError('Failed to fetch reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle review deletion
  const handleDelete = async (reviewId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this review?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${BASE_URL}/review/${reviewId}`);
      if (response.status === 200) {
        // Remove the deleted review from the local state
        setReviews(reviews.filter((review) => review.review_id !== reviewId));
      }
    } catch (err) {
      alert('Error deleting review. Please try again.');
    }
  };

  // Filter and paginate reviews
  const filteredReviews = reviews.filter(
    (review) =>
      review.user_id.toString().includes(searchQuery) ||
      review.review_text.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <div className="container mt-5">
      <h2>Manage Reviews</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search reviews by user ID or review text..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Review List */}
      {loading ? (
        <div className="alert alert-info" role="alert">
          Loading reviews...
        </div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Review ID</th>
              <th>User ID</th>
              <th>Test ID</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Helpfulness</th>
              <th>Date</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {currentReviews.length > 0 ? (
              currentReviews.map((review) => (
                <tr key={review.review_id}>
                  <td>{review.review_id}</td>
                  <td>{review.user_id}</td>
                  <td>{review.test_id}</td>
                  <td>{review.rating}</td>
                  <td>{review.review_text}</td>
                  <td>{review.helpfulness_count}</td>
                  <td>{new Date(review.created_at).toLocaleString()}</td>
                  {/* <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(review.review_id)}
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-secondary"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="mx-2">Page {currentPage}</div>
        <button
          className="btn btn-secondary"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastReview >= filteredReviews.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageReview;
