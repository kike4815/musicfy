import React, { useState, useEffect } from "react";
import BannerHome from "../../components/BannerHome/BannerHome";
import firebase from "../../utils/firebase";
import "firebase/firestore";
import { map } from "lodash";
import BasicSliderItems from "../../components/Sliders/BasicSliderItems/BasicSliderItems";
import SongsSlider from "../../components/Sliders/SongsSlider";
import "./Home.scss";

const db = firebase.firestore(firebase);
export default function Home() {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

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

  useEffect(() => {
    db.collection("album")
      .get()
      .then((response) => {
        const albumArray = [];
        map(response?.docs, (album) => {
          const data = album.data();
          data.id = album.id;
          albumArray.push(data);
        });
        setAlbums(albumArray);
      });
  }, []);

  useEffect(() => {
    db.collection("songs")
      .limit(10)
      .get()
      .then((response) => {
        const arraySongs = [];
        map(response?.docs, (song) => {
          const data = song.data();
          data.id = song.id;
          arraySongs.push(data);
        });
        setSongs(arraySongs);
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
        <BasicSliderItems
          title="Últimos albums"
          data={albums}
          folderImage="album"
          urlName="album"
        />
        <SongsSlider title="Últimas canciones" data={songs} />
      </div>
    </>
  );
}
