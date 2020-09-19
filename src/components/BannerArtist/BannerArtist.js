import React, { useEffect, useState } from "react";
import firebase from "../../utils/firebase";
import "firebase/storage";

import "./BannerArtist.scss";

export default function BannerArtist(props) {
  const { artist } = props;
  const [bannerURL, setBannerURL] = useState(null);

  useEffect(() => {
    firebase
      .storage()
      .ref(`artists/${artist?.banner}`)
      .getDownloadURL()
      .then((url) => setBannerURL(url));
  }, [artist]);

  return (
    <div
      className="banner-artist"
      style={{ backgroundImage: `url(${bannerURL})` }}
    >
      <div className="banner-artist__gradient" />
      <div className="banner-artist__info">
        <h4>Artista</h4>
        <h1>{artist.name}</h1>
      </div>
    </div>
  );
}
