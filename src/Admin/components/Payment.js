import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Payment = () => {
  const [formData, setFormData] = useState({
    appointment_id: '',
    payment_method: 'credit_card',
    payment_status: 'pending',
    amount: '',
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
      const response = await fetch('/api/payments', {
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
          appointment_id: '',
          payment_method: 'credit_card',
          payment_status: 'pending',
          amount: '',
        });
      } else {
        setSuccess(false);
        console.error('Error submitting payment:', data);
      }
    } catch (error) {
      setSuccess(false);
      console.error('Error submitting payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Payment Information</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="appointment_id">Appointment ID</label>
              <input
                type="number"
                id="appointment_id"
                name="appointment_id"
                className="form-control"
                value={formData.appointment_id}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="payment_method">Payment Method</label>
              <select
                id="payment_method"
                name="payment_method"
                className="form-control"
                value={formData.payment_method}
                onChange={handleInputChange}
                required
              >
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="cash">Cash</option>
                <option value="online">Online</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="payment_status">Payment Status</label>
              <select
                id="payment_status"
                name="payment_status"
                className="form-control"
                value={formData.payment_status}
                onChange={handleInputChange}
                required
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="form-control"
                value={formData.amount}
                onChange={handleInputChange}
                step="0.01"
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3" disabled={loading} style={{ width: '100px' }}>
          {loading ? 'Submitting...' : 'Submit Payment'}
        </button>
      </form>

      {success !== null && (
        <div className={`alert ${success ? 'alert-success' : 'alert-danger'}`} role="alert">
          {success ? 'Payment submitted successfully!' : 'Error submitting payment.'}
        </div>
      )}
    </div>
  );
};

export default Payment;
