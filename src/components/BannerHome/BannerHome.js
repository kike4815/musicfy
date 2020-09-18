import React, { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import "firebase/storage";

import "./BannerHome.scss";

export default function BannerHome() {
  const [bannerURL, setBannerURL] = useState(null);

  useEffect(() => {
    firebase
      .storage()
      .ref("other/banner-home.jpg")
      .getDownloadURL()
      .then((url) => {
        setBannerURL(url);
      })
      .catch(() => {}); //controlamos el error por si no ponemos el banner ya que salta en el console
  }, []);

  if (!bannerURL) {
    return null;
  }

  return (
    <div
      className="banner-home"
      style={{ backgroundImage: `url(${bannerURL})` }}
    />
  );
}
