import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Grid, Progress, Image, Input, Icon } from "semantic-ui-react";
import "./Player.scss";

export default function Player(props) {
  const { songData } = props;
  //   const songData = {
  //     image:
  //       "https://firebasestorage.googleapis.com/v0/b/musicfy-e8e61.appspot.com/o/album%2F259b7153-5085-40ef-b363-7447c92ec72a?alt=media&token=76ae5c54-dd98-466d-b9fa-369e52310463",
  //     name: "conspiracy of one",
  //     url: "",
  //   };

  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [playing, seTplaying] = useState(false);
  const [volume, setVolume] = useState(0.3);

  const onStart = () => {
    seTplaying(true);
  };
  const onPause = () => {
    seTplaying(false);
  };

  const onProgress = (data) => {
    setPlayedSeconds(data.playedSeconds);
    setTotalSeconds(data.loadedSeconds);
  };

  return (
    <div className="player">
      <Grid>
        <Grid.Column width={4} className="left">
          <Image src={songData?.image} />
          {songData?.name}
        </Grid.Column>
        <Grid.Column width={8} className="center">
          <div className="controls">
            {playing ? (
              <Icon onClick={onPause} name="pause circle outline" />
            ) : (
              <Icon onClick={onStart} name="play circle outline" />
            )}
          </div>
          <Progress
            progress="value"
            value={playedSeconds}
            total={totalSeconds}
            size="tiny"
          />
        </Grid.Column>
        <Grid.Column width={4} className="right">
          <Input
            name="volume"
            value={volume}
            onChange={(e, data) => setVolume(Number(data.value))}
            type="range"
            label={<Icon name="volume up" />}
            min={0}
            max={1}
            step={0.01}
          />
        </Grid.Column>
      </Grid>
      <ReactPlayer
        className="react-player"
        url={songData?.url}
        playing={playing}
        height="0"
        width="0"
        volume={volume}
        onProgress={(e) => onProgress(e)}
      />
    </div>
  );
}
