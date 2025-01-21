import React from "react";
import "./index.css";

const TestCheckupList = ({ tests, duplicates, onRemoveTest }) => {
  return (
    <div className="tests-checkups-main-container">
      <h4 className="tests-checkups-heading">Tests / Checkups added</h4>
      {tests.map((test, index) => (
        <div key={index} className="test-item-container">
          <span className="test-item-name">{test.name}</span>
          <span className="test-item-name">₹ {test.price}</span>
          <button
            className="test-item-button"
            onClick={() => onRemoveTest(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="duplicates-container">
        <button className="tests-checkups-heading btn-button">
          Add more Tests
        </button>

        {/* <h5 className="tests-checkups-heading">Duplicate Items (Removed from Cart)</h5> */}
        {/* {duplicates.map((dup, index) => (
          <div className="test-item-container" key={index}>
            <span className="test-item-name">{dup.name}</span>
            <span className="test-item-name">₹ {dup.price}</span>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default TestCheckupList;
