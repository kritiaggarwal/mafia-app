import React from 'react';
import PlayersList from "../PlayersList/PlayersList";
import ChatPane from "../ChatPane/ChatPane";
import { containerStyles } from "./GameLayoutStyles";

function GameLayout() {
  return (
      <div style={containerStyles()}>
        <PlayersList players = {
          [{name:"Suzie",role:"mafia",alive:"alive", vote:"1"}, 
          {name:"Viji",role:"mafia",alive:"dead", vote:"2"}, 
          {name:"Sharon",role:"villager",alive:"dead", vote:"1"},
          {name:"Kriti",role:"villager",alive:"alive", vote:"0"},
          {name:"Joyeeta",role:"villager",alive:"alive", vote:"2"}, 
          {name:"Neeli",role:"mafia",alive:"dead", vote:"0"}]
          } 
          roundState = "day" isPrimaryMafia = "true" currentPlayerName = "Suzie" />
        <div>Mafia is killing</div>
        <ChatPane />
      </div>
  );
}

export default GameLayout;
