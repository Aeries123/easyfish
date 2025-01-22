import React, { useState, useEffect } from "react";
import Popup from "../PopUp/Popup"; // Import the Popup component
import "./index.css";

const TestCheckupList = ({
  tests,
  onRemoveTest,
  setTests,
  totalPrice,
  onClickProceed,
  cartData,
  setCartData,
}) => {
  const abcd="test"
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [testsData, setTestsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickedIds, setClickedIds] = useState([]);

  console.log("cartDataaaaa", cartData);

  // Fetch tests data
  useEffect(() => {
    const endpoint = "http://127.0.0.1:5000/api/tests";
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setTestsData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Open popup
  const handleAddMoreTests = () => {
    setIsPopupOpened(true);
  };

  // Close popup
  const onClickClosePopup = () => {
    setIsPopupOpened(false);
  };

  // Handle test add/remove button click
  const handleButtonClick = (test) => {
    if (clickedIds.includes(test.test_id)) {
      setClickedIds(clickedIds.filter((id) => id !== test.test_id));
      setCartData(cartData.filter((item) => item.test_id !== test.test_id));
    } else {
      setClickedIds([...clickedIds, test.test_id]);
      setCartData([...cartData, test]);
    }
  };

  // Filter tests based on search input
  const filteredTests = testsData.filter((test) =>
    test.test_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="tests-checkups-main-container">
      <h4 className="tests-checkups-heading">Tests / Checkups Added</h4>
      {cartData.map((test, index) => (
        <div key={index} className="test-item-container">
          <div className="test-item-card-container">
            <span className="test-item-name">{test.test_name}</span>
            <span className="test-item-price">₹ {test.price}</span>
          </div>
          <button
            className="test-item-button"
            onClick={() => onRemoveTest(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <button className="add-more-tests-button" onClick={handleAddMoreTests}>
        Add More Tests
      </button>

      {/* Use Popup Component */}
      <Popup
        isPopupOpened={isPopupOpened}
        onClickClosePopup={onClickClosePopup}
        filteredData={filteredTests}
        handleButtonClick={handleButtonClick}
        clickedIds={clickedIds}
        cartData={cartData}
        totalPrice={totalPrice}
        name={searchInput}
        onChangeInput={(e) => setSearchInput(e.target.value)}
        onClickProceed={onClickProceed}
      />

      <div className="total-price-section">
        <h4>Total Price: ₹{totalPrice}</h4>
        {/* <button className="proceed-button" onClick={onClickProceed}>
          Proceed
        </button> */}
      </div>
    </div>
  );
};

export default TestCheckupList;
