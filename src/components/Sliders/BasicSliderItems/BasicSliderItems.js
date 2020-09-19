import React, { useEffect, useState } from "react";
import { map } from "lodash";
import Slider from "react-slick";
import "./BasicSliderItems.scss";
import { Link } from "react-router-dom";
import firebase from "../../../utils/firebase";
import "firebase/storage";

export default function BasicSliderItems(props) {
  const { title, data, folderImage, urlName } = props;
  const settings = {
    dots: false,
    infinite: true,
    // autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    className: "basic-slider-items__list",
  };

  return (
    <div className="basic-slider-items">
      <h2>{title}</h2>
      <Slider {...settings}>
        {map(data, (artist) => (
          <RenderItem
            key={artist.id}
            artist={artist}
            folderImage={folderImage}
            urlName={urlName}
          />
        ))}
      </Slider>
    </div>
  );
}

function RenderItem(props) {
  const { artist, folderImage, urlName } = props;
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    firebase
      .storage()
      .ref(`${folderImage}/${artist.banner}`)
      .getDownloadURL()
      .then((url) => setImageURL(url));
  }, [artist, folderImage]);

  return (
    <Link to={`/${urlName}/${artist.id}`}>
      <div className="basic-slider-items__list-item">
        <div
          className="avatar"
          style={{ backgroundImage: `url('${imageURL}')` }}
        />
        <h3>{artist.name}</h3>
      </div>
    </Link>
  );
}
