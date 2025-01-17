import React from "react";
import "./download.css";

const TestReports = () => {
  return (
    <div className="test-reports-container" >
      <div className="form-container">
        <div className="form-content-container">
          <h2 style={{ color: "purple" }}>View All Your Test Reports</h2>
          <form style={{ padding: "50px" }}>
            <label className="form-container-label">
              Enter Lab / Visit ID *
            </label>
            <input type="text" placeholder="Enter Lab / Visit ID" required />

            <label className="form-container-label">Password *</label>
            <input type="text" placeholder="Enter Last Name" required />

            {/* <label>Captcha *</label>
            <label htmlFor="captcha" style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" id="captcha" />
              I'm not a robot
            </label> */}

            <button
              type="submit"
              style={{ backgroundColor: "purple", color: "white" }}
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>

      <div className="image-container">
        <img
          src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736488137/photodune-7329634-happiness-m_z3leqx.jpg"
          alt="Happy Family"
          className="image-container-img"
        />
        <div className="banner">
          <h3>An Accurate Report Is Just One Step Away</h3>
        </div>
      </div>
    </div>
  );
};

export default TestReports;
