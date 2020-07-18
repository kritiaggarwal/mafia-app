import React from 'react';
import {MAFIA_STATES, useGlobalState} from '../App';
function LoginLayout() {
  const [state, dispatch] = useGlobalState();
  return (
      <div>
        LoginLayout
        <button onClick={() => dispatch({mafiaScreen: MAFIA_STATES.LOBBY})}>Create Game</button>
      </div>
  );
}

export default LoginLayout;
