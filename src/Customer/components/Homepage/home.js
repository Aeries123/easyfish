import "./home.css";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FaqQuestions from "../FaqQuestions/FaqQuestions";
import { Link } from "react-router-dom";
import { CarouselContainer } from "../CarouselContainer/carousel";
import Test from "../Test/Test";
import { MdAddCircleOutline } from "react-icons/md";
import { FiMinusCircle } from "react-icons/fi";
import Whychooseus from '../WhyChooseUs/whychoose'
const smallData = [
  {
    id: 11,
    cardName: "DIABETES TEST",
    cardPara1: "Fasting required for 8 hours",
    cardPara2: "Report within 24 hours",
    cardPara3: "3 parameter(s) covered",
    cardKnowMore: "Learn More",
    cardTestPrice: "1200",
    cardAction: "Book Now",
    cardImg1:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png",
    cardImg2:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228485/edit-info_1_dcyeqi.png",
    cardImg3:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228581/document_wtfacr.png",
  },
  {
    id: 12,
    cardName: "VITAMIN D TEST",
    cardPara1: "No special preparation required",
    cardPara2: "Report in 1-2 days",
    cardPara3: "2 parameter(s) covered",
    cardKnowMore: "Find Out More",
    cardTestPrice: "800",
    cardAction: "Book Now",
    cardImg1:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png",
    cardImg2:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228485/edit-info_1_dcyeqi.png",
    cardImg3:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228581/document_wtfacr.png",
  },
  {
    id: 13,
    cardName: "HEART DISEASE RISK",
    cardPara1: "Fasting for 12 hours required",
    cardPara2: "Report available after 2 days",
    cardPara3: "5 parameter(s) covered",
    cardKnowMore: "Discover More",
    cardTestPrice: "2500",
    cardAction: "Book Now",
    cardImg1:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png",
    cardImg2:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228485/edit-info_1_dcyeqi.png",
    cardImg3:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228581/document_wtfacr.png",
  },
];

const cardsData = [
  {
    id: 1,
    cardName: "DIABETES TEST",
    cardPara1: "Fasting required for 8 hours",
    cardPara2: "Report within 24 hours",
    cardPara3: "3 parameter(s) covered",
    cardKnowMore: "Learn More",
    cardTestPrice: "1200",
    cardAction: "Book Now",
    cardImg1:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png",
    cardImg2:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228485/edit-info_1_dcyeqi.png",
    cardImg3:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228581/document_wtfacr.png",
  },
  {
    id: 2,
    cardName: "VITAMIN D TEST",
    cardPara1: "No special preparation required",
    cardPara2: "Report in 1-2 days",
    cardPara3: "2 parameter(s) covered",
    cardKnowMore: "Find Out More",
    cardTestPrice: "800",
    cardAction: "Book Now",
    cardImg1:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png",
    cardImg2:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228485/edit-info_1_dcyeqi.png",
    cardImg3:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228581/document_wtfacr.png",
  },
  {
    id: 3,
    cardName: "HEART DISEASE RISK",
    cardPara1: "Fasting for 12 hours required",
    cardPara2: "Report available after 2 days",
    cardPara3: "5 parameter(s) covered",
    cardKnowMore: "Discover More",
    cardTestPrice: "2500",
    cardAction: "Book Now",
    cardImg1:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png",
    cardImg2:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228485/edit-info_1_dcyeqi.png",
    cardImg3:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228581/document_wtfacr.png",
  },
  {
    id: 4,
    cardName: "THYROID TEST",
    cardPara1: "No preparation required",
    cardPara2: "Results in 48 hours",
    cardPara3: "4 parameter(s) covered",
    cardKnowMore: "Learn More",
    cardTestPrice: "1500",
    cardAction: "Book Now",
    cardImg1:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png",
    cardImg2:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228485/edit-info_1_dcyeqi.png",
    cardImg3:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228581/document_wtfacr.png",
  },
  {
    id: 5,
    cardName: "LIVER FUNCTION TEST",
    cardPara1: "No fasting required",
    cardPara2: "Report in 1 day",
    cardPara3: "6 parameter(s) covered",
    cardKnowMore: "Learn More",
    cardTestPrice: "2200",
    cardAction: "Book Now",
    cardImg1:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png",
    cardImg2:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228485/edit-info_1_dcyeqi.png",
    cardImg3:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228581/document_wtfacr.png",
  },
  {
    id: 6,
    cardName: "URIC ACID TEST",
    cardPara1: "No fasting required",
    cardPara2: "Results in 24 hours",
    cardPara3: "1 parameter(s) covered",
    cardKnowMore: "Discover More",
    cardTestPrice: "600",
    cardAction: "Book Now",
    cardImg1:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png",
    cardImg2:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228485/edit-info_1_dcyeqi.png",
    cardImg3:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228581/document_wtfacr.png",
  },
  {
    id: 7,
    cardName: "VITAMIN B12 TEST",
    cardPara1: "No preparation required",
    cardPara2: "Report in 2 days",
    cardPara3: "2 parameter(s) covered",
    cardKnowMore: "Find Out More",
    cardTestPrice: "1000",
    cardAction: "Book Now",
    cardImg1:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png",
    cardImg2:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228485/edit-info_1_dcyeqi.png",
    cardImg3:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228581/document_wtfacr.png",
  },
  {
    id: 8,
    cardName: "PREGNANCY TEST",
    cardPara1: "No preparation required",
    cardPara2: "Report within 1 day",
    cardPara3: "1 parameter(s) covered",
    cardKnowMore: "Learn More",
    cardTestPrice: "500",
    cardAction: "Book Now",
    cardImg1:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png",
    cardImg2:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228485/edit-info_1_dcyeqi.png",
    cardImg3:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228581/document_wtfacr.png",
  },
  {
    id: 9,
    cardName: "KIDNEY FUNCTION TEST",
    cardPara1: "Fasting for 8 hours required",
    cardPara2: "Results within 2 days",
    cardPara3: "5 parameter(s) covered",
    cardKnowMore: "Discover More",
    cardTestPrice: "2000",
    cardAction: "Book Now",
    cardImg1:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png",
    cardImg2:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228485/edit-info_1_dcyeqi.png",
    cardImg3:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228581/document_wtfacr.png",
  },
  {
    id: 10,
    cardName: "BLOOD SUGAR TEST",
    cardPara1: "Fasting for 8 hours required",
    cardPara2: "Report within 1 day",
    cardPara3: "3 parameter(s) covered",
    cardKnowMore: "Learn More",
    cardTestPrice: "700",
    cardAction: "Book Now",
    cardImg1:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228391/info_xtk8xt.png",
    cardImg2:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228485/edit-info_1_dcyeqi.png",
    cardImg3:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736228581/document_wtfacr.png",
  },
];

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

