import React from 'react';
import {MAFIA_STATES, useGlobalState} from './App';
import LoginLayout from "./LoginLayout/LoginLayout";
import LobbyLayout from "./LobbyLayout/LobbyLayout";
import GameLayout from "./GameLayout/GameLayout";
import HeaderLayout from "./HeaderLayout/HeaderLayout";
import FullScreenSpinner from "./FullScreenSpinner/FullScreenSpinner";

const playerNames = [
  {name: "Sharon", id: 1, role: "Villager", isAlive: false, vote: 1},
  {name: "Kriti", id: 2, role: "Villager", isAlive: false, vote: 2},
  {name: "Joyeeta", id: 3, role: "Villager", isAlive: false, vote: 0},
  {name: "Vijitha", id: 4, role: "Villager", isAlive: false, vote: 2},
  {name: "Devendra", id: 5, role: "Villager", isAlive: false, vote: 1},
  {name: "Preet", id: 6, role: "Mafia", isAlive: false, vote: 1},
  {name: "Vishal", id: 7, role: "Mafia", isAlive: false, vote: 0}
];

const Winners = [
  {name: "Sharon", id: 1, role: "Villager", isAlive: false, vote: 1},
  {name: "Kriti", id: 1, role: "Villager", isAlive: false, vote: 2},
  {name: "Joyeeta", id: 1, role: "Villager", isAlive: false, vote: 0},
  {name: "Vijitha", id: 1, role: "Villager", isAlive: false, vote: 2},
  {name: "Devendra", id: 1, role: "Villager", isAlive: false, vote: 1},
];

//https://chat.whatsapp.com/jendlwndwjiehdjhjhfuwih
const confLink = "https://chat.whatsapp.com/jendlwndwjiehdjhjhfuwih"

const currentPlayerRole = "Mafia";      //Mafia or Villager

const roundNumber = 2;

const currentPlayerDead = false;

const gameState = "COMPLETED-VILLAGERS";          //STARTED, COMPLETED-VILLAGERS, COMPLETED-MAFIA

const roundState = "Night";                                 //day or night

const previousKillRole = "Mafia";                      //Villager of Mafia

const primaryMafiaName="Kriti";                     
const yourName="Joyeeta";

const gameCode = "HDJF"; // todo read this from state
const isOrganizer = true; // todo read this from some state - show text and not button

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
    dispatch({mafiaScreen: MAFIA_STATES.GAME});
    // make network call to start game given code
  }
  
  const killVillager = (userId) => {
    // make network call to kill villager
  }
  
  const vote = (userId) => {
    // make network call to vote out villager
  }

  const onLinkAdded = (link) => {
    // make network call to get the link
  }

  switch (state['mafiaScreen']) {
    case MAFIA_STATES.LOGIN:
      return (<><HeaderLayout screen={MAFIA_STATES.LOGIN}/><LoginLayout onGameCreate={onGameCreate} onGameFetch={onGameFetch}/></>);
    case MAFIA_STATES.LOBBY:
      return (<><HeaderLayout screen={MAFIA_STATES.LOBBY}/>
                <LobbyLayout profiles={playerNames} 
                link={confLink} 
                onGameStart={onGameStart} 
                onLinkAdded={onLinkAdded}
                gameCode={gameCode}
                isOrganizer={isOrganizer}/></>);
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
                gameState={gameState}
                roundState={roundState}
                previousKillRole={previousKillRole}
                primaryMafiaName={primaryMafiaName}
                yourName={yourName}
                winners={Winners}
                killVillager={killVillager} 
                vote={vote} 
                players = {
                  [{name:"Suzie",role:"Mafia",isAlive:true, vote:1, id:1}, 
                  {name:"Viji",role:"Mafia",isAlive:false, vote:2, id:2}, 
                  {name:"Sharon",role:"Villager",isAlive:false, vote:1, id:3},
                  {name:"Kriti",role:"Villager",isAlive:true, vote:0, id:4},
                  {name:"Joyeeta",role:"Villager",isAlive:true, vote:2, id:5}, 
                  {name:"Neeli",role:"Mafia",isAlive:false, vote:0, id:6}]
                  } 
                roundState = "day" 
                isPrimaryMafia = {true} 
                isCurrentPlayerAlive = {true}
                />
              </>);
    case MAFIA_STATES.LOAD:
        return (<><HeaderLayout screen={MAFIA_STATES.LOAD}/><FullScreenSpinner /></>);
    default:
      return <div>tbd</div>;
  }
}

export default AppRouter;
