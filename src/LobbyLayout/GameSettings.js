import React, { useState } from 'react';
import {MAFIA_STATES, useGlobalState} from '../App';
import { Button, TextField } from '@fluentui/react';
import { containerStyles, invitationCodeTextStyles, invitationCodeStyles, getTextStyles, getButtonStyles, waitingMsgTextStyles} from "./GameSettingsStyles";

function GameSettings() {
  const [state, dispatch] = useGlobalState();
  const [link, setLink] = useState("");
  const enoughPlayers = true; // todo read this from some global state post roster syncing
  const gameCode = "HDJF"; // todo read this from state
  const isOrganizer = false; // todo read this from some state - show text and not button
  return (
      <div style={containerStyles()}>
        <div style={invitationCodeTextStyles()}>Invite your friends with this code!</div> 
        <div style={invitationCodeStyles()}>{gameCode}</div>
        
        <div>
          {isOrganizer
            ? <div>
              <TextField readonly={!isOrganizer} styles={getTextStyles()} label="Enter conference link here (optional)" placeholder="Enter text here" onBlur={(data) => setLink(data.target.value)}/>
              <Button disabled={!enoughPlayers} text="Start Game" styles={getButtonStyles()}  onClick={() => dispatch({mafiaScreen: MAFIA_STATES.GAME})}/>
              </div>
            : <div style={waitingMsgTextStyles()}>Waiting for your organizer to start the game!</div>
          }
        </div>
      </div>
  );
}

export default GameSettings;
