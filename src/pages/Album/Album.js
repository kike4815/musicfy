import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../utils/firebase";
import "firebase/firestore";
import "firebase/storage";
import { Loader } from "semantic-ui-react";
import { map } from "lodash";
import ListSongs from "../../components/ListSongs/ListSongs";

import "./Album.scss";

const db = firebase.firestore(firebase);

function Album(props) {
  const { match, playerSong } = props;
  const [album, setAlbum] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    db.collection("album")
      .doc(match.params.id)
      .get()
      .then((response) => {
        const data = response.data();
        data.id = response.id;
        setAlbum(data);
      });
  }, [match]);

  useEffect(() => {
    if (album) {
      firebase
        .storage()
        .ref(`/album/${album?.banner}`)
        .getDownloadURL()
        .then((url) => {
          setImageURL(url);
        });
    }
  }, [album]);

  useEffect(() => {
    if (album) {
      db.collection("artists")
        .doc(album?.artist)
        .get()
        .then((response) => setArtist(response.data()));
    }
  }, [album]);

  useEffect(() => {
    if (album) {
      db.collection("songs")
        .where("album", "==", album.id)
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
    }
  }, [album]);

  if (!album || !artist) {
    return <Loader active>Cargando...</Loader>;
  }

  return (
    <div className="album">
      <div className="album__header">
        <HeaderAlbum album={album} artist={artist} imageURL={imageURL} />
      </div>
      <div className="album__songs">
        <ListSongs songs={songs} imageURL={imageURL} playerSong={playerSong} />
      </div>
    </div>
  );
}
export default withRouter(Album);

function HeaderAlbum(props) {
  const { album, artist, imageURL } = props;
  return (
    <>
      <div
        className="image"
        style={{ backgroundImage: `url('${imageURL}')` }}
      />
      <div className="info">
        <h1>{album.name}</h1>
        <p>
          De <span>{artist.name}</span>
        </p>
      </div>
    </>
  );
}
