import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const LabTechnicianForm = () => {
  const [technicianData, setTechnicianData] = useState({
    technician_id: '',
    user_id: '',
    qualification: '',
    experience: '',
    specialization: '',
    status: 'active',
    street: '',
    city: '',
    state: '',
    country: '',
    postal_code: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTechnicianData({
      ...technicianData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if required fields are filled
    if (!technicianData.technician_id || !technicianData.street || !technicianData.city || !technicianData.state || !technicianData.country || !technicianData.postal_code) {
      alert('Please fill in all required fields!');
      return;
    }

    // Simulate data submission (e.g., send to server)
    console.log('Technician Data Submitted:', technicianData);

    // Reset form after submission
    setTechnicianData({
      technician_id: '',
      user_id: '',
      qualification: '',
      experience: '',
      specialization: '',
      status: 'active',
      street: '',
      city: '',
      state: '',
      country: '',
      postal_code: ''
    });

    alert('Lab Technician Added Successfully!');
  };

  return (
    <div className="container mt-5">
      <h1>Add Lab Technician</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="technician_id" className="form-label">Technician ID</label>
              <input
                type="number"
                className="form-control"
                id="technician_id"
                name="technician_id"
                value={technicianData.technician_id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="user_id" className="form-label">User ID</label>
              <input
                type="number"
                className="form-control"
                id="user_id"
                name="user_id"
                value={technicianData.user_id}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="qualification" className="form-label">Qualification</label>
              <input
                type="text"
                className="form-control"
                id="qualification"
                name="qualification"
                value={technicianData.qualification}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="experience" className="form-label">Experience (Years)</label>
              <input
                type="number"
                className="form-control"
                id="experience"
                name="experience"
                value={technicianData.experience}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="specialization" className="form-label">Specialization</label>
              <input
                type="text"
                className="form-control"
                id="specialization"
                name="specialization"
                value={technicianData.specialization}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                className="form-select"
                id="status"
                name="status"
                value={technicianData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="street" className="form-label">Street</label>
              <input
                type="text"
                className="form-control"
                id="street"
                name="street"
                value={technicianData.street}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={technicianData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="state" className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={technicianData.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={technicianData.country}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postal_code" className="form-label">Postal Code</label>
              <input
                type="text"
                className="form-control"
                id="postal_code"
                name="postal_code"
                value={technicianData.postal_code}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
 {/* Submit Button */}
 <div className="form-group col-md-12 text-center mt-4">
            <button type="submit" className="btn btn-primary" style={{ width: '100px' }}>Submit</button>
          </div>      </form>
    </div>
  );
};

export default LabTechnicianForm;
