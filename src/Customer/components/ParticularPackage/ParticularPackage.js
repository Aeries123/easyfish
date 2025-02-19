import { useState, useEffect } from "react";
import "./ParticularPackage.css"; // Import component-specific CSS
import { useParams } from "react-router-dom";

export const ParticularPackage = () => {
  const [getPackage, setPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { package_id } = useParams();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const getPackageDetails = async () => {
      try {
        const getDetails = `${BASE_URL}/api/packages/${package_id}`;
        const fetchedData = await fetch(getDetails, { method: "GET" });

        if (fetchedData.ok) {
          const response = await fetchedData.json();
          console.log("API Response:", response);
          setPackage(response);
        } else {
          setError("Package not found");
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    getPackageDetails();
  }, [package_id]);

  if (loading) return <div className="particular-package-loading">Loading...</div>;
  if (error) return <div className="particular-package-error">{error}</div>;
  if (!getPackage) return <div className="particular-package-no-data">No Package Available</div>;

  return (
    <div className="particular-package-container">
      <div className="particular-package-details">
        {/* Package Info */}
        <h2 className="particular-package-title">{getPackage.package_name}</h2>
        <div className="particular-package-info">
          <div>
            <strong>Discount:</strong> <span>{getPackage.discount}%</span>
          </div>
          <div>
            <strong>Final Price:</strong> <span>₹{getPackage.final_price}</span>
          </div>
          <div>
            <strong>Total Price Before Discount:</strong> ₹{getPackage.total_price_before_discount}
          </div>
        </div>

        {/* Test Names inline */}
        <div className="particular-package-test-names-inline">
          <strong>Test Names: </strong>
          {getPackage.test_names && getPackage.test_names.length > 0 ? (
            getPackage.test_names.join(', ') // Join test names into a single line
          ) : (
            <span>No Tests Available</span>
          )}
        </div>
      </div>
    </div>
  );
};