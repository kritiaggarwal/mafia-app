import React, { Component } from "react";
import { containerStyles } from "./PlayersListStyles";
import { ChoiceGroup} from 'office-ui-fabric-react/lib/ChoiceGroup';
import { ROLES, ROUND_STATE } from "../App";
class PlayersList extends Component {

  constructor(props) {
    super(props)
    this.showButtonForGeneralVoting = false;
    this.showButtonForMafiaVoting = false;
    this.handleVote = this.handleVote.bind(this);
  }
  
  getPlayerRows(showButtonForGeneralVoting, showButtonForMafiaVoting) {
    let playerRows = [];
    this.props.players.forEach(player => {
      let showButton = false;
      if ((showButtonForGeneralVoting && player.isAlive) || 
      showButtonForMafiaVoting && player.isAlive && player.role == ROLES.VILLAGER) {
        showButton = true;
      }
      let playerRow = { key: player.id , text: '',
        onRenderField: (props, render) => {
            return (
              <div style = {{display:"flex",alignItems:"center",margin:"10px", justifyContent:"space-between", minWidth:"330px"}}>
                <img style= {{height:"50px", borderRadius:"50%"}} src={"https://api.adorable.io/avatars/" + player.name + ".png"}></img>
                <div style = {{fontFamily:"arial", fontSize:"20px"}}>{player.name}</div>
                <div style = {{fontFamily:"arial", fontSize:"20px", color:"#BF2626", 
                visibility: (typeof player.vote !== 'undefined') ? "visible": "hidden"}}>{player.vote}</div>
                <div style = {{visibility: showButton?"visible":"hidden"}}>{render(props)}</div>
              </div>
            );
          } 
        ,styles: { root: { backgroundColor:"rgba(247,105,105,0.56)"}}}; //todo - background, scrolling, row css
      playerRows.push(playerRow);
    });
    return playerRows;
  }

  handleVote (event, option) {
    //option.key is player id
    if (this.showButtonForGeneralVoting) {
      this.props.vote(option.key);
    } else if (this.showButtonForMafiaVoting) {
      this.props.killVillager(option.key);
    }
  }

  render() {
    if (this.props.roundState == ROUND_STATE.DAY && this.props.isCurrentPlayerAlive) {
      this.showButtonForGeneralVoting = true;
    }  else if (this.props.roundState == ROUND_STATE.NIGHT && this.props.isPrimaryMafia) {
      this.showButtonForMafiaVoting = true;
    }
    
    const options = this.getPlayerRows(this.showButtonForGeneralVoting, this.showButtonForMafiaVoting);
    
    return <div style={containerStyles()}>
      <ChoiceGroup options={options} onChange={this.handleVote} />
    </div>;
  }
}

export default PlayersList;
