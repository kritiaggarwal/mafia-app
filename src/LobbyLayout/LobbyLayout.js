import React from 'react';
import GameSettings from "./GameSettings";
import PlayersGrid from "../PlayersGrid/PlayersGrid";
import { containerStyles } from "./LobbyLayoutStyles";

function LobbyLayout() {
  return (
      <div style={containerStyles()}>
        <GameSettings />
        <PlayersGrid />
      </div>
  );
}

export default LobbyLayout;
