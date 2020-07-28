import React, { Component } from "react";
import { containerStyles } from "./PlayersListStyles";
import { ChoiceGroup} from 'office-ui-fabric-react/lib/ChoiceGroup';

class PlayersList extends Component {
  render() {
    if (this.props.roundState == "day" && this.props.isCurrentPlayerAlive) {
      showButtonForGeneralVoting = true;
    }  else if (this.props.roundState == "night" && this.props.isPrimaryMafia) {
      showButtonForMafiaVoting = true;
    }
    

    
    const options1 = [
       { key: 'A', text: '',
      onRenderField: (props, render) => {
          return (
            <div style = {{display:"flex",alignItems:"center",margin:"10px", justifyContent:"space-between", minWidth:"330px"}}>
              <img style= {{height:"50px", borderRadius:"50%"}} src="https://api.adorable.io/avatars/viji.png"></img>
              <div style = {{fontFamily:"arial", fontSize:"20px"}}>{this.props.players[1].name}</div>
              <div style = {{fontFamily:"arial", fontSize:"20px", color:"#BF2626", visibility: "visible"}}>+5</div>
              <div style = {{visibility: "visible"}}>{render(props)}</div>
            </div>
          );
        } 
      ,styles: { root: { backgroundColor:"rgba(247,105,105,0.56)"}}}];
    return <div style={containerStyles()}>
      <ChoiceGroup options={options1}/>
    </div>;
  }
}

export default PlayersList;
