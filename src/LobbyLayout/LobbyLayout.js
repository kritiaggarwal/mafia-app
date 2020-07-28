import React from 'react';
import GameSettings from "./GameSettings";
import PlayersGrid from "../PlayersGrid/PlayersGrid";
import { containerStyles } from "./LobbyLayoutStyles";

function LobbyLayout(props) {
  return (
      <div style={containerStyles()}>
        <GameSettings 
        link = {props.link} 
        noOfPlayers={props.profiles.length} 
        onGameStart = {props.onGameStart} 
        onLinkAdded = {props.onLinkAdded}
        gameCode={props.gameCode}
        isOrganizer={props.isOrganizer}/>
        <PlayersGrid players = {props.profiles} />
      </div>
  );
}

export default LobbyLayout;
