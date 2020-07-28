import React from 'react';
import PlayersList from "../PlayersList/PlayersList";
import ChatPane from "../ChatPane/ChatPane";
import PlayersGrid from "../PlayersGrid/PlayersGrid";
import { containerStyles, getTextStyles } from "./GameLayoutStyles";
import { ROLES, GAME_STATE, ROUND_STATE } from '../App';

function GameLayout(props) {
 
  const text1 = props.roundState === ROUND_STATE.NIGHT 
  ? (props.roundNumber !== 1 && `You eliminated a ${props.previousKillRole}!`)  
  : "Mafia killed a Villager!";
  
  const text2 = props.currentPlayerDead 
  ? "Watch the game unfold silently!" 
  : (props.roundState === ROUND_STATE.NIGHT
      ? (props.currentPlayerRole === ROLES.VILLAGER
          ? "Mafia is killing... while city sleeps!" 
          : ((props.primaryMafiaName===props.yourName) 
              ? "You are the primary mafia"
              : `${props.primaryMafiaName} is the primary mafia`))
      :  "Discuss and vote to eliminate someone from the city");

  const text3 = props.currentPlayerRole === ROLES.MAFIA && props.roundState === ROUND_STATE.NIGHT && !props.currentPlayerDead && (props.primaryMafiaName===props.yourName ? "Discuss with your teammates and choose a villager to kill" 
  : "Discuss with your fellow mafia and help the primary mafia choose a villager to kill");

  const text4 = props.gameState === GAME_STATE.COMPLETED_MAFIA ?  "More Mafia than villagers" : "All Mafia Killed!";

  const text5 = props.gameState === GAME_STATE.COMPLETED_MAFIA ? "Mafia WIN!" : "Villagers WIN!";
  
  return (
      <div style={containerStyles()}>
        <PlayersList killVillager={props.killVillager} vote={props.vote} 
        players={props.players} roundState={props.roundState} 
        isPrimaryMafia={props.isPrimaryMafia} isCurrentPlayerAlive = {!props.currentPlayerDead}/>
        {props.gameState === GAME_STATE.STARTED
        ? <div style = {getTextStyles()}>
            <p>{text1}</p>
            <p>{text2}</p>
            <p>{text3}</p>
          </div>
        : <div style = {getTextStyles()}>
            <p>{text4}</p>
            <p>{text5}</p>
          </div>
        }
        {props.gameState === GAME_STATE.STARTED
        ? <ChatPane />
        : <PlayersGrid players={props.winners} />
        }
      </div>
  );
}

export default GameLayout;
