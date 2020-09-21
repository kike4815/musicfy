import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../routes/Routes";
import MenuLeft from "../../components/MenuLeft/MenuLeft";
import firebase from "../../utils/firebase";
import "firebase/storage";
import TopBar from "../../components/TopBar";
import Player from "../../components/Player/Player";

import "./LoggedLayout.scss";

export default function LoggedLayout(props) {
  const { user, setReloadApp } = props;
  const [songData, setSongData] = useState(null);

  const playerSong = (albumImage, songName, songUrl) => {
    firebase
      .storage()
      .ref(`song/${songUrl}`)
      .getDownloadURL()
      .then((url) => {
        setSongData({ url: url, image: albumImage, name: songName });
      });
  };

  return (
    <Router>
      <Grid className="logged-layout">
        {/* en semantic ui se utiliza un grid de 16 columnas */}
        <Grid.Row>
          <Grid.Column width={3}>
            {" "}
            {/*panel lateral izquiero */}
            <MenuLeft user={user} />
          </Grid.Column>
          <Grid.Column className="content" width={13}>
            <TopBar user={user} />
            <Routes
              user={user}
              setReloadApp={setReloadApp}
              playerSong={playerSong}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Player songData={songData} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Router>
  );
}
