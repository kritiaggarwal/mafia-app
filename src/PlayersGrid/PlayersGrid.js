import React from 'react';
import { Image } from '@fluentui/react';
import { containerStyles , playerContainerStyles, avatarStyles} from "./PlayersGridStyles";


function PlayersGrid(props) {
  return (
    <div style={containerStyles()}>
      <div>Players</div>
      <div>{props.players.map(profile => <Player key={profile.id} {...profile} />)}</div>
    </div>
  );
}

function Player(props) {
  return (
    <div style={playerContainerStyles()}>
      <Image src={`https://api.adorable.io/avatars/156/${props.name}.png`} style={avatarStyles()} />
      <div>{props.name}</div>
    </div>
  );
}


export default PlayersGrid;
