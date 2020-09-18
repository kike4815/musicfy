import React from "react";
import { map } from "lodash";
import Slider from "react-slick";
import "./BasicSliderItems.scss";

export default function BasicSliderItems(props) {
  const { title, data } = props;

  const settings = {
    dots: false,
    infinitie: true,
    //   autoplay:true
    sliderToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    className: "basic-slider-items__list",
  };

  return (
    <div className="basic-slider-items">
      <h2>{title}</h2>
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
}
