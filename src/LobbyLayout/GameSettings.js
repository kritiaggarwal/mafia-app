import React from 'react';
import { Button, TextField } from '@fluentui/react';
import { containerStyles, invitationCodeTextStyles, invitationCodeStyles, getTextStyles, getButtonStyles, waitingMsgTextStyles, conferenceLinkTextStyles, conferenceLinkStyles} from "./GameSettingsStyles";

function GameSettings(props) {
  const enoughPlayers = props.noOfPlayers > 6; // todo read this from some global state post roster syncing
  const topMargin = props.link ? "140px":"270px";
  return (
      <div style={containerStyles()}>
        <div style={invitationCodeTextStyles()}>Invite your friends with this code!</div> 
        <div style={invitationCodeStyles()}>{props.gameCode}</div>
          {props.isOrganizer
            ? <div>
                <TextField readonly={!props.isOrganizer} styles={getTextStyles()} label="Enter conference link here (optional)" placeholder="Enter text here" onBlur={props.onLinkAdded}/>
                <Button disabled={!enoughPlayers} text="Start Game" styles={getButtonStyles()}  onClick={props.onGameStart}/>
              </div>
            : <div>
               {props.link 
                  &&<div>
                      <div style={conferenceLinkTextStyles()}>Conference Link</div>
                      <div style={conferenceLinkStyles()}>{props.link}</div>
                    </div>
                }
              <div style={waitingMsgTextStyles(topMargin)}>Waiting for your organizer to start the game!</div>
              </div>
          }
      </div>
  );
}

export default GameSettings;
