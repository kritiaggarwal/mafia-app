import React from 'react';
import {MAFIA_STATES, useGlobalState} from '../App';
import { Button, TextField } from '@fluentui/react';
import { containerStyles, invitationCodeTextStyles, invitationCodeStyles, getTextStyles, getButtonStyles } from "./GameSettingsStyles";

function GameSettings() {
  const [state, dispatch] = useGlobalState();
  const enoughPlayers = true; // todo read this from some global state post roster syncing
  const gameCode = "HDJF"; // todo read this from state
  const isOrganizer = true; // todo read this from some state - show text and not button
  return (
      <div style={containerStyles()}>
        <div style={invitationCodeTextStyles()}>Invite your friends with this code!</div> 
        <div style={invitationCodeStyles()}>{gameCode}</div>
        <TextField readonly={!isOrganizer} styles={getTextStyles()} label="Enter conference link here (optional)" placeholder="Enter text here"/>
        <Button disabled={!enoughPlayers} text="Start Game" styles={getButtonStyles()}  onClick={() => dispatch({mafiaScreen: MAFIA_STATES.GAME})}/>
      </div>
  );
}

export default GameSettings;
