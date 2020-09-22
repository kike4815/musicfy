import React from "react";
import { Table, Icon } from "semantic-ui-react";
import { map } from "lodash";

import "./ListSongs.scss";

export default function ListSongs(props) {
  const { songs, imageURL, playerSong } = props;

  return (
    <Table inverted className="list-songs">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Título</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(songs, (song) => (
          <Song
            key={song.id}
            song={song}
            imageURL={imageURL}
            playerSong={playerSong}
          />
        ))}
      </Table.Body>
    </Table>
  );
}

function Song(props) {
  const { song, imageURL, playerSong } = props;

  const onPlay = () => {
    playerSong(imageURL, song.name, song.fileName);
  };

  return (
    <Table.Row onClick={onPlay}>
      <Table.Cell collapsing>
        <Icon name="play circle outline" />
      </Table.Cell>
      <Table.Cell>{song.name}</Table.Cell>
    </Table.Row>
  );
}
