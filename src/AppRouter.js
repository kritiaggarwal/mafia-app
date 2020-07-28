import React from 'react';
import {MAFIA_STATES, useGlobalState} from './App';
import LoginLayout from "./LoginLayout/LoginLayout";
import LobbyLayout from "./LobbyLayout/LobbyLayout";
import GameLayout from "./GameLayout/GameLayout";
import HeaderLayout from "./HeaderLayout/HeaderLayout";
import FullScreenSpinner from "./FullScreenSpinner/FullScreenSpinner";

const playerNames = [
  {name: "Sharon", role: "Villager"},
  {name: "Kriti", role: "Villager"},
  {name: "Joyeeta", role: "Villager"},
  {name: "Vijitha", role: "Villager"},
  {name: "Devendra", role: "Villager"},
  {name: "Preet", role: "Mafia"},
  {name: "Vishal", role: "Mafia"}
];

//https://chat.whatsapp.com/jendlwndwjiehdjhjhfuwih
const confLink = ""

const currentPlayerRole = "Villager";      //Mafia or Villager

const roundNumber = 2;

const currentPlayerDead = false;

const gameState = "COMPLETED-MAFIA";          //STARTED, COMPLETED-VILLAGERS, COMPLETED-MAFIA

function AppRouter() {
  return (
      <div style={{display: "flex", flexDirection: "column"}}>
        {RenderView()}
      </div>
  );
}

function RenderView() {
  const [state, dispatch] = useGlobalState();

  // REALLY BAD WAY TO CODE - JUST DOING THINGS QUICKLY
  const onGameCreate = (name) => {
    dispatch({mafiaScreen: MAFIA_STATES.LOAD});
    // make network call to create game with name
    setTimeout(() => {dispatch({mafiaScreen: MAFIA_STATES.LOBBY})}, 500)
  }
  
  const onGameFetch = (name, code) => {
    dispatch({mafiaScreen: MAFIA_STATES.LOAD});
    // make network call to create game with name
    setTimeout(() => {dispatch({mafiaScreen: MAFIA_STATES.LOBBY})}, 500)
  }
  
  const onGameStart = (code) => {
    // make network call to start game given code
  }
  
  const killVillager = (userId, mafiaId) => {
    // make network call to kill villager
  }
  
  const vote = (userId, mafiaId) => {
    // make network call to vote out villager
  }

  const onLinkAdded = (link) => {
    // make network call to get the link
  }

  switch (state['mafiaScreen']) {
    case MAFIA_STATES.LOGIN:
      return (<><HeaderLayout screen={MAFIA_STATES.LOGIN}/><LoginLayout onGameCreate={onGameCreate} onGameFetch={onGameFetch}/></>);
    case MAFIA_STATES.LOBBY:
      return (<><HeaderLayout screen={MAFIA_STATES.LOBBY}/><LobbyLayout profiles={playerNames} link={confLink} /></>);
    case MAFIA_STATES.GAME:
      return (<>
                <HeaderLayout 
                screen={MAFIA_STATES.GAME} 
                link={confLink} 
                currentPlayerRole={currentPlayerRole} 
                roundNumber={roundNumber} 
                currentPlayerDead={currentPlayerDead}
                gameState={gameState}/>
                <GameLayout 
                currentPlayerRole={currentPlayerRole} 
                roundNumber={roundNumber} 
                currentPlayerDead={currentPlayerDead}
                gameState={gameState}/>
              </>);
    case MAFIA_STATES.LOAD:
        return (<><HeaderLayout screen={MAFIA_STATES.LOAD}/><FullScreenSpinner /></>);
    default:
      return <div>tbd</div>;
  }
}

export default AppRouter;
