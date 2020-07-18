import React from 'react';
import {MAFIA_STATES, useGlobalState} from './App';
import LoginLayout from "./LoginLayout/LoginLayout";
import LobbyLayout from "./LobbyLayout/LobbyLayout";
import GameLayout from "./GameLayout/GameLayout";

function renderView(mafiaScreen) {
  switch (mafiaScreen) {
    case MAFIA_STATES.LOGIN:
      return <LoginLayout />;
    case MAFIA_STATES.LOBBY:
      return <LobbyLayout />;
    case MAFIA_STATES.GAME:
      return <GameLayout />
    default:
      return <div>tbd</div>;
  }
}
function AppRouter() {
  const [state] = useGlobalState();
  return (
      <div>
        {renderView(state['mafiaScreen'])}
      </div>
  );
}

export default AppRouter;
