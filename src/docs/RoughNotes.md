# Stuff
## Login Screen
- `onCreateRoom` - on clicking button when only name
    - CreateGame (pass name, deviceId)
    - Get code - move to lobby
- `onJoinRoom` - on clicking button when name and code
    - JoinGame (pass name, code, deviceId)
    - get code, state (decide if we should move to lobby or not)

## Lobby Screen
- `onConferenceLink` - on blur of editing link
    - ConferenceLink (pass link, code, deviceId)
- `onStartGame` - when organizer clicks
    - StartGame (pass code)
-  `SignalR Event`
    - `conferenceLink` - for participants to display link
    - `members` - keep updating list
    - `state` - if waiting stay in lobby, otherwise move to game screen

## Game Screen
- `killVillager` - on primary mafia clicking a radio button
    - KillVillager (pass villager detail, round)

- `SignalR Event`
    - `round` - Get round number to display in header, and whether night or day
    - `members` - Get your role, if mafia get other peoples roles, who is killed, votes
    - `primaryMafia` - Put vote radio button
    - `state` - to know if game is over or not

