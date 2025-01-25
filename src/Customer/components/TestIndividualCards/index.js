import React, { useState, useRef, useEffect } from "react";
import { FiMinusCircle } from "react-icons/fi";
import { MdAddCircleOutline } from "react-icons/md";
import "./index.css";

const TestIndividualCards = ({
  handleScroll,
  handleButtonClick,
  clickedIds,
}) => {
  const [testsData, setTestsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const endpoint = "http://127.0.0.1:5000/api/tests"; // API endpoint

    // Fetch data from the API
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

  if (loading) {
    return <div className="test-loading">Loading...</div>;
  }

  if (error) {
    return <div className="test-error">Error: {error}</div>;
  }

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="test-individual-health-packages-container">
      <h2 className="test-individual-heading">Popular Tests</h2>
      <div className="test-individual-scroll-buttons">
        <button className="test-individual-scroll-button left" onClick={scrollLeft}>
          &#8249;
        </button>
        <div className="test-individual-test-card-container" ref={scrollContainerRef}>
          {testsData.length !== 0 ? (
            testsData.map((test) => (
              <div key={test.test_id} className="test-individual-test-card">
                <div className="test-individual-test-card-title-container">
                  <h3 className="test-individual-test-card-title">{test.test_name}</h3>
                  <p className="test-individual-test-card-price">₹{test.price}</p>
                </div>

                <div className="test-individual-popular-test-info-container">
                  <img
                    src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png"
                    alt="Test preparation instructions"
                    className="test-individual-info-img"
                  />
                  <p className="test-individual-popular-test-info-container-paragraph">
                    <strong className="test-individual-popular-test-strong">
                      {test.preparation_instructions}
                    </strong>
                  </p>
                </div>

                <div className="test-individual-popular-test-info-container">
                  <img
                    src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228485/edit-info_1_dcyeqi.png"
                    alt="Test report duration"
                    className="test-individual-info-img"
                  />
                  <p className="test-individual-popular-test-info-container-paragraph">
                    <strong className="test-individual-popular-test-strong">
                      Report available in {test.duration}
                    </strong>
                  </p>
                </div>

                <div className="test-individual-popular-test-info-container">
                  <img
                    src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228581/document_wtfacr.png"
                    alt="Test parameters"
                    className="test-individual-info-img"
                  />
                  <p className="test-individual-popular-test-info-container-paragraph">
                    <strong className="test-individual-popular-test-strong">
                      {test.parameters}
                    </strong>
                  </p>
                </div>

                <div className="test-individual-popular-test-home-types-booking-container">
                  <ul className="test-individual-popular-test-home-types-list">
                    {test.visit_type.split(", ").map((type, index) => (
                      <li key={index} className="test-individual-popular-test-home-type-item">
                        {type}
                      </li>
                    ))}
                  </ul>
                  <div className="test-individual-popular-test-button-container">
                    <button
                      className="test-individual-popular-test-button"
                      onClick={() => handleButtonClick(test)}
                    >
                      {clickedIds.includes(test.test_id) ? (
                        <FiMinusCircle className="test-individual-cart-add-remove-icons" />
                      ) : (
                        <MdAddCircleOutline className="test-individual-cart-add-remove-icons" />
                      )}
                    </button>
                  </div>
                </div>

                {/* <div className="test-card-description-container">
                  <p className="test-card-description">{test.parameters}</p>
                  <p className="test-card-description">
                    Report available in {test.duration}
                  </p>
                </div>
                <div className="test-card-button-container">
                  <button className="test-card-button">View Details</button>
                  <button
                    className="test-card-button"
                    onClick={() => handleButtonClick(test)}
                  >
                    {clickedIds.includes(test.test_id) ? (
                      <FiMinusCircle className="cart-add-remove-icons" />
                    ) : (
                      <MdAddCircleOutline className="cart-add-remove-icons" />
                    )}
                  </button>
                </div> */}
              </div>
            ))
          ) : (
            <img
              src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736591529/notfound_nyzkyi.jpg"
              alt="No tests found"
              className="test-individual-no-data-img"
            />
          )}
        </div>
        <button className="test-individual-scroll-button right" onClick={scrollRight}>
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default TestIndividualCards;

// import React, { useState, useRef, useEffect } from "react";
// import { FiMinusCircle } from "react-icons/fi";
// import { MdAddCircleOutline } from "react-icons/md";
// import "./index.css";

// const TestIndividualCards = ({
//   handleScroll,
//   handleButtonClick,
//   clickedIds,
// }) => {
//   const [testsData, setTestsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const scrollContainerRef = useRef(null);

//   useEffect(() => {
//     const endpoint = "http://127.0.0.1:5000/api/tests"; // API endpoint

//     // Fetch data from the API
//     fetch(endpoint)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setTestsData(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div className="test-loading">Loading...</div>;
//   }

//   if (error) {
//     return <div className="test-error">Error: {error}</div>;
//   }

//   const scrollLeft = () => {
//     scrollContainerRef.current.scrollBy({
//       left: -300,
//       behavior: "smooth",
//     });
//   };

//   const scrollRight = () => {
//     scrollContainerRef.current.scrollBy({
//       left: 300,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="popular-test-scroll-wrapper">
//       <button
//         className="popular-test-scroll-button left"
//         onClick={() => handleScroll("left")}
//       >
//         &#8592; {/* Left Arrow */}
//       </button>
//       <div className="popular-test-cards-container" ref={scrollContainerRef}>
//         {testsData.length !== 0 ? (
//           testsData.map((test) => (
//             <div className="popular-test-card" key={test.test_id}>
//               <div className="popular-test-card-heading-container">
//                 <h4 className="popular-test-package-heading">
//                   {test.test_name}
//                 </h4>
//                 <h5 className="popular-test-card-price-heading">
//                   ₹{test.price}
//                 </h5>
//               </div>
// <div className="popular-test-info-container">
//   <img
//     src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png"
//     alt="Test preparation instructions"
//     className="popular-test-info-img"
//   />
//   <p className="popular-test-info-container-paragraph">
//     <strong className="popular-test-strong">
//       {test.preparation_instructions}
//     </strong>
//   </p>
// </div>
{
  /* <div className="popular-test-info-container">
  <img
    src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228485/edit-info_1_dcyeqi.png"
    alt="Test report duration"
    className="popular-test-info-img"
  />
  <p className="popular-test-info-container-paragraph">
    <strong className="popular-test-strong">
      Report available in {test.duration}
    </strong>
  </p>
</div>; */
}
// <div className="popular-test-info-container">
//   <img
//     src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228581/document_wtfacr.png"
//     alt="Test parameters"
//     className="popular-test-info-img"
//   />
//   <p className="popular-test-info-container-paragraph">
//     <strong className="popular-test-strong">
//       {test.parameters}
//     </strong>
//   </p>
// </div>
// <div className="popular-test-home-types-booking-container">
//   <ul className="popular-test-home-types-list">
//     {test.visit_type.split(", ").map((type, index) => (
//       <li key={index} className="popular-test-home-type-item">
//         {type}
//       </li>
//     ))}
//   </ul>
//   <div className="popular-test-button-container">
//     <button
//       className="popular-test-button"
//       onClick={() => handleButtonClick(test)}
//     >
//       {clickedIds.includes(test.test_id) ? (
//         <FiMinusCircle className="cart-add-remove-icons" />
//       ) : (
//         <MdAddCircleOutline className="cart-add-remove-icons" />
//       )}
//     </button>
//   </div>
// </div>
//             </div>
//           ))
//         ) : (
//           <img
//             src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736591529/notfound_nyzkyi.jpg"
//             alt="No tests found"
//             className="popular-test-no-data-img"
//           />
//         )}
//       </div>
//       <button
//         className="popular-test-scroll-button right"
//         onClick={() => handleScroll("right")}
//       >
//         &#8594; {/* Right Arrow */}
//       </button>
//     </div>
//   );
// };

// export default TestIndividualCards;
