import React, { useEffect, useRef, useState } from "react";
import { FiMinusCircle } from "react-icons/fi";
import { MdAddCircleOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import "./index.css"; // Import the CSS for styling

const healthPackages = [
  {
    id: 1,
    name: "Basic Health Checkup",
    price: "₹999",
    description: "Covers essential health tests",
    parameters: "Blood Sugar, CBC, Lipid Profile",
    duration: "1 Day",
    reportTime: "Reports within 1 day",
  },
  {
    id: 2,
    name: "Full Body Checkup",
    price: "₹1999",
    description: "Comprehensive body tests",
    parameters: "CBC, Vitamin D, Thyroid Profile, Liver Function",
    duration: "2 Days",
    reportTime: "Reports within 2 days",
  },
  {
    id: 3,
    name: "Diabetes Screening",
    price: "₹799",
    description: "Focused on diabetes markers",
    parameters: "Blood Sugar, HbA1c",
    duration: "Same Day",
    reportTime: "Reports within a few hours",
  },
  {
    id: 4,
    name: "Heart Health Package",
    price: "₹2499",
    description: "Includes ECG and cholesterol tests",
    parameters: "ECG, Lipid Profile, Blood Pressure",
    duration: "1 Day",
    reportTime: "Reports within 1 day",
  },
  {
    id: 5,
    name: "Women’s Wellness",
    price: "₹1599",
    description: "Specially designed for women",
    parameters: "CBC, Hormonal Panel, Vitamin D",
    duration: "2 Days",
    reportTime: "Reports within 2 days",
  },
  {
    id: 6,
    name: "Kidney Function Test",
    price: "₹1299",
    description: "Checks kidney performance",
    parameters: "Creatinine, Urea, Electrolytes",
    duration: "1 Day",
    reportTime: "Reports within 1 day",
  },
  {
    id: 7,
    name: "Liver Function Test",
    price: "₹1399",
    description: "Assesses liver health",
    parameters: "SGPT, SGOT, Bilirubin",
    duration: "1 Day",
    reportTime: "Reports within 1 day",
  },
  {
    id: 8,
    name: "Vitamin Deficiency Panel",
    price: "₹1099",
    description: "Checks essential vitamins",
    parameters: "Vitamin D, Vitamin B12",
    duration: "1 Day",
    reportTime: "Reports within 1 day",
  },
  {
    id: 9,
    name: "Senior Citizen Package",
    price: "₹2199",
    description: "Tailored for elderly care",
    parameters: "CBC, Lipid Profile, Thyroid Panel",
    duration: "2 Days",
    reportTime: "Reports within 2 days",
  },
  {
    id: 10,
    name: "Thyroid Profile",
    price: "₹699",
    description: "Comprehensive thyroid test",
    parameters: "T3, T4, TSH",
    duration: "1 Day",
    reportTime: "Reports within 1 day",
  },
];

const HealthPackages = (props) => {
  const { cartData, setCartData, clickedIds, setClickedIds } = props;
  const [healthPackages, setHealthPackages] = useState([]);
  const scrollRef = useRef(null);

  // Fetch health packages data from the backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/packages");
        const data = await response.json();
        setHealthPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  const onClickButton = (packageItem) => {
    let packageId = packageItem.package_id;
    if (clickedIds.includes(packageId)) {
      setClickedIds((prev) => prev.filter((each) => each !== packageId));
      setCartData((prev) =>
        prev.filter((each) => each.package_id !== packageId)
      );
    } else {
      setClickedIds((prev) => [...prev, packageId]);
      setCartData((prev) => [...prev, packageItem]);
    }
  };

  return (
    <div className="package-health-packages-container">
      <h2 className="package-heading">Health Packages</h2>
      <div className="package-scroll-buttons">
        <button
          className="package-scroll-button package-left"
          onClick={scrollLeft}
        >
          &#8249;
        </button>
        <div className="package-card-container" ref={scrollRef}>
          {healthPackages.map((packageItem) => (
            <div key={packageItem.package_id} className="package-card">
              <div className="package-card-title-container">
                <h3 className="package-card-title">
                  {packageItem.package_name}
                </h3>
                <p className="package-card-price">₹{packageItem.final_price}</p>
              </div>
              <div className="package-card-description-container">
                <p className="package-card-description">
                  {packageItem.total_parameters} parameters included
                </p>
                <p className="package-card-description">
                  Reports ready in: {packageItem.reports_time}
                </p>
              </div>
              <div className="package-card-button-container">
                <Link to={`/particular/package/${packageItem.package_id}`}>
                  <button className="package-card-button package-card-view-button">
                    View Details
                  </button>
                </Link>
                <button
                  className="package-card-button package-card-book-button"
                  onClick={() => onClickButton(packageItem)}
                >
                  {clickedIds.includes(packageItem.package_id)
                    ? "Remove"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          className="package-scroll-button package-right"
          onClick={scrollRight}
        >
          &#8250;
        </button>
      </div>

      {/* Cart summary */}
      {cartData.length > 0 && (
        <div className="popup-popup-bottom-cart-card">
          <div>
            <h3>
              <strong>
                ₹
                {cartData
                  .reduce(
                    (sum, packageItem) =>
                      sum + parseFloat(packageItem.final_price),
                    0
                  )
                  .toFixed(2)}
                .00
              </strong>
            </h3>
          </div>
          <button
            className="popup-popup-btn popup-popup-btn-primary align-self-end"
            onClick={() => console.log("Proceed to Cart")}
          >
            Proceed
          </button>
        </div>
      )}
    </div>
  );
};

export default HealthPackages;
