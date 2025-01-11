import React from "react";
import { Link } from "react-router-dom";
import "./Services.css";
const Services = () => {
  return (
    <div className="services-container">
      <h2 className="service-main-heading">Our Services</h2>
      <div className="service-cards">
        <div className="service-card">
          <h3 className="service-heading">
            <Link to="/service/diagnostics-services">Diagnostics Services</Link>
          </h3>
          <p className="service-description">
            One of the pioneers of Diagnostics in India, Suburban Diagnostics
            provides a comprehensive range of tests across disciplines in
            Pathology, Cardiology, and Radiology.
          </p>
          <div className="about-service-button-container">
            <button className="about-service-button">Know More</button>
          </div>
        </div>
        <div className="service-card">
          <h3 className="service-heading">Home Healthcare</h3>
          <p className="service-description">
            We make it convenient for you to be healthy. Be it a weekend or you
            just want to have tests done at the safety and comfort of your home,
            we have got you covered.
          </p>
          <div className="about-service-button-container">
            <button className="about-service-button">
              <Link to="/service/corporate-wellness" className="service-link">
                Know More
              </Link>
            </button>
          </div>
        </div>

        <div className="service-card">
          <h3 className="service-heading">Health Check-up Packages</h3>
          <p className="service-description">
            Suburban Diagnostics has a wide range of health check-up packages
            carefully curated & designed to help you monitor your health at
            every stage of your life. We also present to you the option of
            building a customized plan for your company, a unique plan made just
            for you.
          </p>
          <div className="about-service-button-container">
            <button className="about-service-button">
              <Link to="/service/corporate-wellness" className="service-link">
                Know More
              </Link>
            </button>
          </div>
        </div>

        <div className="service-card">
          <h3 className="service-heading">Hospital Lab Management</h3>
          <p className="service-description">
            Suburban Diagnostics offers widespread, 24*7 operational labs in
            reputed hospitals across Mumbai and Pune, through which we
            significantly raise the bar for quality of service.
          </p>
          <div className="about-service-button-container">
            <button className="about-service-button">
              <Link to="/service/corporate-wellness" className="service-link">
                Know More
              </Link>
            </button>
          </div>
        </div>

        <div className="service-card">
          <h3 className="service-heading">Corporate Wellness</h3>
          <p className="service-description">
            A healthy workforce means higher productivity and a healthy work
            environment. Our preventive health management programs will help
            improve productivity and talent retention capacity.
          </p>
          <div className="about-service-button-container">
            <button className="about-service-button">
              <Link to="/service/corporate-wellness" className="service-link">
                Know More
              </Link>
            </button>
          </div>
        </div>

        <div className="service-card">
          <h3 className="service-heading">Clinical Research</h3>
          <p className="service-description">
            We have a prodigious site and investigator support for clinical
            research studies in pathology, cardiology, and radiology.
            Furthermore, we provide efficient on-site technician support for all
            of our investigators, dedicated project management, and investigator
            training.
          </p>
          <div className="about-service-button-container">
            <button className="about-service-button">
              <Link to="/service/corporate-wellness" className="service-link">
                Know More
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
