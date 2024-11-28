import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imgPath } from "@/components/helpers/function-general";
import CardItem from "./CardItem";
import { newArrivalArray } from "./new-arrival-data";

const NewArrival = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 1500,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="new-arrival py-10">
      <div className="container">
        <Slider {...settings}>
          {newArrivalArray.map((item, key) => (
            <>
              <CardItem item={item} key={key} />
            </>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default NewArrival;
