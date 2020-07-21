import React from 'react';
import {MAFIA_STATES, useGlobalState} from '../App';
import { Image, Text } from '@fluentui/react';
import headerLogo from "../HeaderLogo.png"
import { containerStyles, getMiddleDivStyles, getRightDivStyles } from "./HeaderLayoutStyles";

function HeaderLayout() {
  const [state] = useGlobalState();
  const showDiv = state['mafiaScreen'] === MAFIA_STATES.GAME;
  const showRound = state['mafiaScreen'] === MAFIA_STATES.GAME;
  const divText = ""; // todo fill according to game state;
  const roundText = "Round 1"; // todo fill according to game state;
  return (
      <div style={containerStyles()}>
        <Image width={200} src={headerLogo} />
        { showDiv && <div style={getMiddleDivStyles()}><b>{divText}</b></div>}
        { showRound && <Text style={getRightDivStyles()}>{roundText}</Text>}
      </div>
  );
}

export default HeaderLayout;
