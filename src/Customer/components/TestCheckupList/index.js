import React, { useState, useEffect } from "react";
import SeperatePopup from "../../SeperatePopup";
import { MdDelete } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddDoctorPopup from "../AddDoctorPopup";
import "./index.css";

const TestCheckupList = ({
  tests,
  onRemoveTest,
  mainCartData,
  setMainCartData,
  mainClickedIds,
  setMainClickedIds,
  setTests,
  totalPrice,
  onClickProceed,
  cartData,
  setCartData,
  clickedIds,
  setClickedIds,
}) => {
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [testsData, setTestsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("member car2d:",cartData)


  // Fetch tests data
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/tests");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setTestsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  // Open and close popup
  const handleAddMoreTests = () => setIsPopupOpened(true);
  const handleClosePopup = () => setIsPopupOpened(false);

  // Handle removing a test
  const handleRemoveTest = (testId) => {
    // setCartData((prev) => prev.filter((item) => item.test_id !== testId));
    // setClickedIds((prev) => prev.filter((id) => id !== testId));
    onRemoveTest(testId);
  };

  // Handle add/remove button click
  const handleButtonClick = (test) => {
    console.log("test Clicked")
    if (clickedIds.includes(test.test_id)) {
      setClickedIds(clickedIds.filter((id) => id !== test.test_id));
      setCartData(cartData.filter((item) => item.test_id !== test.test_id));
    } else {
      setClickedIds([...clickedIds, test.test_id]);
      setMainClickedIds([...mainClickedIds,test.test_id])
      setCartData([...cartData, test]);
      setMainCartData([...mainCartData,test])
    }
  };

  // Filter tests based on search input
  const filteredTests = testsData.filter((test) =>
    test.test_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="tests-checkups-main-container">
      <h4 className="tests-checkups-heading">Tests / Checkups Added</h4>
      {cartData.length > 0 ? (
        cartData.map((test) => (
          <div key={test.test_id} className="test-item-container">
            <div className="test-item-card-container">
              <span className="test-item-name">{test.test_name}</span>
              <span className="test-item-price">₹ {test.price}</span>
            </div>
            <button
              className="test-item-delete-button"
              onClick={() => handleRemoveTest(test.test_id)}
            >
              <MdDelete />
            </button>
          </div>
        ))
      ) : (
        <p className="no-tests-message">No tests added yet.</p>
      )}

      <button className="add-more-tests-button" onClick={handleAddMoreTests}>
        <MdAddShoppingCart className="add-more-tests-icon" />
        Add More Tests
      </button>

      {/* Popup Component */}
      <SeperatePopup
        isPopupOpened={isPopupOpened}
        onClickClosePopup={handleClosePopup}
        filteredData={filteredTests}
        handleButtonClick={handleButtonClick}
        clickedIds={clickedIds}
        setClickedIds={setClickedIds}
        cartData={cartData}
        totalPrice={totalPrice}
        name={searchInput}
        onChangeInput={(e) => setSearchInput(e.target.value)}
        onClickProceed={onClickProceed}
        setCartData={setCartData}
        mainCartData={mainCartData}
        setMainCartData={setMainCartData}
        mainClickeddIds={mainClickedIds}
        setMainClickedIds={setMainClickedIds}
      />

      <div className="test-item-add-doctor-container">
        <AddDoctorPopup />
      </div>
    </div>
  );
};

export default TestCheckupList;

// import React, { useState, useEffect } from "react";
// import Popup from "../PopUp/Popup";
// import { MdDelete } from "react-icons/md";
// import { MdAddShoppingCart } from "react-icons/md";
// import "./index.css";

// const TestCheckupList = ({
//   tests,
//   onRemoveTest,
//   setTests,
//   totalPrice,
//   onClickProceed,
//   cartData,
//   setCartData,
//   clickedIds,
//   setClickedIds,
// }) => {
//   const [isPopupOpened, setIsPopupOpened] = useState(false);
//   const [searchInput, setSearchInput] = useState("");
//   const [testsData, setTestsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch tests data
//   useEffect(() => {
//     const fetchTests = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:5000/api/tests");
//         if (!response.ok) throw new Error("Failed to fetch data");
//         const data = await response.json();
//         setTestsData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTests();
//   }, []);

//   // Open and close popup
//   const handleAddMoreTests = () => setIsPopupOpened(true);
//   const handleClosePopup = () => setIsPopupOpened(false);

//   // Handle removing a test
//   const handleRemoveTest = (test) => {
//     const testId = test.test_id;
//     setCartData((prev) => prev.filter((item) => item.test_id !== testId));
//     setClickedIds((prev) => prev.filter((id) => id !== testId));
//   };

//   // Handle add/remove button click
//   const handleButtonClick = (test) => {
//     if (clickedIds.includes(test.test_id)) {
//       setClickedIds(clickedIds.filter((id) => id !== test.test_id));
//       setCartData(cartData.filter((item) => item.test_id !== test.test_id));
//     } else {
//       setClickedIds([...clickedIds, test.test_id]);
//       setCartData([...cartData, test]);
//     }
//   };

//   // Filter tests based on search input
//   const filteredTests = testsData.filter((test) =>
//     test.test_name.toLowerCase().includes(searchInput.toLowerCase())
//   );

//   return (
//     <div className="tests-checkups-main-container">
//       <h4 className="tests-checkups-heading">Tests / Checkups Added</h4>
//       {cartData.length > 0 ? (
//         cartData.map((test) => (
//           <div key={test.test_id} className="test-item-container">
//             <div className="test-item-card-container">
//               <span className="test-item-name">{test.test_name}</span>
//               <span className="test-item-price">₹ {test.price}</span>
//             </div>
//             <button
//               className="test-item-delete-button"
//               onClick={() => handleRemoveTest(test)}
//             >
//               <MdDelete />
//             </button>
//           </div>
//         ))
//       ) : (
//         <p className="no-tests-message">No tests added yet.</p>
//       )}

//       <button className="add-more-tests-button" onClick={handleAddMoreTests}>
//         <MdAddShoppingCart className="add-more-tests-icon" />
//         Add More Tests
//       </button>

//       {/* Popup Component */}
//       <Popup
//         isPopupOpened={isPopupOpened}
//         onClickClosePopup={handleClosePopup}
//         filteredData={filteredTests}
//         handleButtonClick={handleButtonClick}
//         clickedIds={clickedIds}
//         setClickedIds={setClickedIds}
//         cartData={cartData}
//         totalPrice={totalPrice}
//         name={searchInput}
//         onChangeInput={(e) => setSearchInput(e.target.value)}
//         onClickProceed={onClickProceed}
//         setCartData={setCartData}
//       />

//       {/* <div className="total-price-section">
//         <h4>Total Price: ₹{totalPrice}</h4>
//       </div> */}
//     </div>
//   );
// };

// export default TestCheckupList;
