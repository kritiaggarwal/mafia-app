import React, { Component } from "react";
import { containerStyles } from "./PlayersListStyles";
import { ChoiceGroup} from 'office-ui-fabric-react/lib/ChoiceGroup';

class PlayersList extends Component {
  render() {
    const options1 = [
       { key: 'B', text: '',
      onRenderField: (props, render) => {
          return (
            <div style = {{display:"flex",alignItems:"center",margin:"10px", justifyContent:"space-between", minWidth:"330px"}}>
              <img style= {{height:"50px", borderRadius:"50%"}} src="https://api.adorable.io/avatars/viji.png"></img>
              <div style = {{fontFamily:"arial", fontSize:"20px"}}>Suzie</div>
              <div style = {{fontFamily:"arial", fontSize:"20px", color:"#BF2626"}}>+5</div>
              {render(props)}    
            </div>
          );
        } 
      ,styles: { root: { backgroundColor:"rgba(247,105,105,0.56)"}}},
    { key: 'C', text: '',
      onRenderField: (props, render) => {
          return (
            <div style = {{display:"flex",alignItems:"center",margin:"10px"}}>
              
              <img style= {{height:"30px", borderRadius:"50%"}} src="https://api.adorable.io/avatars/viji.png"></img>
    {render(props)}
            </div>
          );
        } 
      ,styles: { root: { backgroundColor:"red"}}},
    { key: 'D', text: '',
      onRenderField: (props, render) => {
          return (
            <div style = {{display:"flex",flexDirection:"row-reverse",alignItems:"center",margin:"10px"}}>
              {render(props)}
              <img style= {{height:"30px", borderRadius:"50%"}} src="https://api.adorable.io/avatars/viji.png"></img>
            </div>
          );
        } 
      ,styles: { root: { backgroundColor:"red"}}},
    ];
    return <div style={containerStyles()}>
      <ChoiceGroup options={options1}/>
    </div>;
  }
}

export default PlayersList;
