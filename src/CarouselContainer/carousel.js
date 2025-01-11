import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
const carouselImages=[
    {
        imageUrl:"https://res.cloudinary.com/ddjsaoac6/image/upload/v1736510944/doctor_d5ot0q.webp",
        imageName:"1"
    },
    {
        imageUrl:"https://res.cloudinary.com/ddjsaoac6/image/upload/v1736510955/doctor1_si4zyz.webp",
        imageName:"2"
    },
    {
        imageUrl:"https://res.cloudinary.com/ddjsaoac6/image/upload/v1736510967/doctor3_wlgglx.webp",
        imageName:"3"
    }
]
const settings={
    slidesToShow:1,
    slidesToScroll:1,
    dots:true,
    arrows:true,
    autoplaySpeed:1000,
    autoplay:true
}
export const CarouselContainer=()=>{
    return (
        <div style={{width:"90%"}}>
            <Slider {...settings}>
                {
                    carouselImages.map(eachItem=><img src={eachItem.imageUrl} width="90%" height="auto"/>)
                }
            </Slider>

        </div>
    )

}