import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Review = () => {
  // State for managing form data
  const [formData, setFormData] = useState({
    customer_id: '',
    test_id: '',
    rating: 1,
    review_text: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          customer_id: '',
          test_id: '',
          rating: 1,
          review_text: '',
        });
      } else {
        setSuccess(false);
        console.error('Error submitting review:', data);
      }
    } catch (error) {
      setSuccess(false);
      console.error('Error submitting review:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Submit Your Review</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="customer_id">Customer ID</label>
              <input
                type="number"
                id="customer_id"
                name="customer_id"
                className="form-control"
                value={formData.customer_id}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="test_id">Test ID (Optional)</label>
              <input
                type="number"
                id="test_id"
                name="test_id"
                className="form-control"
                value={formData.test_id}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <select
                id="rating"
                name="rating"
                className="form-control"
                value={formData.rating}
                onChange={handleInputChange}
                required
              >
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="review_text">Review</label>
              <textarea
                id="review_text"
                name="review_text"
                className="form-control"
                value={formData.review_text}
                onChange={handleInputChange}
                rows="4"
                placeholder="Write your review here..."
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={loading}
          style={{ width: '100px' }}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {success !== null && (
        <div className={`alert ${success ? 'alert-success' : 'alert-danger'}`} role="alert">
          {success ? 'Review submitted successfully!' : 'Error submitting review.'}
        </div>
      )}
    </div>
  );
};

export default Review;
