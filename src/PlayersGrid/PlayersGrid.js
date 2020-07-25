import React from 'react';
import { containerStyles , playerContainerStyles, avatarStyles} from "./PlayersGridStyles";

const playerNames = [
  {name: "Sharon"},
  {name: "Kriti"},
  {name: "Joyeeta"},
  {name: "Vijitha"},
  {name: "Devendra"},
  {name: "Preet"},
  {name: "Vishal"}
];

function PlayersGrid() {
  const profiles = playerNames;
  return (
    <div style={containerStyles()}>
      <div>Players</div>
      <div>{profiles.map(profile => <Player {...profile} />)}</div>
    </div>
  );
}

function Player(props) {
  return (
    <div style={playerContainerStyles()}>
      <img src={`https://api.adorable.io/avatars/156/${props.name}.png`} style={avatarStyles()} />
      <div>{props.name}</div>
    </div>
  );
}


export default PlayersGrid;
