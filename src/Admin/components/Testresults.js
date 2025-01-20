import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TestResults = () => {
  const [formData, setFormData] = useState({
    appointment_id: '',
    test_id: '',
    result_text: '',
    result_file: null,
    status: 'pending',
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

  // Handle file change for result file
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    const formDataToSend = new FormData();
    formDataToSend.append('appointment_id', formData.appointment_id);
    formDataToSend.append('test_id', formData.test_id);
    formDataToSend.append('result_text', formData.result_text);
    if (formData.result_file) {
      formDataToSend.append('result_file', formData.result_file);
    }
    formDataToSend.append('status', formData.status);

    try {
      const response = await fetch('/api/testresults', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          appointment_id: '',
          test_id: '',
          result_text: '',
          result_file: null,
          status: 'pending',
        });
      } else {
        setSuccess(false);
        console.error('Error submitting test result');
      }
    } catch (error) {
      setSuccess(false);
      console.error('Error submitting test result:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Test Results Form</h2>
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
              <label htmlFor="test_id">Test ID</label>
              <input
                type="number"
                id="test_id"
                name="test_id"
                className="form-control"
                value={formData.test_id}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="result_text">Result Text</label>
          <textarea
            id="result_text"
            name="result_text"
            className="form-control"
            rows="4"
            value={formData.result_text}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="result_file">Upload Result File (Optional)</label>
          <input
            type="file"
            id="result_file"
            name="result_file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleInputChange}
            required
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        {/* <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Test Result'}
        </button> */}
         <div className="form-group col-md-12 text-center mt-4">
  <button type="submit" className="btn btn-primary" style={{ width: '100px' }} disabled={loading}>
    {loading ? 'Submitting...' : 'Submit'}
  </button>
</div>

      </form>

      {success !== null && (
        <div className={`alert ${success ? 'alert-success' : 'alert-danger'}`} role="alert">
          {success ? 'Test result submitted successfully!' : 'Error submitting test result.'}
        </div>
      )}
    </div>
  );
};

export default TestResults;
