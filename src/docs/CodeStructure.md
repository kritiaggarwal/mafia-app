# Code Structure
## Entry
- `Index.js` - Entry Point
- `App.js` - Sets up global state

## Common Code
- `AppConnector.js` - Sets up SignalR Connection
- `AppRouter.js` - [TODO] Sets up header and actual view - handling all the callbacks here too
- `HeaderLayout/HeaderLayout.js` - [TODO] Shows Mafia logo, Text div, Round text (based on global game state)
- `HeaderLayout/HeaderLayoutStyles.js` - [TODO] CSS For Header

## FullScreenSpinner
- `FullScreenSpinner/FullScreenSpinner.js` - [TODO] Spinner
- `FullScreenSpinner/FullScreenSpinnerStyles.js` - [TODO] CSS for Spinner

## Login
- `LoginLayout/LoginLayout.js` - [TODO] Sets up Login screen with input and logo
- `LoginLayout/LoginLayoutStyles.js` - [TODO] CSS for Login Layout
- `LoginLayout/InputLayout.js` - [TODO] Sets up Input layout with component state handling whether it's to create room or join room
- `LoginLayout/InputLayoutStyles.js` - [TODO] CSS for Input

## Lobby
- `LobbyLayout/LobbyLayout.js` - [TODO] Sets up Lobby Screen
- `LobbyLayout/LobbyLayoutStykes.js` - [TODO] CSS for Lobby Screen
- `LobbyLayout/GameSettings.js`- [TODO] Display Code + input call link
- `LobbyLayout/GameSettingsStyles.js`- [TODO] CSS for Game Settings

## Game
- `GameLayout/GameLayout.js` - [EMPTY] Sets up Game Screen
- `GameLayout/GameLayoutStyles.js` - [EMPTY] CSS for Game Screen

## Players Grid
- `PlayersGrid/PlayersGrid.js`- [EMPTY] Needs to set up the players with icons - needed in both lobby and game
- `PlayersGrid/PlayersGridStyles.js`- [TODO] CSS for Players Grid

## Players List
- `PlayersList/PlayersList.js` - [EMPTY] Sync roles, highlight role, voting options, voting count display
- `PlayersList/PlayersListStyles.js` - [TODO] CSS for Players List

## Chat Pane
- `ChatPane/ChatPane.js` - [EMPTY] roster control + syncing messages + handle whether for all/mafia + disabling during nighttime
- `ChatPane/ChatPaneStyles.js` - [TODO] CSS for Chat Pane

