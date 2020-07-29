import React from 'react';
import {MAFIA_STATES, useGlobalState} from './App';
import AppRouter from "./AppRouter";
import * as signalR from '@microsoft/signalr';

function AppConnector() {
  const [state, dispatch] = useGlobalState();
  let connection = state.connection;
  if (!connection) {
    try {
      connection = new signalR.HubConnectionBuilder()
        .withUrl("https://mafiaapp20200725162443.azurewebsites.net/chathub")
        .build();
        connection.start({ withCredentials: false, sameSite: "Lax" })
          .then(() => {
            dispatch({...state, mafiaScreen: MAFIA_STATES.LOGIN, connection: connection})
          })
          .catch((error) => { console.log(error)} )
        
    } catch(error) {
      console.log(error);
    }
  }
  return (
    <AppRouter />
  );
}
export default AppConnector;
