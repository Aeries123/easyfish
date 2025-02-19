import React, { useState, useEffect } from "react";
import SeperatePopup from "../../SeperatePopup";
import { MdDelete } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddDoctorPopup from "../AddDoctorPopup";
import MemberList from "../MemberList/MemberList";
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
  healthPackages,
  packagesClickedIds,
  setPackagesClickedIds,
  duplicateTestIds,
  setDuplicateTestIds,
  // duplicateIds,
  packageTestIds,
  members,
}) => {
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [testsData, setTestsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [duplicateTestsData, setDuplicateTestsData] = useState([]);
  const [duplicateIds, setDuplicateIds] = useState([]);
  console.log(duplicateIds, "ids");
  const uniqueDuplicateTestIds = [...new Set(duplicateIds)];
  console.log(uniqueDuplicateTestIds, "ids -1");

  console.log("member car2d:", cartData);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchDuplicateTests = async () => {
      if (duplicateTestIds.length === 0) return; // Exit if no duplicate test IDs
      console.log(duplicateTestIds, "nani");

      try {
        const responses = await Promise.all(
          duplicateTestIds.map((testId) =>
            fetch(`${BASE_URL}/api/tests/${testId}`).then((res) =>
              res.json()
            )
          )
        );

        // Extract test details from responses
        const duplicateTests = responses.map((res) => res.data).flat(); // Flatten array if multiple tests are returned
        console.log(duplicateTests, "aaaaaaaaa");

        setDuplicateTestsData(duplicateTests);
      } catch (error) {
        console.error("Error fetching duplicate tests:", error);
      }
    };

    fetchDuplicateTests();
  }, [duplicateTestIds]);

  // Fetch tests data
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/tests`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setTestsData(data.tests);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  // const duplicates = {}; // Store duplicates per member
  // console.log(duplicates,"gggggg")

  // useEffect(() => {
  //   console.log("kkkkkkk")
  //   console.log(cartData,"maha")
  //   console.log(packageTestIds,"maha")
  //   const findDuplicates = () => {
  //     console.log("kkkkkkk")

  //     cartData.forEach((member) => {
  //       const memberTestIds = member.tests.map((test) => test.test_id); // Extract test IDs for each member
  //       const memberDuplicates = memberTestIds.filter((testId) =>
  //         packageTestIds.includes(testId)
  //       );

  //       if (memberDuplicates.length > 0) {
  //         duplicates[member.member_id] = memberDuplicates; // Store duplicate test IDs per member
  //       }
  //     });

  //     console.log("Duplicate test IDs per member:", duplicates);
  //   };

  //   if (cartData.length > 0 && packageTestIds.length > 0) {
  //     findDuplicates();
  //   }

  // }, [cartData, packageTestIds]);

  useEffect(() => {
    console.log("kkkkkkk");
    console.log(cartData, "maha");
    console.log(packageTestIds, "maha");
    const findDuplicates = () => {
      const duplicates = {}; // Store duplicates per member
      // const allDuplicateIds = new Set(duplicates);
      console.log(duplicates, "gggggg");
      console.log(members, "kk");

      members.forEach((member) => {
        const memberTestIds = member.cartData.map((test) => test.test_id); // Extract test IDs for each member
        console.log(memberTestIds, "mmmmemberTest-ids");
        const memberDuplicates = memberTestIds.filter((testId) =>
          packageTestIds.includes(String(testId))
        );

        if (memberDuplicates.length > 0) {
          duplicates[member.member_id] = memberDuplicates; // Store duplicate test IDs per member
        }
      });

      console.log("Duplicate test IDs per member:", duplicates);
      setDuplicateIds(Object.values(duplicates).flat());
    };

    if (cartData.length > 0 && packageTestIds.length > 0) {
      findDuplicates();
    }
  }, [cartData, packageTestIds]);

  // const findDuplicate = () => {
  //   console.log(members, "kk");

  //   members.forEach((member) => {
  //     const memberTestIds = member.cartData.map((test) => test.test_id); // Extract test IDs for each member
  //     console.log(memberTestIds, "mmmmemberTest-ids");
  //     const memberDuplicates = memberTestIds.filter((testId) =>
  //       packageTestIds.includes(String(testId))
  //     );

  //     if (memberDuplicates.length > 0) {
  //       duplicates[member.name] = memberDuplicates; // Store duplicate test IDs per member
  //     }
  //   });

  //   console.log("Duplicate test IDs per member:", duplicates);
  // };

  // Open and close popup

  const handleAddMoreTests = () => setIsPopupOpened(true);
  const handleClosePopup = () => setIsPopupOpened(false);

  // Handle removing a test
  const handleRemoveTest = (testId) => {
    // setCartData((prev) => prev.filter((item) => item.test_id !== testId));
    // setClickedIds((prev) => prev.filter((id) => id !== testId));
    // Check if the testId exists in any member's clickedIds
    const test_id = testId;
    // setMainClickedIds((prev) => prev.filter((id) => id !== testId));
    // setMainCartData((prev) => prev.filter((item) => item.test_id !== testId));
    setDuplicateTestIds((prev) => prev.filter((id) => id !== testId));
    setPackagesClickedIds((prev) => prev.filter((id) => id !== testId));
    onRemoveTest(testId);
  };

  // Handle add/remove button click
  const handleButtonClick = (test) => {
    console.log("test Clicked");

    if (clickedIds.includes(test.test_id)) {
      console.log(setMainClickedIds, "set");

      setClickedIds(clickedIds.filter((id) => id !== test.test_id));
      setPackagesClickedIds(clickedIds.filter((id) => id !== test.test_id));
      setCartData(cartData.filter((item) => item.test_id !== test.test_id));
      // setMainCartData((prev) =>
      //   prev.filter((each) => each.test_id !== test.test_id)
      // );
      // setMainClickedIds((prev) => prev.filter((each) => each !== test.test_id));
    } else {
      setClickedIds([...clickedIds, test.test_id]);
      // setMainClickedIds([...mainClickedIds]);
      setCartData([...cartData, test]);
      setDuplicateTestIds((prev) => prev.filter((id) => id !== test.test_id));
      // setMainCartData([...mainCartData, test]);
      // duplicateIds()
    }
  };

  // Filter tests based on search input
  const filteredTests = testsData.filter((test) =>
    test.test_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const filteredCartData = cartData.filter(
    (test) => !uniqueDuplicateTestIds.map(String).includes(String(test.test_id))
  );

  console.log(uniqueDuplicateTestIds, "uniqueDuplicateTestIds");

  console.log(filteredCartData, "filteredData");

  return (
    <div className="tests-checkups-main-container">
      <h4 className="tests-checkups-heading">Tests / Checkups Added</h4>
      {cartData.length > 0 ? (
        filteredCartData.map((test) => (
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

      <MemberList members={members} duplicateTestIds={duplicateIds} />

      {/* {duplicateTestsData.length > 0 && (
        <div className="duplicate-tests-container">
          <h5>Duplicate Items (Removed from cart)</h5>
          {duplicateTestsData.map((test) => (
            <div key={test.test_id} className="test-item-container duplicate">
              <span className="test-item-name">{test.test_name}</span>
              <span className="test-item-price">₹ {test.price}</span>
            </div>
          ))}
        </div>
      )} */}

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
        healthPackages={healthPackages}
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
// import { MdDelete } from "react-icons/md";956
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
