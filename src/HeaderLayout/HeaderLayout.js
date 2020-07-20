import React from 'react';
import {MAFIA_STATES, useGlobalState} from '../App';
import { Image, Text } from '@fluentui/react';
import headerLogo from "../HeaderLogo.png"

function HeaderLayout() {
  const [state] = useGlobalState();
  const showDiv = state['mafiaScreen'] === MAFIA_STATES.GAME;
  const showRound = state['mafiaScreen'] === MAFIA_STATES.GAME;
  const divText = ""; // todo fill according to game state;
  const roundText = "Round 1"; // todo fill according to game state;
  return (
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <Image width={200} src={headerLogo} />
        { showDiv && <div style={{display: "flex", justifyContent: "center", borderRadius: "5px", padding: "13px 0px 0px 0px", margin: "15px 0px 0px 0px", height: "30px", width: "450px", color: "#000000", backgroundColor: "#EEDFAB"}}><b>{divText}</b></div>}
        { showRound && <Text style={{fontSize: "50px", color: "#E0E0E0", opacity: 0.4}}>{roundText}</Text>}
      </div>
  );
}

export default HeaderLayout;
