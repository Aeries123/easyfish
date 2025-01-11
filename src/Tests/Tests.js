import React from "react";
import { Link } from "react-router-dom";
import FaqQuestions from "../FaqQuestions/FaqQuestions";
import "./Tests.css"; // Custom CSS file

const testArray = [
  {
    id: 1,
    name: "Blood Test",
    image:
      "https://res.cloudinary.com/dkujcnlcs/image/upload/v1736244083/esxulmxd2la2di93ytgv.jpg",
  },
  {
    id: 2,
    name: "X-Ray",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427384/IMG-20250109-WA0031_cybean.jpg",
  },
  {
    id: 3,
    name: "MRI Scan",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427373/IMG-20250109-WA0030_jqjnuk.jpg",
  },
  {
    id: 4,
    name: "CT Scan",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427363/IMG-20250109-WA0029_wwqfrz.jpg",
  },
  {
    id: 5,
    name: "ECG",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427354/IMG-20250109-WA0028_xi7rih.jpg",
  },
  {
    id: 6,
    name: "Ultrasound",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427344/IMG-20250109-WA0027_pnzord.jpg",
  },
  {
    id: 7,
    name: "Liver Function",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427334/IMG-20250109-WA0026_owh0ir.jpg",
  },
  {
    id: 8,
    name: "Kidney Function",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427322/IMG-20250109-WA0025_jeckr1.jpg",
  },
  {
    id: 9,
    name: "Liver Function",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427322/IMG-20250109-WA0025_jeckr1.jpg",
  },
  {
    id: 10,
    name: "Kidney Function",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427303/IMG-20250109-WA0024_kr2pvs.jpg",
  },
  {
    id: 11,
    name: "Kidney Function",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427296/IMG-20250109-WA0023_snnc7k.jpg",
  },
  {
    id: 12,
    name: "Kidney Function",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427290/IMG-20250109-WA0022_bc2ipr.jpg",
  },
  {
    id: 13,
    name: "Kidney Function",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427284/IMG-20250109-WA0021_qupns1.jpg",
  },
];

const stats = [
  {
    number: "200+",
    label: "Professionals",
    description: "Radiologists, Pathologists & Microbiologists",
  },
  {
    number: "50+",
    label: "Million Customers and Counting",
    description: "Trusted by Every Age Group",
  },
  {
    number: "40+",
    label: "Years of Experience",
    description: "in Delivering Quality Diagnostic Services",
  },
  {
    number: "140+",
    label: "Diagnostic Centres and Counting",
    description: "State-of-the-art Facilities with Best Customer Service",
  },
  {
    number: "20+",
    label: "Cities Across India",
    description: "India's Largest Comprehensive Diagnostic Centre",
  },
  {
    number: "250+",
    label: "Corporate Clients and Counting",
    description: "Most Preferred Diagnostic Partner",
  },
];

