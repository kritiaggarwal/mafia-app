import React from 'react';
import GameSettings from "./GameSettings";
import PlayersGrid from "../PlayersGrid/PlayersGrid";

function LobbyLayout() {
  return (
      <div style={{minHeight: "65vh", minWidth: "100vw", display: "flex", justifyContent: "space-around", padding: "50px 0px 0px 0px"}}>
        <GameSettings />
        <PlayersGrid />
      </div>
  );
}

export default LobbyLayout;
