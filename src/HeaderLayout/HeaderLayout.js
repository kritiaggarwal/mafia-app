import React from 'react';
import {MAFIA_STATES, useGlobalState} from '../App';
import { Image, Text } from '@fluentui/react';
import headerLogo from "../HeaderLogo.png"
import { containerStyles, getMiddleDivStyles, getRightDivStyles, getConferenceLinkStyles,subContainerStyles } from "./HeaderLayoutStyles";

function HeaderLayout(props) {
  const [state] = useGlobalState();
  const showDiv = state['mafiaScreen'] === MAFIA_STATES.GAME;
  const showRound = state['mafiaScreen'] === MAFIA_STATES.GAME;
  const showLink = state['mafiaScreen'] === MAFIA_STATES.GAME;
  const currentPlayerRole = "Mafia";
  const currentPlayerDead = false;
  const divPart1 = (currentPlayerRole == "Mafia")? "You are part of the Mafia! ":"You are a Villager! ";
  const divPart2 = (currentPlayerDead)?"You are DEAD! ":((currentPlayerRole=="Mafia")?"Kill the Villagers!":"Find the Mafia");
  const divText = divPart1 + divPart2; // todo fill according to game state;
  const roundText = "Round 1"; // todo fill according to game state;
  
  return (
      <div style={containerStyles()}>
        <Image width={200} src={headerLogo} />
        { showDiv && 
          <div style={subContainerStyles()}>
            <div style={getMiddleDivStyles()}><b>{divText}</b></div>
            { showLink && props.link && <div style={getConferenceLinkStyles()}>{props.link}</div>}  
          </div>}
        { showRound && <Text style={getRightDivStyles()}>{roundText}</Text>}
      </div>
  );
}

export default HeaderLayout;
