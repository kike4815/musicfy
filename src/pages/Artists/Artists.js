import React, { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import "firebase/firestore";
import { map } from "lodash";
import { Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./Artists.scss";

const db = firebase.firestore(firebase);

export default function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    db.collection("artists")
      .get()
      .then((response) => {
        const arrayArtists = [];
        map(response?.docs, (artistArray) => {
          const data = artistArray.data();
          data.id = artistArray.id;
          arrayArtists.push(data);
        });
        setArtists(arrayArtists);
      });
  }, []);

  return (
    <div className="artists">
      <h1>Artistas</h1>
      <Grid>
        {map(artists, (artist) => (
          <Grid.Column key={artist.id} mobile={8} tablet={4} computer={3}>
            <RenderArtist artist={artist} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
}

function RenderArtist(props) {
  const { artist } = props;
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    firebase
      .storage()
      .ref(`artists/${artist.banner}`)
      .getDownloadURL()
      .then((url) => {
        setBanner(url);
      });
  }, [artist]);

  return (
    <Link to={`artist/${artist.id}`}>
      <div className="artists__item">
        <div
          className="avatar"
          style={{ backgroundImage: `url('${banner}')` }}
        />
        <h3>{artist.name}</h3>
      </div>
    </Link>
  );
}
