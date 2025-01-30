import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import FaqQuestions from "../FaqQuestions/FaqQuestions";
import Carousel from "../Carousel/Carousel";
import { MdAddCircleOutline } from "react-icons/md";
import { FiMinusCircle } from "react-icons/fi";
import Cart from "../Cart/cart";
import PopupCart from "../PopupCart";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { CustomizedSlider } from "../customizedslider/slider";

import "./Tests.css";
import { v4 as uuidv4 } from "uuid";

const abcd = "test";

const testArray = [
  {
    id: 1,
    name: "Numerology",
    image:
      "https://res.cloudinary.com/dkujcnlcs/image/upload/v1736244083/esxulmxd2la2di93ytgv.jpg",
  },
  {
    id: 2,
    name: "Radiology",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427384/IMG-20250109-WA0031_cybean.jpg",
  },
  {
    id: 3,
    name: "Cardiology",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427373/IMG-20250109-WA0030_jqjnuk.jpg",
  },
  {
    id: 4,
    name: "Dermatology",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427363/IMG-20250109-WA0029_wwqfrz.jpg",
  },
  {
    id: 5,
    name: "Oncology",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427354/IMG-20250109-WA0028_xi7rih.jpg",
  },
  {
    id: 6,
    name: "Endocrinology",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427344/IMG-20250109-WA0027_pnzord.jpg",
  },
  {
    id: 7,
    name: "Gastroenterology",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427334/IMG-20250109-WA0026_owh0ir.jpg",
  },
  {
    id: 8,
    name: "Hematology",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427322/IMG-20250109-WA0025_jeckr1.jpg",
  },
  {
    id: 9,
    name: "Neurology",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427322/IMG-20250109-WA0025_jeckr1.jpg",
  },
  {
    id: 10,
    name: "Nephrology",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427303/IMG-20250109-WA0024_kr2pvs.jpg",
  },
  {
    id: 11,
    name: "Pulmonology",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427296/IMG-20250109-WA0023_snnc7k.jpg",
  },
  {
    id: 12,
    name: "Urology",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427290/IMG-20250109-WA0022_bc2ipr.jpg",
  },
  {
    id: 13,
    name: "Psychiatry",
    image:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427284/IMG-20250109-WA0021_qupns1.jpg",
  },
];

const cardImg1 =
  "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png";
const cardImg2 =
  "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228485/edit-info_1_dcyeqi.png";
const cardImg3 =
  "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228581/document_wtfacr.png";

const cardAction = "Book Now";

