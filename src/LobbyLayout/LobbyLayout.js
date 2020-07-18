import React from 'react';
import {MAFIA_STATES, useGlobalState} from '../App';

function LobbyLayout() {
  const [state, dispatch] = useGlobalState();
  return (
      <div>
        LobbyLayout
        <button onClick={() => dispatch({mafiaScreen: MAFIA_STATES.GAME})}>Start Game</button>
      </div>
  );
}

export default LobbyLayout;
