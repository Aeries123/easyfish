import React from "react";
import { useParams } from "react-router-dom";
import "./ServiceDetails.css"; // Link the CSS file for styling

const ServiceDetail = () => {
  const { serviceId } = useParams();

  const serviceDetails = {
    "diagnostics-services": {
      title: "Diagnostics Services",
      description:
        "One of the pioneers of Diagnostics in India, Suburban Diagnostics provides a comprehensive range of tests across disciplines in Pathology, Cardiology, and Radiology.",
    },
    "home-healthcare": {
      title: "Home Healthcare",
      description:
        "We make it convenient for you to be healthy. Be it a weekend or you just want to have tests done at the safety and comfort of your home, we have got you covered.",
    },
    "health-check-up-packages": {
      title: "Health Check-up Packages",
      description:
        "Suburban Diagnostics has a wide range of health check-up packages carefully curated & designed to help you monitor your health at every stage of your life. We also present to you the option of building a customized plan for your company.",
    },
    "hospital-lab-management": {
      title: "Hospital Lab Management",
      instruction: "First morning urine sample preferred.",
      parametersCount: "20",
      price: "Rs. 350",
      home: "Home Collection",
      description:
        "Suburban Diagnostics offers widespread, 24*7 operational labs in reputed hospitals across Mumbai and Pune, through which we significantly raise the bar for quality of service.",
    },
    "corporate-wellness": {
      title: "Corporate Wellness",
      description:
        "A healthy workforce means higher productivity and a healthy work environment. Our preventive health management programs will help improve productivity and talent retention capacity.",
    },
    "clinical-research": {
      title: "Clinical Research",
      description:
        "We have a prodigious site and investigator support for clinical research studies in pathology, cardiology, and radiology. We provide efficient on-site technician support for all our investigators.",
    },
  };

  const service = serviceDetails[serviceId];

  if (!service) {
    return <p>Service not found!</p>;
  }

  return (
    <div className="service-detail-card">
      <div className="service-sub-card">
        <h2 className="service-title">{service.title}</h2>
        <h1>Rs. 320</h1>
      </div>
      <p className="service-description">{service.description}</p>
      <div className="service-sub-card">
        <p className="special-instruction">
          Special Instruction : First morning urine sample preferred.
        </p>
        <div className="service-sub-container-card">
          <div className="verified-container">
            <span className="verified-circle">✔ </span>
            Home Collection
          </div>
          <div className="verified-container">
            <span className="verified-circle">✔ </span>
            Lab Visit
          </div>
        </div>
      </div>
      <div className="service-sub-card">
        <p>Parameters Covered: 20</p>
        <button className="service-button">Remove</button>
      </div>
    </div>
  );
};

export default ServiceDetail;
