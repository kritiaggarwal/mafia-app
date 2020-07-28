import React from 'react';
import PlayersList from "../PlayersList/PlayersList";
import ChatPane from "../ChatPane/ChatPane";
import { containerStyles } from "./GameLayoutStyles";

function GameLayout() {
  return (
      <div style={containerStyles()}>
        <PlayersList players = {
          [{name:"Suzie",role:"mafia",alive:"alive", vote:"1", playerId:"1"}, 
          {name:"Viji",role:"mafia",alive:"dead", vote:"2", playerId:"2"}, 
          {name:"Sharon",role:"villager",alive:"dead", vote:"1", playerId:"3"},
          {name:"Kriti",role:"villager",alive:"alive", vote:"0", playerId:"4"},
          {name:"Joyeeta",role:"villager",alive:"alive", vote:"2", playerId:"5"}, 
          {name:"Neeli",role:"mafia",alive:"dead", vote:"0", playerId:"6"}]
          } 
          roundState = "day" isPrimaryMafia = "true" currentPlayerName = "Suzie" isCurrentPlayerAlive = "true" />
        <div>Mafia is killing</div>
        <ChatPane />
      </div>
  );
}

export default GameLayout;
