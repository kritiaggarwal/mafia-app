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
  VILLAGER: 0,
  MAFIA: 1
}

export const GAME_STATE = {
  WAITING: 0,
  STARTED: 1,
  COMPLETED_MAFIA: 2,
  COMPLETED_VILLAGER: 3
}

export const ROUND_STATE = {
  DAY: 1,
  NIGHT: 0
}

const defaultState = {
  mafiaScreen: MAFIA_STATES.LOAD,
  connection: undefined,
  data: undefined
}

const GlobalStateContext = React.createContext(defaultState); // to read
const DispatchStateContext = React.createContext(undefined); // to write


const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => {
      return { ...state, ...newValue } },
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
