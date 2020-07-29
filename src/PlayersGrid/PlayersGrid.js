import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Image } from '@fluentui/react';
import { containerStyles , playerContainerStyles, avatarStyles, getPlayerProfileStyles, getTextStyles, playerNameTextStyles, enoughPlayersTextStyles} from "./PlayersGridStyles";
import {MAFIA_STATES, useGlobalState} from '../App';

function PlayersGrid(props) {
  const [state] = useGlobalState();
  const gameScreen = state.mafiaScreen === MAFIA_STATES.GAME;
  const headerText = gameScreen ? "Winners!":"Players";
  const width = gameScreen ? "400px":"800px";
  const gridStyle = gameScreen ? "auto auto": "auto auto auto";
  return (
    <PerfectScrollbar style = {containerStyles(width)}>
          <div style = {getTextStyles()}>{headerText}</div>
          {(props.players.length<7) && !gameScreen && <div style={enoughPlayersTextStyles()}> Need at least 7 players to play!</div>}
          <div style={playerContainerStyles(gridStyle)}>{props.players.map(profile => <Player key={profile.id} {...profile} />)}</div>
    </PerfectScrollbar>
    
  );
}

function Player(props) {
  return (
    <div style={getPlayerProfileStyles()}>
        <Image src={`https://api.adorable.io/avatars/156/${props.name}.png`} style={avatarStyles()} />
        <div style={playerNameTextStyles()}>{props.name}</div>
    </div>
  );
}


export default PlayersGrid;
