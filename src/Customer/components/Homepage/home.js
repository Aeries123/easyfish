import "./home.css";
import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FaqQuestions from "../FaqQuestions/FaqQuestions";
import { Link } from "react-router-dom";
import { CarouselContainer } from "../CarouselContainer/carousel";
import Test from "../Test/Test";
import { MdAddCircleOutline } from "react-icons/md";
import { FiMinusCircle } from "react-icons/fi";
import Whychooseus from "../WhyChooseUs/whychoose";

const tests = [
  {
    imageUrl:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736168625/flask_sbjhu2.png",
    imageName: "Book a Test",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dabzdwxet/image/upload/v1736517117/test_uhyz3y.png",
    imageName: "Home Sample Collection",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dabzdwxet/image/upload/v1736517117/file_ncdpl3.png",
    imageName: "Download Report",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dabzdwxet/image/upload/v1736517117/blood-analysis_ncf4wl.png",
    imageName: "Upload Prescription",
  },
];

const discountImages = [
  {
    imageUrl:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1737038715/f-1_fbsaal.jpg",
    imageName: "image1",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1737038715/f-2_d0ufht.jpg",
    imageName: "image1",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736241443/Screenshot_2025-01-07_144649_bmpwlv.png",
    imageName: "image1",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1737038715/f-1_fbsaal.jpg",
    imageName: "image1",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1737038715/f-2_d0ufht.jpg",
    imageName: "image1",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736241443/Screenshot_2025-01-07_144649_bmpwlv.png",
    imageName: "image1",
  },
];

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      style={{
        ...style,
        display: "block",
        backgroundColor: "black",
        textAlign: "center",
      }}
      className={className}
      onClick={onClick}
    ></div>
  );
};
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      style={{
        ...style,
        display: "block",
        backgroundColor: "black",
        textAlign: "center",
      }}
      className={className}
      onClick={onClick}
    ></div>
  );
};

const settings = {
  //
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 2000,
  // centerMode:true,
  infinite: true,
  arrows: true,
  dots: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 478,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 3,
        centerMode: false,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
      },
    },
  ],
};

const cardImg1 =
  "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png";
const cardImg2 =
  "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228485/edit-info_1_dcyeqi.png";
const cardImg3 =
  "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228581/document_wtfacr.png";

const Home = (props) => {
  const { cartData, setCartData,clickedIds,setClickedIds } = props;
  const [isFullDataVisible, setIsFullDataVisible] = useState(false);
  const [isAllImagesVisible, setImagesAllVisible] = useState(false);
  // const [clickedIds, setClickedIds] = useState([]);
  const [testsData, setTestsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollContainerRef = useRef(null);

  console.log("home data", testsData);

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

  useEffect(() => {
    // Ensure initial setup is correct when component mounts.
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0; // Reset to the leftmost position initially.
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there's an issue with the fetch
  }

  const handleScroll = (direction) => {
    const containerWidth = scrollContainerRef.current.offsetWidth;
    const scrollAmount = containerWidth / 3; // Scroll one-third of the visible width

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

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

  const onClickBookKNow = (each) => {
    setCartData((prev) => [...prev, each]);
  };
  const onClickViewMore = () => {
    setIsFullDataVisible((prev) => !prev);
  };
  const onClickViewImages = () => {
    setImagesAllVisible((prev) => !prev);
  };
  const buttonContent = isFullDataVisible ? "View Less" : "View More";
  return (
    <div className="home-container">
      <CarouselContainer />
      <Test
        testsData={testsData}
        setCartData={setCartData}
        cartData={cartData}
        setClickedIds={setClickedIds}
        clickedIds={clickedIds}
      />
      {/* <div className="tests-container">
        {tests.map((each) => (
          <div key={each.imageName} className="home-image-container">
            <div className="individual-test">
              <img src={each.imageUrl} height="50px" width="50px" />
            </div>
            <h3 className="imageName">{each.imageName}</h3>
          </div>
        ))}
      </div> */}
      
      <div className="cards-container">
        <h2 className="popular-package-heading">Popular Tests / Packages</h2>

        <div className="scroll-wrapper">
          <button
            className="scroll-button left"
            onClick={() => handleScroll("left")}
          >
            &#8592; {/* Left Arrow */}
          </button>
          <div className="individual-cards-container" ref={scrollContainerRef}>
            {testsData.length !== 0 ? (
              testsData.map((test) => (
                <div className="individual-card" key={test.test_id}>
                  <div className="test-card-heading-container">
                    <h4 className="package-heading">{test.test_name}</h4>
                    <h5 className="card-price-heading">₹{test.price}</h5>
                  </div>
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
                          <MdAddCircleOutline className="cart-add-remove-icons" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <img src="https://res.cloudinary.com/ddjsaoac6/image/upload/v1736591529/notfound_nyzkyi.jpg" />
            )}
          </div>
          <button
            className="scroll-button right"
            onClick={() => handleScroll("right")}
          >
            &#8594; {/* Right Arrow */}
          </button>
        </div>

        <button className="view-button" onClick={onClickViewMore}>
          {buttonContent}
        </button>
        <div className="why-choose-us-container">
          <h2 className="why-choose-us-heading">
            <strong>AccessPath Labs</strong>
          </h2>
          <div className="why-choose-us-sub-container">
            <div className="why-choose-us-card-container-1">
              <p className="why-choose-us-paragraph">
                Access Pathlabs is your trusted partner in delivering advanced
                diagnostic solutions with precision, reliability, and care.
                Combining cutting-edge technology and the expertise of our
                skilled pathologists, we offer a wide spectrum of tests, from
                routine health screenings to specialized diagnostics, tailored
                to meet your unique healthcare needs. With our seamless home
                sample collection services, secure and fast online reports, and
                round-the-clock customer support, we prioritize your convenience
                every step of the way. Our commitment to quality, affordability,
                and innovation ensures that you receive accurate results and
                dependable services, empowering you to make informed decisions
                about your health. By adhering to stringent quality standards
                and adopting the latest methodologies, Access Pathylabs
                redefines the diagnostic experience, making healthcare
                accessible, affordable, and hassle-free for everyone. Choose us
                to experience the perfect blend of technology-driven solutions
                and compassionate patient care, because your health deserves
                nothing but the best.
              </p>
            </div>
            <div className="why-choose-us-card-container-2">
              <div className="why-choose-us-tesimonials">
                <p>1</p>
              </div>
              <div className="why-choose-us-tesimonials">
                <p>2</p>
              </div>
              <div>
                <p>3</p>
              </div>
              <div>
                <p>4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div className="slider-main-container">
        <h2 className="package-heading">Promotions & Discounts</h2>
        <div className="slider-container">
          <Slider {...settings}>
            {discountImages.map((each) => (
              <img
                key={each.imageName}
                src={each.imageUrl}
                alt={each.imageName}
                className="discount-images"
              />
            ))}
          </Slider>
        </div>
        <h2 className="package-heading">Why Choose Us</h2>
        <Whychooseus />
        <h2 className="questions-heading">Frequently Asked Questions(FAQs)</h2>
        <FaqQuestions />
      </div>
      //{" "}
    </div>
  );
};
export default Home;