function Tests(props) {
  const { cartData, setCartData, clickedIds, setClickedIds } = props;
  // const [addedItem,setAddedItem]=useState(null)
  // const onClickButtonId=id=>{
  //   setAddedItem(id)
  // }
  const onClickBookKNow = (each) => {
    setCartData((prev) => [...prev, each]);
  };
  // const [updatedArray, setUpdatedArray] = useState(testCards);

  const [inputValue, setInputValue] = useState("");

  // const [clickedIds, setClickedIds] = useState([]);

  const handleButtonClick = (test) => {
    const test_id = test.test_id;

    if (clickedIds.includes(test_id)) {
      setClickedIds((prev) =>
        prev.filter((clickedId) => clickedId !== test_id)
      );
      setCartData((prev) =>
        prev.filter((cartItem) => cartItem.test_id !== test_id)
      );
    } else {
      setClickedIds((prev) => [...prev, test_id]);
      
      setCartData((prev) => [...prev, test]);
    }
  };

  const [isFullDataVisible, setIsFullDataVisible] = useState(false);

  const [testsData, setTestsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [speciality,setSpeciality]=useState(null)
  const buttonContent = isFullDataVisible ? "View Less" : "View More";

  // console.log(updatedArray);

  // const onChangeTestNames=e=>{
  //   const updatedData=updatedArray.filter(eachItem=>eachItem.title.includes(e.target.value))
  //   setUpdatedArray(updatedData)
  // }

  useEffect(() => {
    const endpoint = "http://127.0.0.1:5000/api/tests"; // API endpoint to fetch data from

    // Fetch data from the API
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTestsData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message); // Handle any errors that occur during the fetch
        setLoading(false); // Set loading to false if an error occurs
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there's an issue with the fetch
  }

  const onClickViewMore = () => {
    setIsFullDataVisible((prev) => !prev);
  };

  const onChangeTestNames = (e) => {
    setInputValue(e.target.value);
  };
  const onClickImages=(value)=>{
    setSpeciality(value)
  }
  const filteringData = speciality?testsData.filter(eachItem=>eachItem.speciality===speciality):testsData.filter((each) =>
    each.test_name.toLowerCase().includes(inputValue)
  );
console.log("speciality",speciality)
  const PrevArrow = (props) => {
    const { onClick, style, className } = props;
    return (
      <div
        className={className}
        style={{
          ...style,display: "block !important",
          // width: "50px",
          // height: "50px",
          color: "white",
          backgroundColor: "black",
          // position: "absolute",
          // zIndex: 10,
        }}
        
        onClick={onClick}
      ></div>
    );
  };
  const NextArrow = (props) => {
    const { onClick, style, className } = props;
    return (
      <div
      style={{
        ...style,
        display: "block !important",
        // width: "30px",
        // height: "30px",
        color: "white",
        backgroundColor: "black",
        // position: "absolute",
        // zIndex: 10,
      }}
      
        className={className}
        
          
        onClick={onClick}
      ></div>
    );
  };

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 5,
    centerMode: true,
    dots: false,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive:[
      {
      breakpoint:478,
      settings:{
        slidesToShow:3,
        slidesToScroll:3
      }
      }

    ]
  };

  return (
    <div className="tests-tests-main-container-container">
      <div className="tests-custom-tests-container">
        <div className="tests-custom-header-section">
          {/* <h2 className="custom-main-heading">Book Lab Tests Online</h2>
          <h2 className="custom-sub-heading">Search By Relevance</h2> */}
        </div>

        {/* <div className="custom-tests-list-container">
          <Slider {...settings}>
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
          </Slider>
        </div> */}

        <div className="custom-tests-list-container">
          <Slider {...settings}>
          {testArray.map((test) => (
            <div className="custom-tests-list-item-container" key={test.id} onClick={()=>onClickImages(test.name)}>
              <img
                src={test.image}
                alt={test.name}
                className="custom-test-image"
              />
              <p className="custom-test-name">{test.name}</p>
            </div>
          ))}</Slider>
          {/* <CustomizedSlider setTestsData={setTestsData} testsData={testsData} filterData={filteringData} setSpeciality={setSpeciality}/> */}
        </div>
        <div className="custom-tests-search">
          {/* <div>
            <h4 className="custom-tests-search-title">Search a Test</h4>
          </div> */}
          <div>
            <input
              id="searchTest"
              placeholder="Search for test and health checkup"
              autoComplete="off"
              className="custom-search-input"
              type="search"
              value={inputValue}
              onChange={onChangeTestNames}
            />
          </div>
        </div>

        {/* <div className="custom-tests-sort-section">
          <div className="custom-tests-sort-sub-section">
            <span className="custom-sort-label">Sort by:</span>
            <select name="sort" className="custom-sort-select">
              <option value="popular">Popular</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div> */}

        {/* <Carousel /> */}
        <div className="custom-test-load-more-button-container">
          <div className="tests-individual-cards-container">
            {testsData.length !== 0 ? (
              filteringData.map((test) => (
                <div className="individual-card" key={test.test_id}>
                  <div className="test-card-heading-container">
                    <h4 className="tests-package-heading">{test.test_name}</h4>
                    <h5 className="card-price-heading">₹{test.price}</h5>
                  </div>

                  {/* <hr /> */}
                  <div className="info-container">
                    <img src={cardImg1} className="info-img" />
                    <p className="info-container-paragraph">
                      <strong className="strong">
                        {test.preparation_instructions}
                      </strong>
                    </p>
                  </div>
                  <div className="info-container">
                    <img src={cardImg2} className="info-img" />
                    <p className="info-container-paragraph">
                      <strong className="strong">
                        Report available in {test.duration}
                      </strong>
                    </p>
                  </div>
                  <div className="info-container">
                    <img src={cardImg3} className="info-img" />
                    <p className="info-container-paragraph">
                      <strong className="strong">{test.parameters}</strong>
                    </p>
                  </div>

                  <div className="home-types-booking-container">
                    <ul className="home-types-list">
                      {test.visit_type.split(", ").map((type, index) => (
                        <li key={index} className="home-type-item">
                          {type}
                        </li>
                      ))}
                    </ul>
                    <div className="button-container">
                      <button
                        className="buttton"
                        onClick={() => handleButtonClick(test)}
                      >
                        {clickedIds.includes(test.test_id) ? (
                          <FiMinusCircle className="cart-add-remove-icons" />
                        ) : (
                          <p>
                            <MdAddCircleOutline className="cart-add-remove-icons" />
                          </p>
                        )}
                        {/* <img
                        src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736424675/carts_mjdkfo.png"
                        height="30px"
                        width="30px"
                      /> */}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <img src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736591529/notfound_nyzkyi.jpg" />
            )}
          </div>

          {/* <button className="view-button" onClick={onClickViewMore}>
          {buttonContent}
        </button> */}

          <div className="custom-test-load-more-button-container">
            <button className="custom-test-load-more-button">Load More</button>
          </div>
        </div>
        <FaqQuestions />
      </div>
      <div className="tests-tests-cart-cart-container">
        <PopupCart
          cartData={cartData}
          setCartData={setCartData}
          clickedIds={clickedIds}
          setClickedIds={setClickedIds}
        />
      </div>
    </div>
  );
}

export default Tests;
