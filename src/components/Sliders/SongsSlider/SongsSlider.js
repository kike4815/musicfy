import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { size, map } from "lodash";
import firebase from "../../../utils/firebase";
import "firebase/firestore";
import "firebase/storage";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./SongsSlider.scss";

const db = firebase.firestore(firebase);

export default function SongsSlider(props) {
  const { title, data, playerSong } = props;

  const settings = {
    dots: false,
    infinitie: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    className: "songs-slider_list",
  };

  if (size(data) < 5) {
    return null;
  }

  return (
    <div className="songs-slider">
      <h2>{title}</h2>
      <Slider {...settings}>
        {map(data, (song) => (
          <Song key={song.id} song={song} playerSong={playerSong} />
        ))}
      </Slider>
    </div>
  );
}

function Song(props) {
  const { song, playerSong } = props;
  const [banner, setbanner] = useState(null); //guardamos la url de la imagen
  const [album, setAlbum] = useState(null); // info del album

  useEffect(() => {
    db.collection("album")
      .doc(song.album)
      .get()
      .then((response) => {
        const albumTemp = response.data();
        albumTemp.id = response.id;
        setAlbum(albumTemp);
        getImage(albumTemp);
      });
  }, [song]);

  const getImage = (album) => {
    firebase
      .storage()
      .ref(`album/${album.banner}`)
      .getDownloadURL()
      .then((bannerURL) => {
        setbanner(bannerURL);
      });
  };

  const onPlay = () => {
    playerSong(banner, song.name, song.fileName);
  };

  return (
    <div className="songs-slider__list-song">
      <div
        className="avatar"
        style={{ backgroundImage: `url('${banner}')` }}
        onClick={onPlay}
      >
        <Icon name="play circle outline" />
      </div>
      <Link to={`album/${album?.id}`}>
        <h3>{song.name}</h3>
      </Link>
    </div>
  );
}
