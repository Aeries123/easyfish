import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(9); // Change this to display 9 reviews per page

  // Sample hardcoded review data
  const sampleReviews = [
    {
      review_id: 1,
      customer_id: 123,
      test_id: 456,
      rating: 5,
      review_text: "Great service, very satisfied with the results!",
      created_at: "2025-01-17T12:34:56"
    },
    {
      review_id: 2,
      customer_id: 234,
      test_id: 567,
      rating: 4,
      review_text: "Good experience, would recommend.",
      created_at: "2025-01-16T11:34:56"
    },
    {
      review_id: 3,
      customer_id: 345,
      test_id: 678,
      rating: 3,
      review_text: "Satisfactory service, but room for improvement.",
      created_at: "2025-01-15T10:30:45"
    },
    {
      review_id: 4,
      customer_id: 456,
      test_id: 789,
      rating: 5,
      review_text: "Excellent service, exceeded expectations!",
      created_at: "2025-01-14T09:15:30"
    },
    {
      review_id: 5,
      customer_id: 567,
      test_id: 890,
      rating: 2,
      review_text: "Not happy with the service. Could be better.",
      created_at: "2025-01-13T08:10:15"
    },
    {
      review_id: 6,
      customer_id: 678,
      test_id: 901,
      rating: 4,
      review_text: "Overall good, but there were some delays.",
      created_at: "2025-01-12T07:05:50"
    },
    {
      review_id: 7,
      customer_id: 789,
      test_id: 102,
      rating: 1,
      review_text: "Terrible service, very disappointed.",
      created_at: "2025-01-11T06:00:00"
    },
    {
      review_id: 8,
      customer_id: 890,
      test_id: 113,
      rating: 3,
      review_text: "Not bad, but not great either.",
      created_at: "2025-01-10T05:50:30"
    },
    {
      review_id: 9,
      customer_id: 901,
      test_id: 224,
      rating: 4,
      review_text: "Good overall, could use minor improvements.",
      created_at: "2025-01-09T04:40:10"
    }
  ];

  // Fetch reviews (in this case, using sample data)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setReviews(sampleReviews);
      setLoading(false);
    }, 500); // Simulating API delay
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current reviews for the current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews
    .filter(
      (review) =>
        review.customer_id.toString().includes(searchQuery) ||
        review.review_text.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(indexOfFirstReview, indexOfLastReview);

  return (
    <div className="container mt-5">
      <h2>Manage Reviews</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search reviews by customer ID or review text..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Review List */}
      {loading ? (
        <div className="alert alert-info" role="alert">
          Loading reviews...
        </div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th> {/* ID Column */}
              <th>Customer ID</th>
              <th>Test ID</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentReviews.length > 0 ? (
              currentReviews.map((review) => (
                <tr key={review.review_id}>
                  <td>{review.review_id}</td> {/* Display review ID */}
                  <td>{review.customer_id}</td>
                  <td>{review.test_id}</td>
                  <td>{review.rating}</td>
                  <td>{review.review_text}</td>
                  <td>{new Date(review.created_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
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
        <div className="mx-2">
          Page {currentPage}
        </div>
        <button
          className="btn btn-secondary"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentReviews.length < reviewsPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageReview;
