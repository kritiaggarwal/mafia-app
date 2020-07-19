import React from 'react';
import {MAFIA_STATES, useGlobalState} from './App';
import LoginLayout from "./LoginLayout/LoginLayout";
import LobbyLayout from "./LobbyLayout/LobbyLayout";
import GameLayout from "./GameLayout/GameLayout";
import HeaderLayout from "./HeaderLayout/HeaderLayout";

function renderView(mafiaScreen) {
  switch (mafiaScreen) {
    case MAFIA_STATES.LOGIN:
      return (<><HeaderLayout screen={MAFIA_STATES.LOGIN}/><LoginLayout /></>);
    case MAFIA_STATES.LOBBY:
      return (<><HeaderLayout screen={MAFIA_STATES.LOBBY}/><LobbyLayout /></>);
    case MAFIA_STATES.GAME:
      return (<><HeaderLayout screen={MAFIA_STATES.GAME}/><GameLayout /></>);
    default:
      return <div>tbd</div>;
  }
}
function AppRouter() {
  const [state] = useGlobalState();
  return (
      <div style={{display: "flex", flexDirection: "column"}}>
        {renderView(state['mafiaScreen'])}
      </div>
  );
}

export default AppRouter;
