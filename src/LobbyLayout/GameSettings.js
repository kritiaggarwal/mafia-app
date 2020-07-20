import React from 'react';
import {MAFIA_STATES, useGlobalState} from '../App';
import { Button, TextField } from '@fluentui/react';

const getButtonStyles = (() => ({
  root: {
    backgroundColor: "#45802A",
    border: 0,
    width: 300,
    color: "#E0E0E0"
  },
  rootHovered: {
    backgroundColor: "#679552",
    border: 0,
    color: "#E0E0E0"
  }
}));

const getTextStyles = (() => ({
  wrapper: {
    margin: "0px 0px 60px 0px"
  },
  subComponentStyles: {
    label: {
      root: {
        color: '#EOEOEO',
        margin: "0px 0px 10px 0px"
      }
    }
  }
}));

function GameSettings() {
  const [state, dispatch] = useGlobalState();
  const enoughPlayers = true; // todo read this from some global state post roster syncing
  const gameCode = "HDJF"; // todo read this from state
  const isOrganizer = true; // todo read this from some state
  return (
      <div style={{padding: "30px 0px 0px 0px", minHeight: "65vh", textAlign: "center", justifyContent: "space-between"}}>
        <div style={{margin: "0px 0px 10px 0px"}}>Invite your friends with this code!</div> 
        <div style={{margin: "0px 0px 60px 0px", fontSize: "80px", height: "90px", width: "300px", color: "#000000", backgroundColor: "#97B788", textAlign: "center"}}>{gameCode}</div>
        <TextField readonly={!isOrganizer} styles={getTextStyles()} label="Enter conference link here (optional)" placeholder="Enter text here"/>
        <Button disabled={!enoughPlayers} text="Start Game" styles={getButtonStyles()}  onClick={() => dispatch({mafiaScreen: MAFIA_STATES.GAME})}/>
      </div>
  );
}

export default GameSettings;