export const qualityData = [
  {
    imageUrl:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736249394/q7_vjt0be.png",
    imageInformationCount: "600",
    imageInformation: "Instrumenst used for real time QC monitoring.",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736249394/q7_vjt0be.png",
    imageInformationCount: "600",
    imageInformation: "Instrumenst used for real time QC monitoring.",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736249394/q7_vjt0be.png",
    imageInformationCount: "600",
    imageInformation: "Instrumenst used for real time QC monitoring.",
  },
];

const instituteImages = [
  {
    imageUrl:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736251209/lab-1_skjlpb.png",
    imageName: "lab-1",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736255508/cap_m5sdhh.png",
    imageName: "lab-1",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736251209/lab-1_skjlpb.png",
    imageName: "lab-1",
  },
];

const instituteImages2 = [
  {
    imageUrl:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736254676/lab-2_bvdltp.png",
    imageName:
      "National Reference Laboratory at Rohini, Kolkata Reference Laboratory at Kolkata",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/ddjsaoac6/image/upload/v1736254676/lab-2_bvdltp.png",
    imageName: "National Reference Laboratory at Rohini",
  },
];

const testImages = [
  {
    imageUrl:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427231/IMG-20250109-WA0017_lojdt1.jpg",
    imageName: "hands",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427384/IMG-20250109-WA0031_cybean.jpg",
    imageName: "hands",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427373/IMG-20250109-WA0030_jqjnuk.jpg",
    imageName: "hands",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427363/IMG-20250109-WA0029_wwqfrz.jpg",
    imageName: "hands",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427354/IMG-20250109-WA0028_xi7rih.jpg",
    imageName: "hands",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427344/IMG-20250109-WA0027_pnzord.jpg",
    imageName: "hands",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427322/IMG-20250109-WA0025_jeckr1.jpg",
    imageName: "hands",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427276/IMG-20250109-WA0020_e55i1c.jpg",
    imageName: "hands",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427270/IMG-20250109-WA0019_gp5tzy.jpg",
    imageName: "hands",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427718/IMG-20250109-WA0034_kgser9.jpg",
    imageName: "hands",
  },
];

