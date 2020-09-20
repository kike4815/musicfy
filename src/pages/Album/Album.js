import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../utils/firebase";
import "firebase/firestore";
import "firebase/storage";
import { Loader } from "semantic-ui-react";

import "./Album.scss";

const db = firebase.firestore(firebase);

function Album(props) {
  const { match } = props;
  const [album, setAlbum] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    db.collection("album")
      .doc(match.params.id)
      .get()
      .then((response) => {
        setAlbum(response.data());
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

  if (!album || !artist) {
    return <Loader active>Cargando...</Loader>;
  }

  return (
    <div className="album">
      <div className="album__header">
        <HeaderAlbum album={album} artist={artist} imageURL={imageURL} />
      </div>
      <div className="album__songs">
        <p>lista de canciones....</p>
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
