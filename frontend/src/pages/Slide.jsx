import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Silde = (props) => {
  // console.log(props.items);
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
      responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="slider-container  h-[300px] mt-20 ">
      <Slider {...settings}>
        {props.items.map((ele) => (
          <Link key={ele.thumbnail} state={ele} to={"/viwe"} className="  ">
            <img src={ele.thumbnail} alt="error"  />
          <h1 className="text-yellow-900 sm:text-sm font-bold">{ele.title}</h1>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default Silde;
