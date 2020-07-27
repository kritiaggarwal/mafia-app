# Props each component should take
## GameSettings
- read `isPlayerOrganizer`
    - True -> Should allow editing of conference link, should show create button
    - False -> Should show text saying waiting for organizer to start
- read `players`
    - >6 -> Should enable button
- read `conferenceLink`
    - If Present -> Should display conference link

**Callbacks:** onGameStarted, onLinkAdded

## PlayersGrid
- read `players`
    - read `name` from each to display list (should be used in winning screen also)

## Header
- read `currentPlayerRole`
    - "Mafia" -> should show middle text saying you are part of the mafia
    - "Villager" -> should show middle text saying you are a villager
- read `currentPlayerDead`
    - True -> should say dead
    - False -> should say find mafia or kill villagers based on `currentPlayerRole`
- read `roundNumber` 
    - To display Round # on right
- read `conferenceLink` 
    - If present -> Should display link

## PlayersList
### Props
- `players`
- `roundState`
- `isPrimaryMafia`
- `currentPlayerName`

**Callbacks:** onKillVillager, onVote

### Players List Logic
- read `roundState`
    - "Night"
        - read `isPrimaryMafia` 
            - True -> show vote out radio buttons
            - False
                - read `currentPlayerRole`
                    - "Mafia" -> read `name`, `role` from `players` and highlight mafia
                    - "Villager" -> just display `name`
    - "Day"
        - read `vote` from players and display
        - display radio button to vote

**players object structure:** will pass name, role (may be undefined), vote (may be undefined), alive/dead

## Game Layout
### Props
- `gameState`
- `roundState`
- `roundNumber`
- `primaryMafiaName`
- `currentPlayerRole`
- `yourName`
- `previousKillRole`

### Game Layout Logic

- read `gameState`
    - "STARTED"
        - read `roundState`
            - "Night"
                - read `roundNumber`
                    - !1 -> Say who was killed in previous vote
                - read `currentPlayerRole`
                    - "Villager" -> Say Mafia is killing
                    - "Mafia"
                        - read `primaryMafiaName`
                            - if equal to `yourName` ->  Ask them to choose to kill someone
                            - else -> Ask them to help `primaryMafiaName`

            - "Day" -> Say Mafia killed someone
    - "COMPLETED-MAFIA" -> Say Mafia win
    - "COMPLETED-VILLAGERS" -> Say Villagers win
-

