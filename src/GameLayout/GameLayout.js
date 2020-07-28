import React from 'react';
import PlayersList from "../PlayersList/PlayersList";
import ChatPane from "../ChatPane/ChatPane";
import { containerStyles } from "./GameLayoutStyles";

function GameLayout(props) {
  return (
      <div style={containerStyles()}>
        <PlayersList killVillager={props.killVillager} vote={props.vote} 
        players={props.players} roundState={props.roundState} 
        isPrimaryMafia={props.isPrimaryMafia} isCurrentPlayerAlive = {props.isCurrentPlayerAlive}/>
        <div>Mafia is killing</div>
        <ChatPane />
      </div>
  );
}

export default GameLayout;
