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
  // REALLY BAD WAY TO CODE - JUST DOING THINGS QUICKLY
  const [state, dispatch] = useGlobalState();

  if (state.connection && state.data) {
    state.connection.on("onGameChanged", data => {
      let oldMembersObject = state.data ? state.data.members : [] ;
      let roundInformation = data.round;
      let members = data.members;
      let gameState = data.gameState;
      let code = data.code;
      let conferenceLink = data.meetingLink;

      let sampleDataObject = {
        gameState,
        isPlayerOrganizer: state.data.isPlayerOrganizer,
        currentPlayerName: state.data.currentPlayerName,
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
        // todo kriti
        // state.connection.invoke("joinGame", name, code-role); 
        
        // WHOM - EVERYONE
        // WHEN - AFTER DAY VOTING
        // figure previous kill role
        if (roundInformation.round !== 1 && roundInformation.state === ROUND_STATE.NIGHT) {
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
          roundNumber: roundInformation.round,
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

      dispatch({...state, mafiaScreen: screen, data: sampleDataObject});
    });

    state.connection.on("ReceivedMessage", data => {
      // todo kriti
      // handleMessageReceived(data);
    });
  }

  const onGameCreate = (name) => {
    state.connection.invoke("createGame", name);
    
    let sampleDataObject = {
      isPlayerOrganizer: true, // set off
      currentPlayerName: name
    };
    dispatch({...state, mafiaScreen: MAFIA_STATES.LOAD, data: sampleDataObject});
    
  }
  
  const onGameFetch = (name, code) => {
    state.connection.invoke("joinGame", name, code);

    let sampleDataObject = {
      code: code, // set  off
      currentPlayerName: name,
      isPlayerOrganizer: false, // set off
    }

    dispatch({...state, mafiaScreen: MAFIA_STATES.LOAD, data: sampleDataObject});
  }

  
  const onLinkAdded = (link) => {
    console.log("Link added being called");
    state.connection.invoke("addLink", state.data.code, link.target.value);
  }

  const onGameStart = () => {
    console.log("Game started");
    state.connection.invoke("startGame", state.data.code);
  }
  
  const killVillager = (userId) => {
    var nameOfVillagerToBeKilled = figureNameById(state.data['members'], userId);
    console.log("Villager killed: " + nameOfVillagerToBeKilled);
    // state.connection.invoke("killVillager", state.code, state.currentPlayerName, nameOfVillagerToBeKilled);
  }
  
  const vote = (userId) => {
    var nameOfVotedVillager = figureNameById(state.data['members'], userId);
    console.log("Voted against villager: " + nameOfVotedVillager);
    // state.connection.invoke("killVillager", state.code, state.currentPlayerName, state.roundNumber, nameOfVotedVillager);
  }

  const sendMessage = (message) => {
    // todo kriti
    // state['mafia-connection'].invoke("sendMessage", code-role, message);
  }

  switch (state.mafiaScreen) {
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
                  currentPlayerId={state['data'].currentPlayerId}
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
  var i = 0, j = 0, foundNewlyDead = false;

  while (i < newMembersList.length && !foundNewlyDead) {
    var newMember = newMembersList[i];
    j = 0;
    while (j < oldMembersList.length && !foundNewlyDead) {
      var oldMember = oldMembersList[j];
      if (oldMember.id === newMember.id && oldMember.isAlive && !newMember.isAlive) {
        return newMember.role;
      }
      j++;
    }
    i++;
  }
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
    currentPlayerId: currentPlayer.id,
    currentPlayerRole: currentPlayer.role,
    currentPlayerDead: !currentPlayer.isAlive,
    currentPlayerName: currentPlayer.name,
    isPrimaryMafia: currentPlayer.isPrimaryMafia
  }
}

function figureNameById(members, idToFind) {
  var player = members.find(function(member) {
    if(member.id === idToFind)
      return true;
  });
  return player.name;
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