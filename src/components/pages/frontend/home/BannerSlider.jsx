import React from 'react'
import Slideritem from './Slideritem';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
  };


  return (
    <section className="banner-slider">
      <Slider {...settings}>
        <Slideritem
          img="slide-1.jpg"
          header="graphic tees capsule"
          subheader="new drop"
        />
        <Slideritem
          img="slide-2.jpg"
          header="the qb lounge tee"
          subheader="Re-stocked with new colors"
        />
        <Slideritem
          img="slide-3.jpg"
          header="stitched football trackpant"
          subheader="limited edition online exclusive"
        />
      </Slider>
    </section>
  );
}

export default BannerSlider
