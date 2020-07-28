import React from 'react';
import {MAFIA_STATES, ROLES, useGlobalState, GAME_STATE, ROUND_STATE} from './App';
import LoginLayout from "./LoginLayout/LoginLayout";
import LobbyLayout from "./LobbyLayout/LobbyLayout";
import GameLayout from "./GameLayout/GameLayout";
import HeaderLayout from "./HeaderLayout/HeaderLayout";
import FullScreenSpinner from "./FullScreenSpinner/FullScreenSpinner";


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
    
  const handleOnGameChanged = (data) => {
    let oldMembersObject = state.data ? state.data.members : [];
      let roundInformation = {num: 1, state: "Day", votes: {"Sharon": "Vishal", "Kriti": "Vishal", "Vishal": "Devendra", "Devendra": "Vishal"}}; // read from API
    let members = [{name: "Vishal", id: 1, role: ROLES.MAFIA, isAlive: true, isPrimaryMafia: false}, {name: "Devendra", id: 4, role: ROLES.VILLAGER, isAlive: true, isPrimaryMafia: false}, {name: "Mitin", id: 5, role: ROLES.VILLAGER, isAlive: true, isPrimaryMafia: false}, {name: "Vijitha", id: 6, role: ROLES.VILLAGER, isAlive: true, isPrimaryMafia: false}, {name: "Joyeeta", id: 7, role: ROLES.VILLAGER, isAlive: true, isPrimaryMafia: false}, {name: "Sharon", id: 2, role: ROLES.MAFIA, isAlive: true, isPrimaryMafia: true}, {name: "Kriti", id: 3, role: ROLES.MAFIA, isAlive: true, isPrimaryMafia: false}] // read from API
    let gameState = GAME_STATE.COMPLETED_MAFIA; // read from API
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
    let currentPlayerDetails = figureCurrentPlayerDetails(members, sampleDataObject.currentPlayerName);
      sampleDataObject = {...sampleDataObject, ...currentPlayerDetails};

    if (sampleDataObject.gameState === GAME_STATE.STARTED) {
        // WHOM - EVERYONE
        // WHEN - AFTER DAY VOTING
        // figure previous kill role
      if (roundInformation.num !== 1 && roundInformation.state === ROUND_STATE.NIGHT) {
          sampleDataObject = {...sampleDataObject, previousKillRole: figurePreviousKillRole(members, oldMembersObject)};
        }

        // WHOM - MAFIA
        // WHEN - AT NIGHT
      if (currentPlayerDetails.currentPlayerRole === ROLES.MAFIA && roundInformation.state === ROUND_STATE.NIGHT) {
          // figure primary mafia details
          let primaryMafiaName = figurePrimaryMafia(members);
          let isPrimaryMafia = primaryMafiaName === sampleDataObject.currentPlayerName;
          sampleDataObject = {...sampleDataObject, isPrimaryMafia, primaryMafiaName};
        }

        // WHOM - EVERYONE
        // WHEN - DURING DAY
        // figure voting information
      if (roundInformation.state === ROUND_STATE.DAY) {
          members = figureVotes(roundInformation.votes, members);
        }
        sampleDataObject = {
          ...sampleDataObject,
        members,
        roundNumber: roundInformation.num,
        roundState: roundInformation.state,
        }
    } else if (sampleDataObject.gameState === GAME_STATE.COMPLETED_MAFIA) {
        // WHOM - EVERYONE
        // WHEN - GAME OVER
        sampleDataObject = {
          ...sampleDataObject,
        winners: getAllByRole(members, ROLES.MAFIA),
        members
        }
    } else if (sampleDataObject.gameState === GAME_STATE.COMPLETED_VILLAGER) {
        // WHOM - EVERYONE
        // WHEN - GAME OVER
        sampleDataObject = {
          ...sampleDataObject,
        winners: getAllByRole(members, ROLES.VILLAGER),
        members
        }
    } else {
      sampleDataObject = {
        ...sampleDataObject,
        members,
      }
    }

      dispatch({mafiaScreen: screen, data: sampleDataObject});
  }
  const onGameCreate = (name) => {
    
    // state['connection'].invoke("createGame", name);
    
    let sampleDataObject = {
      isPlayerOrganizer: true, // set off
      currentPlayerName: name
    };
    handleOnGameChanged();
    // dispatch({mafiaScreen: MAFIA_STATES.LOAD, data: sampleDataObject});
    
  }
  
  const onGameFetch = (name, code) => {
    // state['connection'].invoke("joinGame", name, code);

    let sampleDataObject = {
      code: code, // set  off
      currentPlayerName: name,
      isPlayerOrganizer: false, // set off
      members: [{name: "Vishal", id: 1, role: ROLES.MAFIA}, {name: "Sharon", id: 2, role: ROLES.VILLAGER}, {name: "Kriti", id: 3, role: ROLES.MAFIA}]  // todo shmathew remove
    }

    dispatch({mafiaScreen: MAFIA_STATES.LOAD, data: sampleDataObject});
  }
  
  if (state['connection']) {
    state['connection'].on("onGameChanged", data => {
      handleOnGameChanged(data);
    });
  }
  
  const onLinkAdded = () => {
    console.log("Link added being called");
    // state['connection'].invoke("linkAdded", state.code, link);
  }

  const onGameStart = () => {
    console.log("Game started");
    dispatch({mafiaScreen: MAFIA_STATES.GAME});
    // state['connection'].invoke("startGame", state.code);
  }
  
  const killVillager = (userId) => {
    console.log("Villager killed: " + userId);
    // state['connection'].invoke("killVillager", state.code, state.currentPlayerName, nameOfVillagerToBeKilled);
  }
  
  const vote = (userId) => {
    console.log("Voted against villager: " + userId);
    // state['connection'].invoke("killVillager", state.code, state.currentPlayerName, state.roundNumber, nameOfVotedVillager);
  }

  const sendMessage = (message) => {
    // state['mafia-connection'].invoke("sendMessage", message);
  }

  switch (state['mafiaScreen']) {
    case MAFIA_STATES.LOGIN:
      return (<><HeaderLayout screen={MAFIA_STATES.LOGIN}/><LoginLayout onGameCreate={onGameCreate} onGameFetch={onGameFetch}/></>);
    case MAFIA_STATES.LOBBY:
      return (<>
                <HeaderLayout screen={MAFIA_STATES.LOBBY}/>
                <LobbyLayout 
                  profiles={state['data'].members} 
                  link={state['data'].conferenceLink} 
                onGameStart={onGameStart} 
                onLinkAdded={onLinkAdded}
                  gameCode={state['data'].code}
                  isOrganizer={state['data'].isPlayerOrganizer}/>
              </>);
    case MAFIA_STATES.GAME:
      return (<>
                <HeaderLayout 
                screen={MAFIA_STATES.GAME} 
                  link={state['data'].conferenceLink} 
                  currentPlayerRole={state['data'].currentPlayerRole} 
                  roundNumber={state['data'].roundNumber} 
                  currentPlayerDead={state['data'].currentPlayerDead}
                  gameState={state['data'].gameState}/>
                <GameLayout 
                  currentPlayerRole={state['data'].currentPlayerRole} 
                  roundNumber={state['data'].roundNumber} 
                  currentPlayerDead={state['data'].currentPlayerDead}
                  gameState={state['data'].gameState}
                  roundState={state['data'].roundState}
                  previousKillRole={state['data'].previousKillRole}
                  primaryMafiaName={state['data'].primaryMafiaName}
                  yourName={state['data'].currentPlayerName}
                  winners={state['data'].winners}
                killVillager={killVillager} 
                vote={vote} 
                  players = {state['data'].members}
                  isPrimaryMafia = {state['data'].isPrimaryMafia}/>
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
    case GAME_STATE.WAITING:
      screen = MAFIA_STATES.LOBBY;
      break;
    case GAME_STATE.STARTED:
    case GAME_STATE.COMPLETED_MAFIA:
    case GAME_STATE.COMPLETED_VILLAGER:
      screen = MAFIA_STATES.GAME;
  }
  return screen;
}

export default AppRouter;