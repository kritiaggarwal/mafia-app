import React, { Component } from "react";
import { containerStyles, playerRowStyles, imageStyles, playerNameStyles, voteStyles, radioButtonStyles } from "./PlayersListStyles";
import { ChoiceGroup} from 'office-ui-fabric-react/lib/ChoiceGroup';
import 'office-ui-fabric-react/dist/css/fabric.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

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
      let backgroundColor = "transparent";
      if (player.role == ROLES.MAFIA) { 
        if (player.isAlive) {
          backgroundColor = "#ba797d"
        } else {
          backgroundColor = "#c2a5a7"
        }
      } else if (!player.isAlive) {
        backgroundColor = "rgba(200,200,200,0.56)";
      }
      let playerRow = { key: player.id , 
        onRenderField: (props, render) => {
            return (
      <div className="ms-Grid" dir="ltr" >
        <div className="ms-Grid-row" style = {playerRowStyles(backgroundColor)}>
          <div className="ms-Grid-col ms-sm4 " >
            <img  style= {imageStyles()} src={"https://api.adorable.io/avatars/70/" + player.name + ".png"}></img>
          </div>
          <div className="ms-Grid-col ms-sm4" style = {playerNameStyles()}>
            {this.props.currentPlayerName == player.name? "YOU" : player.name}
          </div>
          <div className="ms-Grid-col ms-sm2 " style = {voteStyles(player.vote)}>
            +{player.vote}
          </div>
          <div className="ms-Grid-col ms-sm2 " style = {radioButtonStyles(showButton)}>
            {render(props)}
          </div>
        </div>
      </div>
            );
          } 
      };
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
    
    return <PerfectScrollbar style = {containerStyles()}>
        <ChoiceGroup options={options} onChange={this.handleVote} />
    </PerfectScrollbar>;
  }
}

export default PlayersList;
