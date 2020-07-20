import React from 'react';
import PlayersList from "../PlayersList/PlayersList";
import ChatPane from "../ChatPane/ChatPane";

function GameLayout() {
  return (
      <div style={{minHeight: "65vh", minWidth: "100vw", display: "flex", justifyContent: "space-around", padding: "50px 0px 0px 0px"}}>
        <PlayersList />
        <div>Mafia is killing</div>
        <ChatPane />
      </div>
  );
}

export default GameLayout;
