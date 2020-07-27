import React from 'react';
import PlayersList from "../PlayersList/PlayersList";
import ChatPane from "../ChatPane/ChatPane";
import { containerStyles } from "./GameLayoutStyles";

function GameLayout() {
  return (
      <div style={containerStyles()}>
        <PlayersList players = {[{name:"suzie",role:"mafia",alive:"dead", vote:"5"}, {name:"suzie2",role:"villager",alive:"alive", vote:"89"}]} roundState = "Day" isPrimaryMafia = "true" currentPlayerName = "suzie" />
        <div>Mafia is killing</div>
        <ChatPane />
      </div>
  );
}

export default GameLayout;
