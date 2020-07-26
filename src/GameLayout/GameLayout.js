import React from 'react';
import PlayersList from "../PlayersList/PlayersList";
import ChatPane from "../ChatPane/ChatPane";
import { containerStyles } from "./GameLayoutStyles";

function GameLayout(props) {
  return (
      <div style={containerStyles()}>
        <PlayersList />
        <div>Mafia is killing</div>
        <ChatPane />
      </div>
  );
}

export default GameLayout;
