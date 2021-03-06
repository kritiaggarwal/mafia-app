import React from 'react';
import './App.css';
import AppConnector from "./AppConnector";

export const MAFIA_STATES = {
  LOGIN: 'login',
  LOBBY: 'lobby',
  GAME: 'game',
  LOAD: 'load'
}

const defaultState = {
  mafiaScreen: MAFIA_STATES.LOAD,
  connection: undefined
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
