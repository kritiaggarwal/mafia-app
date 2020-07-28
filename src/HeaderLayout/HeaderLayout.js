import React from 'react';
import {MAFIA_STATES, useGlobalState} from '../App';
import { Image } from '@fluentui/react';
import headerLogo from "../HeaderLogo.png"
import { containerStyles, getMiddleDivStyles, getRightDivStyles, getConferenceLinkStyles } from "./HeaderLayoutStyles";

function HeaderLayout(props) {
  const [state] = useGlobalState();
  const showDiv = state['mafiaScreen'] === MAFIA_STATES.GAME;
  const showRound = state['mafiaScreen'] === MAFIA_STATES.GAME;
  const showLink = state['mafiaScreen'] === MAFIA_STATES.GAME;
  const divPart1 = (props.currentPlayerRole === "Mafia")? "You are part of the Mafia! ":"You are a Villager! ";
  const divPart2 = (props.currentPlayerDead)?"You are DEAD! ":((props.currentPlayerRole=="Mafia")?"Kill the Villagers!":"Find the Mafia!");
  const divText = divPart1 + divPart2; // todo fill according to game state;
  const roundText = props.gameState === "STARTED" ? `Round ${props.roundNumber}` : "Game Over"; // todo fill according to game state;  
  const color = props.currentPlayerDead ? "#8C8B85" : (props.currentPlayerRole==="Mafia" ? "#BA797D" : "#EEDFAB");
 
  return (
    <div>
      <div style={containerStyles()}>
        <Image width={200} src={headerLogo} />
        { showDiv && <div style={getMiddleDivStyles(color)}><b>{divText}</b></div>}
        { showRound && <div style={getRightDivStyles()}>{roundText}</div>}
      </div>
      {showLink && props.link && <div style={getConferenceLinkStyles()}>{props.link}</div>}  
    </div>
  );
}

export default HeaderLayout;
