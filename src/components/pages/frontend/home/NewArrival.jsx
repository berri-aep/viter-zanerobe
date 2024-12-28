import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imgPath } from "@/components/helpers/function-general";
import CardItem from "./CardItem";
import useQueryData from "@/components/custom-hook/useQueryData";
import SpinnerTable from "../../backend/partials/spinners/SpinnerTable";
import { Link } from "react-router-dom";

const NewArrival = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
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

  const {
    isLoading,
    isFetching,
    error,
    data: result,
  } = useQueryData(
    `/v2/clothes`, // endpoint
    "get", // method
    "clothes"
  );

  return (
    <section className="new-arrival py-10">
      <div className="container">
        <Slider {...settings}>
        {result?.count > 0 && result?.data.map((item, key) => {
          return ( 
            <div key={key}>
              {item.clothes_is_active === 1 && (
            <>
              <Link to={`/product/${item.clothes_title.toLowerCase().replaceAll(" ", "-")}`}>
              <CardItem item={item} key={key} />
              </Link> 
            </>
              ) }
            </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default NewArrival;
