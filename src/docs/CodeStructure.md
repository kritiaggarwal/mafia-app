# Code Structure
## Entry
- `Index.js` - Entry Point
- `App.js` - Sets up global state

## Common Code
- `AppRouter.js` - Sets up header and actual view - handling all the callbacks here too
- `HeaderLayout/HeaderLayout.js` - [TODO] Shows Mafia logo, Text div, Round text (based on global game state)

## FullScreenSpinner
- `FullScreenSpinner/FullScreenSpinner.js` - Spinner

## Login
- `LoginLayout/LoginLayout.js` - Sets up Login screen with input and logo
- `LoginLayout/InputLayout.js` - Sets up Input layout with component state handling whether it's to create room or join room

## Lobby
- `LobbyLayout/LobbyLayout.js` - [EMPTY] Sets up Lobby Screen
- `LobbyLayout/GameSettings.js`- [TODO] Display Code + input call link

## Game
- `GameLayout/GameLayout.js` - [EMPTY] Sets up Game Screen
- `GameLayout/MiddlePane.js` - [TODO] Formatted text

## Players Grid
- `PlayersGrid/PlayersGrid.js`- [TODO] Needs to set up the players with icons - needed in both lobby and game

## Players List
- `PlayersList/PlayersList.js` - [TODO] Sync roles, highlight role, voting options, voting count display

## Chat Pane
- `ChatPane/ChatPane.js` - [TODO] roster control + syncing messages + handle whether for all/mafia + disabling during nighttime

