import React from 'react';
import {MAFIA_STATES, useGlobalState} from '../App';

function LobbyLayout() {
  const [state, dispatch] = useGlobalState();
  return (
      <div style={{minHeight: "65vh", minWidth: "100vw", display: "flex", justifyContent: "center", padding: "150px 0px 0px 0px"}}>
        <button width={"200px"} onClick={() => dispatch({mafiaScreen: MAFIA_STATES.GAME})}>Start Game</button>
      </div>
  );
}

export default LobbyLayout;