const testCards = [
  {
    id: 1,
    title: "BLOOD PRESSURE MONITORING",
    description: "A test to monitor your blood pressure levels over time.",
    price: 250,
    types: ["Home Collection", "Lab Visit"],
  },
  {
    id: 2,
    title: "LIPID PROFILE",
    description: "A comprehensive test to measure your cholesterol levels.",
    price: 450,
    types: ["Home Collection", "Lab Visit"],
  },
  {
    id: 3,
    title: "LIVER FUNCTION TEST",
    description: "A test to evaluate the health of your liver.",
    price: 600,
    types: ["Home Collection", "Lab Visit"],
  },
  {
    id: 4,
    title: "KIDNEY FUNCTION TEST",
    description: "A test to assess how well your kidneys are functioning.",
    price: 550,
    types: ["Home Collection", "Lab Visit"],
  },
  {
    id: 5,
    title: "THYROID FUNCTION TEST",
    description: "A test to check your thyroid gland function.",
    price: 450,
    types: ["Home Collection", "Lab Visit"],
  },
  {
    id: 6,
    title: "URINALYSIS",
    description: "A test to detect substances in your urine that indicate health problems.",
    price: 300,
    types: ["Home Collection", "Lab Visit"],
  },
  {
    id: 7,
    title: "VITAMIN D TEST",
    description: "A test to measure vitamin D levels in your blood.",
    price: 400,
    types: ["Home Collection", "Lab Visit"],
  },
  {
    id: 8,
    title: "CALCIUM LEVEL TEST",
    description: "A test to check the calcium levels in your blood.",
    price: 350,
    types: ["Home Collection", "Lab Visit"],
  },
  {
    id: 9,
    title: "IRON DEFICIENCY TEST",
    description: "A test to determine if you have an iron deficiency.",
    price: 300,
    types: ["Home Collection", "Lab Visit"],
  },
  {
    id: 10,
    title: "VITAMIN B12 TEST",
    description: "A test to check for vitamin B12 deficiency.",
    price: 400,
    types: ["Home Collection", "Lab Visit"],
  },
  {
    id: 11,
    title: "BLOOD SUGAR TEST",
    description: "A test to monitor your blood glucose levels.",
    price: 250,
    types: ["Home Collection", "Lab Visit"],
  },
];


function Tests() {
  return (
    <div className="custom-tests-container">
      <div className="custom-header-section">
        <h2 className="custom-main-heading">Book Lab Tests Online</h2>
        <h2 className="custom-sub-heading">Search By Relevance</h2>
      </div>
      <div className="custom-tests-list-container">
        {testArray.map((test) => (
          <div className="custom-tests-list-item-container" key={test.id}>
            <img
              src={test.image}
              alt={test.name}
              className="custom-test-image"
            />
            <p className="custom-test-name">{test.name}</p>
          </div>
        ))}
      </div>
      <div className="custom-tests-search">
        <div>
          <h4 className="custom-tests-search-title">Search a Test</h4>
        </div>
        <div>
          <input
            id="searchTest"
            placeholder="Search for test and health checkup"
            autoComplete="off"
            className="custom-search-input"
            type="search"
          />
        </div>
      </div>
      <div className="custom-tests-sort-section">
        <div className="custom-tests-sort-sub-section">
          <span className="custom-sort-label">Sort by:</span>
          <select name="sort" className="custom-sort-select">
            <option value="popular">Popular</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>
      <div className="custom-test-load-more-button-container">
        <div className="custom-test-cards-container">
          {testCards.map((test) => (
            <div key={test.id} className="custom-test-card-container">
              <div>
                <div className="custom-test-card-heading-container">
                  <h1 className="custom-test-card-title">{test.title}</h1>
                  <p className="custom-test-card-text">{test.description}</p>
                  <h1 className="custom-test-card-title">Rs: {test.price}</h1>
                </div>
                <div className="custom-test-card-type-container">
                  {test.types.map((type, idx) => (
                    <p key={idx} className="custom-test-card-type-text">
                      {type}
                    </p>
                  ))}
                </div>
              </div>
              <div className="custom-test-card-footer-container">
                <button className="custom-test-card-footer-button">
                  Add to cart
                </button>
                <button className="test-service-button">
                  <Link
                    to="/service/corporate-wellness"
                    className="service-link"
                  >
                    Know More
                  </Link>
                </button>
                {/* <p className="custom-test-card-footer-text">Know More</p> */}
              </div>
            </div>
          ))}
        </div>
        <div className="custom-test-load-more-button-container">
          <button className="custom-test-load-more-button">Load More</button>
        </div>
      </div>
      <div>
        <div className="healthcare-stats">
          <h1>INDIA'S LARGEST HEALTHCARE PLATFORM</h1>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <h2 className="stat-card-main-heading">{stat.number}</h2>
                <h3 className="stat-card-sub-heading">{stat.label}</h3>
                <p className="stat-card-description">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FaqQuestions />
    </div>
  );
}

export default Tests;
