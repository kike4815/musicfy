import React, { useEffect, useState } from "react";
import firebase from "../../utils/firebase";
import "firebase/firestore";
import "firebase/storage";
import { map } from "lodash";
import { Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./Albums.scss";

const db = firebase.firestore(firebase);

export default function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    db.collection("album")
      .get()
      .then((response) => {
        const arrayAlbums = [];
        map(response?.docs, (album) => {
          const data = album.data();
          data.id = album.id;
          arrayAlbums.push(data);
        });
        setAlbums(arrayAlbums);
      });
  }, []);

  return (
    <div className="albums">
      <h1>Álbumes</h1>
      <Grid>
        {map(albums, (album) => (
          <Grid.Column key={album.id} mobile={8} tablet={4} computer={3}>
            <Album album={album} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
}

function Album(props) {
  const [imageURL, setimageURL] = useState(null);
  const { album } = props;

  useEffect(() => {
    firebase
      .storage()
      .ref(`album/${album.banner}`)
      .getDownloadURL()
      .then((url) => {
        setimageURL(url);
      });
  }, [album]);

  return (
    <Link to={`album/${album.id}`}>
      <div className="albums__item">
        <div
          className="avatar"
          style={{ backgroundImage: `url('${imageURL}')` }}
        />
        <h3>{album.name}</h3>
      </div>
    </Link>
  );
}
