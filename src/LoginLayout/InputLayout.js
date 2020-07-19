import React, { useState } from 'react';
import {MAFIA_STATES, useGlobalState} from '../App';
import { TextField, Button } from '@fluentui/react';

const getButtonStyles = (() => ({
  root: {
    backgroundColor: "#45802A",
    border: 0,
    margin: '30px 0px 0px 87px',
    width: 200,
    color: "#E0E0E0"
  },
  rootHovered: {
    backgroundColor: "#679552",
    border: 0,
    color: "#E0E0E0"
  }
}));

const getNameTextStyles = (() => ({
  wrapper: { 
    display: "flex",
  },
  fieldGroup: [{ 
      width: 200,
      border: 0
     },
  ],
  subComponentStyles: {
    label: {
      root: {
        color: '#EOEOEO',
        margin: '0px 13px 30px 36px'
      }
    }
  }
}));

const getCodeTextStyles = (() => ({
  wrapper: { 
    display: "flex",
  },
  fieldGroup: [{ 
    width: 200,
    border: 0
   },
],
  subComponentStyles: {
    label: {
      root: {
        color: '#EOEOEO',
        margin: '0px 13px 0px 0px'
      }
    }
  }
}));

function InputLayout() {
  const [state, dispatch] = useGlobalState();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  return (
      <div style={{padding: "50px 100px 0px 0px"}}>
        <TextField label="Name" styles={getNameTextStyles()} placeholder="Enter text here" onBlur={(data) => setName(data.target.value)} />
        <TextField label="Game Code" styles={getCodeTextStyles()} placeholder="Enter code here" onBlur={(data) => setCode(data.target.value)}/>
        <Button disabled={name == ""} text={code ? "Join Room" : "Create Room"} styles={getButtonStyles()}  onClick={() => dispatch({mafiaScreen: MAFIA_STATES.LOBBY})}/>
      </div>
  );
}

export default InputLayout;
