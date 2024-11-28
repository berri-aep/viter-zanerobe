import { imgPath } from '@/components/helpers/function-general';
import React from 'react'

const Slideritem = ({img, header, subheader}) => {
  return (
    <div className="slider-item relative">
      <img
        src={`${imgPath}/${img}`}
        alt=""
        className="h-screen w-full object-cover"
      />
      <div className="absolute bottom-14 left-10 md:left-20 text-white">
        <h6 className="uppercase">{subheader}</h6>
        <h2 className="uppercase">{header}</h2>
      </div>
    </div>
  );
}

export default Slideritem