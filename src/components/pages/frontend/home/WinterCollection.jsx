import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imgPath } from "@/components/helpers/function-general";
import CardItem from "./CardItem";

const WinterCollection = () => {
  const winterCollectionArray = [
    {
      img1: "winter-1.jpg",
      img2: "na-card-a2.jpg",
      title: "1Lorem ipsum dolor sit amet.",
      price: "$149.99",
    },
    {
      img1: "na-card-a1.jpg",
      img2: "winter-2-1.jpg",
      title: "2Lorem ipsum dolor sit amet.",
      price: "$159.99",
    },
    {
      img1: "na-card-a2.jpg",
      img2: "winter-3.jpg",
      title: "3Lorem ipsum dolor sit amet.",
      price: "$169.99",
    },
    {
      img1: "na-card-a1.jpg",
      img2: "winter-4.jpg",
      title: "4Lorem ipsum dolor sit amet.",
      price: "$179.99",
    },
  ];

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
          {winterCollectionArray.map((item, key) => (
            <>
              <CardItem item={item} key={key} />
            </>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default WinterCollection;
