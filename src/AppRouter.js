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

const gameState = "STARTED";          //STARTED, COMPLETED-VILLAGERS, COMPLETED-MAFIA

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
    // state['connection'].invoke("createGame", name);
    
    let sampleDataObject = {
      isPlayerOrganizer: true, // set off
      currentPlayerName: name,
    };

    // todo only dispatch data
    setTimeout(() => {dispatch({mafiaScreen: MAFIA_STATES.LOBBY, data: sampleDataObject})}, 500)
  }
  
  const onGameFetch = (name, code) => {
    dispatch({mafiaScreen: MAFIA_STATES.LOAD});
    // state['connection'].invoke("joinGame", name, code);

    let sampleDataObject = {
      code: code, // set  off
      currentPlayerName: name,
      isPlayerOrganizer: false, // set off
      members: [{name: "Vishal", id: 1, role: "Mafia"}, {name: "Sharon", id: 2, role: "Villager"}, {name: "Kriti", id: 3, role: "Mafia"}] // get rid of this
    }

    // todo only dispatch data
    setTimeout(() => {dispatch({mafiaScreen: MAFIA_STATES.LOBBY, data: sampleDataObject})}, 500)
  }

  if (state['connection']) {
    state['connection'].on("onGameChanged", data => {
      let oldMembersObject = state.data.members;
      let roundInformation = {num: 1, state: "Day", votes: {"Sharon": "Vishal", "Kriti": "Vishal", "Vishal": "Devendra", "Devendra": "Vishal"}}; // read from API
      let members = [{name: "Vishal", id: 1, role: "Mafia", isAlive: false}, {name: "Sharon", id: 2, role: "Villager"}, {name: "Kriti", id: 3, role: "Mafia"}] // read from API
      let gameState = "Waiting"; // read from API
      let code = "ABCD"; // read from API
      let conferenceLink = "conferenceLink" // read from API

      let sampleDataObject = {
        gameState,
        roundNumber: roundInformation.num,
        roundState: roundInformation.state,
        isPlayerOrganizer: state.data.isPlayerOrganizer,
        code, 
        conferenceLink
      }

      // WHOM - EVERYONE
      // WHEN - ALWAYS
      // figure which screen to navigate to
      let screen = figureWhichScreen(sampleDataObject.gameState);
      // figure current player name, role, status
      let currentPlayerDetails = figureCurrentPlayerDetails(sampleDataObject.members, sampleDataObject.currentPlayerName);
      sampleDataObject = {...sampleDataObject, ...currentPlayerDetails};

      if (sampleDataObject.gameState === "Game") {
        // WHOM - EVERYONE
        // WHEN - AFTER DAY VOTING
        // figure previous kill role
        if (roundInformation.num !== 1 && roundInformation.state === "Night") {
          sampleDataObject = {...sampleDataObject, previousKillRole: figurePreviousKillRole(members, oldMembersObject)};
        }

        // WHOM - MAFIA
        // WHEN - AT NIGHT
        if (currentPlayerDetails.currentPlayerRole === "Mafia" && roundInformation.state === "Night") {
          // figure primary mafia details
          let primaryMafiaName = figurePrimaryMafia(members);
          let isPrimaryMafia = primaryMafiaName === sampleDataObject.currentPlayerName;
          sampleDataObject = {...sampleDataObject, isPrimaryMafia, primaryMafiaName};
        }

        // WHOM - EVERYONE
        // WHEN - DURING DAY
        // figure voting information
        if (roundInformation.state === "Day") {
          members = figureVotes(roundInformation.votes, members);
        }
        sampleDataObject = {
          ...sampleDataObject,
          ...members,
        }
      } else if (sampleDataObject.gameState === "COMPLETED-MAFIA") {
        // WHOM - EVERYONE
        // WHEN - GAME OVER
        sampleDataObject = {
          ...sampleDataObject,
          winners: getAllByRole(members, "Mafia")
        }
      } else if (sampleDataObject.gameState === "COMPLETED-VILLAGERS") {
        // WHOM - EVERYONE
        // WHEN - GAME OVER
        sampleDataObject = {
          ...sampleDataObject,
          winners: getAllByRole(members, "Villagers")
        }
      }

      dispatch({mafiaScreen: screen, data: sampleDataObject});
    });
  }
  
  const onLinkAdded = () => {
    // state['connection'].invoke("linkAdded", state.code, link);
  }

  const onGameStart = () => {
    dispatch({mafiaScreen: MAFIA_STATES.GAME});
    // state['connection'].invoke("startGame", state.code);
  }
  
  const killVillager = (nameOfVillagerToBeKilled) => {
    // state['connection'].invoke("killVillager", state.code, state.currentPlayerName, nameOfVillagerToBeKilled);
  }
  
  const voteVillager = (nameOfVotedVillager) => {
    // state['connection'].invoke("killVillager", state.code, state.currentPlayerName, state.roundNumber, nameOfVotedVillager);
  }

  const sendMessage = (message) => {
    // state['mafia-connection'].invoke("sendMessage", message);
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
                />
              </>);
    case MAFIA_STATES.LOAD:
        return (<><HeaderLayout screen={MAFIA_STATES.LOAD}/><FullScreenSpinner /></>);
    default:
      return <div>tbd</div>;
  }
}

function getAllByRole(members, role) {
  return members.filter((member) => member.role === role);
}

function figureVotes(votes, members) {
  // "voter": "votee"
  let voteCountMap = {};
  for (var voter in votes) {
    let votee = votes[voter];
    voteCountMap[votee] = (voteCountMap[votee] | 0) + 1;
  }

  members.forEach(member => {
    member.vote = voteCountMap[member.name] | 0;
  })
  return members;
}

function figurePreviousKillRole(newMembersList, oldMembersList) {
  // one really shit O(n2) approach
  newMembersList.forEach(newMember => {
    oldMembersList.forEach(oldMember => {
      if (oldMember.id === newMember.id && oldMember.isAlive && !newMember.isAlive) {
        return newMember.role;
      }
    })
  });
}

function figurePrimaryMafia(members) {
  var primaryMafia = members.find(function(member) {
    if(member.isPrimaryMafia)
      return true;
  });
  return primaryMafia.name;
}

function figureCurrentPlayerDetails(members, nameToFind) {
  var currentPlayer = members.find(function(member) {
    if(member.name === nameToFind)
      return true;
  });
  return {
    currentPlayerRole: currentPlayer.role,
    currentPlayerDead: !currentPlayer.isAlive,
    currentPlayerName: currentPlayer.name,
    isPrimaryMafia: currentPlayer.isPrimaryMafia
  }
}

function figureWhichScreen(state) {
  let screen = MAFIA_STATES.LOBBY;
  switch(state) {
    case "Waiting":
      screen = MAFIA_STATES.LOBBY;
      break;
    case "Started":
    case "Completed-Mafia":
    case "Completed-Mafia":
      screen = MAFIA_STATES.GAME;
  }
  return screen;
}

export default AppRouter;