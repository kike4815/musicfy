import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../utils/firebase";
import "firebase/firestore";
import BannerArtist from "../../components/BannerArtist/BannerArtist";
import { map } from "lodash";
import BasicSliderItems from "../../components/Sliders/BasicSliderItems";
import SongSlider from "../../components/Sliders/SongsSlider";
import "./Artist.scss";

const db = firebase.firestore(firebase);

function Artist(props) {
  const { match, playerSong } = props;
  const [artist, setArtist] = useState(null);
  const [album, setAlbum] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    db.collection("artists")
      .doc(match?.params?.id)
      .get()
      .then((response) => {
        const data = response.data();
        data.id = response.id;
        setArtist(data);
      });
  }, [match]);

  useEffect(() => {
    if (artist) {
      db.collection("album")
        .where("artist", "==", artist.id)
        .get()
        .then((response) => {
          const arrayAlbums = [];
          map(response?.docs, (album) => {
            const data = album.data();
            data.id = album.id;
            arrayAlbums.push(data);
          });
          setAlbum(arrayAlbums);
        });
    }
  }, [artist]);

  useEffect(() => {
    const arraySongs = [];
    (async () => {
      await Promise.all(
        map(album, async (albumTmp) => {
          await db
            .collection("songs")
            .where("album", "==", albumTmp.id)
            .get()
            .then((response) => {
              map(response?.docs, (song) => {
                const data = song.data();
                data.id = song.id;
                arraySongs.push(data);
              });
            });
        })
      );
      setSongs(arraySongs);
    })();
  }, [album]);

  return (
    <div className="artist">
      {artist && <BannerArtist artist={artist} />}
      <div className="artist__content">
        <BasicSliderItems
          title="Álbumes"
          data={album}
          folderImage="album"
          urlName="album"
        />
        <SongSlider title="Canciones" data={songs} playerSong={playerSong} />
      </div>
    </div>
  );
}
export default withRouter(Artist);