const minTestImages = [
  {
    imageUrl:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427231/IMG-20250109-WA0017_lojdt1.jpg",
    imageName: "hands",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427384/IMG-20250109-WA0031_cybean.jpg",
    imageName: "hands",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427373/IMG-20250109-WA0030_jqjnuk.jpg",
    imageName: "hands",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427363/IMG-20250109-WA0029_wwqfrz.jpg",
    imageName: "hands",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427354/IMG-20250109-WA0028_xi7rih.jpg",
    imageName: "hands",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427344/IMG-20250109-WA0027_pnzord.jpg",
    imageName: "hands",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dikbh5nvt/image/upload/v1736427322/IMG-20250109-WA0025_jeckr1.jpg",
    imageName: "hands",
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
// const settings = {
//     slidesToShow: 3,
//     slidesToScroll: 3,
//     arrows: true,
//     dots: true,
//     centerMode: true,
//     autoplay: true, // Note the lowercase "autoplay"
//     autoplaySpeed: 2000, // Correct property name
//     prevArrow: <PrevArrow />,
//     nextArrow: <NextArrow />,
//   };

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
  const { setCartData } = props;
  const [isFullDataVisible, setIsFullDataVisible] = useState(false);
  const [isAllImagesVisible, setImagesAllVisible] = useState(false);
  const [clickedIds, setClickedIds] = useState([]);
  const [testsData, setTestsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const [cartData,setCartData]=useState([])

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
  const visibleData = isFullDataVisible ? cardsData : smallData;
  const buttonContent = isFullDataVisible ? "View Less" : "View More";
  const VisibleImages = isAllImagesVisible ? testImages : minTestImages;
  const visibleContent = isAllImagesVisible ? "View Less" : "View More";
  // let settings={
  //     slidesToShow:1,
  //     slidesToScroll:3,
  //     autoplaySpeed:1000,
  //     autoplay:true,
  //     dots:true,
  //     arrows:true
  // }
  return (
    <div className="home-container">
      {/* <div style={{width:90%}}>
                <Slider {...settings}>
                    {
                        carouselImages.map(eachItem=><img src={eachItem.imageUrl} alt={eachItem.imageName}/>)
                    }
                </Slider>
                </div> */}
      <CarouselContainer />
      <Test />
      <div className="tests-container">
        {tests.map((each) => (
          <div className="home-image-container">
            <div className="individual-test">
              <img src={each.imageUrl} height="50px" width="50px" />
            </div>
            <h3 className="imageName">{each.imageName}</h3>
          </div>
        ))}
      </div>
      <div className="cards-container">
        <h2 className="package-heading">Popular Tests / Packages</h2>

        <div className="individual-cards-container">
          {testsData.length !== 0 ? (
            testsData.map((test) => (
              <div className="individual-card" key={test.test_id}>
                <div className="test-card-heading-container">
                  <h4 className="package-heading">{test.test_name}</h4>
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

        <button className="view-button" onClick={onClickViewMore}>
          {buttonContent}
        </button>
        <div>
          <h2 className="why-choose-us-heading">
            <strong>AccessPath Labs</strong>
          </h2>
          <p className="why-choose-us-paragraph">
            Access Pathylabs is your trusted partner in delivering advanced
            diagnostic solutions with precision, reliability, and care.
            Combining cutting-edge technology and the expertise of our skilled
            pathologists, we offer a wide spectrum of tests, from routine health
            screenings to specialized diagnostics, tailored to meet your unique
            healthcare needs. With our seamless home sample collection services,
            secure and fast online reports, and round-the-clock customer
            support, we prioritize your convenience every step of the way. Our
            commitment to quality, affordability, and innovation ensures that
            you receive accurate results and dependable services, empowering you
            to make informed decisions about your health. By adhering to
            stringent quality standards and adopting the latest methodologies,
            Access Pathylabs redefines the diagnostic experience, making
            healthcare accessible, affordable, and hassle-free for everyone.
            Choose us to experience the perfect blend of technology-driven
            solutions and compassionate patient care, because your health
            deserves nothing but the best.
          </p>
        </div>
      </div>
      <div></div>
      <div className="slider-main-container">
        <h2 className="package-heading">Promotions & Discounts</h2>

        <div className="slider-container">
          <Slider {...settings}>
            {discountImages.map((each) => (
              <img
                src={each.imageUrl}
                alt={each.imageName}
                className="discount-images"
              />
            ))}
          </Slider>
        </div>
        <h2 className="package-heading">Why Choose Us</h2>

        {/* <div className="quality-container">
          {qualityData.map((each) => {
            return (
              <div className="each-quality">
                <img src={each.imageUrl} />
                <div className="quality-content-container">
                  <h2>{each.imageInformationCount}+</h2>
                  <b>{each.imageInformation}</b>
                </div>
              </div>
            );
          })}
          <h5 className="know-more-paragraph">Know More</h5>
        </div> */}
        {/* <div style={{width:"80%"}}> */}
        {/* <Whychooseus/> */}
      </div>
      {/* <div className="stamp-container">
        <div className="stamp-sub-container-1">
          {instituteImages.map((eachItem) => (
            <>
              <img src={eachItem.imageUrl} />
            </>
          ))}
        </div>
        <div className="stamp-sub-container-1">
          {instituteImages2.map((eachItem) => (
            <>
              <div className="stamp-content">
                <img src={eachItem.imageUrl} />
                <b className="stamp-bold-content">{eachItem.imageName}</b>
              </div>
            </>
          ))}
        </div>
      </div> */}
      {/* <div className="test-container"> */}
      {/* <div className="test-images-container">
        {VisibleImages.map((eachItem) => (
          <>
            <div className="each-test-container">
              <img
                src={eachItem.imageUrl}
                alt={eachItem.imageName}
                style={{ borderRadius: "100%" }}
              />
              <b className="bold-image-name">{eachItem.imageName}</b>
            </div>
          </>
        ))}
      </div>

      <button className="view-button" onClick={onClickViewImages}>
        {visibleContent}
      </button> */}
      {/* </div> */}
      {/* <div className="questions-container"> */}

      <Whychooseus />

      <h2 className="questions-heading">Frequently Asked Questions(FAQs)</h2>

      <FaqQuestions />
    </div>

    // </div>
  );
};
export default Home;
