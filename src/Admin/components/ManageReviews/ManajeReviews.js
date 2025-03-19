import React, { useState, useEffect } from "react";
import "./ManageReviews.css";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/reviews`);
      const data = await response.json();
      if (response.ok) {
        setReviews(data);
      } else {
        console.error("Error fetching reviews:", data.error);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const deleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const response = await fetch(`${BASE_URL}/api/reviews/${reviewId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setReviews(reviews.filter((review) => review.review_id !== reviewId));
        } else {
          alert("Failed to delete review");
        }
      } catch (error) {
        alert("Error deleting review");
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDateFilterChange = () => {
    setCurrentPage(1);
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = Object.values(review).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const reviewDate = new Date(review.created_at);
    const isWithinDateRange =
      (!startDate || reviewDate >= new Date(startDate)) &&
      (!endDate || reviewDate <= new Date(endDate));

    return matchesSearch && isWithinDateRange;
  });

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="manage-reviews-container">
      <h2 className="title">Manage Reviews</h2>

      <div className="filter-container">
        <input
          type="text"
          className="search-box-review"
          placeholder="Search reviews..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className="date-filters">
          <input
            type="date"
            className="date-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="date-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button className="filter-btn" onClick={handleDateFilterChange}>
            Filter
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="reviews-table">
          <thead>
            <tr>
              <th>Review ID</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Review</th>
              <th>Rating</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentReviews.length > 0 ? (
              currentReviews.map((review) => (
                <tr key={review.review_id} className="review-row">
                  <td>{review.review_id}</td>
                  <td>{review.customer_name}</td>
                  <td>{review.email}</td>
                  <td>{review.review_text}</td>
                  <td>{review.rating}</td>
                  <td>{new Date(review.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteReview(review.review_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          className="prev-btn"
          disabled={currentPage === 1}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className="next-btn"
          disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageReviews;
