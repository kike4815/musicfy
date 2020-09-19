import React, { useState, useEffect } from "react";
import BannerHome from "../../components/BannerHome/BannerHome";
import firebase from "../../utils/firebase";
import "firebase/firestore";
import { map } from "lodash";
import BasicSliderItems from "../../components/Sliders/BasicSliderItems/BasicSliderItems";

import "./Home.scss";

const db = firebase.firestore(firebase);

export default function Home() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    db.collection("artists")
      .get()
      .then((response) => {
        const arrayArtists = [];
        map(response?.docs, (artist) => {
          const data = artist.data();
          data.id = artist.id;
          arrayArtists.push(data);
        });
        setArtists(arrayArtists);
      });
  }, []);

  return (
    <>
      <BannerHome />
      <div className="home">
        <BasicSliderItems
          title="Últimos artistas"
          data={artists}
          folderImage="artists"
          urlName="artist"
        />
        <h2>Más....</h2>
      </div>
    </>
  );
}
