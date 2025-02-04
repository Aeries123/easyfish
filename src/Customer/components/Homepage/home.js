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
import HealthPackages from "../HealthPakages";
import Banner from "../Banner/Banner";
import PopupCart from "../PopupCart";
import Cart from "../Cart/cart";
import { FaArrowRightLong } from "react-icons/fa6";

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

const testimonials1 = [
  {
    id: 1,
    text: "This service is absolutely outstanding! The convenience and ease of booking, coupled with the accuracy and speed of the reports, make it a top choice. I highly recommend it to anyone who values quick and reliable health checkups.",
    author: "Sagar D",
    rating: "⭐ ⭐ ⭐ ⭐ ⭐",
  },
  {
    id: 2,
    text: "I loved the variety of packages offered and how easy it is to select the one that best fits my needs. The quick turnaround time for reports was impressive, and I felt confident in the results. Great experience overall!",
    author: "Laharika",
    rating: "⭐ ⭐ ⭐ ⭐",
  },
  {
    id: 3,
    text: "Affordable, reliable, and efficient! I’ve used their services multiple times, and each experience has been better than the last. The health checkups are thorough, and I always receive accurate results, making this my go-to provider.",
    author: "Naresh",
    rating: "⭐ ⭐ ⭐ ⭐ ⭐",
  },
  {
    id: 4,
    text: "Great customer support and timely service. I had some questions about the tests I needed, and their team was quick to provide clear answers. The service was on time, and the reports were delivered as promised. I trust them for all my health checkup needs.",
    author: "Jagadeesh",
    rating: "⭐ ⭐ ⭐ ⭐ ⭐",
  },
  {
    id: 5,
    text: "The home sample collection service is so convenient! I didn’t have to leave my home to get the tests done, and the reports were available on the portal in no time. Very efficient and customer-centric.",
    author: "Srikanth",
    rating: "⭐ ⭐ ⭐ ⭐",
  },
  {
    id: 6,
    text: "I was a bit skeptical at first, but this service exceeded my expectations. The process was smooth, the staff was friendly, and the reports were delivered faster than expected. I am thoroughly impressed and will definitely continue using it.",
    author: "Sandhya",
    rating: "⭐ ⭐ ⭐ ⭐ ⭐",
  },
  {
    id: 7,
    text: "The affordability of the packages was the first thing that attracted me, but the quality of the tests and customer service is what keeps me coming back. I’ve recommended it to all my family and friends!",
    author: "Lalitha",
    rating: "⭐ ⭐ ⭐ ⭐ ⭐",
  },
  {
    id: 8,
    text: "I’ve been using this service for regular checkups, and each time it’s been a seamless experience. From booking the tests online to receiving reports on time, everything is top-notch. I wouldn’t trust anyone else with my health.",
    author: "Olivia Green",
    rating: "⭐ ⭐ ⭐ ⭐",
  },
  {
    id: 9,
    text: "I was impressed by how easy it was to book and manage my tests. The clarity of the results was also fantastic, and I appreciated the detailed reports. Excellent service all around!",
    author: "Ethan Clark",
    rating: "⭐ ⭐ ⭐ ⭐ ⭐",
  },
  {
    id: 10,
    text: "As a busy professional, I appreciate the convenience of this service. It’s quick, reliable, and hassle-free. My health checkups have never been more straightforward, and I’m grateful for this service’s efficiency.",
    author: "Sophia Harris",
    rating: "⭐ ⭐ ⭐ ⭐ ⭐",
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

const Home = (props) => {
  const { cartData, setCartData, clickedIds, setClickedIds, addToCart } = props;
  const [isFullDataVisible, setIsFullDataVisible] = useState(false);
  const [isAllImagesVisible, setImagesAllVisible] = useState(false);
  const [testsData, setTestsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollContainerRef = useRef(null);

  console.log("home afwrvg", testsData);

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
        console.log(data, "tests");
        setTestsData(data.tests);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message); // Handle any errors that occur during the fetch
        setLoading(false); // Set loading to false if an error occurs
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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

  const handleAddToCart = (testItem) => {
    console.log("clicked1");
    // Add the test to the backend and update the local cart data
    addToCart(testItem);
  };

  return (
    <div className="home-container">
      <CarouselContainer />
      <div className="home-home-test-component-container">
        <Test
          testsData={testsData}
          setCartData={setCartData}
          cartData={cartData}
          setClickedIds={setClickedIds}
          clickedIds={clickedIds}
        />
      </div>
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
        <div className="health-packages-container">
          <div className="test-individual-health-packages-container">
            <div className="test-individual-scroll-buttons">
              <button
                className="test-individual-scroll-button left"
                onClick={scrollLeft}
              >
                &#8249;
              </button>
              <div
                className="test-individual-test-card-container"
                ref={scrollContainerRef}
              >
                {testsData.length !== 0 ? (
                  testsData.map((test) => (
                    <div
                      key={test.test_id}
                      className="test-individual-test-card"
                      style={{position:"relative"}}
                    >
                      <div className="test-individual-test-card-title-container">
                        <h3 className="test-individual-test-card-title">
                          {test.test_name}
                        </h3>
                        <p className="test-individual-test-card-price">
                          ₹{test.price}
                        </p>
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
                            <li
                              key={index}
                              className="test-individual-popular-test-home-type-item"
                            >
                              {type}
                            </li>
                          ))}
                        </ul>
                        <div className="test-individual-popular-test-button-container">
                          <Link to={`/particular/test/${test.test_id}`}>
                            <FaArrowRightLong
                              style={{
                                position: "absolute",
                                right: "5px",
                                right: "5px",
                                bottom: "40px",
                                height: "30px",
                                width: "30px",
                                zIndex: 9999,
                                pointerEvents: "auto",
                              }}
                            />
                          </Link>
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
              <button
                className="test-individual-scroll-button right"
                onClick={scrollRight}
              >
                &#8250;
              </button>
            </div>
          </div>
        </div>
        <div className="testimonials-container">
          <h2 className="testimonials-heading">
            <strong>AccessPath Labs</strong>
          </h2>
          <div className="testimonials-sub-container">
            <div className="testimonials-about-container">
              <p className="testimonials-paragraph">
                At AccessPath Labs, we are committed to revolutionizing the
                healthcare experience by combining cutting-edge technology with
                expert medical care to provide precise and reliable diagnostic
                solutions. Our comprehensive services cover a wide range of
                diagnostic tests, including home sample collection, ensuring
                that you can access our services from the comfort of your home.
                We prioritize speed and accuracy, delivering fast online reports
                so that you can make informed decisions about your health
                without delay. Our team of skilled pathologists and medical
                professionals works tirelessly to ensure the highest quality of
                results. Additionally, we offer 24/7 customer support, so you
                can always reach out for assistance, whether you have questions
                about your test, need help interpreting your results, or require
                support at any step along the way.
              </p>
            </div>
            <div className="testimonials-slider-container">
              <h1 className="testimonials-slider-heading">Testimonials</h1>
              <div className="testimonials-slider">
                {testimonials1.map((testimonial) => (
                  <div key={testimonial.id} className="testimonials-card">
                    <p className="testimonials-text">"{testimonial.text}"</p>
                    <p className="testimonials-author">
                      - {testimonial.rating}
                    </p>
                    <p className="testimonials-author">
                      - {testimonial.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="banner-banner-cart-container">
        {cartData.length > 0 && (
          <div>
            <Cart
              cartData={cartData}
              setCartData={setCartData}
              setClickedIds={setClickedIds}
              clickedIds={clickedIds}
            />
          </div>
        )}
      </div>
      <div className="health-packages-container">
        <HealthPackages
          setCartData={setCartData}
          cartData={cartData}
          setClickedIds={setClickedIds}
          clickedIds={clickedIds}
        />
      </div>
      <div className="slider-main-container">
        <h2 className="package-heading">Why Choose Us</h2>
        <Whychooseus />
        <h2 className="questions-heading">Frequently Asked Questions(FAQs)</h2>
        <FaqQuestions />
      </div>
    </div>
  );
};
export default Home;
