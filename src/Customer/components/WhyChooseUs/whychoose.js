import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./whychoose.css";
const whychooseimages = [
  // {
  //     imageUrl:"https://res.cloudinary.com/ddjsaoac6/image/upload/v1737020504/family_burulz.webp",
  //     imageName:"family"
  // },
  {
    imageUrl:
      "https://res.cloudinary.com/dabzdwxet/image/upload/v1738723153/Hygienic_ms2irc.webp",
    imageName: "family",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dabzdwxet/image/upload/v1738733116/home_collection_plbzj7.webp",
    imageName: "family",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dabzdwxet/image/upload/v1738733115/hygienic_1_pdbzts.webp",
    imageName: "family",
  },
];
// const settings={
//     dots:true,
//     arrows:true,
//     autoplay:true,
//     autoplaySpeed:1000,
//     slidesToShow:4,
//     slidesToScroll:2,
//     responsive:[
//         {
//             breakpoint:478,
//             settings:{
//             slidesToShow:1,
//             slidesToScroll:4,
//             autoplay:true,
//             autoplaySpeed:3000
//             }

//         }
//     ]
// }
const Whychooseus = () => {
  return (
    <div className="whychoose-container">
      {whychooseimages.map((each) => {
        return (
          <div key={each.imageUrl} className="each-whychooseus">
            <img
              src={each.imageUrl}
              alt={each.imageName}
              //   style={{ height: "300px", width: "300px" }}
              className="whychoose-img"
            />
          </div>
        );
      })}
    </div>
  );
};
export default Whychooseus;
