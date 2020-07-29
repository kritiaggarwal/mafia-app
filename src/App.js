import React from 'react';
import './App.css';
import AppConnector from "./AppConnector";

export const MAFIA_STATES = {
  LOGIN: 'login',
  LOBBY: 'lobby',
  GAME: 'game',
  LOAD: 'load'
}

export const ROLES = {
  VILLAGER: 'villager',
  MAFIA: 'mafia'
}

export const GAME_STATE = {
  WAITING: 'Waiting',
  STARTED: 'Started',
  COMPLETED_MAFIA: 'Completed-Mafia',
  COMPLETED_VILLAGER: 'Completed-Villager'
}

export const ROUND_STATE = {
  DAY: 'Day',
  NIGHT: 'Night'
}

const defaultState = {
  mafiaScreen: MAFIA_STATES.LOAD,
  connection: undefined,
  data: undefined,
  villageMessages: [],
  mafiaMessages: []
}

const GlobalStateContext = React.createContext(defaultState); // to read
const DispatchStateContext = React.createContext(undefined); // to write


const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({ ...state, ...newValue }),
    defaultState
  );
  return (
    <GlobalStateContext.Provider value={state}>
      <DispatchStateContext.Provider value={dispatch}>
        {children}
      </DispatchStateContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => [
  React.useContext(GlobalStateContext),
  React.useContext(DispatchStateContext)
];

function App() {
  return (
    <GlobalStateProvider>
      <div className="App">
        <AppConnector/>
      </div>
    </GlobalStateProvider>
  );
}

export default App;
