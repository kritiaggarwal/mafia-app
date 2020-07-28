import React, { Component } from "react";
import { containerStyles } from "./PlayersListStyles";
import { ChoiceGroup} from 'office-ui-fabric-react/lib/ChoiceGroup';

class PlayersList extends Component {

  getPlayerRows(showButtonForGeneralVoting, showButtonForMafiaVoting) {
    let playerRows = [];
    for(player in this.props.players){
      let showButton = false;
      if ((showButtonForGeneralVoting && player.alive == 'alive') || 
      showButtonForMafiaVoting && player.alive == 'alive' && player.role == "villager") {
        showButton = true;
      }
      playerRow = { key: player.playerId , text: '',
        onRenderField: (props, render) => {
            return (
              <div style = {{display:"flex",alignItems:"center",margin:"10px", justifyContent:"space-between", minWidth:"330px"}}>
                <img style= {{height:"50px", borderRadius:"50%"}} src={"https://api.adorable.io/avatars/" + player.name + ".png"}></img>
                <div style = {{fontFamily:"arial", fontSize:"20px"}}>{player.name}</div>
                <div style = {{fontFamily:"arial", fontSize:"20px", color:"#BF2626", 
                visibility: player.vote ? "visible": "hidden"}}>{player.vote}</div>
                <div style = {{visibility: showButton?"visible":"hidden"}}>{render(props)}</div>
              </div>
            );
          } 
        ,styles: { root: { backgroundColor:"rgba(247,105,105,0.56)"}}}; //todo - background, scrolling, callbacks, row css
      playerRows.push(playerRow);
    }
    return playerRows;
  }

  render() {
    let showButtonForGeneralVoting = false;
    let showButtonForMafiaVoting = false;

    if (this.props.roundState == "day" && this.props.isCurrentPlayerAlive) {
      showButtonForGeneralVoting = true;
    }  else if (this.props.roundState == "night" && this.props.isPrimaryMafia) {
      showButtonForMafiaVoting = true;
    }
    
    const options = this.getPlayerRows(showButtonForGeneralVoting, showButtonForMafiaVoting);
    
    return <div style={containerStyles()}>
      <ChoiceGroup options={options}/>
    </div>;
  }
}

export default PlayersList;
