import React from "react";

import "./SongsSlider.scss";
export default function SongsSlider(props) {
  const { title, data } = props;
  return (
    <div className="songs-slider">
      <h2>{title}</h2>
      <p>Slider</p>
    </div>
  );
}
