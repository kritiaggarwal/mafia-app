import React from 'react';
import PlayersList from "../PlayersList/PlayersList";
import ChatPane from "../ChatPane/ChatPane";
import PlayersGrid from "../PlayersGrid/PlayersGrid";
import { containerStyles, getTextStyles } from "./GameLayoutStyles";

function GameLayout(props) {
  const roundState = "Night";                                 //day or night
  const primaryMafiaName="Joyeeta";                     
  const yourName="Joyeeta";
  const previousKillRole = "Mafia";                      //Villager of Mafia

  const Winners = [
    {name: "Preet", role: "Mafia"},
    {name: "Vishal", role: "Mafia"}
  ];
  
  //middle pane text for gameState = "STARTED"
  const text1 = roundState === "Night" 
  ? (props.roundNumber !== 1 && `You eliminated a ${previousKillRole}!`)  
  : "Mafia killed a Villager!";
  
  const text2 = props.currentPlayerDead 
  ? "Watch the game unfold silently!" 
  : (roundState === "Night" 
      ? (props.currentPlayerRole==="Villager"
          ? "Mafia is killing... while city sleeps!" 
          : ((primaryMafiaName===yourName) 
              ? "You are the primary mafia"
              : `${primaryMafiaName} is the primary mafia`))
      :  "Discuss and vote to eliminate someone from the city");

  const text3 = props.currentPlayerRole === "Mafia" && roundState === "Night" && !props.currentPlayerDead && (primaryMafiaName===yourName ? "Discuss with your teammates and choose a villager to kill" 
  : "Discuss with your fellow mafia and help the primary mafia choose a villager to kill");

  const text4 = props.gameState === "COMPLETED-MAFIA" ?  "More Mafia than villagers" : "All Mafia Killed!";

  const text5 = props.gameState === "COMPLETED-MAFIA" ? "Mafia WIN!" : "Villagers WIN!";
  
  return (
      <div style={containerStyles()}>
        <PlayersList />
        {props.gameState === "STARTED" 
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
        {props.gameState === "STARTED"
        ? <ChatPane />
        : <PlayersGrid players={Winners} />
        }
      </div>
  );
}

export default GameLayout;
